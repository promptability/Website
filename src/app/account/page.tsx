'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  User, Settings, CreditCard, BarChart3, Download, Crown, 
  Calendar, Zap, ArrowUpRight, CheckCircle, XCircle, Edit3,
  Mail, Shield, Bell, Trash2, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { fadeInUp, staggerContainer, glassCard } from '@/lib/animations';
import UsageDashboard from '@/components/UsageDashboard';

export default function AccountPage() {
  const { user, userProfile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    marketing: false
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-xl">Loading...</div>
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

  // Use actual user data from Firebase
  const userData = {
    name: userProfile.displayName || `${userProfile.firstName} ${userProfile.lastName}` || 'User',
    email: userProfile.email,
    avatar: user.photoURL || null,
    joinDate: userProfile.createdAt?.toDate().toLocaleDateString() || 'Recently',
    plan: 'Pro', // TODO: Get from subscription data
    status: 'Active' // TODO: Get from subscription data
  };


  const billing = {
    nextBilling: 'March 15, 2025',
    amount: '$32.00',
    method: '•••• •••• •••• 4242',
    status: 'Active'
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'usage', name: 'Usage', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

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
        <div className="px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Account Settings</h1>
                <p className="text-gray-400">Manage your subscription and preferences</p>
              </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="flex space-x-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1 mb-8"
            >
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
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
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <>
                  {/* Profile Card */}
                  <motion.div
                    variants={glassCard}
                    initial="initial"
                    animate="animate"
                    className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                  >
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{userData.name}</h3>
                      <p className="text-gray-400">{userData.email}</p>
                      <div className="mt-3 flex items-center justify-center gap-2">
                        <div className="flex items-center gap-1">
                          <Crown className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium text-yellow-400">{userData.plan} Plan</span>
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-green-400">{userData.status}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </motion.div>

                  {/* Quick Actions & Extension */}
                  <motion.div
                    variants={glassCard}
                    initial="initial"
                    animate="animate"
                    className="lg:col-span-2 space-y-6"
                  >
                    {/* Extension Download */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">Chrome Extension</h3>
                          <p className="text-gray-300 text-sm">Get instant prompt optimization while browsing</p>
                        </div>
                        <Link
                          href="/chrome-extension"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Current Plan */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Current Plan</h3>
                        <Link
                          href="/pricing"
                          className="text-blue-400 hover:text-blue-300 text-sm underline flex items-center gap-1"
                        >
                          Change Plan
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                      <div className="flex items-center gap-3">
                        <Crown className="w-6 h-6 text-yellow-400" />
                        <div>
                          <div className="text-white font-semibold">{userData.plan} Plan</div>
                          <div className="text-gray-400 text-sm">Unlimited prompts • Advanced features</div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-5 h-5 text-blue-400" />
                          <span className="text-sm text-gray-400">This Month</span>
                        </div>
                        <div className="text-2xl font-bold text-white">-</div>
                        <div className="text-xs text-gray-400">Prompts Optimized</div>
                      </div>
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-green-400" />
                          <span className="text-sm text-gray-400">Member Since</span>
                        </div>
                        <div className="text-lg font-bold text-white">{userData.joinDate}</div>
                        <div className="text-xs text-gray-400">Welcome!</div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <>
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="lg:col-span-3 space-y-6"
                >
                  {/* Current Subscription */}
                  <motion.div
                    variants={glassCard}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Current Subscription</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Crown className="w-6 h-6 text-yellow-400" />
                          <div>
                            <div className="text-lg font-semibold text-white">{userData.plan} Plan</div>
                            <div className="text-sm text-gray-400">{billing.amount}/month</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400">Active Subscription</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Next billing date</div>
                        <div className="text-lg font-semibold text-white">{billing.nextBilling}</div>
                        <div className="text-sm text-gray-400 mt-2">Payment method: {billing.method}</div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                      <button 
                        onClick={async () => {
                          const response = await fetch('/api/create-portal-session', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                              userId: user.uid,
                              email: userProfile.email 
                            }),
                          });
                          const { url } = await response.json();
                          if (url) window.location.href = url;
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                        Manage Subscription
                      </button>
                      <Link
                        href="/pricing"
                        className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        Change Plan
                      </Link>
                    </div>
                  </motion.div>

                  {/* Billing History */}
                  <motion.div
                    variants={glassCard}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Billing History</h3>
                    <div className="space-y-4">
                      {[
                        { date: 'Feb 15, 2025', amount: '$32.00', status: 'Paid', invoice: 'INV-001' },
                        { date: 'Jan 15, 2025', amount: '$32.00', status: 'Paid', invoice: 'INV-002' },
                        { date: 'Dec 15, 2024', amount: '$32.00', status: 'Paid', invoice: 'INV-003' }
                      ].map((payment, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                          <div>
                            <div className="text-white font-medium">{payment.date}</div>
                            <div className="text-sm text-gray-400">{payment.invoice}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">{payment.amount}</div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              <span className="text-xs text-green-400">{payment.status}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Cancel Subscription */}
                  <motion.div
                    variants={glassCard}
                    className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6"
                  >
                    <h3 className="text-lg font-bold text-white mb-2">Cancel Subscription</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      You can cancel anytime. Your plan will remain active until your next billing date.
                    </p>
                    <button className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-medium px-4 py-2 rounded-lg transition-colors">
                      Cancel Subscription
                    </button>
                  </motion.div>
                </motion.div>
                </>
              )}

              {/* Usage Tab */}
              {activeTab === 'usage' && (
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="lg:col-span-3"
                >
                  <UsageDashboard />
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <>
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="lg:col-span-3 space-y-6"
                >
                  {/* Profile Settings */}
                  <motion.div
                    variants={glassCard}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Profile Settings</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                          <input
                            type="text"
                            value={userData.name}
                            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            disabled={!isEditingProfile}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                          <input
                            type="email"
                            value={userData.email}
                            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            disabled={!isEditingProfile}
                          />
                        </div>
                      </div>
                      {isEditingProfile && (
                        <div className="flex gap-3">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                            Save Changes
                          </button>
                          <button
                            onClick={() => setIsEditingProfile(false)}
                            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Notifications */}
                  <motion.div
                    variants={glassCard}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'email', label: 'Email notifications', description: 'Get updates about your account and usage' },
                        { key: 'browser', label: 'Browser notifications', description: 'Desktop notifications for optimization results' },
                        { key: 'marketing', label: 'Marketing emails', description: 'Product updates and tips' }
                      ].map((setting) => (
                        <div key={setting.key} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                          <div>
                            <div className="text-white font-medium">{setting.label}</div>
                            <div className="text-sm text-gray-400">{setting.description}</div>
                          </div>
                          <button
                            onClick={() => setNotifications(prev => ({
                              ...prev,
                              [setting.key]: !prev[setting.key as keyof typeof notifications]
                            }))}
                            className={`w-12 h-6 rounded-full border-2 transition-all relative ${
                              notifications[setting.key as keyof typeof notifications]
                                ? 'bg-blue-500 border-blue-500'
                                : 'bg-white/10 border-white/30'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${
                                notifications[setting.key as keyof typeof notifications]
                                  ? 'left-6'
                                  : 'left-0.5'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Danger Zone */}
                  <motion.div
                    variants={glassCard}
                    className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6"
                  >
                    <h3 className="text-lg font-bold text-white mb-4">Danger Zone</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">Delete Account</div>
                          <div className="text-sm text-gray-400">Permanently delete your account and all data</div>
                        </div>
                        <button className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}