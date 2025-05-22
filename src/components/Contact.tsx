import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Form validation
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please complete all fields");
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }
      
      // Send the form data
      const response = await fetch("https://formsubmit.co/aideveloper@matthewweb.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact: Message from ${formData.name}`,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      // Reset form after successful submission
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <Github size={20} />, url: 'https://github.com', label: 'GitHub' },
    { icon: <Linkedin size={20} />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Mail size={20} />, url: 'mailto:aideveloper@matthewweb.com', label: 'Email' },
  ];

  return (
    <section id="contact" className="py-16 bg-background dark:bg-navy">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12 text-center">
          <p className="text-teal mb-2">05. What's Next?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-lightestSlate mb-4">Get In Touch</h2>
          <p className="text-foreground dark:text-lightSlate max-w-xl mb-8 font-medium">
            I'm currently looking for new opportunities. Whether you have a question or just want to ask advice, drop me a message and I will be sure to get back to you!
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white dark:bg-navy/40 p-8 rounded-lg border border-border dark:border-slate/20 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground dark:text-lightSlate mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-background/50 dark:bg-navy/60 border-border dark:border-slate/30 focus:border-teal text-foreground dark:text-lightSlate"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground dark:text-lightSlate mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-background/50 dark:bg-navy/60 border-border dark:border-slate/30 focus:border-teal text-foreground dark:text-lightSlate"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground dark:text-lightSlate mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full min-h-[150px] bg-background/50 dark:bg-navy/60 border-border dark:border-slate/30 focus:border-teal text-foreground dark:text-lightSlate"
                placeholder="Your message"
              />
            </div>
            <div className="flex justify-center">
              <Button 
                type="submit"
                className="bg-teal hover:bg-teal/90 text-navy px-8 py-6 text-lg flex items-center"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
          
          <div className="mt-16 flex justify-center">
            <div className="flex space-x-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground dark:text-lightSlate hover:text-teal dark:hover:text-teal transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
