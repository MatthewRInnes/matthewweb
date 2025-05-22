import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaMinus, FaPaperPlane } from 'react-icons/fa';

// Define the Message type for our chat
type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  options?: string[];
};

// Initial bot message with options
const initialMessage: Message = {
  id: 1,
  text: "Hello! I'm your AI assistant, available 24/7. How may I assist you today?",
  sender: 'bot',
  options: [
    'Tell me about your services',
    'How can I contact you?',
    'Show me your portfolio',
    'What are your business hours?',
    'Terms & Conditions',
    'Privacy Policy'
  ]
};

// Add price tiers for each service
const priceTiers = {
  'web development': `**Web Development**\n• Basic: £300 – One-page site or landing page\n• Standard: £750 – 5-page responsive site\n• Premium: £1,300+ – Full-stack web application`,
  'database design': `**Database Design**\n• Basic: £150 – Simple schema for small apps\n• Standard: £400 – Relational DB with normalisation\n• Premium: £850+ – Scalable DB with backups & optimisations`,
  'ui/ux design': `**UI/UX Design**\n• Basic: £200 – 1-2 screens, wireframe only\n• Standard: £500 – Full desktop/mobile mockups\n• Premium: £1,200+ – Full design system + prototyping`,
  'backend development': `**Backend Development**\n• Basic: £300 – API setup (CRUD)\n• Standard: £800 – Auth, payments, custom endpoints\n• Premium: £1,500+ – Full backend system with integrations`,
  'mobile development': `**Mobile Development**\n• Basic: £400 – Single-screen cross-platform app\n• Standard: £900 – Multi-page app with data sync\n• Premium: £2,000+ – Full-featured mobile app with API`,
  'cloud solutions': `**Cloud Solutions**\n• Basic: £200 – Hosting & deployment\n• Standard: £600 – Scalable deployment & storage\n• Premium: £1,200+ – Full CI/CD pipeline & monitoring`,
  'security': `**Security**\n• Basic: £150 – Basic audit\n• Standard: £500 – SSL, firewall, login security\n• Premium: £1,000+ – Full compliance & threat detection`,
  'performance optimisation': `**Performance Optimisation**\n• Basic: £100 – Page load analysis\n• Standard: £300 – Code & asset optimisation\n• Premium: £800+ – Deep profiling & infra scaling`,
  'api integration': `**API Integration**\n• Basic: £150 – Single API integration\n• Standard: £400 – Multiple APIs + data formatting\n• Premium: £900+ – Complex, real-time integrations`,
  'e-commerce solutions': `**E-commerce Solutions**\n• Basic: £500 – Basic store setup (Shopify, WooCommerce)\n• Standard: £1,200 – Custom e-commerce website\n• Premium: £2,500+ – Full e-commerce platform with CMS`,
  'brand strategy': `**Brand Strategy & Development**\n• Basic: £250 – Brand moodboard + colours\n• Standard: £650 – Full brand kit with logo\n• Premium: £1,500+ – Brand strategy & messaging`,
  'social media': `**Social Media Packs**\n• Basic: £100 – 5 graphics\n• Standard: £300 – 15 posts + calendar\n• Premium: £750+ – Monthly management + analytics`,
  'content creation': `**Content Creation**\n• Basic: £50 – Blog/article (500 words)\n• Standard: £120 – SEO-rich blog (1000+ words)\n• Premium: £300+ – Strategy + content series`,
  'email marketing': `**Email Marketing**\n• Basic: £75 – 1 campaign email\n• Standard: £200 – 4-part series + tracking\n• Premium: £600+ – Monthly campaigns + automation`,
  'ai & machine learning': `**AI & Machine Learning**\n• Basic: £400 – Data prep + simple model\n• Standard: £1,200 – Predictive model with testing\n• Premium: £3,000+ – Custom solution with dashboard`,
  'chatbot development': `**Chatbot Development**\n• Basic: £200 – Simple FAQ bot\n• Standard: £600 – Flow-based chatbot with logic\n• Premium: £1,200+ – AI chatbot with NLP & integrations`,
  'automation services': `**Automation Services**\n• Basic: £250 – 1 simple automated workflow\n• Standard: £700 – Multi-step logic-based workflows\n• Premium: £1,800+ – Full business process automation`,
	'motion graphics': `**Motion Graphics**\n• Basic: £100 – 10–15 sec animation\n• Standard: £500 – Explainer (30–60 sec)\n• Premium: £1,000+ – Full promo or animation package`,
  'information graphics': `**Information Graphics**\n• Basic: £100 – 1 static infographic\n• Standard: £250 – Interactive dashboard graphics\n• Premium: £600+ – Full report or data pack visuals`,
  'audio branding': `**Audio Branding**\n• Basic: £150 – Logo sting/jingle\n• Standard: £400 – Voiceover + sound elements\n• Premium: £1,000+ – Full sonic branding`,
  'training & workshops': `**Training & Workshops**\n• Basic: £100 – 1-hour online session\n• Standard: £350 – Half-day workshop\n• Premium: £800+ – Full-day custom training`,
  'accessibility services': `**Accessibility Services**\n• Basic: £100 – Site accessibility report\n• Standard: £400 – Fix common accessibility issues\n• Premium: £1,000+ – Full compliance & assistive tech integration`,
  'penetration testing': `**Penetration Testing**\n• Basic: £300 – Surface-level scan\n• Standard: £750 – Internal & external test\n• Premium: £1,800+ – Full audit & compliance reporting`,
  'gdpr compliance': `**GDPR Compliance**\n• Basic: £150 – GDPR audit checklist\n• Standard: £500 – Policy creation & integration\n• Premium: £1,200+ – Full compliance implementation`,
};

