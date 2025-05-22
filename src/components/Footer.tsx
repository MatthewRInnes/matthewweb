import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Facebook, Instagram, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const Footer = () => {
  const socialLinks = [
    { 
      icon: <Github size={22} className="transition-transform hover:scale-110" />, 
      url: 'https://github.com', 
      ariaLabel: 'Visit Matthew\'s GitHub profile',
      name: 'GitHub'
    },
    { 
      icon: <Linkedin size={22} className="transition-transform hover:scale-110" />, 
      url: 'https://linkedin.com', 
      ariaLabel: 'Connect with Matthew on LinkedIn',
      name: 'LinkedIn'
    },
    { 
      icon: <Facebook size={22} className="transition-transform hover:scale-110" />, 
      url: 'https://facebook.com', 
      ariaLabel: 'Follow Matthew on Facebook',
      name: 'Facebook'
    },
    { 
      icon: <Instagram size={22} className="transition-transform hover:scale-110" />, 
      url: 'https://www.instagram.com/innes_matthew/', 
      ariaLabel: 'Follow Matthew on Instagram',
      name: 'Instagram'
    },
  ];

  const contactInfo = [
    {
      icon: <Phone size={18} />,
      text: '+447879959625',
      url: 'tel:+447879959625'
    },
    {
      icon: <Mail size={18} />,
      text: 'aideveloper@matthewweb.com',
      url: 'mailto:aideveloper@matthewweb.com'
    }
  ];

  const currentYear = new Date().getFullYear();

  // Create refs for footer sections with higher threshold
  const footerRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.5 });
  const socialRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.5 });
  const contactRef = useIntersectionObserver({ direction: 'bottom', threshold: 0.5 });
  
  // Typewriter effect states
  const [emailText, setEmailText] = useState('');
  const [phoneText, setPhoneText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  // Start typewriter effect only when footer is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (footerRef.ref.current) {
      observer.observe(footerRef.ref.current);
    }

    return () => {
      if (footerRef.ref.current) {
        observer.unobserve(footerRef.ref.current);
      }
    };
  }, [footerRef.ref]);

  // Typewriter effect for contact info
  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const fullText = contactInfo[1].text; // Email
    const phoneText = contactInfo[0].text; // Phone

    const emailInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setEmailText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(emailInterval);
        // Start phone number typing after email is done
        let phoneIndex = 0;
        const phoneInterval = setInterval(() => {
          if (phoneIndex <= phoneText.length) {
            setPhoneText(phoneText.slice(0, phoneIndex));
            phoneIndex++;
          } else {
            clearInterval(phoneInterval);
          }
        }, 100);
      }
    }, 100);

    return () => {
      clearInterval(emailInterval);
    };
  }, [isVisible]);

  return (
    <footer 
      ref={footerRef.ref}
      className={`py-12 bg-background dark:bg-navy/30 text-foreground dark:text-lightSlate border-t border-border dark:border-slate/20 transition-all duration-1000 ${footerRef.className}`}
    >
      {/* Back to Top Arrow - bottom left */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-teal text-white shadow-lg hover:bg-teal/80 transition-colors duration-300"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
      >
        {/* Upwards arrow icon using SVG for clarity */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left column - Brand */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold mb-4">
              <img 
                src="/assets/images/logo.png"
                alt="Matthew Innes Logo" 
                className="h-16 w-16 md:h-20 md:w-20 hover:scale-110 transition-transform duration-300"
              />
            </Link>
            <p className="text-sm text-foreground dark:text-lightSlate mb-6 font-medium">
              Designing and building beautiful digital experiences that help businesses grow.
            </p>
          </div>
          
          {/* Middle column - Contact */}
          <div ref={contactRef.ref} className={`transition-all duration-1000 ${contactRef.className}`}>
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-lightestSlate">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <span className="mr-3 bg-secondary dark:bg-navy/60 p-2 rounded-full text-teal">
                  <Phone size={18} />
                </span>
                <span className="text-foreground dark:text-lightSlate font-medium">
                  {phoneText}
                </span>
              </li>
              <li className="flex items-center text-sm">
                <span className="mr-3 bg-secondary dark:bg-navy/60 p-2 rounded-full text-teal">
                  <Mail size={18} />
                </span>
                <span className="text-foreground dark:text-lightSlate font-medium">
                  {emailText}
                </span>
              </li>
            </ul>
          </div>
          
          {/* Right column - Social */}
          <div ref={socialRef.ref} className={`transition-all duration-1000 ${socialRef.className}`}>
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-lightestSlate">Connect</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="bg-secondary dark:bg-navy/60 hover:bg-primary/10 dark:hover:bg-teal/10 p-3 rounded-full text-foreground dark:text-lightSlate hover:text-teal dark:hover:text-teal transition-all duration-300"
                  title={link.name}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-border dark:border-slate/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-medium text-foreground dark:text-lightSlate">
            Designed & Built by Matthew R Innes
          </p>
          
          <p className="text-sm mt-4 md:mt-0 text-foreground dark:text-lightSlate font-medium">
            © {currentYear} All Rights Reserved
          </p>
        </div>
        
        <div className="mt-6 text-center text-xs text-foreground dark:text-lightSlate font-medium mb-24 sm:mb-6">
          <p>This site is optimised for all modern browsers and devices.</p>
          <div className="mt-2 flex flex-col md:flex-row gap-2 justify-center items-center">
            <Link to="/terms-and-conditions" className="underline hover:text-teal">Terms & Conditions</Link>
            <span className="hidden md:inline">|</span>
            <Link to="/privacy-policy" className="underline hover:text-teal">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
