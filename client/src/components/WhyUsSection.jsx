import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
var reasons = [
    {
        title: "Expert Consultation",
        description: "Our team of certified IT professionals brings years of industry experience to every project.",
    },
    {
        title: "Tailored Solutions",
        description: "We don't believe in one-size-fits-all. Every solution is customized to meet your specific business needs.",
    },
    {
        title: "Proven Results",
        description: "Our track record speaks for itself. We've helped businesses of all sizes achieve significant IT improvements.",
    },
    {
        title: "Ongoing Support",
        description: "We're committed to your long-term success with responsive support and continuous optimization.",
    },
];
export default function WhyUsSection() {
    return (<section id="why-us" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" alt="IT professionals collaborating on a solution" className="rounded-xl shadow-lg w-full"/>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Ciquerio?</h2>
            <p className="text-lg text-neutral-500 mb-8">
              At Ciquerio, we combine deep technical expertise with business acumen to deliver IT solutions that drive real results.
            </p>

            <div className="space-y-6">
              {reasons.map(function (reason, index) { return (<div key={index} className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-4 w-4 text-white"/>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                    <p className="text-neutral-500">{reason.description}</p>
                  </div>
                </div>); })}
            </div>

            <div className="mt-8">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                <a href="#contact">Get Started Today</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);
}
