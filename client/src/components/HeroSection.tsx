import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef, useCallback } from "react";

// Node and Line interfaces
interface Node {
  id: number;
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  originalRadius?: number;
}

interface Line {
  from: number;
  to: number;
  opacity: number;
}

export default function HeroSection() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Initialize the network on mount
  useEffect(() => {
    // Create nodes
    const nodeCount = 30;
    const newNodes: Node[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 3 + 1; // random size between 1 and 4
      newNodes.push({
        id: i,
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        radius: radius,
        originalRadius: radius,
        speedX: (Math.random() - 0.5) * 0.05, // random speed
        speedY: (Math.random() - 0.5) * 0.05, // random speed
      });
    }
    
    setNodes(newNodes);
    
    // Create connections between nodes
    const newLines: Line[] = [];
    for (let i = 0; i < nodeCount; i++) {
      // Connect each node to 2-5 other nodes
      const connectionCount = Math.floor(Math.random() * 4) + 2;
      
      for (let j = 0; j < connectionCount; j++) {
        // Connect to a random other node
        const targetNode = Math.floor(Math.random() * nodeCount);
        
        // Avoid self-connections and duplicates
        if (targetNode !== i && !newLines.some(line => 
          (line.from === i && line.to === targetNode) || 
          (line.from === targetNode && line.to === i)
        )) {
          newLines.push({
            from: i,
            to: targetNode,
            opacity: Math.random() * 0.5 + 0.1 // Random opacity between 0.1 and 0.6
          });
        }
      }
    }
    
    setLines(newLines);

    // Start animation
    startAnimation();

    // Cleanup animation on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Animation function
  const animate = useCallback(() => {
    setNodes(prevNodes => {
      return prevNodes.map(node => {
        // Update position based on speed
        let newX = node.x + node.speedX;
        let newY = node.y + node.speedY;
        
        // Bounce off edges
        if (newX <= 0 || newX >= 100) {
          node.speedX *= -1;
          newX = Math.max(0, Math.min(100, newX));
        }
        
        if (newY <= 0 || newY >= 100) {
          node.speedY *= -1;
          newY = Math.max(0, Math.min(100, newY));
        }
        
        return {
          ...node,
          x: newX,
          y: newY
        };
      });
    });
    
    // Request next frame
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Start animation
  const startAnimation = () => {
    if (animationFrameRef.current) return;
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Calculate distance between nodes
  const getDistance = (node1: Node, node2: Node) => {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <section 
      id="home" 
      className="pt-24 md:pt-32 bg-cover bg-center text-white relative h-screen flex items-center"
      style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85))",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Animated network background */}
      <div 
        className="absolute inset-0 z-0"
      >
        <svg 
          ref={svgRef}
          className="w-full h-full absolute top-0 left-0 opacity-70"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Draw lines between connected nodes */}
          {lines.map((line, index) => {
            const fromNode = nodes[line.from];
            const toNode = nodes[line.to];
            
            if (!fromNode || !toNode) return null;
            
            // Calculate distance to adjust opacity
            const distance = getDistance(fromNode, toNode);
            const maxDistance = 30; // Maximum distance for a connection to be visible
            const opacityFactor = Math.max(0, 1 - (distance / maxDistance));
            let finalOpacity = line.opacity * opacityFactor;
            
            // Only draw lines if opacity is visible
            if (finalOpacity < 0.05) return null;
            
            return (
              <line 
                key={`line-${index}`}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={`rgba(64, 144, 255, ${finalOpacity})`}
                strokeWidth={Math.max(0.5, fromNode.radius * 0.3)}
                className="transition-all duration-300"
              />
            );
          })}
          
          {/* Draw nodes */}
          {nodes.map(node => {
            return (
              <circle
                key={`node-${node.id}`}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.radius}
                fill="rgba(118, 169, 250, 0.8)"
                filter="url(#glow)"
                className="transition-all duration-300"
              />
            );
          })}
          
          {/* Define filters */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>
      </div>
      
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
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 font-medium"
            >
              <a href="#services">Our Services</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent hover:bg-white/20 border-2 border-white font-medium text-white"
            >
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
