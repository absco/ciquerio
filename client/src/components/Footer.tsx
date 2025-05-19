export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Ciquerio</h3>
            <p className="text-neutral-400 mb-6">
              Providing expert IT consultancy services to help businesses thrive in the digital age.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  System Improvements
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  AI & Automation
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Cloud Migration
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Cyber Security
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  IT Cost Optimisation
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Software Development
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-envelope text-neutral-400 mt-1 mr-3"></i>
                <span className="text-neutral-400">info@ciquerio.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock text-neutral-400 mt-1 mr-3"></i>
                <span className="text-neutral-400">Mon-Fri: 7:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Ciquerio Consulting Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
