'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Code, Copy, Check, Key, Zap, Shield, 
  ExternalLink, ArrowRight, Terminal, BookOpen, Play,
  CheckCircle, XCircle
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import Link from 'next/link';

export default function APIDocsPage() {
  const [activeTab, setActiveTab] = useState('javascript');
  const [copiedCode, setCopiedCode] = useState('');

  const codeExamples = {
    javascript: `// Initialize Promptability API
const promptability = new PromptabilityAPI({
  apiKey: 'your-api-key-here',
  baseURL: 'https://api.promptability.ai/v1'
});

// Optimize a prompt
const response = await promptability.optimize({
  prompt: "Write me an email",
  context: "Professional follow-up",
  platform: "chatgpt",
  style: "concise"
});

console.log(response.optimizedPrompt);`,
    
    python: `import promptability

# Initialize client
client = promptability.Client(
    api_key="your-api-key-here",
    base_url="https://api.promptability.ai/v1"
)

# Optimize a prompt
response = client.optimize(
    prompt="Write me an email",
    context="Professional follow-up", 
    platform="chatgpt",
    style="concise"
)

print(response.optimized_prompt)`,

    curl: `curl -X POST https://api.promptability.ai/v1/optimize \\
  -H "Authorization: Bearer your-api-key-here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Write me an email",
    "context": "Professional follow-up",
    "platform": "chatgpt", 
    "style": "concise"
  }'`
  };

  const endpoints = [
    {
      method: 'POST',
      path: '/optimize',
      description: 'Optimize a prompt using AI',
      params: [
        { name: 'prompt', type: 'string', required: true, description: 'The prompt to optimize' },
        { name: 'context', type: 'string', required: false, description: 'Additional context for optimization' },
        { name: 'platform', type: 'string', required: false, description: 'Target AI platform (chatgpt, claude, etc.)' },
        { name: 'style', type: 'string', required: false, description: 'Optimization style (concise, detailed, creative)' }
      ]
    },
    {
      method: 'GET',
      path: '/analyze',
      description: 'Analyze prompt effectiveness',
      params: [
        { name: 'prompt', type: 'string', required: true, description: 'The prompt to analyze' },
        { name: 'metrics', type: 'array', required: false, description: 'Specific metrics to return' }
      ]
    },
    {
      method: 'GET',
      path: '/history',
      description: 'Get optimization history',
      params: [
        { name: 'limit', type: 'number', required: false, description: 'Number of results (max 100)' },
        { name: 'offset', type: 'number', required: false, description: 'Pagination offset' },
        { name: 'filter', type: 'string', required: false, description: 'Filter by platform or date' }
      ]
    }
  ];

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
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
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <Link href="/docs" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Docs</span>
          </Link>
          <div className="text-xl font-bold">Promptability AI</div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          
          {/* Page Header */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center mb-12"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              API Documentation
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8"
            >
              Integrate Promptability AI into your applications and workflows
            </motion.p>

            {/* Quick Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">&lt; 200ms</div>
                <div className="text-sm text-gray-400">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10,000</div>
                <div className="text-sm text-gray-400">Requests/min</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Start */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Zap className="w-6 h-6 text-blue-400" />
                Quick Start
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">1. Get Your API Key</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Generate your API key from your account to authenticate requests.
                  </p>
                  <Link
                    href="/account"
                    className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all"
                  >
                    <Key className="w-4 h-4" />
                    Generate API Key
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">2. Make Your First Request</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Use our REST API to optimize prompts programmatically.
                  </p>
                  <div className="bg-black/40 border border-white/20 rounded-lg p-3 font-mono text-xs text-gray-300">
                    POST /v1/optimize
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Code Examples */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Code className="w-7 h-7 text-blue-400" />
              Code Examples
            </h2>
            
            {/* Language Tabs */}
            <div className="flex gap-1 mb-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    activeTab === lang
                      ? 'bg-white text-black shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {lang === 'curl' ? 'cURL' : lang}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="bg-black/60 border border-white/20 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400 capitalize">{activeTab} Example</span>
                </div>
                <button
                  onClick={() => copyToClipboard(codeExamples[activeTab as keyof typeof codeExamples], activeTab)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-all text-sm"
                >
                  {copiedCode === activeTab ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
                <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
              </pre>
            </div>
          </motion.div>

          {/* Endpoints */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">API Endpoints</h2>
            <div className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-white font-mono text-lg">{endpoint.path}</code>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{endpoint.description}</p>
                  
                  <h4 className="text-white font-semibold mb-3">Parameters:</h4>
                  <div className="space-y-2">
                    {endpoint.params.map((param, paramIndex) => (
                      <div key={paramIndex} className="bg-black/40 border border-white/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-blue-400 font-mono">{param.name}</code>
                          <span className="text-gray-400 text-xs">({param.type})</span>
                          {param.required && (
                            <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded">Required</span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm">{param.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Authentication */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-7 h-7 text-green-400" />
              Authentication
            </h2>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <p className="text-gray-300 mb-4">
                All API requests require authentication using a Bearer token. Include your API key in the Authorization header:
              </p>
              <div className="bg-black/60 border border-white/20 rounded-lg p-4 relative">
                <code className="text-gray-300 font-mono text-sm">
                  Authorization: Bearer your-api-key-here
                </code>
                <button
                  onClick={() => copyToClipboard('Authorization: Bearer your-api-key-here', 'auth')}
                  className="absolute top-2 right-2 p-2 bg-white/10 rounded hover:bg-white/20 transition-colors"
                >
                  {copiedCode === 'auth' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="bg-black/40 border border-white/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Rate Limits</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div>Free: 100 requests/hour</div>
                    <div>Starter: 1,000 requests/hour</div>
                    <div>Pro: 10,000 requests/hour</div>
                    <div>Team: Unlimited</div>
                  </div>
                </div>
                
                <div className="bg-black/40 border border-white/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Response Format</h4>
                  <div className="text-sm text-gray-300">
                    All responses are JSON formatted with consistent error handling and status codes.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Response Examples */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Response Examples</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Success Response */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Success Response
                </h3>
                <div className="bg-black/60 border border-green-500/30 rounded-lg p-4 relative">
                  <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "success": true,
  "data": {
    "optimizedPrompt": "Write a professional follow-up email to a client regarding project timeline delays. Include an apology, revised timeline, and proactive solutions. Tone: apologetic but confident. Length: 150-200 words.",
    "improvements": [
      "Added specific context",
      "Defined tone and length",
      "Included clear objectives"
    ],
    "confidence": 0.94,
    "estimatedImprovement": "85%"
  },
  "metadata": {
    "processingTime": "0.3s",
    "model": "promptability-v2"
  }
}`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify({
                      success: true,
                      data: {
                        optimizedPrompt: "Write a professional follow-up email...",
                        improvements: ["Added specific context", "Defined tone and length"],
                        confidence: 0.94
                      }
                    }, null, 2), 'success')}
                    className="absolute top-2 right-2 p-2 bg-white/10 rounded hover:bg-white/20 transition-colors"
                  >
                    {copiedCode === 'success' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Response */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  Error Response
                </h3>
                <div className="bg-black/60 border border-red-500/30 rounded-lg p-4 relative">
                  <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or expired",
    "details": {
      "suggestion": "Check your API key in account settings"
    }
  },
  "metadata": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_123456789"
  }
}`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard('{"success": false, "error": {"code": "INVALID_API_KEY"}}', 'error')}
                    className="absolute top-2 right-2 p-2 bg-white/10 rounded hover:bg-white/20 transition-colors"
                  >
                    {copiedCode === 'error' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Endpoints Detail */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Available Endpoints</h2>
            <div className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      endpoint.method === 'POST' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-white font-mono text-lg">{endpoint.path}</code>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{endpoint.description}</p>
                  
                  <h4 className="text-white font-semibold mb-4">Parameters:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-2 text-gray-400 text-sm">Name</th>
                          <th className="text-left py-2 text-gray-400 text-sm">Type</th>
                          <th className="text-left py-2 text-gray-400 text-sm">Required</th>
                          <th className="text-left py-2 text-gray-400 text-sm">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.params.map((param, paramIndex) => (
                          <tr key={paramIndex} className="border-b border-white/10">
                            <td className="py-3">
                              <code className="text-blue-400 font-mono text-sm">{param.name}</code>
                            </td>
                            <td className="py-3 text-gray-400 text-sm">{param.type}</td>
                            <td className="py-3">
                              {param.required ? (
                                <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded">Yes</span>
                              ) : (
                                <span className="bg-gray-500/20 text-gray-400 text-xs px-2 py-1 rounded">No</span>
                              )}
                            </td>
                            <td className="py-3 text-gray-300 text-sm">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            <Link
              href="/docs/api/sdks"
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <BookOpen className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">SDKs & Libraries</h3>
              <p className="text-gray-400 text-sm mb-3">Official libraries for popular languages</p>
              <div className="flex items-center gap-1 text-blue-400 text-sm">
                <span>Explore SDKs</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/docs/api/webhooks"
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <Zap className="w-8 h-8 text-yellow-400 mb-3" />
              <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">Webhooks</h3>
              <p className="text-gray-400 text-sm mb-3">Real-time notifications for your app</p>
              <div className="flex items-center gap-1 text-blue-400 text-sm">
                <span>Setup Webhooks</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link
              href="/docs/api/examples"
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <Play className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">Live Examples</h3>
              <p className="text-gray-400 text-sm mb-3">Interactive API playground and demos</p>
              <div className="flex items-center gap-1 text-blue-400 text-sm">
                <span>Try Examples</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}