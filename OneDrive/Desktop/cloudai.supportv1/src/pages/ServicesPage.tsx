import React from "react";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Code, MonitorSmartphone, Palette, Globe, Shield, Target,
  CheckCircle, LucideIcon, Laptop, Figma, BarChart4, Layers,
  Headphones, ShieldCheck, LockKeyhole, Search, LineChart, 
  Terminal, FileCode, Layout as LayoutIcon, PenTool, Smartphone,
  Rocket, Repeat, Zap, FileImage, Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/Animation/AnimatedSection";
import { StaggeredContainer } from "@/components/Animation/StaggeredContainer";

interface ServiceFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ServicePlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: ServiceFeature[];
  imageSrc: string;
}

const webDevFeatures: ServiceFeature[] = [
  {
    title: "Responsive Web Design",
    description: "Mobile-first design approach ensuring your website looks and functions perfectly on all devices and screen sizes.",
    icon: MonitorSmartphone,
  },
  {
    title: "Front-end Development",
    description: "Modern, interactive user interfaces built with React, Vue, or Angular with smooth animations and intuitive navigation.",
    icon: Code,
  },
  {
    title: "Back-end Development",
    description: "Robust, scalable server-side solutions with Node.js, Python, or PHP to power your web applications.",
    icon: Terminal,
  },
  {
    title: "E-commerce Solutions",
    description: "Custom online stores with secure payment processing, inventory management, and seamless checkout experiences.",
    icon: Laptop,
  },
];

const webDesignFeatures: ServiceFeature[] = [
  {
    title: "UI/UX Design",
    description: "User-centered design that balances beautiful aesthetics with intuitive functionality to create engaging experiences.",
    icon: Palette,
  },
  {
    title: "Wireframing & Prototyping",
    description: "Detailed wireframes and interactive prototypes that visualize your website before development begins.",
    icon: Figma,
  },
  {
    title: "Brand Identity Integration",
    description: "Seamless incorporation of your brand colors, typography, and visual elements for a cohesive online presence.",
    icon: PenTool,
  },
  {
    title: "Visual Design",
    description: "Eye-catching, modern visual designs that communicate your message effectively and leave a lasting impression.",
    icon: FileImage,
  },
];

const cyberSecurityFeatures: ServiceFeature[] = [
  {
    title: "Security Assessments",
    description: "Comprehensive evaluation of your website's vulnerabilities, with detailed reports and remediation recommendations.",
    icon: Shield,
  },
  {
    title: "Data Protection",
    description: "Implementation of robust encryption and secure data handling practices to protect sensitive information.",
    icon: LockKeyhole,
  },
  {
    title: "Security Monitoring",
    description: "Ongoing monitoring for unusual activity with real-time alerts and rapid response to potential threats.",
    icon: ShieldCheck,
  },
  {
    title: "Compliance Guidance",
    description: "Expert advice on meeting industry security standards and regulations like GDPR, HIPAA, and PCI-DSS.",
    icon: Repeat,
  },
];

const seoFeatures: ServiceFeature[] = [
  {
    title: "Keyword Strategy",
    description: "Data-driven keyword research and implementation strategy to target terms your potential customers are searching for.",
    icon: Search,
  },
  {
    title: "Technical SEO",
    description: "Optimization of your website's technical aspects including site speed, mobile-friendliness, and structured data.",
    icon: Settings,
  },
  {
    title: "Content Optimization",
    description: "Strategic creation and enhancement of content to boost search rankings while engaging your audience.",
    icon: FileCode,
  },
  {
    title: "Performance Analytics",
    description: "Regular reporting on your site's search performance with actionable insights for continuous improvement.",
    icon: LineChart,
  },
];

