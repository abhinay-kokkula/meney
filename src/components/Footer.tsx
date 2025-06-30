import React from 'react';
import { Share2, MessageCircle, Heart } from 'lucide-react';

const Footer = () => {
  const shareToWhatsApp = () => {
    const message = encodeURIComponent("Check out MENEY - Finance worth Knowing! Get tax advice, detect scams, learn with quizzes, and find government schemes. Visit: " + window.location.origin);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold">MENEY</span>
            </div>
            <p className="text-gray-400 mb-4">
              Finance worth Knowing - Your friendly guide to better financial decisions. 
              I'm here to make money matters simple and accessible for everyone!
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/tax-assistant" className="hover:text-white transition-colors">Tax Assistant</a></li>
              <li><a href="/scam-detector" className="hover:text-white transition-colors">Scam Detector</a></li>
              <li><a href="/quiz" className="hover:text-white transition-colors">Financial Quiz</a></li>
              <li><a href="/schemes" className="hover:text-white transition-colors">Government Schemes</a></li>
              <li><a href="/feedback" className="hover:text-white transition-colors">Share Feedback</a></li>
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
                  title: 'MENEY - Finance worth Knowing',
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
        
        {/* Creator Credits */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="text-center text-gray-400 mb-4">
            <p className="text-sm">
              Created by <span className="text-white font-semibold">Abhinay Kokkula</span> & <span className="text-white font-semibold">Shiva Kumar Vemula</span> for <span className="text-blue-400 font-semibold">HACKONOMICS 25</span>
            </p>
          </div>
          
          <div className="text-center text-gray-400">
            <p className="flex items-center justify-center space-x-1">
              <span>©2025 MENEY, made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>to build financial awareness in everyone.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
