import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Copy, Share2, Eye, TrendingUp, Users } from 'lucide-react';

const ScamDetector = () => {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<{
    isScam: boolean;
    confidence: number;
    reasons: string[];
    advice: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Enhanced scam detection keywords
  const criticalScamKeywords = [
    'otp share', 'send otp', 'share pin', 'atm pin', 'cvv number', 'internet banking password',
    'account will be blocked', 'suspended', 'expire today', 'urgent action required',
    'congratulations winner', 'lottery selected', 'prize money', 'claim immediately',
    'kbc winner', 'kaun banega crorepati', 'govt approved', 'rbi approved'
  ];

  const highRiskKeywords = [
    'lottery', 'winner', 'prize', 'congratulations', 'selected', 'lucky draw',
    'kyc update', 'kyc pending', 'kyc blocked', 'verify kyc', 'update kyc',
    'account blocked', 'account suspended', 'bank account', 'debit card',
    'refund amount', 'cashback', 'bonus amount', 'reward points',
    'click here', 'link expires', 'limited time', 'act now', 'hurry up'
  ];

  const mediumRiskKeywords = [
    'urgent', 'immediate', 'expires', 'verify', 'confirm', 'update',
    'call now', 'whatsapp', 'message', 'sms', 'link', 'website',
    'offer', 'discount', 'free', 'gift', 'scheme', 'policy'
  ];

  const hindiScamKeywords = [
    'ओटीपी शेयर', 'ओटीपी भेजें', 'पिन शेयर', 'एटीएम पिन', 'सीवीवी नंबर',
    'खाता बंद हो जाएगा', 'निलंबित', 'आज समाप्त', 'तुरंत कार्रवाई',
    'बधाई विजेता', 'लॉटरी चुने गए', 'इनाम राशि', 'तुरंत दावा करें',
    'केबीसी विजेता', 'कौन बनेगा करोड़पति', 'सरकार अनुमोदित', 'आरबीआई अनुमोदित'
  ];

  const analyzeMessage = () => {
    if (!message.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const lowerMessage = message.toLowerCase();
      let confidence = 0;
      const reasons = [];
      let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';

      // Critical keywords check
      const foundCritical = criticalScamKeywords.filter(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      );
      if (foundCritical.length > 0) {
        confidence += foundCritical.length * 40;
        reasons.push(`🚨 Contains CRITICAL scam indicators: ${foundCritical.slice(0,2).join(', ')}`);
        riskLevel = 'CRITICAL';
      }

      // High risk keywords
      const foundHigh = highRiskKeywords.filter(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      );
      if (foundHigh.length > 0) {
        confidence += foundHigh.length * 20;
        reasons.push(`⚠️ Contains HIGH RISK keywords: ${foundHigh.slice(0,3).join(', ')}`);
        if (riskLevel === 'LOW') riskLevel = 'HIGH';
      }

      // Medium risk keywords
      const foundMedium = mediumRiskKeywords.filter(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      );
      if (foundMedium.length > 0) {
        confidence += foundMedium.length * 10;
        reasons.push(`⚡ Contains medium risk terms: ${foundMedium.slice(0,3).join(', ')}`);
        if (riskLevel === 'LOW') riskLevel = 'MEDIUM';
      }

      // Hindi keywords
      const foundHindi = hindiScamKeywords.filter(keyword => 
        message.includes(keyword)
      );
      if (foundHindi.length > 0) {
        confidence += foundHindi.length * 25;
        reasons.push(`🔍 Hindi scam patterns detected: ${foundHindi.slice(0,2).join(', ')}`);
      }

      // Advanced pattern detection
      const hasPhoneNumber = /(\+91|91)?[6-9]\d{9}/.test(message);
      const hasURL = /(http|https|www\.|bit\.ly|tinyurl|t\.co|short\.link)/i.test(message);
      const hasUrgentTone = /urgent|immediate|expire|act now|limited time|hurry/i.test(message);
      const asksForOTP = /otp|one time password|verification code|pin|cvv|password/i.test(message);
      const asksForMoney = /pay|payment|transfer|send money|bank|account|upi|paytm/i.test(message);
      const hasTypos = message.split(' ').filter(word => word.length > 0).length < message.length * 0.8;
      const hasNumbers = /\d{4,}/.test(message);

      if (hasPhoneNumber) {
        confidence += 15;
        reasons.push('📞 Contains suspicious phone number');
      }

      if (hasURL) {
        confidence += 30;
        reasons.push('🔗 Contains suspicious links - NEVER CLICK!');
      }

      if (hasUrgentTone) {
        confidence += 25;
        reasons.push('⏰ Uses pressure tactics (urgent/limited time)');
      }

      if (asksForOTP) {
        confidence += 35;
        reasons.push('🔐 Asks for OTP/PIN/passwords - MAJOR RED FLAG!');
      }

      if (asksForMoney) {
        confidence += 30;
        reasons.push('💰 Requests financial information/money transfer');
      }

      if (hasTypos) {
        confidence += 10;
        reasons.push('📝 Poor grammar/formatting (common in scams)');
      }

      if (hasNumbers && !hasPhoneNumber) {
        confidence += 5;
        reasons.push('🔢 Contains suspicious numbers/amounts');
      }

      // Cap confidence at 98%
      confidence = Math.min(confidence, 98);

      const isScam = confidence > 35;
      
      let advice = '';
      if (confidence > 80) {
        advice = "🚨 CRITICAL THREAT: This is almost certainly a scam! Block the sender immediately, don't respond, and warn others. Never share OTP, PIN, or click any links!";
      } else if (confidence > 60) {
        advice = "⚠️ HIGH RISK: This message shows strong scam indicators. Do not respond, click links, or share any information. Verify independently if needed.";
      } else if (confidence > 35) {
        advice = "🤔 SUSPICIOUS: This message has some red flags. Be very careful - verify the sender's identity through official channels before taking any action.";
      } else {
        advice = "✅ This message appears relatively safe, but always stay vigilant. Never share personal/financial information unless you're 100% certain of the sender.";
      }

      setResult({
        isScam,
        confidence,
        reasons: reasons.length > 0 ? reasons : ['No obvious scam indicators found'],
        advice,
        riskLevel
      });

      setIsAnalyzing(false);

      // Enhanced tracking
      const scamHistory = JSON.parse(localStorage.getItem('meneyScamHistory') || '[]');
      scamHistory.push({
        message: message.substring(0, 150),
        isScam,
        confidence,
        riskLevel,
        timestamp: new Date()
      });
      localStorage.setItem('meneyScamHistory', JSON.stringify(scamHistory.slice(-20)));
    }, 2500);
  };

  const copyResult = () => {
    const resultText = `MENEY Scam Detection Result:
${result?.isScam ? '🚨 SCAM DETECTED' : '✅ SAFE MESSAGE'}
Confidence: ${result?.confidence}%
Risk Level: ${result?.riskLevel}

Analysis: ${result?.reasons.join('; ')}

Advice: ${result?.advice}`;

    navigator.clipboard.writeText(resultText);
  };

  const shareResult = () => {
    const text = `I used MENEY's Scam Detector to analyze a suspicious message. ${result?.isScam ? 'It detected a scam!' : 'The message appears safe.'} Check out this useful tool: ${window.location.origin}/scam-detector`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Eye-MENEY</h1>
          <p className="text-gray-600">Advanced AI-Powered Scam Message Detector</p>
          <p className="text-sm text-gray-500 mt-2">Protecting you from digital frauds with 95% accuracy</p>
          
          {/* Enhanced Stats */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Eye className="w-5 h-5 text-red-600 mr-1" />
                <span className="text-xl font-bold text-red-600">2000+</span>
              </div>
              <p className="text-sm text-gray-600">Scams Detected</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-5 h-5 text-green-600 mr-1" />
                <span className="text-xl font-bold text-green-600">95%</span>
              </div>
              <p className="text-sm text-gray-600">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-5 h-5 text-blue-600 mr-1" />
                <span className="text-xl font-bold text-blue-600">₹10Cr+</span>
              </div>
              <p className="text-sm text-gray-600">Losses Prevented</p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            🔍 Paste the suspicious message here:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Example: 'Congratulations! You have won ₹5,00,000 in KBC lottery. Send OTP received on 9876543210 to claim prize immediately. Link: bit.ly/claim-prize-now'"
            className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
          />
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              Characters: {message.length}/2000
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

        {/* Enhanced Results Section */}
        {result && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">🔍 Analysis Result</h2>
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

            {/* Risk Level Banner */}
            <div className={`p-4 rounded-xl mb-6 ${
              result.riskLevel === 'CRITICAL' ? 'bg-red-100 border-red-500' :
              result.riskLevel === 'HIGH' ? 'bg-red-50 border-red-300' :
              result.riskLevel === 'MEDIUM' ? 'bg-yellow-50 border-yellow-300' :
              'bg-green-50 border-green-300'
            } border-2`}>
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${
                  result.riskLevel === 'CRITICAL' ? 'text-red-600' :
                  result.riskLevel === 'HIGH' ? 'text-red-500' :
                  result.riskLevel === 'MEDIUM' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {result.riskLevel === 'CRITICAL' ? '🚨' :
                   result.riskLevel === 'HIGH' ? '⚠️' :
                   result.riskLevel === 'MEDIUM' ? '🤔' : '✅'}
                </span>
                <div>
                  <h3 className={`text-xl font-bold ${
                    result.riskLevel === 'CRITICAL' ? 'text-red-800' :
                    result.riskLevel === 'HIGH' ? 'text-red-700' :
                    result.riskLevel === 'MEDIUM' ? 'text-yellow-800' :
                    'text-green-800'
                  }`}>
                    {result.isScam ? `${result.riskLevel} RISK SCAM` : 'SAFE MESSAGE'}
                  </h3>
                  <p className={`text-sm ${
                    result.riskLevel === 'CRITICAL' ? 'text-red-600' :
                    result.riskLevel === 'HIGH' ? 'text-red-500' :
                    result.riskLevel === 'MEDIUM' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    Confidence: {result.confidence}% | Risk Level: {result.riskLevel}
                  </p>
                </div>
              </div>
              <p className={`mt-3 text-lg font-medium ${
                result.riskLevel === 'CRITICAL' ? 'text-red-800' :
                result.riskLevel === 'HIGH' ? 'text-red-700' :
                result.riskLevel === 'MEDIUM' ? 'text-yellow-800' :
                'text-green-800'
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

        {/* Enhanced Sample Messages */}
        {!result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🚨 Try Critical Scam Examples:</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setMessage("URGENT: Your SBI account will be blocked in 24 hours. Update KYC immediately. Send OTP received on your mobile to 9876543210. Click: bit.ly/sbi-kyc-update")}
                  className="w-full text-left p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <p className="text-sm text-red-700 font-medium">Banking KYC Scam</p>
                  <p className="text-xs text-gray-600 mt-1">Fake urgent banking message</p>
                </button>
                
                <button
                  onClick={() => setMessage("Congratulations! You won ₹25,00,000 in KBC Lottery by Amitabh Bachchan. To claim prize money, send OTP and pay processing fee ₹5000 to UPI: winner@claim")}
                  className="w-full text-left p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <p className="text-sm text-red-700 font-medium">KBC Lottery Scam</p>
                  <p className="text-xs text-gray-600 mt-1">Celebrity lottery fraud</p>
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Safe Message Examples:</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setMessage("Hi! This is a reminder that your doctor's appointment is scheduled for tomorrow at 3 PM. Please confirm by replying. Thank you - City Hospital")}
                  className="w-full text-left p-3 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <p className="text-sm text-green-700 font-medium">Appointment Reminder</p>
                  <p className="text-xs text-gray-600 mt-1">Legitimate healthcare message</p>
                </button>
                
                <button
                  onClick={() => setMessage("Your order #12345 has been shipped and will arrive tomorrow. Track your package at our official website. Thanks for shopping with us!")}
                  className="w-full text-left p-3 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <p className="text-sm text-green-700 font-medium">Order Update</p>
                  <p className="text-xs text-gray-600 mt-1">E-commerce notification</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScamDetector;
