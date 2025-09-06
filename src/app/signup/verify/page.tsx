'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Check, RefreshCw, ArrowLeft, Clock, Shield
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [email] = useState('user@example.com'); // This would come from props/params
  const [isChecking, setIsChecking] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    // Simulate checking verification status
    const checkTimer = setTimeout(() => {
      setIsChecking(false);
    }, 3000);

    return () => clearTimeout(checkTimer);
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResend = () => {
    setResendCooldown(60);
    // Resend logic here
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
        

        {/* Main Content */}
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center"
            >
              {/* Email Icon Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-6 flex justify-center"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-blue-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center">
                    <Mail className="w-10 h-10 text-blue-400" />
                  </div>
                  {isChecking && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <RefreshCw className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                  {isVerified && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Status Content */}
              {isChecking ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6"
                >
                  <h1 className="text-2xl font-bold text-white mb-3">
                    Checking Verification...
                  </h1>
                  <p className="text-gray-300 mb-4">
                    We're checking if you've verified your email
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-blue-400">
                    <Clock className="w-4 h-4 animate-pulse" />
                    <span>This may take a few seconds</span>
                  </div>
                </motion.div>
              ) : isVerified ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <h1 className="text-2xl font-bold text-green-400 mb-3">
                    Email Verified!
                  </h1>
                  <p className="text-gray-300 mb-6">
                    Your account has been successfully activated
                  </p>
                  <Link
                    href="/signup/onboarding"
                    className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Continue to Setup
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <h1 className="text-2xl font-bold text-white mb-3">
                    Check Your Email
                  </h1>
                  <p className="text-gray-300 mb-2">
                    We sent a verification link to
                  </p>
                  <p className="text-blue-400 font-semibold mb-4">
                    {email}
                  </p>
                  <p className="text-sm text-gray-400">
                    Click the link in your email to activate your account
                  </p>
                </motion.div>
              )}

              {/* Actions */}
              {!isChecking && !isVerified && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <button
                    onClick={handleResend}
                    disabled={resendCooldown > 0}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {resendCooldown > 0 ? (
                      `Resend in ${resendCooldown}s`
                    ) : (
                      'Resend Email'
                    )}
                  </button>
                  
                  <div className="flex justify-center gap-4 text-sm">
                    <Link href="/signup" className="text-blue-400 hover:text-blue-300 underline">
                      Change Email
                    </Link>
                    <Link href="/signin" className="text-gray-400 hover:text-white underline">
                      Back to Sign In
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Security Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-6 border-t border-white/10"
              >
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>Email verification helps keep your account secure</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}