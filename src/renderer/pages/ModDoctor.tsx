import React, { useState, useEffect } from 'react';
import { useErrorStore } from '@/store/errorStore';
import { Upload, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ModDoctor() {
  const { error, analysis, uploadError, analyzeError } = useErrorStore();
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const content = await file.text();
      await analyzeError(content);

      setChatMessages([
        ...chatMessages,
        {
          role: 'assistant',
          content: `I've analyzed your error log. ${analysis?.explanation || 'Let me help you troubleshoot.'}`,
        },
      ]);
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setChatMessages([...chatMessages, { role: 'user', content: userInput }]);
    setUserInput('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I understand your issue. Try disabling mods one by one to isolate the problem.',
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const getSeverityIcon = (severity?: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <Info className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-sims-dark via-purple-900 to-sims-dark text-white min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">🤖 Mod Doctor</h1>
        <p className="text-purple-200">AI-powered troubleshooting assistant</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Chat Area */}
        <div className="col-span-2">
          <div className="bg-purple-900 rounded-lg overflow-hidden flex flex-col h-[600px]">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-purple-300">
                  <div className="text-center">
                    <p className="text-lg mb-2">Upload an error log to get started</p>
                    <p className="text-sm">LastException.txt or Better Exceptions report</p>
                  </div>
                </div>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-sims-purple text-white'
                          : 'bg-purple-800 text-purple-100'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-purple-700 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask for help..."
                  className="flex-1 bg-purple-800 border border-purple-600 rounded-lg px-4 py-2 focus:outline-none focus:border-sims-purple"
                  disabled={loading}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-sims-purple hover:bg-purple-700 px-6 py-2 rounded-lg transition disabled:opacity-50"
                  disabled={loading}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Upload Area */}
          <div className="bg-purple-900 rounded-lg p-4 border-2 border-dashed border-purple-700">
            <label className="cursor-pointer block">
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-purple-400" />
                <span className="text-sm text-purple-200">Upload Error Log</span>
                <input
                  type="file"
                  accept=".txt,.log"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={loading}
                />
              </div>
            </label>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="bg-purple-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                {getSeverityIcon(analysis.severity)}
                <h3 className="font-semibold capitalize">{analysis.severity} Level</h3>
              </div>

              <div className="mb-3">
                <p className="text-sm text-purple-200 mb-2">Suggested Fixes:</p>
                <ul className="text-sm space-y-1">
                  {analysis.suggestedFixes.slice(0, 3).map((fix, idx) => (
                    <li key={idx} className="text-purple-100">
                      • {fix}
                    </li>
                  ))}
                </ul>
              </div>

              {analysis.relatedMods.length > 0 && (
                <div>
                  <p className="text-sm text-purple-200 mb-2">Related Mods:</p>
                  <div className="text-sm space-y-1">
                    {analysis.relatedMods.slice(0, 3).map((mod, idx) => (
                      <p key={idx} className="text-purple-100 truncate">
                        • {mod}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
