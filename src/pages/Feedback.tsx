
import React, { useState } from 'react';
import { Star, Send, Heart, MessageSquare, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Feedback = () => {
  const [ratings, setRatings] = useState({
    taxAssistant: 0,
    scamDetector: 0,
    quiz: 0,
    schemes: 0,
    overall: 0
  });
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const modules = [
    { key: 'taxAssistant', name: 'TaxMENEY (AI Tax Assistant)', icon: '🤖' },
    { key: 'scamDetector', name: 'Eye-MENEY (Scam Detector)', icon: '🛡️' },
    { key: 'quiz', name: 'MENEYonics (Financial Quiz)', icon: '📚' },
    { key: 'schemes', name: 'MENEY Schemes (Government Schemes)', icon: '🎯' },
    { key: 'overall', name: 'Overall MENEY Experience', icon: '⭐' }
  ];

  const handleRating = (moduleKey: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [moduleKey]: rating
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store feedback in localStorage
    const feedbackData = {
      ratings,
      feedback,
      name,
      email,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };
    
    const existingFeedback = JSON.parse(localStorage.getItem('meneyFeedback') || '[]');
    existingFeedback.push(feedbackData);
    localStorage.setItem('meneyFeedback', JSON.stringify(existingFeedback));
    
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setRatings({
        taxAssistant: 0,
        scamDetector: 0,
        quiz: 0,
        schemes: 0,
        overall: 0
      });
      setFeedback('');
      setName('');
      setEmail('');
    }, 3000);
  };

  const StarRating = ({ rating, onRate, moduleKey }: { rating: number; onRate: (key: string, rating: number) => void; moduleKey: string }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(moduleKey, star)}
            className={`w-8 h-8 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
          >
            <Star className="w-full h-full" />
          </button>
        ))}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600 fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You! 🙏</h2>
            <p className="text-gray-700 mb-4">
              Your feedback means the world to us! I'm constantly learning and improving to serve you better.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting you back to the form in a moment...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Share Your Experience</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Hey there! 👋 I'd love to hear how your experience with MENEY has been. 
            Your feedback helps me understand what's working and what I can improve to serve you better!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Rating Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-400" />
                <span>Rate Our Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                Please rate each tool you've used. Don't worry if you haven't tried all of them yet!
              </p>
              
              {modules.map((module) => (
                <div key={module.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{module.icon}</span>
                    <span className="font-medium text-gray-900">{module.name}</span>
                  </div>
                  <StarRating
                    rating={ratings[module.key as keyof typeof ratings]}
                    onRate={handleRating}
                    moduleKey={module.key}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <span>Tell Me More</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="What did you like? What could be better? Any suggestions for new features? I'm all ears! 😊"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Your Name (Optional)</Label>
                  <Input
                    id="name"
                    placeholder="How should I address you?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="In case I want to follow up"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              <Send className="w-5 h-5 mr-2" />
              Send My Feedback
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Your feedback is stored locally and helps improve MENEY for everyone
            </p>
          </div>
        </form>

        {/* Why Feedback Matters */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <ThumbsUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Why Your Feedback Matters
                </h3>
                <p className="text-gray-700">
                  As an AI-powered financial assistant, I learn from every interaction. 
                  Your feedback helps me understand what financial challenges you face, 
                  what features you find most helpful, and how I can better serve our community. 
                  Together, we're building a tool that truly makes finance accessible for everyone!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;
