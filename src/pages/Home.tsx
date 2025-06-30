
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Shield, BookOpen, Award, ArrowRight, Users, TrendingUp, AlertTriangle, Target, Heart, User, Building, DollarSign, Lightbulb } from 'lucide-react';

const Home = () => {
  const modules = [
    {
      title: 'TaxMENEY',
      subtitle: 'AI Tax Assistant',
      description: 'Get personalized Indian tax advice with detailed calculations, deductions, and smart recommendations.',
      icon: Bot,
      path: '/tax-assistant',
      color: 'bg-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Eye-MENEY',
      subtitle: 'Advanced Scam Detector',
      description: 'Protect yourself from sophisticated frauds with AI-powered analysis and real-time threat detection.',
      icon: Shield,
      path: '/scam-detector',
      color: 'bg-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'MENEYonics',
      subtitle: 'Financial Mastery Quiz',
      description: 'Challenge yourself with advanced financial concepts and earn expertise badges.',
      icon: BookOpen,
      path: '/quiz',
      color: 'bg-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'MENEY Schemes',
      subtitle: 'Government Benefits',
      description: 'Discover government schemes and benefits you qualify for based on your profile.',
      icon: Award,
      path: '/schemes',
      color: 'bg-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  const stats = [
    { number: '25K+', label: 'Users Helped', icon: Users },
    { number: '₹2Cr+', label: 'Tax Savings', icon: TrendingUp },
    { number: '5000+', label: 'Scams Detected', icon: Shield },
  ];

  const problems = [
    {
      icon: AlertTriangle,
      title: 'Tax Confusion',
      problem: 'Complex Indian tax rules confuse people, leading to overpayment or penalties',
      solution: 'Our AI gives personalized advice in simple language, with exact calculations'
    },
    {
      icon: Shield,
      title: 'Rising Financial Frauds',
      problem: 'Scammers are getting smarter with KBC lottery, fake KYC, and OTP frauds stealing crores',
      solution: 'Eye-MENEY detects even sophisticated scam patterns instantly'
    },
    {
      icon: BookOpen,
      title: 'Financial Illiteracy',
      problem: 'Poor financial decisions due to lack of knowledge about investments, credit, and planning',
      solution: 'Interactive learning with real scenarios and practical knowledge'
    },
    {
      icon: Target,
      title: 'Missing Government Benefits',
      problem: 'Eligible citizens miss out on schemes worth thousands due to lack of awareness',
      solution: 'Automated matching with your profile to find relevant schemes'
    }
  ];

  // Story section data
  const stories = [
    {
      icon: User,
      title: "Raj's Tax Nightmare",
      story: "Raj, a software engineer in Bangalore, was paying ₹50,000 extra tax every year because he didn't know about 80C deductions. He discovered MENEY and learned he could save ₹45,000 annually through proper tax planning.",
      impact: "Annual Savings: ₹45,000",
      bgColor: "bg-blue-50"
    },
    {
      icon: Shield,
      title: "Priya's Scam Escape",
      story: "Priya almost lost ₹2 lakhs to a fake KBC lottery scam. The message looked genuine with Amitabh Bachchan's photo. Eye-MENEY detected 8 scam indicators and warned her just in time.",
      impact: "Money Saved: ₹2,00,000",
      bgColor: "bg-red-50"
    },
    {
      icon: Building,
      title: "Village Success Story",
      story: "In a small village in UP, our volunteers taught 200 families about financial literacy using MENEY. Now 80% have emergency funds and 60% invest in mutual funds regularly.",
      impact: "Families Helped: 200+",
      bgColor: "bg-green-50"
    },
    {
      icon: DollarSign,
      title: "Student's Smart Start",
      story: "Anita, a college student, used MENEY to find government scholarships worth ₹75,000. She also learned about SIPs and started investing ₹500/month for her future.",
      impact: "Scholarship Found: ₹75,000",
      bgColor: "bg-purple-50"
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

      {/* Stories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real Stories, Real Impact 📖
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              These aren't just numbers - they're real people whose lives changed because they learned to handle money better. 
              Here are some stories that inspire us every day!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story, index) => {
              const Icon = story.icon;
              return (
                <div key={index} className={`${story.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-md">
                      <Icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{story.title}</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{story.story}</p>
                  
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-semibold text-green-700">✨ {story.impact}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Story Could Be Next! 🌟</h3>
              <p className="text-gray-700 mb-6">
                Every financial journey starts with a single step. Whether you want to save on taxes, 
                avoid scams, or build wealth - MENEY is here to guide you. Let's write your success story together!
              </p>
              <Link
                to="/tax-assistant"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
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
