
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Shield, BookOpen, Award, ArrowRight, Users, TrendingUp, AlertTriangle, Target, Heart } from 'lucide-react';

const Home = () => {
  const modules = [
    {
      title: 'TaxMENEY',
      subtitle: 'AI Tax Assistant',
      description: 'Get personalized tax advice and understand your tax obligations with our AI-powered assistant.',
      icon: Bot,
      path: '/tax-assistant',
      color: 'bg-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Eye-MENEY',
      subtitle: 'Scam Detector',
      description: 'Protect yourself from fraud! Paste any suspicious message and get instant scam detection.',
      icon: Shield,
      path: '/scam-detector',
      color: 'bg-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'MENEYonics',
      subtitle: 'Financial Quiz',
      description: 'Test and improve your financial knowledge with interactive quizzes and earn badges.',
      icon: BookOpen,
      path: '/quiz',
      color: 'bg-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'MENEY Schemes',
      subtitle: 'Government Schemes',
      description: 'Find government schemes and benefits you are eligible for based on your profile.',
      icon: Award,
      path: '/schemes',
      color: 'bg-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Users Helped', icon: Users },
    { number: '₹50L+', label: 'Tax Savings', icon: TrendingUp },
    { number: '500+', label: 'Scams Detected', icon: Shield },
  ];

  const problems = [
    {
      icon: AlertTriangle,
      title: 'Tax Confusion',
      problem: 'Most people struggle with complex tax rules and miss out on savings',
      solution: 'Our AI Tax Assistant simplifies tax advice in your language'
    },
    {
      icon: Shield,
      title: 'Financial Frauds',
      problem: 'Scammers target people with fake messages and steal hard-earned money',
      solution: 'Eye-MENEY instantly detects scam messages to protect you'
    },
    {
      icon: BookOpen,
      title: 'Financial Illiteracy',
      problem: 'Lack of financial knowledge leads to poor money decisions',
      solution: 'Fun quizzes and games make learning about money enjoyable'
    },
    {
      icon: Target,
      title: 'Missing Benefits',
      problem: 'Many eligible people miss out on government schemes and benefits',
      solution: 'We help you discover schemes you qualify for automatically'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">
            MENEY
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 mb-4 font-semibold">
            Finance worth Knowing
          </p>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Hey there! 👋 I'm here to make your financial journey simple and smart. 
            Whether you're confused about taxes, worried about scams, or want to learn about money - 
            I've got your back with AI-powered tools that actually work!
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className="w-6 h-6 text-blue-600 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">{stat.number}</span>
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why MENEY Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why MENEY? 🤔
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Let me tell you what I see happening around us - and how we can fix it together!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">The Problem:</h4>
                      <p className="text-gray-700">{item.problem}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">How MENEY Helps:</h4>
                      <p className="text-gray-700">{item.solution}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Ready to Get Started? 🚀
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            Pick any tool below - I promise to make it simple, helpful, and maybe even fun! 
            Each one is designed to solve real problems you face with money.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Link
                  key={index}
                  to={module.path}
                  className="group block"
                >
                  <div className={`${module.bgColor} rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100`}>
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center mr-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{module.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-semibold group-hover:text-blue-700">
                        Let's Go!
                      </span>
                      <ArrowRight className="w-5 h-5 text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Your Financial Journey Starts Here! 💪</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who are already making smarter money decisions with MENEY. 
            I'm here to guide you every step of the way!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/tax-assistant"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Bot className="w-5 h-5" />
              <span>Start with Tax Help</span>
            </Link>
            <Link
              to="/feedback"
              className="inline-flex items-center space-x-2 bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors border-2 border-white"
            >
              <Heart className="w-5 h-5" />
              <span>Share Feedback</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
