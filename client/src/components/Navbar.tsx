import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Determine whether to use hash links or regular links
  const baseUrl = isHomePage ? "" : "/";
  const getNavLink = (section) => isHomePage ? `#${section}` : `/${section === "home" ? "" : "#" + section}`;

  return (
    <header
      id="navbar"
      className={`fixed w-full bg-white shadow-md z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-primary font-bold text-2xl">Ciquerio</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-neutral-900 hover:text-primary font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href={isHomePage ? "#services" : "/#services"}
            className="text-neutral-900 hover:text-primary font-medium transition-colors"
          >
            Services
          </Link>
          <Link
            href={isHomePage ? "#why-us" : "/#why-us"}
            className="text-neutral-900 hover:text-primary font-medium transition-colors"
          >
            Why Us
          </Link>
          <Link
            href={isHomePage ? "#blog" : "/#blog"}
            className="text-neutral-900 hover:text-primary font-medium transition-colors"
          >
            Blog
          </Link>
          <Link
            href={isHomePage ? "#contact" : "/#contact"}
            className="text-neutral-900 hover:text-primary font-medium transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-neutral-900"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <i className="fas fa-bars text-xl"></i>
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          <Link
            href="/"
            className="text-neutral-900 hover:text-primary font-medium transition-colors"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            href={isHomePage ? "#services" : "/#services"}
            className="text-neutral-900 hover:text-primary font-medium transition-colors"
            onClick={closeMobileMenu}
          >
            Services
          </Link>
          <Link
            href={isHomePage ? "#why-us" : "/#why-us"}
            className="text-neutral-900 hover:text-primary font-medium transition-colors"
            onClick={closeMobileMenu}
          >
            Why Us
          </Link>
          <Link
            href={isHomePage ? "#blog" : "/#blog"}
            className="text-neutral-900 hover:text-primary font-medium transition-colors"
            onClick={closeMobileMenu}
          >
            Blog
          </Link>
          <Link
            href={isHomePage ? "#contact" : "/#contact"}
            className="text-neutral-900 hover:text-primary font-medium transition-colors"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
