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
    useEffect(function () {
        var handleAnchorClick = function (e) {
            var target = e.target;
            var anchor = target.closest('a[href^="#"]');
            if (anchor) {
                e.preventDefault();
                var targetId = anchor.getAttribute('href');
                if (targetId && targetId !== '#') {
                    var targetElement = document.querySelector(targetId);
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
        return function () {
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);
    // Implement navbar scroll effect
    useEffect(function () {
        var navbar = document.getElementById('navbar');
        if (navbar) {
            var handleScroll_1 = function () {
                if (window.scrollY > 50) {
                    navbar.classList.add('py-2');
                    navbar.classList.remove('py-3');
                }
                else {
                    navbar.classList.add('py-3');
                    navbar.classList.remove('py-2');
                }
            };
            window.addEventListener('scroll', handleScroll_1);
            return function () {
                window.removeEventListener('scroll', handleScroll_1);
            };
        }
    }, []);
    return (<div className="bg-gray-50 text-neutral-900">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>);
}
