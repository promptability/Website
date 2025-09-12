// Plan definitions with usage limits
export const PLANS = {
  free: {
    name: 'Free',
    limits: {
      promptsPerMonth: 300, // 10 per day * 30 days
      promptsPerDay: 10,    // 10 requests per day
      features: {
        basicPromptEnhancement: true,
        advancedOptimization: false,
        teamCollaboration: false,
        apiAccess: false,
        customBranding: false,
        prioritySupport: false
      }
    }
  },
  starter: {
    name: 'Starter',
    stripePriceIds: {
      monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID,
      yearly: process.env.STRIPE_STARTER_YEARLY_PRICE_ID
    },
    limits: {
      promptsPerMonth: 4500, // 150 per day * 30 days
      promptsPerDay: 150,
      features: {
        basicPromptEnhancement: true,
        advancedOptimization: true,
        teamCollaboration: false,
        apiAccess: false,
        customBranding: false,
        prioritySupport: false
      }
    }
  },
  pro: {
    name: 'Pro',
    stripePriceIds: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
      yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID
    },
    limits: {
      promptsPerMonth: 30000, // 1000 per day * 30 days
      promptsPerDay: 1000,
      features: {
        basicPromptEnhancement: true,
        advancedOptimization: true,
        teamCollaboration: true,
        apiAccess: true,
        customBranding: false,
        prioritySupport: true
      }
    }
  },
  team: {
    name: 'Team',
    stripePriceIds: {
      monthly: process.env.STRIPE_TEAM_MONTHLY_PRICE_ID,
      yearly: process.env.STRIPE_TEAM_YEARLY_PRICE_ID
    },
    limits: {
      promptsPerMonth: -1, // Unlimited
      promptsPerDay: -1, // Unlimited
      features: {
        basicPromptEnhancement: true,
        advancedOptimization: true,
        teamCollaboration: true,
        apiAccess: true,
        customBranding: true,
        prioritySupport: true
      }
    }
  }
} as const;

export type PlanType = keyof typeof PLANS;

export function getPlanByPriceId(priceId: string): PlanType | null {
  for (const [planKey, plan] of Object.entries(PLANS)) {
    if ('stripePriceIds' in plan) {
      if (plan.stripePriceIds.monthly === priceId || plan.stripePriceIds.yearly === priceId) {
        return planKey as PlanType;
      }
    }
  }
  return null;
}

export function getPlanLimits(planType: PlanType) {
  return PLANS[planType].limits;
}