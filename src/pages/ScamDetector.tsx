
import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Copy, Share2 } from 'lucide-react';

const ScamDetector = () => {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<{
    isScam: boolean;
    confidence: number;
    reasons: string[];
    advice: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const scamKeywords = [
    'lottery', 'congratulations', 'winner', 'prize', 'urgent', 'immediate',
    'kyc', 'blocked', 'suspended', 'verify', 'click here', 'link expired',
    'send otp', 'share otp', 'bank details', 'account blocked', 'refund',
    'offer expires', 'limited time', 'act now', 'confirm identity',
    'update details', 'pay now', 'transfer money', 'cashback',
    'free gift', 'amazing offer', 'call immediately', 'whatsapp',
  ];

  const hindiScamKeywords = [
    'लॉटरी', 'बधाई', 'विजेता', 'इनाम', 'तुरंत', 'जल्दी',
    'केवाईसी', 'ब्लॉक', 'बंद', 'सत्यापित करें', 'यहाँ क्लिक करें',
    'ओटीपी भेजें', 'ओटीपी शेयर करें', 'बैंक विवरण', 'खाता बंद',
    'रिफंड', 'ऑफर समाप्त', 'सीमित समय', 'अभी करें',
    'पहचान की पुष्टि', 'विवरण अपडेट करें', 'अभी भुगतान करें',
    'पैसे ट्रांसफर करें', 'कैशबैक', 'मुफ्त उपहार', 'अद्भुत ऑफर',
    'तुरंत कॉल करें', 'व्हाट्सएप',
  ];

  const analyzeMessage = () => {
    if (!message.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const lowerMessage = message.toLowerCase();
      const allKeywords = [...scamKeywords, ...hindiScamKeywords];
      
      const foundKeywords = allKeywords.filter(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      );

      const hasPhoneNumber = /(\+91|91)?[6-9]\d{9}/.test(message);
      const hasURL = /(http|https|www\.|bit\.ly|tinyurl|t\.co)/i.test(message);
      const hasUrgentTone = /urgent|immediate|expire|act now|limited time/i.test(message);
      const asksForOTP = /otp|one time password|verification code/i.test(message);
      const asksForMoney = /pay|payment|transfer|send money|bank|account/i.test(message);

      let confidence = 0;
      const reasons = [];

      if (foundKeywords.length > 0) {
        confidence += foundKeywords.length * 15;
        reasons.push(`Contains ${foundKeywords.length} suspicious keywords: ${foundKeywords.slice(0, 3).join(', ')}`);
      }

      if (hasPhoneNumber) {
        confidence += 20;
        reasons.push('Contains phone number (unsolicited contact)');
      }

      if (hasURL) {
        confidence += 25;
        reasons.push('Contains suspicious links');
      }

      if (hasUrgentTone) {
        confidence += 20;
        reasons.push('Uses urgent/pressure tactics');
      }

      if (asksForOTP) {
        confidence += 30;
        reasons.push('Asks for OTP/verification codes');
      }

      if (asksForMoney) {
        confidence += 25;
        reasons.push('Requests money or financial information');
      }

      // Grammar and spelling errors (simple check)
      const words = message.split(' ');
      const shortWords = words.filter(word => word.length < 3).length;
      if (shortWords / words.length > 0.3) {
        confidence += 10;
        reasons.push('Poor grammar or formatting');
      }

      confidence = Math.min(confidence, 95);

      const isScam = confidence > 40;
      
      let advice = '';
      if (isScam) {
        advice = confidence > 70 
          ? "🚨 HIGH RISK: This is very likely a scam! Do not respond, click links, or share any information. Block the sender immediately."
          : "⚠️ SUSPICIOUS: This message shows signs of being a scam. Be very careful and verify independently before taking any action.";
      } else {
        advice = "✅ This message appears to be safe, but always stay vigilant and never share personal information unless you're certain of the sender's identity.";
      }

      setResult({
        isScam,
        confidence,
        reasons: reasons.length > 0 ? reasons : ['No obvious scam indicators found'],
        advice
      });

      setIsAnalyzing(false);

      // Save to localStorage for tracking
      const scamHistory = JSON.parse(localStorage.getItem('meneyScamHistory') || '[]');
      scamHistory.push({
        message: message.substring(0, 100),
        isScam,
        confidence,
        timestamp: new Date()
      });
      localStorage.setItem('meneyScamHistory', JSON.stringify(scamHistory.slice(-10))); // Keep last 10
    }, 2000);
  };

  const copyResult = () => {
    const resultText = `MENEY Scam Detection Result:
${result?.isScam ? '🚨 SCAM DETECTED' : '✅ SAFE MESSAGE'}
Confidence: ${result?.confidence}%

Analysis: ${result?.reasons.join('; ')}

Advice: ${result?.advice}`;

    navigator.clipboard.writeText(resultText);
  };

  const shareResult = () => {
    const text = `I used MENEY's Scam Detector to analyze a suspicious message. ${result?.isScam ? 'It detected a scam!' : 'The message appears safe.'} Check out this useful tool: ${window.location.origin}`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Eye-MENEY</h1>
          <p className="text-gray-600">AI-Powered Scam Message Detector</p>
          <p className="text-sm text-gray-500 mt-2">Protect yourself from fraud with instant message analysis</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Paste the suspicious message here:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Example: 'Congratulations! You have won ₹5,00,000 in lottery. Click here to claim your prize immediately. Send OTP to confirm.'"
            className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
          />
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              Characters: {message.length}/1000
            </span>
            <button
              onClick={analyzeMessage}
              disabled={!message.trim() || isAnalyzing}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl transition-colors flex items-center space-x-2"
            >
              <Shield className="w-5 h-5" />
              <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Message'}</span>
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Result</h2>
              <div className="flex space-x-2">
                <button
                  onClick={copyResult}
                  className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={shareResult}
                  className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Result */}
            <div className={`p-6 rounded-xl mb-6 ${
              result.isScam ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
            } border-2`}>
              <div className="flex items-center space-x-3 mb-4">
                {result.isScam ? (
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                )}
                <div>
                  <h3 className={`text-xl font-bold ${
                    result.isScam ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {result.isScam ? '🚨 SCAM DETECTED' : '✅ SAFE MESSAGE'}
                  </h3>
                  <p className={`text-sm ${
                    result.isScam ? 'text-red-600' : 'text-green-600'
                  }`}>
                    Confidence: {result.confidence}%
                  </p>
                </div>
              </div>

              <p className={`text-lg ${
                result.isScam ? 'text-red-800' : 'text-green-800'
              }`}>
                {result.advice}
              </p>
            </div>

            {/* Detailed Analysis */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Detection Reasons:</h4>
              <ul className="space-y-2">
                {result.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention Tips */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-900 mb-2">🛡️ Stay Safe Online:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Never share OTP, passwords, or bank details via SMS/calls</li>
                <li>• Banks never ask for sensitive information via messages</li>
                <li>• Verify suspicious messages by calling the official number</li>
                <li>• Be cautious of urgent/time-limited offers</li>
                <li>• When in doubt, don't click or respond</li>
              </ul>
            </div>
          </div>
        )}

        {/* Sample Messages */}
        {!result && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Try these sample messages:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setMessage("Congratulations! You have won ₹10,00,000 in KBC lottery. To claim prize send OTP received on your mobile. Hurry! Offer expires in 24 hours.")}
                className="text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                <p className="text-sm text-red-700 font-medium">🚨 Scam Example</p>
                <p className="text-xs text-gray-600 mt-1">Lottery/Prize scam with OTP request</p>
              </button>
              
              <button
                onClick={() => setMessage("Hi, this is a reminder that your appointment with Dr. Smith is scheduled for tomorrow at 3 PM. Please reply to confirm. Thank you!")}
                className="text-left p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
              >
                <p className="text-sm text-green-700 font-medium">✅ Safe Example</p>
                <p className="text-xs text-gray-600 mt-1">Legitimate appointment reminder</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScamDetector;
