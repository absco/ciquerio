import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
export default function Navbar() {
    var _a = useState(false), isMobileMenuOpen = _a[0], setIsMobileMenuOpen = _a[1];
    var _b = useState(false), isScrolled = _b[0], setIsScrolled = _b[1];
    var location = useLocation()[0];
    var isHomePage = location === "/";
    useEffect(function () {
        var handleScroll = function () {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return function () { return window.removeEventListener("scroll", handleScroll); };
    }, []);
    var toggleMobileMenu = function () {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    var closeMobileMenu = function () {
        setIsMobileMenuOpen(false);
    };
    // Determine whether to use hash links or regular links
    var baseUrl = isHomePage ? "" : "/";
    var getNavLink = function (section) { return isHomePage ? "#".concat(section) : "/".concat(section === "home" ? "" : "#" + section); };
    return (<header id="navbar" className={"fixed w-full bg-white shadow-md z-50 transition-all duration-300 ".concat(isScrolled ? "py-2" : "py-3")}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-primary font-bold text-2xl">Ciquerio</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-neutral-900 hover:text-primary font-medium transition-colors">
            Home
          </Link>
          <Link href={isHomePage ? "#services" : "/#services"} className="text-neutral-900 hover:text-primary font-medium transition-colors">
            Services
          </Link>
          <Link href={isHomePage ? "#why-us" : "/#why-us"} className="text-neutral-900 hover:text-primary font-medium transition-colors">
            Why Us
          </Link>
          <Link href={isHomePage ? "#blog" : "/#blog"} className="text-neutral-900 hover:text-primary font-medium transition-colors">
            Blog
          </Link>
          <Link href={isHomePage ? "#contact" : "/#contact"} className="text-neutral-900 hover:text-primary font-medium transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden text-neutral-900" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <i className="fas fa-bars text-xl"></i>
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className={"md:hidden bg-white shadow-lg transition-all duration-300 ".concat(isMobileMenuOpen ? "block" : "hidden")}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          <Link href="/" className="text-neutral-900 hover:text-primary font-medium transition-colors" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link href={isHomePage ? "#services" : "/#services"} className="text-neutral-900 hover:text-primary font-medium transition-colors" onClick={closeMobileMenu}>
            Services
          </Link>
          <Link href={isHomePage ? "#why-us" : "/#why-us"} className="text-neutral-900 hover:text-primary font-medium transition-colors" onClick={closeMobileMenu}>
            Why Us
          </Link>
          <Link href={isHomePage ? "#blog" : "/#blog"} className="text-neutral-900 hover:text-primary font-medium transition-colors" onClick={closeMobileMenu}>
            Blog
          </Link>
          <Link href={isHomePage ? "#contact" : "/#contact"} className="text-neutral-900 hover:text-primary font-medium transition-colors" onClick={closeMobileMenu}>
            Contact
          </Link>
        </div>
      </div>
    </header>);
}
