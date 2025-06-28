
import React from 'react';
import { Share2, MessageCircle } from 'lucide-react';

const Footer = () => {
  const shareToWhatsApp = () => {
    const message = encodeURIComponent("Check out MENEY - Your personal finance toolkit! Get tax advice, detect scams, learn with quizzes, and find government schemes. Visit: " + window.location.origin);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg"></div>
              <span className="text-xl font-bold">MENEY</span>
            </div>
            <p className="text-gray-400">
              Empowering communities with financial literacy and AI-powered tools.
              Everymen need Money - and we help you manage it better.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/tax-assistant" className="hover:text-white transition-colors">Tax Assistant</a></li>
              <li><a href="/scam-detector" className="hover:text-white transition-colors">Scam Detector</a></li>
              <li><a href="/quiz" className="hover:text-white transition-colors">Financial Quiz</a></li>
              <li><a href="/schemes" className="hover:text-white transition-colors">Government Schemes</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Share MENEY</h3>
            <div className="flex space-x-3">
              <button
                onClick={shareToWhatsApp}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => navigator.share && navigator.share({
                  title: 'MENEY - Financial Toolkit',
                  text: 'Check out this amazing financial literacy tool!',
                  url: window.location.origin
                })}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MENEY. Building financial awareness for everyone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