const templateGraphicsFeatures: ServiceFeature[] = [
  {
    title: "Website Templates",
    description: "Premium, customizable website templates designed for various industries with modern aesthetics and functionality.",
    icon: LayoutIcon,
  },
  {
    title: "Custom Graphics",
    description: "Bespoke graphic designs tailored to your brand including logos, icons, illustrations, and marketing materials.",
    icon: Layers,
  },
  {
    title: "Mobile App UI Kits",
    description: "Ready-to-use interface components and screens for mobile applications with consistent design language.",
    icon: Smartphone,
  },
  {
    title: "Animation & Interaction",
    description: "Engaging motion graphics and interactive elements that bring your digital presence to life.",
    icon: Zap,
  },
];

const serviceCategories: ServiceCategory[] = [
  {
    id: "webdev",
    title: "Web Development",
    description: "Professional, custom website development using the latest technologies to create fast, secure, and scalable web solutions.",
    icon: Code,
    features: webDevFeatures,
    imageSrc: "/images/web-development.jpg",
  },
  {
    id: "webdesign",
    title: "Web Design",
    description: "Beautiful, intuitive website designs that reflect your brand identity and enhance user experience.",
    icon: Palette,
    features: webDesignFeatures,
    imageSrc: "/images/web-design.jpg",
  },
  {
    id: "cybersecurity",
    title: "Cyber Security",
    description: "Comprehensive protection for your digital assets and sensitive information against modern cyber threats.",
    icon: Shield,
    features: cyberSecurityFeatures,
    imageSrc: "/images/cyber-security.jpg",
  },
  {
    id: "seo",
    title: "SEO Services",
    description: "Data-driven strategies to improve your online visibility and drive organic traffic to your website.",
    icon: Target,
    features: seoFeatures,
    imageSrc: "/images/seo-services.jpg",
  },
  {
    id: "templates",
    title: "Templates & Graphics",
    description: "Premium website templates and custom graphics to elevate your brand's visual presence.",
    icon: LayoutIcon,
    features: templateGraphicsFeatures,
    imageSrc: "/images/templates-graphics.jpg",
  },
];

