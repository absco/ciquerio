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
  highlighted?: boolean;
}

interface Line {
  from: number;
  to: number;
  opacity: number;
  highlighted?: boolean;
}

interface MousePosition {
  x: number | null;
  y: number | null;
}

export default function HeroSection() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: null, y: null });
  const animationFrameRef = useRef<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const highlightedNodesRef = useRef<Set<number>>(new Set());

  // Initialize the network on mount
  useEffect(() => {
    // Create nodes
    const nodeCount = 25;
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

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
    };
    
    const handleMouseLeave = () => {
      setMousePosition({ x: null, y: null });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Animation function
  const animate = useCallback(() => {
    setNodes(prevNodes => {
      const newNodes = prevNodes.map(node => {
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

        // Update highlighting based on mouse position
        let radius = node.originalRadius || node.radius;
        let highlighted = false;

        if (mousePosition.x !== null && mousePosition.y !== null) {
          const dx = newX - mousePosition.x;
          const dy = newY - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = 15;
          
          highlighted = distance < interactionRadius;
          if (highlighted) {
            const growFactor = 1 - (distance / interactionRadius);
            radius = (node.originalRadius || node.radius) * (1 + growFactor);
            highlightedNodesRef.current.add(node.id);
          } else {
            highlightedNodesRef.current.delete(node.id);
          }
        } else {
          highlightedNodesRef.current.clear();
        }
        
        return {
          ...node,
          x: newX,
          y: newY,
          radius: radius,
          highlighted: highlighted
        };
      });

      // Update line highlighting
      setLines(prevLines => {
        if (highlightedNodesRef.current.size === 0) {
          return prevLines.map(line => ({...line, highlighted: false}));
        }
        
        return prevLines.map(line => {
          const isHighlighted = 
            highlightedNodesRef.current.has(line.from) || 
            highlightedNodesRef.current.has(line.to);
          
          return {
            ...line,
            highlighted: isHighlighted
          };
        });
      });

      return newNodes;
    });
    
    // Request next frame
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [mousePosition]);

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
        ref={containerRef}
        className="absolute inset-0 z-0 cursor-none"
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
            
            // Enhance opacity for highlighted lines
            if (line.highlighted) {
              finalOpacity = Math.min(1, finalOpacity * 3);
            }
            
            // Only draw lines if opacity is visible
            if (finalOpacity < 0.05) return null;
            
            // Determine line color based on highlighting
            const strokeColor = line.highlighted
              ? `rgba(64, 222, 255, ${finalOpacity})`
              : `rgba(64, 144, 255, ${finalOpacity})`;
            
            const strokeWidth = line.highlighted
              ? Math.max(1, fromNode.radius * 0.5)
              : Math.max(0.5, fromNode.radius * 0.3);
            
            return (
              <line 
                key={`line-${index}`}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                className="transition-all duration-300"
              />
            );
          })}
          
          {/* Draw nodes */}
          {nodes.map(node => {
            // Determine node color based on highlighting
            const fillColor = node.highlighted
              ? "rgba(100, 200, 255, 0.9)"
              : "rgba(118, 169, 250, 0.8)";
            
            return (
              <circle
                key={`node-${node.id}`}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.radius}
                fill={fillColor}
                filter={node.highlighted ? "url(#glow-highlight)" : "url(#glow)"}
                className="transition-all duration-300"
              />
            );
          })}
          
          {/* Draw cursor effect when mouse is in the container */}
          {mousePosition.x !== null && mousePosition.y !== null && (
            <circle
              cx={`${mousePosition.x}%`}
              cy={`${mousePosition.y}%`}
              r="2"
              fill="rgba(255, 255, 255, 0.5)"
              filter="url(#cursor-glow)"
              className="animate-pulse"
            />
          )}
          
          {/* Define filters */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <filter id="glow-highlight" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <filter id="cursor-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="blur" />
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
