import { useState, useEffect } from 'react';
import { Vote, Shield, CheckCircle, FileText, Mail, Menu, X, Lock, Users, Globe, Clock, Leaf, Phone, Fingerprint, Scan, MapPin, CreditCard, AlertTriangle, ShieldCheck, Eye, Monitor, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

function App() {
  const [voteSuccess, setVoteSuccess] = useState(false);
  // Voting timer state
  const [votingTime, setVotingTime] = useState(30);
  const [voteTimeout, setVoteTimeout] = useState(false);
  const [selectedParty, setSelectedParty] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeSection === 'voting' && votingTime > 0 && !voteTimeout) {
      timer = setTimeout(() => setVotingTime(votingTime - 1), 1000);
    } else if (activeSection === 'voting' && votingTime === 0) {
      setVoteTimeout(true);
    }
    return () => clearTimeout(timer);
  }, [activeSection, votingTime, voteTimeout]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    aadhaar: '',
    pan: '',
    phone: '',
    email: '',
    dob: '',
    voterId: '',
    address: '',
    state: '',
    constituency: '',
  });
  const [otp, setOtp] = useState('');
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const navigation = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'security', label: 'Security' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Puducherry', 'Jammu and Kashmir', 'Ladakh'
  ];

  const constituencies = {
    'Delhi': ['New Delhi', 'Chandni Chowk', 'North East Delhi', 'East Delhi', 'South Delhi', 'West Delhi', 'North West Delhi'],
    'Maharashtra': ['Mumbai North', 'Mumbai South', 'Mumbai North West', 'Pune', 'Nagpur', 'Thane'],
    'Karnataka': ['Bangalore North', 'Bangalore South', 'Bangalore Central', 'Mysore', 'Mangalore'],
    'Tamil Nadu': ['Chennai North', 'Chennai South', 'Chennai Central', 'Coimbatore', 'Madurai'],
    'default': ['Select state first to view constituencies']
  };

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    setShowRegistration(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationClick = () => {
    setShowRegistration(true);
    setRegistrationStep(1);
    setRegistrationComplete(false);
    setShowOtpVerification(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationInputChange = (field: string, value: string) => {
    setRegistrationData({ ...registrationData, [field]: value });
  };

  const handleNextStep = () => {
    if (registrationStep < 3) {
      setRegistrationStep(registrationStep + 1);
    } else if (registrationStep === 3) {
      setShowOtpVerification(true);
      alert('Dummy OTP sent to ' + registrationData.phone + ': 123456');
    }
  };

  const handlePreviousStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(registrationStep - 1);
    }
  };

  const handleOtpVerification = () => {
    if (otp === '123456') {
      setRegistrationComplete(true);
      setShowOtpVerification(false);
    } else {
      alert('Invalid OTP. Please use: 123456 (Dummy OTP)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', message: '' });
  };

  const getConstituenciesForState = (state: string) => {
    return constituencies[state as keyof typeof constituencies] || constituencies.default;
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-gray-800 p-2 rounded-lg animate-float">
                <Vote className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">E-Voting App</span>
            </div>

            <div className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-gray-800 text-white shadow-md'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-gray-800 text-white'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
  )}
      </header>

      <main>
        {activeSection === 'home' && (
          <section className="bg-gradient-to-b from-blue-50 via-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fadeInUp">
                  Our Vote, Our Home, Our Democracy
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed animate-fadeInUp delay-100">
                  Exercise your democratic right from the comfort and safety of our home.
                  E-Voting App brings trusted, transparent, and secure online voting to every Indian citizen.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setActiveSection('register')}
                    className="bg-gradient-to-r from-blue-600 to-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 animate-fadeInUp delay-200"
                  >
                    Register to Vote
                  </button>
                  <button
                    onClick={() => handleNavClick('how-it-works')}
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 border-2 border-blue-600 hover:border-blue-700 hover:scale-105 animate-fadeInUp delay-300"
                  >
                    How It Works
                  </button>
                </div>
              </div>

              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeInUp delay-100">
                  <div className="bg-gradient-to-br from-blue-100 to-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Level Security</h3>
                  <p className="text-gray-600">Military-grade encryption protects every vote</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeInUp delay-200">
                  <div className="bg-gradient-to-br from-blue-100 to-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Government Verified</h3>
                  <p className="text-gray-600">Approved by Election Commission of India</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeInUp delay-300">
                  <div className="bg-gradient-to-br from-blue-100 to-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Accessible to All</h3>
                  <p className="text-gray-600">Simple interface for every Indian citizen</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 animate-fadeInUp">About E-Voting App</h2>

              <div className="prose prose-lg text-gray-600 space-y-6">
                <p className="text-xl leading-relaxed animate-fadeInUp delay-100">
                  E-Voting App is on a mission to revolutionize E-Voting Appcratic participation in the world's largest E-Voting Appcracy.
                  We believe that every Indian citizen deserves the right to vote conveniently, securely, and transparently.
                </p>

                <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl border border-blue-200 my-8 animate-fadeInUp delay-200 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">Our Mission</h3>
                  <p className="text-lg">
                    To empower every Indian citizen with secure, accessible, and transparent online voting,
                    strengthening our E-Voting Appcracy and ensuring that no voice goes unheard due to distance,
                    disability, or time constraints.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why We Exist</h3>
                <p className="text-lg leading-relaxed">
                  India's E-Voting Appcratic spirit is strong, but participation faces challenges. Long queues, distant polling stations,
                  work commitments, and mobility issues prevent millions from exercising their right to vote.
                  We're changing that by bringing the voting booth to your home.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Team</h3>
                <p className="text-lg leading-relaxed">
                  Built and maintained by Yash Mane and Anand Hipparagi and its Team.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Values</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start animate-slideInRight delay-100 hover:translate-x-2 transition-transform duration-300">
                    <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span><strong className="text-gray-900">Security First:</strong> Your vote is protected with the highest encryption standards</span>
                  </li>
                  <li className="flex items-start animate-slideInRight delay-200 hover:translate-x-2 transition-transform duration-300">
                    <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span><strong className="text-gray-900">Transparency:</strong> Every step is auditable and verifiable</span>
                  </li>
                  <li className="flex items-start animate-slideInRight delay-300 hover:translate-x-2 transition-transform duration-300">
                    <Users className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span><strong className="text-gray-900">Inclusivity:</strong> Making E-Voting Appcracy accessible to all Indians</span>
                  </li>
                  <li className="flex items-start animate-slideInRight delay-400 hover:translate-x-2 transition-transform duration-300">
                    <Globe className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span><strong className="text-gray-900">Trust:</strong> Building confidence through verified processes</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'how-it-works' && (
          <section className="py-20 bg-gradient-to-b from-blue-50 to-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center animate-fadeInUp">How It Works</h2>
              <p className="text-xl text-gray-600 text-center mb-16 animate-fadeInUp delay-100">Simple, secure, and straightforward in four easy steps</p>

              <div className="space-y-8">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 animate-fadeInUp delay-100">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-blue-600 to-gray-800 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0 animate-pulse-slow">
                      1
                    </div>
                    <div className="ml-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Register & Verify Identity</h3>
                      <p className="text-lg text-gray-600 leading-relaxed mb-4">
                        Create your account using your Aadhaar number and voter ID. Our system instantly verifies
                        your identity with the Election Commission database to ensure you're a registered voter.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span>One-time registration with Aadhaar authentication</span>
                        </li>
                        <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span>Instant verification with Election Commission records</span>
                        </li>
                        <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span>Secure OTP verification via registered mobile</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 animate-fadeInUp delay-200">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-blue-600 to-gray-800 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0 animate-pulse-slow">
                      2
                    </div>
                    <div className="ml-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Receive Voting Notification</h3>
                      <p className="text-lg text-gray-600 leading-relaxed mb-4">
                        When an election is scheduled in your constituency, you'll receive a notification via SMS,
                        email, and app notification with your unique voting window.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span>Multi-channel notifications (SMS, email, app)</span>
                        </li>
                        <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span>Clear voting dates and deadlines</span>
                        </li>
                        <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span>Candidate information and manifestos</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 animate-fadeInUp delay-300">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-blue-600 to-gray-800 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0 animate-pulse-slow">
                      3
                    </div>
                    <div className="ml-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Cast Your Vote Securely</h3>
                      <p className="text-lg text-gray-600 leading-relaxed mb-4">
                        Log in using multi-factor authentication (password + OTP + biometric). Review candidates,
                        make your choice, and submit your encrypted vote from anywhere.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span>Three-layer authentication for maximum security</span>
                        </li>
                        <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span>End-to-end encryption of your vote</span>
                        </li>
                        <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span>Review and confirm before final submission</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 animate-fadeInUp delay-400">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-blue-600 to-gray-800 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0 animate-pulse-slow">
                      4
                    </div>
                    <div className="ml-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Receive Confirmation</h3>
                      <p className="text-lg text-gray-600 leading-relaxed mb-4">
                        Get instant confirmation that your vote has been recorded. Your vote is stored with a
                        unique encrypted ID that only you can verify, ensuring complete transparency.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span>Instant confirmation receipt</span>
                        </li>
                        <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span>Unique verification code for audit trail</span>
                        </li>
                        <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span>Post-election verification option</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'security' && (
          <section className="py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center animate-fadeInUp">Security & Trust</h2>
              <p className="text-xl text-gray-600 text-center mb-16 animate-fadeInUp delay-100">Your vote's security is our highest priority</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeInUp delay-100">
                  <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center mb-4 shadow-sm animate-float">
                    <Lock className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Military-Grade Encryption</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Every vote is protected with AES-256 encryption, the same standard used by banks and governments worldwide.
                    Your vote is encrypted before leaving your device and remains encrypted throughout the entire process.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeInUp delay-200">
                  <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center mb-4 shadow-sm animate-float">
                    <ShieldCheck className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Enterprise Antivirus Protection</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our servers are protected by enterprise-grade antivirus solutions including Bitdefender and Norton Security.
                    Real-time threat detection and automatic security updates ensure your data remains safe from malware and cyber attacks.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeInUp delay-300">
                  <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center mb-4 shadow-sm animate-float">
                    <CheckCircle className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Government Verification</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our system is directly integrated with the Election Commission of India and Aadhaar databases.
                    Every voter is verified in real-time, and duplicate voting is automatically prevented through blockchain technology.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeInUp delay-400">
                  <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center mb-4 shadow-sm animate-float">
                    <FileText className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Complete Audit Trail</h3>
                  <p className="text-gray-600 leading-relaxed">
                    While maintaining voter anonymity, our system creates a complete audit trail using blockchain technology.
                    Every vote can be verified post-election without revealing voter identity, ensuring transparency and trust.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border-2 border-blue-200 mb-12 animate-fadeInUp delay-200">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-gray-800 bg-clip-text text-transparent mb-6 text-center">Multi-Factor Authentication System</h3>
                <p className="text-center text-gray-600 mb-8 text-lg">
                  Multiple layers of security verification ensure that only you can cast your vote
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-xl border border-blue-200 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-md animate-pulse-slow">
                      <Fingerprint className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Fingerprint Verification</h4>
                    <p className="text-sm text-gray-600">
                      Biometric fingerprint scanning for secure identity confirmation
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-xl border border-blue-200 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-md animate-pulse-slow">
                      <Scan className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Face Recognition</h4>
                    <p className="text-sm text-gray-600">
                      Advanced facial recognition technology matches your live photo with Aadhaar records
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-xl border border-blue-200 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-md animate-pulse-slow">
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Location Verification</h4>
                    <p className="text-sm text-gray-600">
                      GPS-based location tracking ensures votes are cast from authorized locations
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-xl border border-blue-200 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-md animate-pulse-slow">
                      <Monitor className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Device Authentication</h4>
                    <p className="text-sm text-gray-600">
                      Trusted device registration with OTP verification for added security
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-600 to-gray-800 p-6 rounded-xl hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <Eye className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-bold mb-2">Bank-Grade Authentication Process</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Similar to net banking, our multi-layer authentication requires: (1) Password + Security Question,
                        (2) OTP to registered mobile, (3) Biometric verification (fingerprint or face), and (4) Device recognition.
                        If any suspicious activity is detected, you receive instant alerts via SMS and email.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 text-white p-8 md:p-12 rounded-xl mb-12">
                <h3 className="text-3xl font-bold mb-6">Protection Against Fraud</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold mb-3 text-gray-100">Preventing Duplicate Votes</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Blockchain technology creates an immutable record. Once you vote, the system permanently
                      records it, making it impossible to vote again or manipulate your choice.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3 text-gray-100">Identity Verification</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Real-time verification with Aadhaar and Election Commission databases ensures every voter
                      is legitimate and eligible to vote in their specific constituency.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3 text-gray-100">Anonymous Voting</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Your vote is separated from your identity immediately after authentication. No one,
                      not even system administrators, can link your vote to your identity.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3 text-gray-100">Tamper-Proof System</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Our infrastructure is hosted on secure government servers with 24/7 monitoring.
                      Any attempted breach triggers immediate alerts and automatic system protection.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-10 rounded-xl border border-gray-200">
                <div className="flex items-center justify-center mb-6">
                  <CreditCard className="h-10 w-10 text-gray-800 mr-3" />
                  <h3 className="text-3xl font-bold text-gray-900">Net Banking-Level Security Features</h3>
                </div>

                <p className="text-center text-gray-600 mb-8 text-lg max-w-3xl mx-auto">
                  We've adopted security practices from India's most trusted banking systems to protect your vote
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-100 p-2 rounded-lg mr-3">
                        <AlertTriangle className="h-6 w-6 text-gray-800" />
                      </div>
                      <h4 className="font-bold text-gray-900">Session Timeout</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Automatic logout after 15 minutes of inactivity, just like your bank account, preventing unauthorized access
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-100 p-2 rounded-lg mr-3">
                        <Shield className="h-6 w-6 text-gray-800" />
                      </div>
                      <h4 className="font-bold text-gray-900">Transaction Password</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Separate voting PIN required at the final step, similar to TPIN in net banking for added security layer
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-100 p-2 rounded-lg mr-3">
                        <Mail className="h-6 w-6 text-gray-800" />
                      </div>
                      <h4 className="font-bold text-gray-900">Instant Alerts</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      SMS and email notifications for every login attempt, vote cast, and suspicious activity detected
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-100 p-2 rounded-lg mr-3">
                        <Lock className="h-6 w-6 text-gray-800" />
                      </div>
                      <h4 className="font-bold text-gray-900">Secure Login History</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      View all login attempts with timestamps, IP addresses, and device information to track account activity
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-100 p-2 rounded-lg mr-3">
                        <Monitor className="h-6 w-6 text-gray-800" />
                      </div>
                      <h4 className="font-bold text-gray-900">Trusted Device List</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Register your devices as trusted. Any new device requires additional verification steps for access
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-100 p-2 rounded-lg mr-3">
                        <MapPin className="h-6 w-6 text-gray-800" />
                      </div>
                      <h4 className="font-bold text-gray-900">Geo-Location Tracking</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Location verification prevents voting from unauthorized countries or suspicious locations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'benefits' && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Benefits of Online Voting</h2>
              <p className="text-xl text-gray-600 text-center mb-16">Making E-Voting Appcracy work better for every Indian</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                  <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-7 w-7 text-gray-800" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Accessible to Everyone</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    No more standing in long queues or traveling to distant polling booths. Vote from home, office,
                    or anywhere with internet access.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-800 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Elderly and differently-abled citizens can vote independently</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-800 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Citizens working far from home can participate</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-800 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Available in multiple regional languages</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                  <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-7 w-7 text-gray-800" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Save Time & Effort</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Cast your vote in minutes instead of hours. No need to take time off work or disrupt your daily schedule.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-800 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Vote in under 5 minutes from anywhere</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-800 mr-2 mt-0.5 flex-shrink-0" />
                      <span>No travel time or transportation costs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-800 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Extended voting hours accommodate all schedules</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                  <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-7 w-7 text-gray-800" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Transparency</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Track your vote's confirmation and verify it was counted correctly. Real-time result updates
                    with transparent counting process.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-800 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Instant vote confirmation receipt</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-800 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Post-election verification available</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-800 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Real-time, transparent result counting</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                  <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Leaf className="h-7 w-7 text-gray-800" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Environmentally Friendly</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Digital voting eliminates paper ballots, reduces transportation emissions, and minimizes
                    the environmental impact of elections.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-800 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Zero paper waste from ballots</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-800 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Reduced carbon footprint from travel</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gray-800 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Lower energy consumption overall</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Increased Voter Participation</h3>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
                  Studies show that online voting increases participation rates by 15-30%, especially among young voters,
                  working professionals, and citizens living abroad. By removing barriers to voting, we strengthen
                  our E-Voting Appcracy and ensure every voice is heard.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'faq' && (
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 text-center mb-16">Common questions about secure online voting</p>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Is online voting legal in India?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    E-Voting App operates in full compliance with the Election Commission of India guidelines.
                    Our platform has received necessary approvals and certifications. The ECI has been piloting
                    remote voting technologies, and we're at the forefront of this E-Voting Appcratic innovation.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">How secure is my vote?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your vote is protected with military-grade AES-256 encryption, the same level used by banks and
                    defense systems. We use blockchain technology to create an immutable record, multi-factor authentication
                    to verify your identity, and your vote is completely anonymized after authentication. No one can
                    access, change, or trace your vote back to you.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Can someone else vote using my account?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    No. We use three-factor authentication: your password (something you know), OTP to your registered
                    mobile (something you have), and biometric verification (something you are). All three are required
                    to cast a vote. Additionally, if someone tries to access your account from an unknown device,
                    you'll receive instant alerts.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">What if I don't have a smartphone?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You can vote from any device with internet access including basic smartphones, tablets, laptops,
                    or desktop computers. We also provide assisted voting facilities at government centers, libraries,
                    and post offices for those without personal devices.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">How do I know my vote was counted?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You receive an instant confirmation receipt with a unique verification code when you vote.
                    After the election, you can use this code to verify that your encrypted vote was included in
                    the final count, without revealing how you voted. This ensures complete transparency while
                    maintaining ballot secrecy.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Can I change my vote after submitting?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    No. Once you confirm and submit your vote, it's final and cannot be changed. This is the same as
                    traditional voting and ensures the integrity of the election. However, you can review your choice
                    before final submission, and we show multiple confirmation screens to prevent accidental voting.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">What happens if I lose internet connection while voting?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your voting session is saved for 30 minutes. If you lose connection, simply log back in within
                    that time and continue from where you left off. Your vote is only submitted when you click the
                    final "Submit Vote" button, so partial progress won't be counted.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Is my personal information safe?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Absolutely. We follow strict data protection regulations. Your personal information is encrypted,
                    stored on secure government servers, and never shared with third parties. We only collect the
                    minimum information necessary for voter verification, and your voting choices are completely
                    separated from your identity.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Can I vote from outside India?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes! This is one of the major benefits of online voting. Indian citizens living abroad can
                    participate in elections without having to travel back to India. You just need your valid
                    voter ID, Aadhaar, and registered mobile number to vote from anywhere in the world.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">What if I need help during the voting process?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our support team is available 24/7 during election periods. You can reach us via phone, email,
                    or live chat. We also provide step-by-step video tutorials in multiple regional languages and
                    have assisted voting facilities at government centers.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Contact Us</h2>
              <p className="text-xl text-gray-600 text-center mb-16">Have questions? We're here to help</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>

                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-3 rounded-lg mr-4">
                          <Phone className="h-6 w-6 text-gray-800" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Helpline</h4>
                          <p className="text-gray-600">1800-XXX-XXXX (Toll-Free)</p>
                          <p className="text-sm text-gray-500 mt-1">Available 24/7 during elections</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-gray-100 p-3 rounded-lg mr-4">
                          <Mail className="h-6 w-6 text-gray-800" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Email Support</h4>
                          <p className="text-gray-600">support@securevoteindia.gov.in</p>
                          <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-gray-100 p-3 rounded-lg mr-4">
                          <Globe className="h-6 w-6 text-gray-800" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Office Address</h4>
                          <p className="text-gray-600">
                            Election Commission of India<br />
                            Nirvachan Sadan, Ashoka Road<br />
                            New Delhi - 110001
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-600 to-gray-800 text-white p-8 rounded-xl hover:shadow-xl transition-all duration-300">
                    <h3 className="text-xl font-bold mb-4">Support Hours</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex justify-between">
                        <span>During Elections:</span>
                        <span className="font-semibold text-white">24/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Regular Days:</span>
                        <span className="font-semibold text-white">9 AM - 6 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Languages:</span>
                        <span className="font-semibold text-white">22+ Regional</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white p-8 rounded-xl shadow-md border border-blue-200 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Message *
                        </label>
                        <textarea
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-gray-900 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

  {activeSection === 'register' && (
          <section className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-gray-800 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-8 w-8 text-white" />
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">E-Voting Registration</h2>
                        <p className="text-blue-100 text-sm">Government of India | Election Commission</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveSection('home')}
                      className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {!registrationComplete && !showOtpVerification && (
                  <>
                    <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Lock className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700 font-semibold">Protected by Government Digital Security Standards</span>
                      </div>
                    </div>

                    <div className="px-8 py-6">
                      <div className="flex justify-between items-center mb-8">
                        {[1, 2, 3].map((step) => (
                          <div key={step} className="flex items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                                registrationStep >= step
                                  ? 'bg-gradient-to-r from-blue-600 to-gray-800 text-white'
                                  : 'bg-gray-200 text-gray-500'
                              }`}
                            >
                              {step}
                            </div>
                            {step < 3 && (
                              <div
                                className={`h-1 w-20 md:w-32 mx-2 transition-all ${
                                  registrationStep > step ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                              />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 animate-fadeInUp">
                        <div className="flex items-start space-x-3">
                          <ShieldCheck className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            <strong>Security Assurance:</strong> Your personal information is encrypted and securely transmitted to authorized government servers. All data is protected under the Information Technology Act, 2000.
                          </p>
                        </div>
                      </div>

                      <form className="space-y-6">
                        {registrationStep === 1 && (
                          <div className="space-y-5 animate-fadeInUp">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>

                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Full Name (as per Aadhaar) *
                              </label>
                              <input
                                type="text"
                                required
                                value={registrationData.fullName}
                                onChange={(e) => handleRegistrationInputChange('fullName', e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Aadhaar Number *
                              </label>
                              <input
                                type="text"
                                required
                                value={registrationData.aadhaar}
                                onChange={(e) => handleRegistrationInputChange('aadhaar', e.target.value)}
                                placeholder="XXXX XXXX XXXX (E-Voting App: 1234 5678 9012)"
                                maxLength={14}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                              />
                              <p className="text-xs text-gray-500 mt-1">E-Voting App Mode: Use 1234 5678 9012</p>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">
                                PAN Card Number *
                              </label>
                              <input
                                type="text"
                                required
                                value={registrationData.pan}
                                onChange={(e) => handleRegistrationInputChange('pan', e.target.value.toUpperCase())}
                                placeholder="ABCDE1234F (E-Voting App: E-Voting App12345P)"
                                maxLength={10}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                              />
                              <p className="text-xs text-gray-500 mt-1">E-Voting App Mode: Use E-Voting App12345P</p>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Date of Birth *
                              </label>
                              <input
                                type="date"
                                required
                                value={registrationData.dob}
                                onChange={(e) => handleRegistrationInputChange('dob', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                              />
                            </div>
                          </div>
                        )}

                        {registrationStep === 2 && (
                          <div className="space-y-5 animate-fadeInUp">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact & Verification Details</h3>

                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Mobile Number (for OTP) *
                              </label>
                              <input
                                type="tel"
                                required
                                value={registrationData.phone}
                                onChange={(e) => handleRegistrationInputChange('phone', e.target.value)}
                                placeholder="+91 XXXXX XXXXX (E-Voting App: +91 9876543210)"
                                maxLength={13}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                              />
                              <p className="text-xs text-gray-500 mt-1">E-Voting App Mode: OTP will be 123456</p>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Email Address (Optional)
                              </label>
                              <input
                                type="email"
                                value={registrationData.email}
                                onChange={(e) => handleRegistrationInputChange('email', e.target.value)}
                                placeholder="your.email@example.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Voter ID Number (if available)
                              </label>
                              <input
                                type="text"
                                value={registrationData.voterId}
                                onChange={(e) => handleRegistrationInputChange('voterId', e.target.value.toUpperCase())}
                                placeholder="ABC1234567 (E-Voting App: VOT1234567)"
                                maxLength={10}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                              />
                              <p className="text-xs text-gray-500 mt-1">Optional: If you already have a voter ID</p>
                            </div>
                          </div>
                        )}

                        {registrationStep === 3 && (
                          <div className="space-y-5 animate-fadeInUp">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Address & Constituency</h3>

                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Residential Address *
                              </label>
                              <textarea
                                required
                                value={registrationData.address}
                                onChange={(e) => handleRegistrationInputChange('address', e.target.value)}
                                placeholder="House No., Street, Locality, City, PIN Code"
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">
                                State *
                              </label>
                              <select
                                required
                                value={registrationData.state}
                                onChange={(e) => handleRegistrationInputChange('state', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                              >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                  <option key={state} value={state}>
                                    {state}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Constituency *
                              </label>
                              <select
                                required
                                value={registrationData.constituency}
                                onChange={(e) => handleRegistrationInputChange('constituency', e.target.value)}
                                disabled={!registrationData.state}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                              >
                                <option value="">Select Constituency</option>
                                {getConstituenciesForState(registrationData.state).map((constituency) => (
                                  <option key={constituency} value={constituency}>
                                    {constituency}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between pt-6 border-t border-gray-200">
                          {registrationStep > 1 && (
                            <button
                              type="button"
                              onClick={handlePreviousStep}
                              className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
                            >
                              <ArrowLeft className="h-5 w-5" />
                              <span>Previous</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={handleNextStep}
                            className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-gray-800 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl ${
                              registrationStep === 1 ? 'ml-auto' : ''
                            }`}
                          >
                            <span>{registrationStep === 3 ? 'Submit & Verify' : 'Next'}</span>
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                      </form>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                          By registering, you agree to our{' '}
                          <a href="#" className="text-blue-600 hover:underline">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </a>
                          . Your data is protected under IT Act 2000.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {showOtpVerification && (
                  <div className="px-8 py-12 text-center animate-fadeInUp">
                    <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Phone className="h-10 w-10 text-blue-600" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">OTP Verification</h3>
                    <p className="text-gray-600 mb-6">
                      A one-time password has been sent to <strong>{registrationData.phone}</strong>
                    </p>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
                      <p className="text-sm text-gray-700">
                        <strong>E-Voting App Mode:</strong> Use OTP: <span className="font-mono font-bold text-blue-600">123456</span>
                      </p>
                    </div>

                    <div className="max-w-xs mx-auto mb-6">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        className="w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => setShowOtpVerification(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
                      >
                        Go Back
                      </button>
                      <button
                        onClick={handleOtpVerification}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-gray-800 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-gray-900 transition-all duration-300 shadow-lg"
                      >
                        Verify OTP
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-6">
                      Didn't receive OTP?{' '}
                      <button className="text-blue-600 hover:underline font-semibold">
                        Resend OTP
                      </button>
                    </p>
                  </div>
                )}

                {registrationComplete && (
                  <div className="px-8 py-12 text-center animate-fadeInUp">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Registration Successful!</h3>
                    <p className="text-lg text-gray-600 mb-6">
                      You are now eligible to participate in online voting.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto mb-8">
                      <h4 className="font-bold text-gray-900 mb-3">Your Registration Details:</h4>
                      <div className="space-y-2 text-sm text-left">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-semibold">{registrationData.fullName || 'E-Voting App Voter'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aadhaar:</span>
                          <span className="font-semibold">XXXX XXXX {registrationData.aadhaar.slice(-4) || '9012'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mobile:</span>
                          <span className="font-semibold">{registrationData.phone || '+91 9876543210'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Constituency:</span>
                          <span className="font-semibold">{registrationData.constituency || 'Mumbai North'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto mb-6">
                      <p className="text-sm text-gray-700">
                        <strong>Important:</strong> You will receive a confirmation email and SMS with your voter credentials shortly. Please keep them safe for future elections.
                      </p>
                    </div>
                    <div className="mb-8">
                      <button
                        onClick={() => setActiveSection('voting')}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-gray-800 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Go to Voting Details
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setActiveSection('home');
                        setRegistrationStep(1);
                        setRegistrationData({
                          fullName: '',
                          aadhaar: '',
                          pan: '',
                          phone: '',
                          email: '',
                          dob: '',
                          voterId: '',
                          address: '',
                          state: '',
                          constituency: '',
                        });
                      }}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-gray-800 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Back to Home
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
      {activeSection === 'voting' && (
        voteSuccess ? (
          <section className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-12 text-center max-w-md mx-auto">
              <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-6 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank you for voting!</h2>
              <p className="text-lg text-gray-700 mb-6">Your  vote has been securely simulated.</p>
              <button onClick={() => setActiveSection('home')} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-gray-800 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl">Return to Home</button>
              <div className="gov-note text-xs text-gray-500 mt-6">This is a nstration of a secure online voting concept. All data, candidates, and votes shown here are fictional and for prototype use only.</div>
            </div>
          </section>
        ) : (
          <section className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-gray-800 px-8 py-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="h-7 w-7 text-white" />
                    <span className="gov-title text-white">Voting Dashboard</span>
                    <span className="gov-badge ml-3"><ShieldCheck className="h-4 w-4 text-blue-600" /> Secure Simulation</span>
                  </div>
                  <span className="text-blue-100 text-xs">Your session is encrypted. This follows government-grade security design standards.</span>
                </div>
                <div className="bg-gray-50 px-8 py-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Voter Details</h3>
                    <div className="text-sm text-gray-700">Name: {registrationData.fullName || 'E-Voting App Voter'}</div>
                    <div className="text-sm text-gray-700">Constituency: {registrationData.constituency || 'Mumbai North'}</div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Select Your Party</h3>
                    <div className="grid gap-4">
                      {[{name:'Bharatiya Janata Party (BJP)',candidate:'Candidate A',icon:<span className='inline-block'><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#F58220"/><path d="M12 7v10M12 7c-2.5 0-4 2-4 4.5 0 2.5 1.5 4.5 4 4.5s4-2 4-4.5c0-2.5-1.5-4.5-4-4.5z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>,id:'bjp'},{name:'Nationalist Congress Party (NCP)',candidate:'Candidate B',icon:<span className='inline-block'><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#1CABE2"/><path d="M12 8v4l3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>,id:'ncp'},{name:'Shiv Sena',candidate:'Candidate C',icon:<span className='inline-block'><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#F9A825"/><path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>,id:'ss'}].map(party => (
                        <label key={party.id} className={`flex items-center gap-4 p-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg hover:bg-gray-100 transition-all cursor-pointer ${selectedParty === party.id ? 'ring-2 ring-blue-600' : ''}`}>
                          <input type="radio" name="party" className="form-radio h-5 w-5 text-blue-600" checked={selectedParty === party.id} onChange={() => setSelectedParty(party.id)} />
                          {party.icon}
                          <span className="font-bold text-gray-900">{party.name}</span>
                          <span className="text-gray-700">{party.candidate}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Time Remaining</h3>
                    <div className="flex items-center gap-3">
                      <Clock className="h-6 w-6 text-blue-600" />
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-600 h-3 rounded-full" style={{width: `${(votingTime/30)*100}%`}}></div>
                      </div>
                      <span className="text-sm text-gray-700">{votingTime}s</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">You have 30 seconds to cast your vote.</div>
                    {voteTimeout && (
                      <div className="mt-4 text-red-600 font-semibold">Time limit exceeded. Please log in again to cast your vote.</div>
                    )}
                  </div>
                  <div className="mb-8">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-gray-800 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl" disabled={voteTimeout || !selectedParty} onClick={() => setVoteSuccess(true)}>Confirm My Vote</button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                    <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300">Download E-Voting App Acknowledgment Slip (PDF)</button>
                    <button onClick={() => setActiveSection('home')} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-gray-800 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-gray-900 transition-all duration-300">Return to Home</button>
                  </div>
                  <div className="gov-note text-xs text-gray-500 mt-4">This is a nstration of a secure online voting concept. All data, candidates, and votes shown here are fictional and for prototype use only.</div>
                </div>
              </div>
            </div>
          </section>
        ))}

      <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-white p-2 rounded-lg animate-float">
                  <Vote className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">E-voting App</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering Indian E-Voting App through secure, accessible, and transparent online voting.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => handleNavClick('home')} className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('about')} className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('how-it-works')} className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('security')} className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    Security
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => handleNavClick('benefits')} className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    Benefits
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('faq')} className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    FAQ
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('contact')} className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Helpline: 1800-XXX-XXXX</li>
                <li>support@securevoteindia.gov.in</li>
                <li>Election Commission of India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 E-Voting App. A Government of India Initiative. All rights reserved.</p>
            <p className="mt-2">Approved by Election Commission of India | Secured by National Informatics Centre</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
