import { db } from '@/lib/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { PLANS, PlanType } from './plans';

export interface UsageRecord {
  userId: string;
  planType: PlanType;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  monthlyUsage: number;
  dailyUsage: number;
  lastResetDate: Date;
  totalAllTimeUsage: number;
}

export interface UsageLog {
  id?: string;
  userId: string;
  timestamp: Timestamp;
  action: 'prompt_enhancement' | 'api_call' | 'analysis';
  metadata?: {
    promptLength?: number;
    model?: string;
    [key: string]: any;
  };
}

// Get or create usage record for a user
export async function getOrCreateUsageRecord(userId: string): Promise<UsageRecord> {
  const usageRef = doc(db, 'usage', userId);
  const usageDoc = await getDoc(usageRef);
  
  if (usageDoc.exists()) {
    const data = usageDoc.data();
    const record = {
      ...data,
      currentPeriodStart: data.currentPeriodStart?.toDate(),
      currentPeriodEnd: data.currentPeriodEnd?.toDate(),
      lastResetDate: data.lastResetDate?.toDate()
    } as UsageRecord;
    
    // Check if we need to reset daily usage
    const now = new Date();
    const lastReset = new Date(record.lastResetDate);
    if (now.getDate() !== lastReset.getDate() || 
        now.getMonth() !== lastReset.getMonth() || 
        now.getFullYear() !== lastReset.getFullYear()) {
      await resetDailyUsage(userId);
      record.dailyUsage = 0;
      record.lastResetDate = now;
    }
    
    // Check if we need to reset monthly usage
    if (now > new Date(record.currentPeriodEnd)) {
      await resetMonthlyUsage(userId);
      record.monthlyUsage = 0;
      record.currentPeriodStart = now;
      record.currentPeriodEnd = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    }
    
    return record;
  } else {
    // Create new usage record
    const now = new Date();
    const newRecord: UsageRecord = {
      userId,
      planType: 'free',
      currentPeriodStart: now,
      currentPeriodEnd: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
      monthlyUsage: 0,
      dailyUsage: 0,
      lastResetDate: now,
      totalAllTimeUsage: 0
    };
    
    await setDoc(usageRef, {
      ...newRecord,
      currentPeriodStart: Timestamp.fromDate(newRecord.currentPeriodStart),
      currentPeriodEnd: Timestamp.fromDate(newRecord.currentPeriodEnd),
      lastResetDate: Timestamp.fromDate(newRecord.lastResetDate)
    });
    
    return newRecord;
  }
}

// Check if user can use a feature based on their limits
export async function checkUsageLimit(userId: string, action: 'prompt' | 'api' = 'prompt'): Promise<{
  allowed: boolean;
  reason?: string;
  remainingDaily?: number;
  remainingMonthly?: number;
  planType: PlanType;
}> {
  const usage = await getOrCreateUsageRecord(userId);
  const limits = PLANS[usage.planType].limits;
  
  // Check monthly limit
  if (limits.promptsPerMonth !== -1 && usage.monthlyUsage >= limits.promptsPerMonth) {
    return {
      allowed: false,
      reason: `Monthly limit of ${limits.promptsPerMonth} prompts reached. Upgrade your plan for more.`,
      remainingDaily: 0,
      remainingMonthly: 0,
      planType: usage.planType
    };
  }
  
  // Check daily limit
  if (limits.promptsPerDay !== null && limits.promptsPerDay !== -1 && usage.dailyUsage >= limits.promptsPerDay) {
    return {
      allowed: false,
      reason: `Daily limit of ${limits.promptsPerDay} prompts reached. Try again tomorrow or upgrade your plan.`,
      remainingDaily: 0,
      remainingMonthly: Math.max(0, (limits.promptsPerMonth === -1 ? Infinity : limits.promptsPerMonth) - usage.monthlyUsage),
      planType: usage.planType
    };
  }
  
  return {
    allowed: true,
    remainingDaily: limits.promptsPerDay === null || limits.promptsPerDay === -1 
      ? Infinity 
      : limits.promptsPerDay - usage.dailyUsage,
    remainingMonthly: limits.promptsPerMonth === -1 
      ? Infinity 
      : limits.promptsPerMonth - usage.monthlyUsage,
    planType: usage.planType
  };
}

// Increment usage counters
export async function incrementUsage(userId: string, action: UsageLog['action'] = 'prompt_enhancement', metadata?: any): Promise<void> {
  const usageRef = doc(db, 'usage', userId);
  
  // Update counters
  await updateDoc(usageRef, {
    dailyUsage: increment(1),
    monthlyUsage: increment(1),
    totalAllTimeUsage: increment(1),
    lastUsed: serverTimestamp()
  });
  
  // Log the usage
  const logsRef = collection(db, 'usageLogs');
  await setDoc(doc(logsRef), {
    userId,
    timestamp: serverTimestamp(),
    action,
    metadata: metadata || {}
  });
}

// Reset daily usage
async function resetDailyUsage(userId: string): Promise<void> {
  const usageRef = doc(db, 'usage', userId);
  await updateDoc(usageRef, {
    dailyUsage: 0,
    lastResetDate: serverTimestamp()
  });
}

// Reset monthly usage
async function resetMonthlyUsage(userId: string): Promise<void> {
  const now = new Date();
  const usageRef = doc(db, 'usage', userId);
  await updateDoc(usageRef, {
    monthlyUsage: 0,
    dailyUsage: 0,
    currentPeriodStart: Timestamp.fromDate(now),
    currentPeriodEnd: Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())),
    lastResetDate: serverTimestamp()
  });
}

// Update user's plan when they subscribe
export async function updateUserPlan(userId: string, planType: PlanType): Promise<void> {
  const usageRef = doc(db, 'usage', userId);
  const now = new Date();
  
  await updateDoc(usageRef, {
    planType,
    planUpdatedAt: serverTimestamp(),
    // Reset period for new subscription
    currentPeriodStart: Timestamp.fromDate(now),
    currentPeriodEnd: Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())),
    // Keep usage counts but they'll be subject to new limits
  });
}

// Get usage statistics for display
export async function getUsageStats(userId: string): Promise<{
  daily: number;
  monthly: number;
  total: number;
  limits: {
    daily: number | null;
    monthly: number;
  };
  percentageUsed: {
    daily: number;
    monthly: number;
  };
  planType: PlanType;
}> {
  const usage = await getOrCreateUsageRecord(userId);
  const limits = PLANS[usage.planType].limits;
  
  return {
    daily: usage.dailyUsage,
    monthly: usage.monthlyUsage,
    total: usage.totalAllTimeUsage,
    limits: {
      daily: limits.promptsPerDay,
      monthly: limits.promptsPerMonth === -1 ? Infinity : limits.promptsPerMonth
    },
    percentageUsed: {
      daily: limits.promptsPerDay === null || limits.promptsPerDay === -1 
        ? 0 
        : (usage.dailyUsage / limits.promptsPerDay) * 100,
      monthly: limits.promptsPerMonth === -1 
        ? 0 
        : (usage.monthlyUsage / limits.promptsPerMonth) * 100
    },
    planType: usage.planType
  };
}

// Get recent usage logs
export async function getRecentUsageLogs(userId: string, limitCount: number = 10): Promise<UsageLog[]> {
  const logsRef = collection(db, 'usageLogs');
  const q = query(
    logsRef,
    where('userId', '==', userId),
    orderBy('timestamp', 'desc'),
    limit(limitCount)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as UsageLog));
}