
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Shield, BookOpen, Award, ArrowRight, Users, TrendingUp } from 'lucide-react';

const Home = () => {
  const modules = [
    {
      title: 'TaxMENEY',
      subtitle: 'AI Tax Assistant',
      description: 'Get personalized tax advice and understand your tax obligations with our AI-powered assistant.',
      icon: Bot,
      path: '/tax-assistant',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Eye-MENEY',
      subtitle: 'Scam Detector',
      description: 'Protect yourself from fraud! Paste any suspicious message and get instant scam detection.',
      icon: Shield,
      path: '/scam-detector',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'MENEYonics',
      subtitle: 'Financial Quiz',
      description: 'Test and improve your financial knowledge with interactive quizzes and earn badges.',
      icon: BookOpen,
      path: '/quiz',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'MENEY Schemes',
      subtitle: 'Government Schemes',
      description: 'Find government schemes and benefits you are eligible for based on your profile.',
      icon: Award,
      path: '/schemes',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Users Helped', icon: Users },
    { number: '₹50L+', label: 'Tax Savings', icon: TrendingUp },
    { number: '500+', label: 'Scams Detected', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MENEY
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            Everymen need Money
          </p>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Your AI-powered financial literacy toolkit. Get tax advice, detect scams, 
            learn through quizzes, and discover government schemes - all in one place.
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

      {/* Modules Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Financial Tool
          </h2>
          
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
                      <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center mr-4`}>
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
                        Get Started
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Master Your Money?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who are already building better financial futures with MENEY.
          </p>
          <Link
            to="/tax-assistant"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Bot className="w-5 h-5" />
            <span>Start with Tax Assistant</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