const servicePlans: ServicePlan[] = [
  {
    name: "Basic",
    price: "$999",
    description: "Perfect for small business websites",
    features: [
      "5-page responsive website",
      "Basic SEO optimization",
      "Contact form integration",
      "Mobile-friendly design",
      "3 rounds of revisions",
      "1 month of security monitoring",
    ],
  },
  {
    name: "Professional",
    price: "$2,499",
    description: "Ideal for growing businesses",
    features: [
      "10-page custom website",
      "Advanced SEO package",
      "Content management system",
      "E-commerce functionality (up to 50 products)",
      "Custom graphics and animations",
      "Social media integration",
      "3 months of security monitoring",
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "$4,999+",
    description: "Comprehensive solution for large businesses",
    features: [
      "Unlimited pages with custom functionality",
      "Complete SEO & digital marketing strategy",
      "Custom web application development",
      "Full e-commerce solution with inventory management",
      "Premium security package with regular audits",
      "Dedicated support team",
      "6 months of maintenance included",
    ],
  },
];

const faqItems = [
  {
    question: "How long does it take to develop a website?",
    answer: "Development time varies based on complexity and scope. A simple website typically takes 2-4 weeks, while larger projects with custom functionality may take 2-3 months. During our initial consultation, we'll provide a specific timeline tailored to your project requirements.",
  },
  {
    question: "Do you offer website maintenance after the site launch?",
    answer: "Yes, we offer several maintenance packages to keep your site secure, updated, and performing optimally. These include regular updates, security monitoring, content updates, and technical support. You can select a maintenance plan that fits your needs and budget.",
  },
  {
    question: "What do your SEO services include?",
    answer: "Our comprehensive SEO services include keyword research, on-page optimization, technical SEO improvements, content strategy, competitor analysis, local SEO, regular performance reporting, and ongoing optimization based on analytics. We focus on sustainable, white-hat techniques that deliver long-term results.",
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Absolutely! We specialize in website redesigns that improve both aesthetics and functionality. We'll evaluate your current site, identify areas for improvement, and create a modern, effective design while preserving or enhancing your existing content and SEO value.",
  },
  {
    question: "Do you offer hosting services for websites?",
    answer: "Yes, we provide reliable, secure hosting solutions optimized for performance. Our hosting packages include regular backups, security monitoring, and technical support. We can also work with your existing hosting provider if you prefer.",
  },
  {
    question: "What cyber security measures do you implement for websites?",
    answer: "Our cyber security services include SSL certificate implementation, secure coding practices, malware scanning and removal, firewall configuration, regular security audits, data encryption, secure user authentication, and protection against common vulnerabilities like SQL injection and XSS attacks.",
  },
  {
    question: "Can I purchase templates and customize them myself?",
    answer: "Yes! We offer a wide range of professional templates that you can purchase and customize yourself. Each template comes with documentation and setup instructions. We also offer template customization services if you need assistance tailoring them to your specific needs.",
  },
];

const ServicesPage = () => {
  return (
    <Layout>
      <AnimatedSection direction="up">
        <section className="bg-gradient-to-br from-shop-primary via-shop-primary/90 to-shop-secondary/80 py-16 dark:bg-gradient-mesh-dark">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 text-white mb-8 lg:mb-0">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">Creative Web Solutions</h1>
                <p className="text-white/90 text-lg mb-8 max-w-lg">
                  From stunning designs to powerful functionality, we build digital experiences that transform businesses and engage audiences.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-shop-primary"
                    asChild
                  >
                    <Link to="#explore">Explore Services</Link>
                  </Button>
                  <Button 
                    variant="default"
                    className="bg-shop-secondary hover:bg-shop-secondary/90" 
                    asChild
                  >
                    <Link to="#pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center lg:justify-end">
                <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
                  <img 
                    src="/images/web-development.jpg" 
                    alt="Web Development Services" 
                    className="w-full max-w-md rounded-md shadow-lg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection direction="up">
        <section id="explore" className="py-16 bg-gradient-pastel dark:bg-gradient-to-br dark:from-shop-dark/90 dark:to-shop-dark">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-shop-primary dark:text-white mb-4">Our Digital Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive web solutions to help your business succeed online, from design and development to security and marketing.
              </p>
            </div>
            
            <Tabs defaultValue="webdev" className="w-full">
              <TabsList className="grid grid-cols-5 mb-8">
                {serviceCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-base py-3">
                    <category.icon className="w-5 h-5 mr-2" />
                    <span className="hidden sm:inline">{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {serviceCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    <div className="space-y-4 order-2 md:order-1">
                      <h3 className="text-2xl font-bold text-shop-primary dark:text-white flex items-center">
                        <category.icon className="w-6 h-6 mr-2 text-shop-secondary" />
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground">{category.description}</p>
                      
                      <div className="mt-6 space-y-6">
                        {category.features.slice(0, 2).map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <div className="mr-4 mt-1 bg-shop-light dark:bg-shop-dark/50 p-2 rounded-full">
                              <feature.icon className="h-5 w-5 text-shop-secondary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-shop-primary dark:text-white">{feature.title}</h4>
                              <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="order-1 md:order-2 mb-8 md:mb-0">
                      <div className="glass rounded-lg overflow-hidden shadow-lg h-full">
                        <img 
                          src={category.imageSrc} 
                          alt={category.title} 
                          className="w-full h-56 object-cover object-center" 
                        />
                      </div>
                    </div>
                  </div>

                  <StaggeredContainer className="grid gap-8 md:grid-cols-2 mt-8">
                    {category.features.slice(2).map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="mr-4 mt-1 bg-shop-light dark:bg-shop-dark/50 p-2 rounded-full">
                          <feature.icon className="h-5 w-5 text-shop-secondary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-shop-primary dark:text-white">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </StaggeredContainer>
                  
                  <div className="mt-12 flex justify-center">
                    <Button className="bg-shop-secondary hover:bg-shop-secondary/90">
                      Learn More About {category.title}
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection direction="up">
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-shop-primary dark:text-white mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse a selection of our recent work and see how we've helped businesses transform their digital presence.
              </p>
            </div>
          
            <StaggeredContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} className="overflow-hidden card-hover backdrop-blur-sm dark:bg-shop-dark/50">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={`/images/project-${item}.jpg`}
                      alt={`Project ${item}`}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Project Title {item}</CardTitle>
                    <CardDescription>Web Design & Development</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm">
                      A custom {item % 2 === 0 ? 'e-commerce' : 'corporate'} website with modern design and seamless functionality.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection direction="up">
        <section id="pricing" className="py-16 bg-gradient-pastel dark:bg-shop-dark/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-shop-primary dark:text-white mb-4">Web Development Packages</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect service package that fits your business needs and budget.
              </p>
            </div>
          
            <StaggeredContainer className="grid gap-8 md:grid-cols-3">
              {servicePlans.map((plan) => (
                <Card key={plan.name} className={`${
                  plan.recommended 
                    ? 'border-shop-secondary shadow-lg relative overflow-hidden dark:border-shop-secondary/70' 
                    : 'dark:bg-shop-dark/50'
                } transition-all hover:shadow-md backdrop-blur-sm`}>
                  {plan.recommended && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-shop-secondary text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                        Recommended
                      </div>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {plan.name}
                      <span className="text-shop-secondary font-bold">{plan.price}</span>
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-shop-secondary mr-2 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className={plan.recommended 
                        ? "w-full bg-shop-secondary hover:bg-shop-secondary/90" 
                        : "w-full bg-gradient-to-r from-shop-secondary to-shop-accent hover:opacity-90"
                      }
                    >
                      Choose {plan.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </StaggeredContainer>

            <AnimatedSection direction="up" delay={0.4}>
              <div className="mt-12 text-center">
                <p className="mb-4 text-muted-foreground">
                  Need something custom? Contact us for a tailored solution.
                </p>
                <Button 
                  variant="outline" 
                  className="border-shop-secondary text-shop-secondary hover:bg-shop-secondary hover:text-white"
                >
                  Request Custom Quote
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection direction="up">
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-shop-primary dark:text-white mb-4">Our Development Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A transparent, collaborative approach to creating your perfect website.
              </p>
            </div>
          
            <StaggeredContainer className="grid gap-8 md:grid-cols-4">
              {[
                { title: "Discovery & Planning", desc: "We learn about your business goals and plan the perfect solution." },
                { title: "Design & Prototyping", desc: "We create visual designs and interactive prototypes for your approval." },
                { title: "Development", desc: "Our developers bring the design to life with clean, efficient code." },
                { title: "Launch & Support", desc: "We deploy your site and provide ongoing maintenance and support." }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-shop-secondary/20 to-shop-accent/20 dark:bg-shop-dark/50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-shop-primary dark:text-white">{index + 1}</span>
                  </div>
                  <h3 className="font-bold mb-2 text-shop-primary dark:text-white">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection direction="up">
        <section className="py-16 bg-gradient-pastel dark:bg-shop-dark/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-shop-primary dark:text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our web development services.
              </p>
            </div>
          
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-shop-primary dark:text-white">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <AnimatedSection direction="up" delay={0.2}>
              <div className="mt-12 text-center">
                <p className="mb-4 text-muted-foreground">Have more questions?</p>
                <Button className="bg-shop-secondary hover:bg-shop-secondary/90">
                  Contact Our Team
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection direction="up">
        <section className="py-12 bg-gradient-mesh dark:bg-gradient-mesh-dark">
          <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Digital Presence?</h2>
              <p className="text-white/80 text-lg mb-8">
                Let's create a website that perfectly represents your brand and helps achieve your business goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-shop-secondary"
                  size="lg"
                  asChild
                >
                  <Link to="/portfolio">View Portfolio</Link>
                </Button>
                <Button 
                  variant="default" 
                  className="glass text-white hover:bg-white/10"
                  size="lg"
                >
                  Start Your Project
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </Layout>
  );
};

export default ServicesPage;
