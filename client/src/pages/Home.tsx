import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  // Implement smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  // Implement navbar scroll effect
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          navbar.classList.add('py-2');
          navbar.classList.remove('py-3');
        } else {
          navbar.classList.add('py-3');
          navbar.classList.remove('py-2');
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div className="bg-gray-50 text-neutral-900">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
