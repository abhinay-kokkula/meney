
import React, { useState } from 'react';
import { Award, Search, ExternalLink, MapPin, Users, IndianRupee } from 'lucide-react';

interface Scheme {
  id: number;
  name: string;
  description: string;
  eligibility: string[];
  benefits: string;
  category: string;
  ageRange: string;
  incomeLimit: string;
  website: string;
  applyOnline: boolean;
}

const GovernmentSchemes = () => {
  const [formData, setFormData] = useState({
    age: '',
    occupation: '',
    income: '',
    region: '',
    category: ''
  });
  const [results, setResults] = useState<Scheme[]>([]);
  const [showResults, setShowResults] = useState(false);

  const schemes: Scheme[] = [
    {
      id: 1,
      name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
      description: "Financial inclusion program providing basic banking services to all households",
      eligibility: ["All Indian citizens", "No minimum balance required", "Any age group"],
      benefits: "Free bank account, RuPay debit card, ₹10 lakh accident insurance, ₹30,000 life insurance after 6 months",
      category: "Banking",
      ageRange: "All ages",
      incomeLimit: "No limit",
      website: "https://pmjdy.gov.in/",
      applyOnline: true
    },
    {
      id: 2,
      name: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
      description: "Life insurance scheme providing coverage of ₹2 lakh",
      eligibility: ["Age 18-50 years", "Having bank account", "Auto-debit consent"],
      benefits: "₹2 lakh life insurance coverage for only ₹330 per year premium",
      category: "Insurance",
      ageRange: "18-50 years",
      incomeLimit: "No limit",
      website: "https://pmjjby.gov.in/",
      applyOnline: true
    },
    {
      id: 3,
      name: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
      description: "Accident insurance scheme providing coverage of ₹2 lakh",
      eligibility: ["Age 18-70 years", "Having bank account", "Auto-debit consent"],
      benefits: "₹2 lakh accident insurance coverage for only ₹12 per year",
      category: "Insurance",
      ageRange: "18-70 years",
      incomeLimit: "No limit",
      website: "https://pmsby.gov.in/",
      applyOnline: true
    },
    {
      id: 4,
      name: "PM-Kisan Samman Nidhi",
      description: "Income support scheme for small and marginal farmers",
      eligibility: ["Small and marginal farmers", "Land holding up to 2 hectares", "Valid Aadhaar"],
      benefits: "₹6,000 per year in three installments of ₹2,000 each",
      category: "Agriculture",
      ageRange: "All ages",
      incomeLimit: "Small farmers only",
      website: "https://pmkisan.gov.in/",
      applyOnline: true
    },
    {
      id: 5,
      name: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana",
      description: "Health insurance scheme providing coverage up to ₹5 lakh per family per year",
      eligibility: ["As per SECC 2011 database", "Rural and urban poor families", "Valid documents"],
      benefits: "₹5 lakh annual health insurance cover per family, cashless treatment",
      category: "Health",
      ageRange: "All ages",
      incomeLimit: "Below poverty line",
      website: "https://pmjay.gov.in/",
      applyOnline: true
    },
    {
      id: 6,
      name: "Pradhan Mantri Mudra Yojana",
      description: "Loans for micro enterprises and small businesses",
      eligibility: ["Non-farm income generating activities", "New or existing business", "Valid documents"],
      benefits: "Loans up to ₹10 lakh without collateral - Shishu (up to ₹50K), Kishore (₹50K-₹5L), Tarun (₹5L-₹10L)",
      category: "Business",
      ageRange: "18+ years",
      incomeLimit: "Small business owners",
      website: "https://mudra.org.in/",
      applyOnline: true
    },
    {
      id: 7,
      name: "National Scholarship Portal (NSP)",
      description: "Various scholarships for students from different categories",
      eligibility: ["Students from SC/ST/OBC/Minority", "Merit-based criteria", "Income criteria"],
      benefits: "Scholarships ranging from ₹1,000 to ₹25,000 per year based on course and category",
      category: "Education",
      ageRange: "Students",
      incomeLimit: "Varies by scheme",
      website: "https://scholarships.gov.in/",
      applyOnline: true
    },
    {
      id: 8,
      name: "Pradhan Mantri Awas Yojana (PMAY)",
      description: "Housing scheme for economically weaker sections and lower income groups",
      eligibility: ["EWS, LIG, MIG categories", "First-time home buyers", "Valid documents"],
      benefits: "Subsidy on home loans: EWS/LIG up to ₹2.67 lakh, MIG-1 up to ₹2.35 lakh, MIG-2 up to ₹2.30 lakh",
      category: "Housing",
      ageRange: "All ages",
      incomeLimit: "EWS: up to ₹3L, LIG: ₹3-6L, MIG: ₹6-18L",
      website: "https://pmaymis.gov.in/",
      applyOnline: true
    }
  ];

  const filterSchemes = () => {
    let filtered = schemes;

    // Filter by age
    if (formData.age) {
      const age = parseInt(formData.age);
      filtered = filtered.filter(scheme => {
        if (scheme.ageRange === "All ages" || scheme.ageRange === "Students") return true;
        
        const ageRange = scheme.ageRange.match(/(\d+)-(\d+)/);
        if (ageRange) {
          const minAge = parseInt(ageRange[1]);
          const maxAge = parseInt(ageRange[2]);
          return age >= minAge && age <= maxAge;
        }
        
        if (scheme.ageRange === "18+ years") return age >= 18;
        return true;
      });
    }

    // Filter by occupation
    if (formData.occupation) {
      const occupation = formData.occupation.toLowerCase();
      filtered = filtered.filter(scheme => {
        const category = scheme.category.toLowerCase();
        const description = scheme.description.toLowerCase();
        const eligibility = scheme.eligibility.join(' ').toLowerCase();
        
        if (occupation === 'farmer' && (category.includes('agriculture') || description.includes('farmer'))) return true;
        if (occupation === 'student' && (category.includes('education') || description.includes('student'))) return true;
        if (occupation === 'business' && (category.includes('business') || description.includes('business'))) return true;
        if (occupation === 'unemployed' && (category.includes('employment') || description.includes('employment'))) return true;
        
        return category.includes('banking') || category.includes('insurance') || category.includes('health');
      });
    }

    // Filter by income
    if (formData.income) {
      const income = formData.income;
      filtered = filtered.filter(scheme => {
        if (scheme.incomeLimit === "No limit") return true;
        if (scheme.incomeLimit === "Below poverty line" && income === "below-2.5") return true;
        if (scheme.incomeLimit === "Small farmers only" && formData.occupation === 'farmer') return true;
        if (scheme.incomeLimit.includes("EWS")) {
          if (income === "below-2.5" || income === "2.5-5") return true;
        }
        return true;
      });
    }

    return filtered;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredSchemes = filterSchemes();
    setResults(filteredSchemes);
    setShowResults(true);

    // Save to localStorage
    localStorage.setItem('meneySchemeSearch', JSON.stringify({
      formData,
      results: filteredSchemes.length,
      timestamp: new Date()
    }));
  };

  const resetForm = () => {
    setFormData({
      age: '',
      occupation: '',
      income: '',
      region: '',
      category: ''
    });
    setResults([]);
    setShowResults(false);
  };

  const shareResults = () => {
    const text = `I found ${results.length} government schemes I'm eligible for using MENEY's Scheme Recommender! 🎯 Discover schemes for you: ${window.location.origin}/schemes`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MENEY Schemes</h1>
          <p className="text-gray-600">Government Scheme Recommender</p>
          <p className="text-sm text-gray-500 mt-2">Find government schemes and benefits you are eligible for</p>
        </div>

        {!showResults ? (
          /* Application Form */
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about yourself</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    min="0"
                    max="100"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Enter your age"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation *
                  </label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="">Select occupation</option>
                    <option value="farmer">Farmer</option>
                    <option value="student">Student</option>
                    <option value="business">Business Owner</option>
                    <option value="employee">Salaried Employee</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="retired">Retired</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Annual Income */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income *
                  </label>
                  <select
                    value={formData.income}
                    onChange={(e) => setFormData({...formData, income: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="">Select income range</option>
                    <option value="below-2.5">Below ₹2.5 Lakhs</option>
                    <option value="2.5-5">₹2.5 - ₹5 Lakhs</option>
                    <option value="5-7.5">₹5 - ₹7.5 Lakhs</option>
                    <option value="7.5-10">₹7.5 - ₹10 Lakhs</option>
                    <option value="10-15">₹10 - ₹15 Lakhs</option>
                    <option value="above-15">Above ₹15 Lakhs</option>
                  </select>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="">Select region</option>
                    <option value="rural">Rural</option>
                    <option value="urban">Urban</option>
                    <option value="semi-urban">Semi-Urban</option>
                  </select>
                </div>
              </div>

              {/* Category of Interest */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category of Interest (Optional)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Banking', 'Insurance', 'Education', 'Health', 'Housing', 'Business', 'Agriculture'].map((cat) => (
                    <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.category.includes(cat)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, category: formData.category + (formData.category ? ',' : '') + cat});
                          } else {
                            setFormData({...formData, category: formData.category.replace(new RegExp(cat + ',?'), '').replace(/^,/, '')});
                          }
                        }}
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span className="text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Find My Schemes</span>
              </button>
            </form>
          </div>
        ) : (
          /* Results */
          <div>
            {/* Results Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Found {results.length} schemes for you!
                  </h2>
                  <p className="text-gray-600">
                    Based on your profile: {formData.age}yrs, {formData.occupation}, {formData.income?.replace('-', ' - ₹')} income
                  </p>
                </div>
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <button
                    onClick={shareResults}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    <span>New Search</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Schemes List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((scheme) => (
                <div key={scheme.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  {/* Scheme Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          scheme.category === 'Banking' ? 'bg-blue-100 text-blue-800' :
                          scheme.category === 'Insurance' ? 'bg-green-100 text-green-800' :
                          scheme.category === 'Education' ? 'bg-purple-100 text-purple-800' :
                          scheme.category === 'Health' ? 'bg-red-100 text-red-800' :
                          scheme.category === 'Housing' ? 'bg-orange-100 text-orange-800' :
                          scheme.category === 'Business' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {scheme.category}
                        </span>
                        {scheme.applyOnline && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                            Online Apply
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{scheme.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{scheme.description}</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      Benefits:
                    </h4>
                    <p className="text-gray-700 text-sm">{scheme.benefits}</p>
                  </div>

                  {/* Eligibility */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Eligibility:
                    </h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      {scheme.eligibility.map((criteria, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Apply Button */}
                  <a
                    href={scheme.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Apply Now</span>
                  </a>
                </div>
              ))}
            </div>

            {results.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No schemes found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find specific schemes matching your exact criteria, 
                  but don't worry! Try adjusting your search parameters or explore our general recommendations.
                </p>
                <button
                  onClick={resetForm}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  Try Different Criteria
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentSchemes;
