'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Paintbrush2, Moon, Sun, Menu, X, ArrowRight, Sparkles,
  PenLine, Share2, Users, Shapes, Download, ChevronLeft,
  ChevronRight, Star, Twitter, Github, Linkedin, Instagram,
  Play
} from 'lucide-react';
import Link from 'next/link';

// Button Component
type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick, 
  fullWidth = false,
  className = '' 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg",
    secondary: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
    outline: "bg-transparent text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800",
  };
  
  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };
  
  const widthStyle = fullWidth ? "w-full" : "";
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

// Navbar Component
const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Demo', href: '#demo' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 text-2xl font-bold">
              <Paintbrush2 className="h-8 w-8 text-blue-500" />
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Sketchflow</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <Link href={"/signin"}>
              <Button href="#try" variant="secondary">Sign In</Button>
            </Link>
            <Link href={"/signup"}>
              <Button href="#try" variant="outline">Sign Up</Button>
            </Link>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button href="#try" variant="primary" fullWidth>Try It Free</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw decorative elements
    const drawElements = () => {
      if (!ctx) return;
      
      ctx.strokeStyle = '#4A9DFF';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.rect(canvas.width * 0.3, canvas.height * 0.3, 100, 80);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(canvas.width * 0.7, canvas.height * 0.5, 50, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.2, canvas.height * 0.6);
      ctx.lineTo(canvas.width * 0.8, canvas.height * 0.7);
      ctx.stroke();
      
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.3, canvas.height * 0.8);
      ctx.lineTo(canvas.width * 0.6, canvas.height * 0.2);
      ctx.stroke();
      ctx.setLineDash([]);
    };
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawElements();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 rounded-full px-3 py-1 text-sm text-blue-600 dark:text-blue-300 mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Collaborative Drawing Made Simple</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Turn Your Ideas Into Visual Masterpieces
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              Create, collaborate, and share beautiful drawings, diagrams, and illustrations instantly. No design skills required.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <Button href="#try" variant="primary" size="lg">
                Start Drawing Now
              </Button>
              <Button href="#demo" variant="outline" size="lg">
                See How It Works <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
              <p>Already used by thousands of teams worldwide</p>
              <div className="flex justify-center lg:justify-start mt-4 space-x-6">
                {['Company 1', 'Company 2', 'Company 3', 'Company 4'].map((company, index) => (
                  <div key={index} className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded opacity-70"></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/3] bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <canvas 
              ref={canvasRef} 
              className="absolute top-0 left-0 w-full h-full"
            ></canvas>
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-white/80 dark:from-gray-800/80 to-transparent h-16"></div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white/80 dark:from-gray-800/80 to-transparent h-16"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Component
type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, accentColor }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${accentColor}`}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <PenLine className="h-6 w-6 text-white" />,
      title: "Intuitive Drawing Tools",
      description: "Create beautiful sketches with our easy-to-use drawing tools. No artistic skills required.",
      accentColor: "bg-blue-500",
    },
    {
      icon: <Shapes className="h-6 w-6 text-white" />,
      title: "Ready-to-Use Shapes",
      description: "Access a library of ready-to-use shapes and templates to speed up your creative process.",
      accentColor: "bg-purple-500",
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Real-Time Collaboration",
      description: "Work together with your team in real-time, no matter where they are located.",
      accentColor: "bg-pink-500",
    },
    {
      icon: <Share2 className="h-6 w-6 text-white" />,
      title: "Easy Sharing",
      description: "Share your creations with a simple link. No signup required for viewers.",
      accentColor: "bg-green-500",
    },
    {
      icon: <Download className="h-6 w-6 text-white" />,
      title: "Export Options",
      description: "Export your drawings in multiple formats including PNG, SVG, and PDF.",
      accentColor: "bg-yellow-500",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-white" />,
      title: "Smart Drawing",
      description: "Our AI-powered tools help perfect your sketches and enhance your creativity.",
      accentColor: "bg-red-500",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features, Simple Interface</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to bring your ideas to life, without the complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Demo Component
const Demo = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'teams' | 'education'>('personal');

  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'teams', label: 'Teams' },
    { id: 'education', label: 'Education' },
  ];

  const demoContent = {
    personal: {
      title: "Perfect for Personal Projects",
      description: "Capture your ideas instantly. Whether you're planning your next home renovation or sketching out concepts for a novel, Sketchflow makes it easy to visualize your thoughts.",
      image: "https://images.pexels.com/photos/3182792/pexels-photo-3182792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: [
        "Unlimited personal projects",
        "Easy-to-use drawing tools",
        "Export in multiple formats",
        "Access anywhere, anytime",
      ],
    },
    teams: {
      title: "Supercharge Team Collaboration",
      description: "Bring your team's ideas to life together. Collaborate in real-time on wireframes, diagrams, brainstorming sessions, and more.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: [
        "Real-time collaboration",
        "Team libraries and templates",
        "Version history",
        "Commenting and feedback",
      ],
    },
    education: {
      title: "Enhance Learning Experiences",
      description: "Make learning visual and interactive. Create diagrams, illustrations, and visual explanations that help concepts stick.",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      features: [
        "Classroom-friendly features",
        "Interactive exercises",
        "Easy sharing with students",
        "Visual learning templates",
      ],
    },
  };

  const currentDemo = demoContent[activeTab];

  return (
    <section id="demo" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See Sketchflow in Action</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover how Sketchflow adapts to your specific needs.
          </p>

          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mt-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                onClick={() => setActiveTab(tab.id as 'personal' | 'teams' | 'education')}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold mb-4">{currentDemo.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {currentDemo.description}
            </p>
            
            <ul className="space-y-3 mb-8">
              {currentDemo.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button href="#try" variant="primary">
                Try This Use Case
              </Button>
              <Button href="#demo-video" variant="secondary" className="group">
                Watch Demo <Play className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="overflow-hidden rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <img 
                src={currentDemo.image} 
                alt={`${activeTab} use case`} 
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-2xl"></div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to start your creative journey?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust Sketchflow for their visual communication needs.
          </p>
          <Button href="#try" variant="primary" size="lg">
            Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Sketchflow has revolutionized how our design team collaborates. We're able to iterate faster and communicate ideas more effectively than ever before.",
      author: "Alex Johnson",
      role: "Product Designer",
      company: "InnovateCorp",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
    },
    {
      id: 2,
      quote: "As a teacher, I use Sketchflow every day to create engaging visual content for my students. It's incredible how much more they retain when concepts are illustrated.",
      author: "Maria Rodriguez",
      role: "Science Educator",
      company: "Westlake High School",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
    },
    {
      id: 3,
      quote: "The simplicity of the interface combined with the powerful features makes Sketchflow our go-to tool for brainstorming sessions. Game changer!",
      author: "David Chen",
      role: "Engineering Manager",
      company: "TechSolutions",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4,
    },
  ];
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoplay(false);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setIsAutoplay(false);
  };
  
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length]);
  
  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover why thousands of people and teams choose Sketchflow for their creative projects.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="absolute top-0 left-0 transform -translate-y-1/2 translate-x-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-serif">"</span>
              </div>
            </div>
            
            <div className="pt-6">
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-8">
                {testimonials[activeIndex].quote}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonials[activeIndex].avatar} 
                      alt={testimonials[activeIndex].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonials[activeIndex].author}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 right-6 flex space-x-2">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsAutoplay(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex ? 'w-6 bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Use Cases', href: '#use-cases' },
        { name: 'Gallery', href: '#gallery' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#docs' },
        { name: 'Tutorials', href: '#tutorials' },
        { name: 'Blog', href: '#blog' },
        { name: 'Support', href: '#support' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Careers', href: '#careers' },
        { name: 'Contact', href: '#contact' },
        { name: 'Press', href: '#press' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Cookie Policy', href: '#cookies' },
        { name: 'GDPR', href: '#gdpr' },
      ],
    },
  ];
  
  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: '#twitter', label: 'Twitter' },
    { icon: <Github className="h-5 w-5" />, href: '#github', label: 'GitHub' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#linkedin', label: 'LinkedIn' },
    { icon: <Instagram className="h-5 w-5" />, href: '#instagram', label: 'Instagram' },
  ];
  
  return (
    <footer className="bg-white dark:bg-gray-900 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <a href="/" className="flex items-center space-x-2 text-2xl font-bold mb-4">
              <Paintbrush2 className="h-8 w-8 text-blue-500" />
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Sketchflow</span>
            </a>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Simplifying visual communication for everyone. Create, collaborate, and share your ideas effortlessly.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Sketchflow. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm">
              Privacy
            </a>
            <a href="#terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm">
              Terms
            </a>
            <a href="#cookies" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Demo />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
