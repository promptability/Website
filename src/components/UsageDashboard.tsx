'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUsageStats } from '@/lib/usage';
import { PLANS } from '@/lib/plans';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface UsageStats {
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
  planType: string;
}

export default function UsageDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const userStats = await getUsageStats(user.uid);
      setStats(userStats);
    } catch (error) {
      console.error('Error loading usage stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-800 rounded-lg"></div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Usage Dashboard</h3>
        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
          {stats.planType.charAt(0).toUpperCase() + stats.planType.slice(1)} Plan
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Usage */}
        {stats.limits.daily !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Daily Usage</span>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </div>
            <div className="mb-3">
              <span className={`text-2xl font-bold ${getUsageColor(stats.percentageUsed.daily)}`}>
                {stats.daily}
              </span>
              <span className="text-gray-400 text-sm ml-1">
                / {stats.limits.daily === Infinity ? '∞' : stats.limits.daily}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(stats.percentageUsed.daily, 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`h-2 rounded-full ${getProgressBarColor(stats.percentageUsed.daily)}`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.limits.daily === Infinity 
                ? 'Unlimited daily prompts' 
                : `${Math.max(0, stats.limits.daily - stats.daily)} prompts remaining today`}
            </p>
          </motion.div>
        )}

        {/* Monthly Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Monthly Usage</span>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </div>
          <div className="mb-3">
            <span className={`text-2xl font-bold ${getUsageColor(stats.percentageUsed.monthly)}`}>
              {stats.monthly}
            </span>
            <span className="text-gray-400 text-sm ml-1">
              / {stats.limits.monthly === Infinity ? '∞' : stats.limits.monthly}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(stats.percentageUsed.monthly, 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className={`h-2 rounded-full ${getProgressBarColor(stats.percentageUsed.monthly)}`}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {stats.limits.monthly === Infinity 
              ? 'Unlimited monthly prompts' 
              : `${Math.max(0, stats.limits.monthly - stats.monthly)} prompts remaining this month`}
          </p>
        </motion.div>
      </div>

      {/* Total Usage */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Total All-Time Usage</span>
          <span className="text-xl font-bold text-white">{stats.total.toLocaleString()} prompts</span>
        </div>
      </div>

      {/* Usage Warnings */}
      {stats.percentageUsed.monthly >= 90 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3"
        >
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <p className="text-sm text-red-400 font-medium">Usage Limit Warning</p>
            <p className="text-xs text-gray-400 mt-1">
              You've used {stats.percentageUsed.monthly.toFixed(0)}% of your monthly limit. 
              Consider upgrading your plan for uninterrupted service.
            </p>
          </div>
        </motion.div>
      )}

      {/* Upgrade CTA for free users */}
      {stats.planType === 'free' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
        >
          <p className="text-sm text-gray-300 mb-3">
            Unlock more features and higher limits with a paid plan
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Upgrade Now
          </a>
        </motion.div>
      )}
    </div>
  );
}