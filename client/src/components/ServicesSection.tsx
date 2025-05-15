import { ArrowRight, Cog, Bot, Cloud, Shield, TrendingUp, Code } from "lucide-react";

const services = [
  {
    icon: <Cog className="w-8 h-8" />,
    title: "System Improvements & Troubleshooting",
    description:
      "Optimize your existing IT infrastructure with our expert system analysis and improvement services. We identify and resolve bottlenecks to enhance performance.",
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "AI & Automation Solutions",
    description:
      "Leverage the power of artificial intelligence and custom AI agents to automate processes, reduce manual tasks, and gain valuable insights from your data.",
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud Migration",
    description:
      "Seamlessly transition your business to the cloud with our expert migration services. We ensure minimal disruption while maximizing the benefits of cloud computing.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Cyber Security Threat Mitigation",
    description:
      "Protect your business from evolving cyber threats with our comprehensive security assessment and implementation services. We keep your data safe.",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "IT Cost Optimization",
    description:
      "Reduce unnecessary IT expenditure while improving service quality. Our experts analyze your current spending and implement efficient cost-saving measures.",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Software & Integration Development",
    description:
      "Custom software solutions tailored to your specific business needs. We design, develop, and implement seamless integrations across your technology stack.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our IT Consultancy Services
          </h2>
          <p className="text-lg text-neutral-500 max-w-3xl mx-auto">
            We provide comprehensive IT solutions tailored to meet your business needs and drive growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-neutral-500 mb-4">{service.description}</p>
              <a
                href="#contact"
                className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
