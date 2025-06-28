
import React, { useState, useEffect } from 'react';
import { Bot, Send, Languages } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const TaxAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [language, setLanguage] = useState('en');
  const [step, setStep] = useState(0);
  const [userProfile, setUserProfile] = useState({
    income: '',
    hasInvestments: false,
    hasLoans: false,
  });

  const translations = {
    en: {
      title: 'TaxMENEY - AI Tax Assistant',
      subtitle: 'Get personalized tax advice in simple terms',
      placeholder: 'Type your response here...',
      send: 'Send',
      welcome: 'Hello! I\'m your AI Tax Assistant. I\'ll help you understand your tax obligations and find ways to save money.',
      incomeQuestion: 'To get started, what\'s your annual income range?\n\n1. Under ₹2.5 Lakhs\n2. ₹2.5L - ₹5L\n3. ₹5L - ₹10L\n4. Above ₹10L',
      investmentQuestion: 'Do you have any investments like:\n• PPF, ELSS, or Life Insurance?\n• Home loan or education loan?\n\nPlease type "yes" or "no"',
    },
    hi: {
      title: 'TaxMENEY - AI टैक्स सहायक',
      subtitle: 'सरल भाषा में व्यक्तिगत टैक्स सलाह पाएं',
      placeholder: 'यहाँ अपना जवाब लिखें...',
      send: 'भेजें',
      welcome: 'नमस्ते! मैं आपका AI टैक्स सहायक हूँ। मैं आपको टैक्स की जानकारी और पैसे बचाने के तरीके बताऊंगा।',
      incomeQuestion: 'शुरुआत के लिए, आपकी सालाना आय कितनी है?\n\n1. ₹2.5 लाख से कम\n2. ₹2.5L - ₹5L\n3. ₹5L - ₹10L\n4. ₹10L से ज्यादा',
      investmentQuestion: 'क्या आपके पास कोई निवेश है जैसे:\n• PPF, ELSS, या जीवन बीमा?\n• होम लोन या एजुकेशन लोन?\n\nकृपया "हाँ" या "नहीं" लिखें',
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

  const generateTaxAdvice = (income: string, hasInvestments: boolean, hasLoans: boolean) => {
    const adviceMap: { [key: string]: string } = {
      'en': {
        '1': hasInvestments 
          ? `Great! With income under ₹2.5L, you're in the tax-free zone! 🎉\n\nSince you have investments:\n• Keep investing in PPF (up to ₹1.5L annually)\n• Continue ELSS for tax benefits\n• Your current tax liability: ₹0\n\nTip: Build an emergency fund of 6 months expenses!`
          : `Excellent news! With income under ₹2.5L, you pay ZERO tax! 🎉\n\nRecommendations:\n• Start a PPF account (₹500 minimum)\n• Consider ELSS mutual funds\n• Build emergency savings\n• Your tax liability: ₹0`,
        '2': hasInvestments
          ? `Good planning! Income ₹2.5L-₹5L puts you in 5% tax bracket.\n\nWith your investments:\n• Tax without 80C: ~₹12,500\n• With ₹1.5L 80C deductions: ₹0-₹5,000\n• Maximize PPF, ELSS contributions\n• Consider health insurance for 80D benefits`
          : `You're in the 5% tax bracket (₹2.5L-₹5L).\n\nTax saving opportunities:\n• Invest ₹1.5L in PPF/ELSS to save ₹7,500\n• Take health insurance (₹25K deduction)\n• Potential tax: ₹12,500 → ₹0 with proper planning!`,
        '3': hasInvestments
          ? `Smart! Income ₹5L-₹10L = 20% tax bracket.\n\nWith your investments:\n• Tax without planning: ₹50K-₹1.5L\n• With ₹1.5L 80C + ₹25K health insurance: Save ₹35K\n• Maximize all deductions\n• Consider NPS for additional ₹50K deduction`
          : `You're in 20% tax bracket (₹5L-₹10L).\n\nImmediate actions:\n• Invest ₹1.5L in 80C (save ₹30K tax)\n• Health insurance ₹25K (save ₹5K)\n• Consider house rent allowance\n• Potential annual savings: ₹35,000+`,
        '4': hasInvestments
          ? `High earner! Income >₹10L = 30% tax bracket.\n\nWith your investments:\n• Maximize 80C: ₹1.5L (save ₹45K)\n• Health insurance: ₹25K (save ₹7.5K)\n• NPS additional: ₹50K (save ₹15K)\n• Home loan interest: Up to ₹2L\n• Total potential savings: ₹67,500+`
          : `High income, high tax! >₹10L = 30% bracket.\n\nUrgent tax planning needed:\n• 80C investments: Save ₹45K annually\n• Health insurance: Save ₹7.5K\n• Consider home loan for interest deduction\n• NPS for extra ₹50K deduction\n• Consult a tax advisor for advanced planning`,
      },
      'hi': {
        '1': hasInvestments
          ? `बहुत बढ़िया! ₹2.5L से कम आय पर कोई टैक्स नहीं! 🎉\n\nआपके निवेश के साथ:\n• PPF में निवेश जारी रखें (सालाना ₹1.5L तक)\n• ELSS में निवेश करते रहें\n• आपका टैक्स: ₹0\n\nसुझाव: 6 महीने का इमरजेंसी फंड बनाएं!`
          : `शानदार खबर! ₹2.5L से कम आय पर शून्य टैक्स! 🎉\n\nसिफारिशें:\n• PPF खाता खोलें (न्यूनतम ₹500)\n• ELSS म्यूचुअल फंड में निवेश करें\n• इमरजेंसी बचत बनाएं\n• आपका टैक्स: ₹0`,
        '2': hasInvestments
          ? `अच्छी योजना! ₹2.5L-₹5L आय पर 5% टैक्स।\n\nआपके निवेश के साथ:\n• बिना 80C के टैक्स: ~₹12,500\n• ₹1.5L की कटौती से: ₹0-₹5,000\n• PPF, ELSS को बढ़ाएं\n• स्वास्थ्य बीमा लें 80D के लिए`
          : `आप 5% टैक्स ब्रैकेट में हैं (₹2.5L-₹5L)।\n\nटैक्स बचाने के अवसर:\n• PPF/ELSS में ₹1.5L निवेश करें, ₹7,500 बचाएं\n• स्वास्थ्य बीमा लें (₹25K कटौती)\n• संभावित टैक्स: ₹12,500 → ₹0 सही योजना से!`,
        '3': hasInvestments
          ? `स्मार्ट! ₹5L-₹10L आय = 20% टैक्स ब्रैकेट।\n\nआपके निवेश के साथ:\n• बिना योजना के टैक्स: ₹50K-₹1.5L\n• ₹1.5L 80C + ₹25K स्वास्थ्य बीमा से: ₹35K बचत\n• सभी कटौतियों का फायदा उठाएं\n• NPS में अतिरिक्त ₹50K कटौती`
          : `आप 20% टैक्स ब्रैकेट में हैं (₹5L-₹10L)।\n\nतुरंत करने योग्य:\n• 80C में ₹1.5L निवेश (₹30K टैक्स बचत)\n• स्वास्थ्य बीमा ₹25K (₹5K बचत)\n• हाउस रेंट अलाउंस का फायदा उठाएं\n• संभावित वार्षिक बचत: ₹35,000+`,
        '4': hasInvestments
          ? `उच्च आय! >₹10L = 30% टैक्स ब्रैकेट।\n\nआपके निवेश के साथ:\n• 80C अधिकतम: ₹1.5L (₹45K बचत)\n• स्वास्थ्य बीमा: ₹25K (₹7.5K बचत)\n• NPS अतिरिक्त: ₹50K (₹15K बचत)\n• होम लोन ब्याज: ₹2L तक\n• कुल संभावित बचत: ₹67,500+`
          : `उच्च आय, उच्च टैक्स! >₹10L = 30% ब्रैकेट।\n\nजरूरी टैक्स प्लानिंग:\n• 80C निवेश: सालाना ₹45K बचत\n• स्वास्थ्य बीमा: ₹7.5K बचत\n• होम लोन के लिए ब्याज कटौती\n• अतिरिक्त ₹50K कटौती के लिए NPS\n• उन्नत योजना के लिए टैक्स सलाहकार से मिलें`,
      }
    };

    return adviceMap[language][income] || 'Please select a valid income range (1-4).';
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

    // Bot response logic
    setTimeout(() => {
      let botResponse = '';

      if (step === 0) {
        // Processing income response
        const incomeChoice = inputValue.trim();
        if (['1', '2', '3', '4'].includes(incomeChoice)) {
          setUserProfile(prev => ({ ...prev, income: incomeChoice }));
          setStep(1);
          botResponse = t.investmentQuestion;
        } else {
          botResponse = language === 'hi' 
            ? 'कृपया 1-4 में से कोई एक विकल्प चुनें।'
            : 'Please choose a valid option (1-4).';
        }
      } else if (step === 1) {
        // Processing investment response
        const hasInvestments = inputValue.toLowerCase().includes('yes') || inputValue.toLowerCase().includes('हाँ');
        const hasLoans = inputValue.toLowerCase().includes('loan') || inputValue.toLowerCase().includes('लोन');
        
        setUserProfile(prev => ({ ...prev, hasInvestments, hasLoans }));
        
        botResponse = generateTaxAdvice(userProfile.income, hasInvestments, hasLoans);
        
        // Save to localStorage
        localStorage.setItem('meneyTaxProfile', JSON.stringify({
          ...userProfile,
          hasInvestments,
          hasLoans,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
          
          {/* Language Toggle */}
          <div className="flex justify-center mt-4">
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