// Define responses for different topics
const responses = {
  services: "We offer a comprehensive range of services including web development, digital design, and creative solutions. Our services are divided into several categories: Technical Development, Creative & Marketing, Advanced Tech & AI, and Specialist Design. Which area would you like to know more about?",
  
  technical: "Our technical development services include:\n• Web Development - Responsive and modern web applications\n• Database Design - Efficient and scalable solutions\n• Backend Development - Robust server-side applications\n• Mobile Development - Cross-platform iOS and Android apps\n• Cloud Solutions - Scalable cloud-based implementations\n• API Integration - Seamless third-party service integration\n• E-commerce Solutions - Custom online store development",
  
  creative: "Our creative and marketing services include:\n• Brand Strategy & Development\n• Social Media Management\n• Content Creation (Blogs, SEO, Copywriting)\n• Email Marketing Campaigns\n• Motion Graphics\n• Information Graphics\n• Audio Branding",
  
  tech: "Our advanced technology services include:\n• AI & Machine Learning Solutions\n• Intelligent Chatbot Development\n• Business Process Automation\n• Performance Optimisation\n• Security & Penetration Testing\n• GDPR Compliance",
  
  specialist: "Our specialist design services include:\n• UI/UX Design\n• Motion Graphics\n• Information Graphics\n• Audio Branding\n• Accessibility Services\n• Training & Workshops",
  
  contact: `You can reach me directly any time:\n\n• Email: [matthewinnes42@gmail.com]\n• Telephone: [07879959625]\n\nAlternatively, you can use the contact form on my website or connect via social media. I look forward to hearing from you!`,
  
  portfolio: "Our portfolio showcases our latest projects across various categories:\n• Web Development Projects\n• Mobile Applications\n• E-commerce Solutions\n• AI & Automation Projects\n• Creative Design Work\n• Brand Development Cases\nWould you like to see examples from any specific category?",
  
  hours: "We're available 24/7 to assist you with any queries or support you may need. Our team works across different time zones to ensure we can help you whenever you need us.",
  
  pricing: "Our pricing structure is flexible and tailored to your specific needs. We offer:\n• Project-based pricing\n• Retainer packages\n• Hourly rates\n• Custom solutions\nWould you like to discuss your specific requirements?",
  
  process: "Our development process follows these key steps:\n1. Initial Consultation\n2. Requirements Analysis\n3. Proposal & Planning\n4. Development & Design\n5. Testing & Quality Assurance\n6. Deployment & Launch\n7. Ongoing Support",
  
  terms: `Terms & Conditions\n\nBy using this website, you agree to the following:\n• All content is for general information only and may be subject to change.\n• You must not misuse the website or attempt unauthorised access.\n• Intellectual property rights for all content belong to Matthew Innes unless otherwise stated.\n• We are not liable for any loss or damage arising from use of this site.\n• These terms are governed by the laws of England and Wales.`,
  privacy: `Privacy Policy\n\n• We collect only the personal data necessary to provide our services (such as your name, email, and contact details).\n• Your data is processed in accordance with the UK GDPR and Data Protection Act 2018.\n• We do not share your personal data with third parties except as required by law or to provide our services.\n• You have the right to access, correct, or request deletion of your data at any time.\n• For any privacy concerns, please contact matthewinnes42@gmail.com.`,
  
  default: "I'm here to help! What would you like to know more about? You can ask about our services, portfolio, pricing, or how to get started."
};

