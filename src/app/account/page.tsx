'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  User, Settings, CreditCard, BarChart3, Download, Crown, 
  CheckCircle, Edit3, Trash2, Plus,
  FileText, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { fadeInUp, staggerContainer, glassCard } from '@/lib/animations';

export default function AccountPage() {
  const { user, userProfile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        email: userProfile.email || user?.email || ''
      });
    }
  }, [userProfile, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl">Loading your account...</div>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Please sign in to view your account</h1>
          <Link href="/signin" className="text-blue-400 hover:text-blue-300">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Real user data from Firebase
  const userData = {
    name: userProfile.displayName || `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || 'User',
    firstName: userProfile.firstName || '',
    lastName: userProfile.lastName || '',
    email: userProfile.email || user.email,
    avatar: user.photoURL || null,
    joinDate: userProfile.createdAt?.toDate().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) || 'Recently',
    plan: userProfile.planType || 'free',
    status: (userProfile as any).subscriptionStatus || 'active',
    promptsUsed: (userProfile as any).promptsUsedToday || 0,
    promptsLimit: userProfile.planType === 'starter' ? 50 : userProfile.planType === 'pro' ? 999999 : 10
  };

  // Real billing data
  const getBillingInfo = () => {
    const plan = userData.plan;
    if (plan === 'free') {
      return {
        amount: '$0.00',
        interval: 'forever',
        nextBilling: null,
        method: null,
        status: 'active'
      };
    }
    
    const prices: { [key: string]: number } = { starter: 9, pro: 32 };
    const nextBilling = new Date();
    nextBilling.setMonth(nextBilling.getMonth() + 1);
    
    return {
      amount: `$${prices[plan] || 0}.00`,
      interval: 'monthly',
      nextBilling: nextBilling.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      method: (userProfile as any).paymentMethod || null,
      status: (userProfile as any).subscriptionStatus || 'active'
    };
  };

  const billing = getBillingInfo();

  // Plan features
  const getPlanFeatures = () => {
    const features: { [key: string]: string[] } = {
      free: ['10 prompts daily', 'All AI platforms', 'Basic optimization'],
      starter: ['50 prompts daily', 'All AI platforms', 'Auto-optimize', 'Project memory', 'Style learning', 'Broadcasting'],
      pro: ['Unlimited prompts', 'All AI platforms', 'Auto-optimize', 'Project memory', 'AI chat enhancement', 'Advanced style learning', 'Team broadcasting', 'Platform detective']
    };
    return features[userData.plan] || features.free;
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'usage', name: 'Usage', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const handleSaveProfile = async () => {
    // TODO: Implement profile update
    setIsEditingProfile(false);
  };

  const usagePercentage = (userData.promptsUsed / userData.promptsLimit) * 100;

  // Get all plans with current plan disabled
  const getAllPlans = () => {
    const allPlans = [
      { id: 'free', name: 'Free', price: '$0', features: ['10 prompts daily', 'All AI platforms', 'Basic optimization'] },
      { id: 'starter', name: 'Starter', price: '$9', features: ['50 prompts daily', 'All AI platforms', 'Auto-optimize', 'Project memory', 'Style learning', 'Broadcasting'] },
      { id: 'pro', name: 'Pro', price: '$32', features: ['Unlimited prompts', 'All AI platforms', 'Auto-optimize', 'Project memory', 'AI chat enhancement', 'Advanced style learning', 'Team broadcasting', 'Platform detective'], disabled: true, comingSoon: true }
    ];
    
    // Mark current plan as disabled and current
    return allPlans.map(plan => ({
      ...plan,
      isCurrent: plan.id === userData.plan,
      disabled: plan.id === userData.plan || plan.comingSoon
    }));
  };

  const handlePlanChange = (planId: string) => {
    // TODO: Implement plan change logic
    console.log(`Changing from ${userData.plan} to ${planId}`);
    // This would redirect to checkout or handle the plan change
    window.location.href = `/payment/checkout?plan=${planId}&current=${userData.plan}`;
  };

  return (
    <main className="min-h-screen text-white relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.3]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      <div className="relative z-40">
        {/* Header */}
        <div className="px-4 pt-32 pb-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="flex flex-col md:flex-row md:items-center gap-6 mb-8"
            >
              <div className="flex items-center gap-4">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="w-16 h-16 rounded-xl object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center border-2 border-white/20">
                    <span className="text-white font-bold text-xl">
                      {userData.name[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Hey {userData.firstName || userData.name.split(' ')[0] || 'there'}! 👋
                  </h1>
                  <p className="text-gray-400">Manage your Promptability account</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex-1 grid grid-cols-2 gap-4 md:max-w-md md:ml-auto">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white">{userData.promptsUsed}</div>
                  <div className="text-xs text-gray-400">Prompts Used</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white capitalize">{userData.plan}</div>
                  <div className="text-xs text-gray-400">Plan</div>
                </div>
              </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="flex space-x-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1 mb-8 overflow-x-auto"
            >
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-white/15 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </motion.div>

            {/* Tab Content */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Main Stats */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Usage Overview */}
                    <motion.div
                      variants={glassCard}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Daily Usage
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Prompts Used Today</span>
                          <span className="text-white font-medium">{userData.promptsUsed} / {userData.promptsLimit}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${
                              usagePercentage > 80 ? 'bg-red-500' : usagePercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                          />
                        </div>
                        <div className="text-sm text-gray-400">
                          {userData.promptsLimit - userData.promptsUsed} prompts remaining today
                        </div>
                      </div>
                    </motion.div>

                    {/* Extension Status */}
                    <motion.div
                      variants={glassCard}
                      className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-2xl p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Chrome Extension
                          </h3>
                          <p className="text-gray-300 text-sm mb-4">
                            Get instant prompt optimization while browsing
                          </p>
                        </div>
                        <Link
                          href="/chrome-extension"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Install
                        </Link>
                      </div>
                    </motion.div>
                  </div>

                  {/* Profile Card */}
                  <div className="space-y-6">
                    <motion.div
                      variants={glassCard}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <div className="text-center mb-6">
                        {userData.avatar ? (
                          <img
                            src={userData.avatar}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-white/20"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/20">
                            <span className="text-white font-bold text-2xl">
                              {userData.name[0]?.toUpperCase() || 'U'}
                            </span>
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-white">{userData.name}</h3>
                        <p className="text-gray-400 text-sm">{userData.email}</p>
                        <div className="mt-3 flex items-center justify-center gap-2">
                          <Crown className={`w-4 h-4 ${userData.plan === 'free' ? 'text-gray-400' : 'text-yellow-400'}`} />
                          <span className={`text-sm font-medium capitalize ${userData.plan === 'free' ? 'text-gray-400' : 'text-yellow-400'}`}>
                            {userData.plan} Plan
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="text-center text-gray-400 text-xs">Member since {userData.joinDate}</div>
                      </div>

                      <button
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    </motion.div>

                    {/* Current Plan */}
                    <motion.div
                      variants={glassCard}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h3 className="text-lg font-bold text-white mb-4">Current Plan</h3>
                      <div className="space-y-3">
                        {getPlanFeatures().map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 space-y-3">
                        <h4 className="text-white font-medium text-sm">Switch Plan</h4>
                        {getAllPlans().map((plan) => (
                          <button
                            key={plan.id}
                            onClick={() => !plan.disabled && handlePlanChange(plan.id)}
                            disabled={plan.disabled}
                            className={`w-full p-3 rounded-lg border transition-all text-left ${
                              plan.isCurrent
                                ? 'bg-blue-500/20 border-blue-400/50 text-blue-400'
                                : plan.disabled
                                ? 'bg-gray-500/10 border-gray-500/30 text-gray-500 cursor-not-allowed'
                                : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{plan.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold">{plan.price}</span>
                                {plan.isCurrent && (
                                  <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded">
                                    Current
                                  </span>
                                )}
                                {plan.comingSoon && (
                                  <span className="text-xs bg-gray-500/30 text-gray-400 px-2 py-1 rounded">
                                    Coming Soon
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-xs opacity-75">
                              {plan.features.slice(0, 2).join(' • ')}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="max-w-4xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Current Subscription */}
                    <motion.div
                      variants={glassCard}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Current Subscription
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Plan</span>
                          <span className="text-white font-medium capitalize">{userData.plan}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Amount</span>
                          <span className="text-white font-medium">{billing.amount}</span>
                        </div>
                        {billing.nextBilling && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Next billing</span>
                            <span className="text-white font-medium">{billing.nextBilling}</span>
                          </div>
                        )}
                      </div>
                      
                      {userData.plan !== 'free' && (
                        <div className="mt-6 space-y-3">
                          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                            Manage Subscription
                          </button>
                          <Link
                            href="/pricing"
                            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center"
                          >
                            Change Plan
                          </Link>
                        </div>
                      )}
                    </motion.div>

                    {/* Payment Method */}
                    <motion.div
                      variants={glassCard}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                    >
                      <h3 className="text-xl font-bold text-white mb-4">Payment Method</h3>
                      {userData.plan === 'free' ? (
                        <div className="text-center py-8">
                          <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-400 mb-4">No payment method required for free plan</p>
                          <Link
                            href="/pricing"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors inline-flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Upgrade to add payment
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <CreditCard className="w-6 h-6 text-blue-400" />
                              <div>
                                <div className="text-white font-medium">•••• •••• •••• 4242</div>
                                <div className="text-gray-400 text-sm">Expires 12/25</div>
                              </div>
                            </div>
                          </div>
                          <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all">
                            Update Payment Method
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Invoice History */}
                  <motion.div
                    variants={glassCard}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mt-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Invoice History
                    </h3>
                    {userData.plan === 'free' ? (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No invoices yet - you're on the free plan!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-gray-400 text-sm">Your invoice history will appear here once available.</div>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* Usage Tab */}
              {activeTab === 'usage' && (
                <motion.div
                  variants={glassCard}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Usage Statistics
                  </h3>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-2">Detailed usage analytics coming soon</p>
                    <p className="text-gray-500 text-sm">Track your prompt optimization patterns and performance</p>
                  </div>
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="max-w-4xl space-y-6">
                  {/* Profile Settings */}
                  <motion.div
                    variants={glassCard}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Profile Settings</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                          <input
                            type="text"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            disabled={!isEditingProfile}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                          <input
                            type="text"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            disabled={!isEditingProfile}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none opacity-50"
                          disabled
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                      </div>
                      
                      {isEditingProfile && (
                        <div className="flex gap-3 pt-4">
                          <button 
                            onClick={handleSaveProfile}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => setIsEditingProfile(false)}
                            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      
                      {!isEditingProfile && (
                        <button
                          onClick={() => setIsEditingProfile(true)}
                          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-6 py-2 rounded-lg transition-all flex items-center gap-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </motion.div>

                  {/* Danger Zone */}
                  <motion.div
                    variants={glassCard}
                    className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Danger Zone
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Delete Account</h4>
                        <p className="text-gray-400 text-sm mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <button className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}