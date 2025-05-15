import { Button } from "@/components/ui/button";
export default function HeroSection() {
    return (<section id="home" className="pt-24 md:pt-32 bg-cover bg-center text-white relative h-screen flex items-center" style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Technology support for your business
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Ciquerio provides expert IT consultancy services to optimise your systems, 
            enhance security, and drive innovation through AI and automation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-medium">
              <a href="#services">Our Services</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-white/20 border-2 border-white font-medium text-white">
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-gray-50"></div>
    </section>);
}