export default function Chatbot() {
  // State management for the chat
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user'
      };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: responses.default,
          sender: 'bot',
          options: ['Services', 'Contact', 'Portfolio', 'Business Hours']
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  // Update the handleQuickReply function to show price tiers if a user asks for pricing or selects 'Show me prices'
  const handleQuickReply = (option: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: option,
      sender: 'user'
    };
    setMessages([...messages, newMessage]);

    const opt = option.toLowerCase();

    // If user selects 'Back to main menu', reset to initial greeting and options
    if (opt.includes('back to main menu')) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: initialMessage.text,
            sender: 'bot',
            options: initialMessage.options
          }
        ]);
      }, 800);
      return;
    }

    // Check if the user is asking for a price for a specific service
    for (const key in priceTiers) {
      if (opt.includes(key)) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            text: priceTiers[key],
            sender: 'bot',
            options: ['Back to main menu']
          }]);
        }, 800);
        return;
      }
    }

    // Get appropriate response based on the option
    let responseText = responses.default;
    let responseOptions = ['More details', 'Contact', 'Back to main menu'];

    if (opt.includes('service')) {
      responseText = responses.services;
      responseOptions = ['Technical Development', 'Creative & Marketing', 'Advanced Tech', 'Specialist Design', 'Show me prices', 'Back to main menu'];
    } else if (opt.includes('technical')) {
      responseText = responses.technical;
      responseOptions = ['Web Development', 'Mobile Development', 'Cloud Solutions', 'Show me prices', 'Back to main menu'];
    } else if (opt.includes('creative')) {
      responseText = responses.creative;
      responseOptions = ['Brand Strategy', 'Social Media', 'Content Creation', 'Show me prices', 'Back to main menu'];
    } else if (opt.includes('tech') || opt.includes('ai')) {
      responseText = responses.tech;
      responseOptions = ['AI & Machine Learning', 'Chatbot Development', 'Automation Services', 'Show me prices', 'Back to main menu'];
    } else if (opt.includes('specialist') || opt.includes('design')) {
      responseText = responses.specialist;
      responseOptions = ['UI/UX Design', 'Motion Graphics', 'Accessibility Services', 'Show me prices', 'Back to main menu'];
    } else if (opt.includes('contact')) {
      responseText = responses.contact;
      responseOptions = ['Email', 'Phone', 'Contact Form', 'Back to main menu'];
    } else if (opt.includes('portfolio')) {
      responseText = responses.portfolio;
      responseOptions = ['Web Projects', 'Mobile Apps', 'Design Work', 'Back to main menu'];
    } else if (opt.includes('hour')) {
      responseText = responses.hours;
      responseOptions = ['Support Hours', 'Emergency Contact', 'Back to main menu'];
    } else if (opt.includes('price') || opt.includes('cost') || opt.includes('pricing')) {
      // If user asks for pricing in general, show a summary and suggest to pick a service
      responseText = 'I offer three price tiers (Basic, Standard, Premium) for each service. Please select a service to see its price breakdown.';
      responseOptions = [
        'Web Development', 'Database Design', 'UI/UX Design', 'Backend Development', 'Mobile Development', 'Cloud Solutions', 'Security', 'Performance Optimisation', 'API Integration', 'E-commerce Solutions',
        'Brand Strategy', 'Social Media', 'Content Creation', 'Email Marketing',
        'AI & Machine Learning', 'Chatbot Development', 'Automation Services',
        'Motion Graphics', 'Information Graphics', 'Audio Branding',
        'Training & Workshops', 'Accessibility Services', 'Penetration Testing', 'GDPR Compliance',
        'Back to main menu'
      ];
    } else if (opt.includes('process') || opt.includes('how')) {
      responseText = responses.process;
      responseOptions = ['Get Started', 'Request Quote', 'Back to main menu'];
    } else if (opt.includes('terms')) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: responses.terms,
            sender: 'bot',
            options: ['Back to main menu']
          }
        ]);
      }, 800);
      return;
    } else if (opt.includes('privacy')) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: responses.privacy,
            sender: 'bot',
            options: ['Back to main menu']
          }
        ]);
      }, 800);
      return;
    }

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        options: responseOptions
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button - always bottom-right */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg animate-bounce-slow flex items-center gap-2"
          aria-label="Open chat"
        >
          <FaRobot className="w-8 h-8" />
          <span className="font-semibold text-lg">Chat 24/7</span>
        </button>
      )}

      {/* Chat window - centred on mobile, bottom-right on desktop */}
      {isOpen && (
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-background dark:bg-card border border-border rounded-lg shadow-xl w-full max-w-md min-w-[320px] max-h-[80vh] flex flex-col transition-all duration-300 sm:right-4 sm:left-auto sm:translate-x-0"
          style={{ zIndex: 9999 }}
        >
          {/* Chat header */}
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaRobot className="w-5 h-5" />
              <h3 className="font-semibold">24/7 AI Assistant</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/10 p-1 rounded"
                aria-label={isMinimized ? "Maximise chat" : "Minimise chat"}
              >
                <FaMinus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1 rounded"
                aria-label="Close chat"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat messages - scrollable if content exceeds max height */}
          <div
            className={`p-4 space-y-4 flex-1 overflow-y-auto transition-all duration-300 ${
              isMinimized ? 'h-0' : ''
            }`}
            style={{ minHeight: isMinimized ? 0 : 200 }}
          >
            <div className="flex flex-col justify-end min-h-[200px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate'
                    }`}
                  >
                    <p className="whitespace-pre-line break-words break-all">{message.text}</p>
                    {message.options && message.sender === 'bot' && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(option)}
                            className="bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white font-semibold px-4 py-2 rounded-full transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat input */}
          {!isMinimized && (
            <div className="p-4 border-t border-border">
              {/* Flex container with w-full to prevent overflow */}
              <div className="flex w-full gap-2 overflow-hidden">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-background dark:bg-navy/60 text-foreground dark:text-lightSlate border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 min-w-0"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 transition-colors flex-shrink-0 min-w-[44px]"
                  aria-label="Send message"
                >
                  <FaPaperPlane className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 