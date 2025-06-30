import React, { useState, useEffect } from 'react';
import { Bot, Send, Languages, Calculator, FileText, TrendingUp } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface UserProfile {
  income: string;
  hasInvestments: boolean;
  hasLoans: boolean;
  age: string;
  hasHRA: boolean;
  hasNPS: boolean;
  hasHealthInsurance: boolean;
}

const TaxAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [language, setLanguage] = useState('en');
  const [step, setStep] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    income: '',
    hasInvestments: false,
    hasLoans: false,
    age: '',
    hasHRA: false,
    hasNPS: false,
    hasHealthInsurance: false,
  });

  const translations = {
    en: {
      title: 'TaxMENEY - AI Tax Assistant',
      subtitle: 'Get personalized Indian tax advice in simple terms',
      placeholder: 'Type your response here...',
      send: 'Send',
      welcome: 'Hey there! 👋 I\'m your personal Tax Assistant. I know the Indian tax system inside out and I\'m here to help you save money legally! Let\'s start with some quick questions.',
      incomeQuestion: 'First things first - what\'s your annual income range?\n\n1. Under ₹2.5 Lakhs (No tax! 🎉)\n2. ₹2.5L - ₹5L (5% tax bracket)\n3. ₹5L - ₹10L (20% tax bracket)\n4. ₹10L - ₹12.5L (20% bracket)\n5. ₹12.5L - ₹15L (30% bracket)\n6. Above ₹15L (30% bracket)',
      ageQuestion: 'Got it! Now, are you:\n\n1. Below 60 years (Regular taxpayer)\n2. 60-80 years (Senior citizen - higher exemptions!)\n3. Above 80 years (Super senior - even better exemptions!)',
      investmentQuestion: 'Perfect! Now let me understand your current investments and benefits:\n\nDo you have any of these? (Just type yes/no for each)\n• 80C investments (PPF, ELSS, Life Insurance)?\n• HRA (House Rent Allowance)?\n• NPS (National Pension Scheme)?\n• Health Insurance?',
    },
    hi: {
      title: 'TaxMENEY - AI टैक्स सहायक',
      subtitle: 'सरल भाषा में व्यक्तिगत भारतीय टैक्स सलाह पाएं',
      placeholder: 'यहाँ अपना जवाब लिखें...',
      send: 'भेजें',
      welcome: 'नमस्ते! 👋 मैं आपका व्यक्तिगत टैक्स सहायक हूँ। मुझे भारतीय टैक्स सिस्टम की पूरी जानकारी है और मैं यहाँ आपका पैसा कानूनी तरीके से बचाने में मदद करूंगा!',
      incomeQuestion: 'पहले बताइए - आपकी सालाना आय कितनी है?\n\n1. ₹2.5 लाख से कम (कोई टैक्स नहीं! 🎉)\n2. ₹2.5L - ₹5L (5% टैक्स)\n3. ₹5L - ₹10L (20% टैक्स)\n4. ₹10L - ₹12.5L (20% टैक्स)\n5. ₹12.5L - ₹15L (30% टैक्स)\n6. ₹15L से ज्यादा (30% टैक्स)',
      ageQuestion: 'समझ गया! अब बताइए आपकी उम्र:\n\n1. 60 साल से कम (सामान्य करदाता)\n2. 60-80 साल (वरिष्ठ नागरिक - ज्यादा छूट!)\n3. 80 साल से ज्यादा (अति वरिष्ठ - और भी ज्यादा छूट!)',
      investmentQuestion: 'बहुत बढ़िया! अब बताइए क्या आपके पास ये हैं? (हर एक के लिए हाँ या नहीं लिखें)\n• 80C निवेश (PPF, ELSS, जीवन बीमा)?\n• HRA (मकान किराया भत्ता)?\n• NPS (राष्ट्रीय पेंशन योजना)?\n• स्वास्थ्य बीमा?',
    }
  };

  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: t.welcome,
        timestamp: new Date(),
      },
      {
        id: 2,
        type: 'bot',
        content: t.incomeQuestion,
        timestamp: new Date(),
      }
    ]);
  }, [language]);

  const calculateDetailedTax = (profile: UserProfile) => {
    const incomeRanges = {
      '1': 200000, '2': 375000, '3': 750000, 
      '4': 1125000, '5': 1375000, '6': 2000000
    };
    
    const income = incomeRanges[profile.income as keyof typeof incomeRanges] || 0;
    let tax = 0;
    let exemptionUsed = 0;
    let deductions = 0;

    // Calculate tax slabs
    if (income > 250000) tax += Math.min(income - 250000, 250000) * 0.05;
    if (income > 500000) tax += Math.min(income - 500000, 500000) * 0.20;
    if (income > 1000000) tax += Math.min(income - 1000000, 250000) * 0.20;
    if (income > 1250000) tax += (income - 1250000) * 0.30;

    // Apply deductions
    if (profile.hasInvestments) {
      deductions += 150000; // 80C
      exemptionUsed += 150000 * (income > 1250000 ? 0.30 : income > 500000 ? 0.20 : 0.05);
    }
    if (profile.hasNPS) {
      deductions += 50000; // 80CCD(1B)
      exemptionUsed += 50000 * (income > 1250000 ? 0.30 : income > 500000 ? 0.20 : 0.05);
    }
    if (profile.hasHealthInsurance) {
      deductions += 25000; // 80D
      exemptionUsed += 25000 * (income > 1250000 ? 0.30 : income > 500000 ? 0.20 : 0.05);
    }

    return {
      grossIncome: income,
      taxBeforeDeductions: tax,
      totalDeductions: deductions,
      taxSaved: exemptionUsed,
      finalTax: Math.max(0, tax - exemptionUsed),
      takeHome: income - Math.max(0, tax - exemptionUsed)
    };
  };

  const generateEnhancedTaxAdvice = (profile: UserProfile) => {
    const calculation = calculateDetailedTax(profile);
    const isHindi = language === 'hi';
    
    let advice = '';
    
    if (isHindi) {
      advice = `🧮 आपका विस्तृत टैक्स विश्लेषण:\n\n`;
      advice += `📊 कुल आय: ₹${(calculation.grossIncome/100000).toFixed(1)}L\n`;
      advice += `💰 बिना कटौती के टैक्स: ₹${Math.round(calculation.taxBeforeDeductions)}\n`;
      advice += `🎯 कुल कटौती: ₹${calculation.totalDeductions}\n`;
      advice += `💸 टैक्स बचत: ₹${Math.round(calculation.taxSaved)}\n`;
      advice += `✅ अंतिम टैक्स: ₹${Math.round(calculation.finalTax)}\n`;
      advice += `🏠 आपका टेक होम: ₹${(calculation.takeHome/100000).toFixed(1)}L\n\n`;
      
      advice += `🎯 मेरे सुझाव:\n`;
      if (!profile.hasInvestments) advice += `• तुरंत PPF या ELSS में निवेश करें - ₹45,000 तक बचा सकते हैं!\n`;
      if (!profile.hasNPS) advice += `• NPS खाता खोलें - अतिरिक्त ₹15,000 बचत!\n`;
      if (!profile.hasHealthInsurance) advice += `• स्वास्थ्य बीमा लें - ₹7,500 तक बचत!\n`;
    } else {
      advice = `🧮 Your Detailed Tax Analysis:\n\n`;
      advice += `📊 Gross Income: ₹${(calculation.grossIncome/100000).toFixed(1)}L\n`;
      advice += `💰 Tax before deductions: ₹${Math.round(calculation.taxBeforeDeductions)}\n`;
      advice += `🎯 Total deductions claimed: ₹${calculation.totalDeductions}\n`;
      advice += `💸 Tax saved: ₹${Math.round(calculation.taxSaved)}\n`;
      advice += `✅ Final tax liability: ₹${Math.round(calculation.finalTax)}\n`;
      advice += `🏠 Your take-home: ₹${(calculation.takeHome/100000).toFixed(1)}L\n\n`;
      
      advice += `🎯 My Recommendations:\n`;
      if (!profile.hasInvestments) advice += `• Invest in PPF/ELSS immediately - save up to ₹45,000!\n`;
      if (!profile.hasNPS) advice += `• Open NPS account - additional ₹15,000 savings!\n`;
      if (!profile.hasHealthInsurance) advice += `• Get health insurance - save up to ₹7,500!\n`;
      
      advice += `\n🔥 Pro Tips:\n`;
      advice += `• Use new tax regime only if you have minimal deductions\n`;
      advice += `• Keep all investment receipts for ITR filing\n`;
      advice += `• Consider ELSS for wealth creation + tax saving\n`;
      advice += `• Plan investments by December for maximum benefit`;
    }
    
    return advice;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      let botResponse = '';

      if (step === 0) {
        const incomeChoice = inputValue.trim();
        if (['1', '2', '3', '4', '5', '6'].includes(incomeChoice)) {
          setUserProfile(prev => ({ ...prev, income: incomeChoice }));
          setStep(1);
          botResponse = t.ageQuestion;
        } else {
          botResponse = language === 'hi' 
            ? 'कृपया 1-6 में से कोई एक विकल्प चुनें।'
            : 'Please choose a valid option (1-6).';
        }
      } else if (step === 1) {
        const ageChoice = inputValue.trim();
        if (['1', '2', '3'].includes(ageChoice)) {
          setUserProfile(prev => ({ ...prev, age: ageChoice }));
          setStep(2);
          botResponse = t.investmentQuestion;
        } else {
          botResponse = language === 'hi' 
            ? 'कृपया 1-3 में से कोई एक विकल्प चुनें।'
            : 'Please choose a valid option (1-3).';
        }
      } else if (step === 2) {
        const response = inputValue.toLowerCase();
        const hasInvestments = response.includes('yes') || response.includes('हाँ');
        const hasHRA = response.includes('hra') || response.includes('house rent');
        const hasNPS = response.includes('nps') || response.includes('pension');
        const hasHealthInsurance = response.includes('health') || response.includes('insurance');
        
        const updatedProfile = {
          ...userProfile,
          hasInvestments,
          hasHRA,
          hasNPS,
          hasHealthInsurance
        };
        
        setUserProfile(updatedProfile);
        botResponse = generateEnhancedTaxAdvice(updatedProfile);
        
        localStorage.setItem('meneyTaxProfile', JSON.stringify({
          ...updatedProfile,
          timestamp: new Date()
        }));
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot' as const,
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
          
          {/* Enhanced Stats */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Calculator className="w-5 h-5 text-blue-600 mr-1" />
                <span className="text-xl font-bold text-blue-600">₹50L+</span>
              </div>
              <p className="text-sm text-gray-600">Tax Saved</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <FileText className="w-5 h-5 text-green-600 mr-1" />
                <span className="text-xl font-bold text-green-600">95%</span>
              </div>
              <p className="text-sm text-gray-600">Accuracy</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-5 h-5 text-purple-600 mr-1" />
                <span className="text-xl font-bold text-purple-600">24/7</span>
              </div>
              <p className="text-sm text-gray-600">Available</p>
            </div>
          </div>
          
          {/* Language Toggle */}
          <div className="flex justify-center mt-6">
            <div className="flex bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-700'
                }`}
              >
                <Languages className="w-4 h-4" />
                <span>English</span>
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  language === 'hi' ? 'bg-blue-600 text-white' : 'text-gray-700'
                }`}
              >
                <Languages className="w-4 h-4" />
                <span>हिंदी</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.placeholder}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">{t.send}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxAssistant;
