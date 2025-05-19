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
  connections: number[]; // IDs of connected nodes
}

interface Line {
  from: number;
  to: number;
  opacity: number;
  signal?: {
    position: number; // 0 to 1 representing position along the line
    active: boolean;
    speed: number;
  };
}

export default function HeroSection() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Initialize the network on mount
  useEffect(() => {
    // Create nodes in a detailed Milky Way galaxy arrangement with stars
    // We'll use two types of nodes but reduce the count for better performance:
    // 1. Larger nodes that will be rendered as visible stars and have connections
    // 2. Background micro-nodes (many more) that create the galactic dust/star field effect
    
    // Main visible nodes
    const visibleNodeCount = 50; // Reduced for performance
    // Background star field (these won't have connections to save performance)
    const backgroundStarCount = 150; // Reduced for better performance
    const totalNodeCount = visibleNodeCount + backgroundStarCount;
    
    const newNodes: Node[] = [];
    
    // Add central supermassive black hole
    newNodes.push({
      id: 0,
      x: 50,
      y: 50,
      radius: 4, // Larger black hole
      originalRadius: 4,
      speedX: 0, // Black hole remains stationary at center
      speedY: 0,
      connections: []
    });
    
    // Central bulge nodes - dense center of the galaxy around the black hole
    const bulgeCount = Math.floor(visibleNodeCount * 0.3) + 1; // +1 to account for the black hole
    for (let i = 1; i < bulgeCount; i++) {
      // Random position in central bulge
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 12; // Smaller radius for bulge
      
      // Central position with slight offset
      const x = 50 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * distance * 0.5; // Elliptical shape (viewed from an angle)
      
      // Stars in the center
      const radius = Math.random() * 2 + 1.5; 
      
      // Calculate orbital speed based on distance from center (Keplerian motion)
      // Stars orbit faster closer to the black hole
      const orbitalSpeed = 0.04 / Math.sqrt(Math.max(2, distance));
      
      newNodes.push({
        id: i,
        x: x,
        y: y,
        radius: radius,
        originalRadius: radius,
        // Orbital speed around black hole (perpendicular to radius)
        speedX: Math.cos(angle + Math.PI/2) * orbitalSpeed,
        speedY: Math.sin(angle + Math.PI/2) * orbitalSpeed * 0.5, // Elliptical orbit
        connections: []
      });
    }
    
    // Spiral arm visible nodes
    for (let i = bulgeCount; i < visibleNodeCount; i++) {
      // Spiral position calculation
      // Milky Way has 4 major spiral arms
      const arm = Math.floor(Math.random() * 4);
      const armOffset = arm * (Math.PI/2); 
      
      // Distance from center (further out for spiral arms, expanded to fill the screen)
      const distance = Math.random() * 45 + 12; // 12-57 units from center, expanded for wider coverage
      
      // Logarithmic spiral formula with some randomness
      const rotations = 2.5; // How many times the arms wrap around
      const randomOffset = (Math.random() - 0.5) * 0.6; // Random variation
      const angle = (i / (visibleNodeCount - bulgeCount)) * rotations * Math.PI * 2 + armOffset + randomOffset;
      
      const x = 50 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * distance * 0.7; // Increased to fill more vertical space
      
      // Calculate orbital speed based on distance (Keplerian)
      const orbitalSpeed = 0.03 / Math.sqrt(Math.max(5, distance/4));
      
      // Stars in the arms
      const radius = Math.random() * 1.8 + 0.8;
      
      newNodes.push({
        id: i,
        x: x,
        y: y,
        radius: radius,
        originalRadius: radius,
        // Orbital motion, slower further from center
        speedX: Math.cos(angle + Math.PI/2) * orbitalSpeed,
        speedY: Math.sin(angle + Math.PI/2) * orbitalSpeed * 0.6,
        connections: []
      });
    }
    
    // Now add background star field (tiny stars that form the density of the galaxy)
    // Also add some stars in the corners for complete coverage of the hero section
    for (let i = visibleNodeCount; i < totalNodeCount; i++) {
      // Determine star position (bulge, arms, or edge stars to fill screen)
      const positionType = Math.random();
      // 25% in bulge, 60% in arms, 15% on edges to fill screen corners 
      const inBulge = positionType < 0.25;
      const inEdges = positionType > 0.85;
      
      let x, y, radius, speedX, speedY;
      
      if (inBulge) {
        // Bulge star
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 15; // Central bulge
        
        x = 50 + Math.cos(angle) * distance;
        y = 50 + Math.sin(angle) * distance * 0.5;
        
        // Tiny stars for background effect
        radius = Math.random() * 0.5 + 0.2;
        
        // Orbital speed - slower for performance
        const orbitalSpeed = 0.02 / Math.sqrt(Math.max(2, distance));
        speedX = Math.cos(angle + Math.PI/2) * orbitalSpeed;
        speedY = Math.sin(angle + Math.PI/2) * orbitalSpeed * 0.5;
      } 
      else if (inEdges) {
        // Edge stars to fill the corners and edges of the screen
        // Pick a quadrant (0-3) and place near edges
        const quadrant = Math.floor(Math.random() * 4);
        let edgeX, edgeY;
        
        switch(quadrant) {
          case 0: // Top-left
            edgeX = Math.random() * 25;
            edgeY = Math.random() * 25;
            break;
          case 1: // Top-right
            edgeX = 75 + Math.random() * 25;
            edgeY = Math.random() * 25;
            break;
          case 2: // Bottom-left
            edgeX = Math.random() * 25;
            edgeY = 75 + Math.random() * 25;
            break;
          case 3: // Bottom-right
            edgeX = 75 + Math.random() * 25;
            edgeY = 75 + Math.random() * 25;
            break;
        }
        
        x = edgeX;
        y = edgeY;
        radius = Math.random() * 0.4 + 0.1;
        
        // Minimal movement for edge stars - better performance
        speedX = (Math.random() - 0.5) * 0.01;
        speedY = (Math.random() - 0.5) * 0.01;
      }
      else {
        // Spiral arm star
        const arm = Math.floor(Math.random() * 4);
        const armOffset = arm * (Math.PI/2);
        
        // Wider distribution to fill more of the screen
        const distance = Math.random() * 45 + 10;
        const rotations = 2.5;
        const randomOffset = (Math.random() - 0.5) * 1.5;
        const angle = Math.random() * rotations * Math.PI * 2 + armOffset + randomOffset;
        
        x = 50 + Math.cos(angle) * distance;
        y = 50 + Math.sin(angle) * distance * 0.7; // Increased to fill more vertical space
        
        // Micro stars
        radius = Math.random() * 0.4 + 0.1;
        
        // Orbital speed - reduced for performance
        const orbitalSpeed = 0.015 / Math.sqrt(Math.max(5, distance/4));
        speedX = Math.cos(angle + Math.PI/2) * orbitalSpeed;
        speedY = Math.sin(angle + Math.PI/2) * orbitalSpeed * 0.7;
      }
      
      // Add background star
      newNodes.push({
        id: i,
        x: x,
        y: y,
        radius: radius,
        originalRadius: radius,
        speedX: speedX,
        speedY: speedY,
        connections: [] // Background stars won't have connections
      });
    }
    
    // Create connections between visible nodes to simulate star clusters and dust lanes
    const newLines: Line[] = [];
    
    // Special connections for black hole - connect it to many stars in the central bulge
    // These will be the stars being pulled toward/orbiting the black hole
    const blackHoleConnectionCount = 15;
    const bulgeStarsForBlackHole = Array.from({length: bulgeCount - 1}, (_, i) => i + 1);
    // Shuffle and take the first few stars to connect to the black hole
    for (let i = 0; i < Math.min(blackHoleConnectionCount, bulgeStarsForBlackHole.length); i++) {
      const j = i + Math.floor(Math.random() * (bulgeStarsForBlackHole.length - i));
      [bulgeStarsForBlackHole[i], bulgeStarsForBlackHole[j]] = [bulgeStarsForBlackHole[j], bulgeStarsForBlackHole[i]];
    }
    
    // Connect black hole to selected bulge stars
    for (let i = 0; i < Math.min(blackHoleConnectionCount, bulgeStarsForBlackHole.length); i++) {
      const starId = bulgeStarsForBlackHole[i];
      
      // 50% of black hole connections have active signals
      const hasSignal = Math.random() < 0.5;
      
      newLines.push({
        from: 0, // Black hole ID
        to: starId,
        opacity: 0.7, // Strong connection for black hole
        // Add signal that travels along this line if applicable
        signal: hasSignal ? {
          position: Math.random(), // Random starting position
          active: true,
          speed: 0.005 + Math.random() * 0.01 // Random speed between 0.005 and 0.015
        } : undefined
      });
      
      // Add connection to both nodes
      newNodes[0].connections.push(starId);
      newNodes[starId].connections.push(0);
    }
    
    // Connect other visible stars to form the galactic structure
    // Only connect visible stars (background microstar field doesn't need connections)
    for (let i = 1; i < visibleNodeCount; i++) {
      // Skip the black hole as we've already handled its connections
      if (i === 0) continue;
      
      const distances: {id: number, distance: number}[] = [];
      
      // Calculate distance to nearby visible stars
      for (let j = 1; j < visibleNodeCount; j++) {
        if (i !== j) {
          const dx = newNodes[i].x - newNodes[j].x;
          const dy = newNodes[i].y - newNodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only consider connections within a certain range
          // Stars in the same region of the galaxy tend to be connected
          const connectionRange = i < bulgeCount ? 15 : 12;
          if (distance < connectionRange) {
            distances.push({id: j, distance: distance});
          }
        }
      }
      
      // Sort by distance
      distances.sort((a, b) => a.distance - b.distance);
      
      // Connect to nearby neighbors
      // More connections for central bulge, fewer for outer arms
      const isBulge = i < bulgeCount;
      const connectionsNeeded = isBulge 
        ? Math.floor(Math.random() * 3) + 2  // 2-4 connections in bulge
        : Math.floor(Math.random() * 2) + 1; // 1-2 connections in arms
      
      for (let k = 0; k < Math.min(connectionsNeeded, distances.length); k++) {
        const targetNode = distances[k].id;
        
        // Avoid duplicates
        if (!newLines.some(line => 
          (line.from === i && line.to === targetNode) || 
          (line.from === targetNode && line.to === i)
        )) {
          // Vary opacity based on position - brighter in center, dimmer in arms
          const isCenterConnection = i < bulgeCount && targetNode < bulgeCount;
          const baseOpacity = isCenterConnection ? 0.5 : 0.25;
          
          // Randomly add signals to some connections (15% chance)
          const hasSignal = Math.random() < 0.15;
          
          newLines.push({
            from: i,
            to: targetNode,
            opacity: Math.random() * 0.2 + baseOpacity,
            signal: hasSignal ? {
              position: Math.random(), // Random starting position
              active: true,
              speed: 0.003 + Math.random() * 0.007 // Random speed, slower than black hole signals
            } : undefined
          });
          
          // Add connection to both nodes
          newNodes[i].connections.push(targetNode);
          newNodes[targetNode].connections.push(i);
        }
      }
    }
    
    setNodes(newNodes);
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

  // Animation function optimized for performance
  const animate = useCallback(() => {
    // Update nodes (stars)
    setNodes(prevNodes => {
      // Create a new array only if we're actually updating nodes
      const updatedNodes = [...prevNodes];
      
      // Optimize by only updating every other frame for background stars
      const frameCount = animationFrameRef.current !== null ? 
        Number(animationFrameRef.current) : 0;
      const updateAllNodes = frameCount % 2 === 0;
      
      // Process nodes
      for (let i = 0; i < updatedNodes.length; i++) {
        const node = updatedNodes[i];
        
        // Skip black hole movement (id 0) and limit background star updates for better performance
        if ((i === 0) || (i >= 50 && !updateAllNodes)) continue;
        
        // Update position based on speed
        let newX = node.x + node.speedX;
        let newY = node.y + node.speedY;
        
        // Bounce off edges with a slight dampening effect
        if (newX <= 0 || newX >= 100) {
          node.speedX *= -0.95; // Slight dampening on bounce
          newX = Math.max(0, Math.min(100, newX));
        }
        
        if (newY <= 0 || newY >= 100) {
          node.speedY *= -0.95; // Slight dampening on bounce
          newY = Math.max(0, Math.min(100, newY));
        }
        
        // Update node in place to avoid unnecessary object creation
        node.x = newX;
        node.y = newY;
      }
      
      return updatedNodes;
    });
    
    // Update line signals
    setLines(prevLines => {
      // Create a new array only if changes are made
      const updatedLines = [...prevLines];
      
      // Determine whether to generate new signals (occasionally)
      const frameCount = animationFrameRef.current !== null ? 
        Number(animationFrameRef.current) : 0;
      
      // Every ~300 frames, activate a few random signals
      if (frameCount % 300 === 0) {
        // Find lines without active signals
        const inactiveLines = updatedLines.filter(line => 
          !line.signal || !line.signal.active
        );
        
        // Randomly activate ~5% of inactive lines
        const linesToActivate = Math.max(1, Math.floor(inactiveLines.length * 0.05));
        
        for (let i = 0; i < linesToActivate; i++) {
          const randomIndex = Math.floor(Math.random() * inactiveLines.length);
          if (randomIndex < inactiveLines.length) {
            const line = inactiveLines[randomIndex];
            const lineIndex = updatedLines.indexOf(line);
            
            if (lineIndex >= 0) {
              // Activate the signal
              updatedLines[lineIndex].signal = {
                position: 0, // Start at beginning of line
                active: true,
                speed: 0.003 + Math.random() * 0.007
              };
            }
            
            // Remove this line so we don't select it again
            inactiveLines.splice(randomIndex, 1);
          }
        }
      }
      
      // Update all active signals
      for (let i = 0; i < updatedLines.length; i++) {
        const line = updatedLines[i];
        
        if (line.signal && line.signal.active) {
          // Move signal along the line
          line.signal.position += line.signal.speed;
          
          // Reset signal when it reaches the end
          if (line.signal.position > 1) {
            // 80% chance to deactivate the signal, 20% chance to reset it
            if (Math.random() < 0.8) {
              line.signal.active = false;
            } else {
              line.signal.position = 0;
            }
          }
        }
      }
      
      return updatedLines;
    });
    
    // Request next frame and store the ID for tracking frame count
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
        background: "linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.92))",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Animated network background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <svg 
          ref={svgRef}
          className="w-full h-full absolute top-0 left-0 opacity-75"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Draw lines first so they appear behind the nodes */}
          <g className="lines">
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
              
              // Check if this connection is in the central bulge
              const isCenterConnection = fromNode.id < 18 && toNode.id < 18;
              const strokeColor = isCenterConnection 
                ? `rgba(255, 220, 180, ${finalOpacity})` // Yellowish for center
                : `rgba(110, 160, 255, ${finalOpacity})`; // Blueish for spiral arms
              
              return (
                <g key={`line-group-${index}`}>
                  {/* Base line */}
                  <line 
                    key={`line-${index}`}
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke={strokeColor}
                    strokeWidth={Math.max(0.4, Math.min(fromNode.radius, toNode.radius) * 0.3)}
                  />
                  
                  {/* Signal on the line (if active) - now a small line segment instead of a circle */}
                  {line.signal && line.signal.active && (() => {
                    // Calculate signal position
                    const signalPos = line.signal.position;
                    // Create a small line segment by calculating points slightly before and after the position
                    const segmentLength = 0.05; // Length of the signal line segment
                    
                    // Calculate points just before and after the current position
                    const startPos = Math.max(0, signalPos - segmentLength/2);
                    const endPos = Math.min(1, signalPos + segmentLength/2);
                    
                    return (
                      <line
                        key={`signal-${index}`}
                        x1={`${fromNode.x + (toNode.x - fromNode.x) * startPos}%`}
                        y1={`${fromNode.y + (toNode.y - fromNode.y) * startPos}%`}
                        x2={`${fromNode.x + (toNode.x - fromNode.x) * endPos}%`}
                        y2={`${fromNode.y + (toNode.y - fromNode.y) * endPos}%`}
                        stroke="rgba(180, 120, 255, 0.85)" // Purplish color
                        strokeWidth={Math.max(0.6, Math.min(fromNode.radius, toNode.radius) * 0.8)}
                        filter="url(#signalGlow)"
                      />
                    );
                  })()}
                </g>
              );
            })}
          </g>
          
          {/* Draw nodes on top of the lines */}
          <g className="nodes">
            {nodes.map(node => {
              // Black hole special case
              if (node.id === 0) {
                return (
                  <circle
                    key={`node-${node.id}`}
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r={node.radius}
                    fill="rgba(0, 0, 0, 0.95)"
                    stroke="rgba(255, 160, 50, 0.7)"
                    strokeWidth="0.8"
                    filter="url(#blackHoleGlow)"
                  />
                );
              }
              
              // Different colors for center vs spiral arms
              const isBulge = node.id < 30; // First 30% of visible nodes are in bulge
              const fillColor = isBulge
                ? `rgba(255, 235, 180, ${Math.min(0.9, 0.7 + Math.random() * 0.2)})`  // Yellow stars in center
                : `rgba(180, 210, 255, ${Math.min(0.85, 0.65 + Math.random() * 0.2)})`; // Blue stars in arms
              
              return (
                <circle
                  key={`node-${node.id}`}
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={node.radius}
                  fill={fillColor}
                  filter={`url(#${isBulge ? 'centerGlow' : 'armGlow'})`}
                />
              );
            })}
          </g>
          
          {/* Define filters for different glow effects */}
          <defs>
            {/* Black hole accretion disk glow effect */}
            <filter id="blackHoleGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0.9
                        0 1 0 0 0.4
                        0 0 1 0 0.1
                        0 0 0 1 0"
                result="orangeGlow"
              />
              <feGaussianBlur in="orangeGlow" stdDeviation="4" result="wideGlow" />
              <feComposite in="wideGlow" in2="SourceGraphic" operator="over" />
            </filter>
            
            {/* Signal glow effect - subtle purple glow for data signals */}
            <filter id="signalGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0.7 0 0 0 0.5
                        0 0.5 0 0 0.2
                        0 0 1 0 1
                        0 0 0 1.5 0"
                result="purpleGlow"
              />
              <feComposite in="SourceGraphic" in2="purpleGlow" operator="over" />
            </filter>
            
            {/* Warm yellow glow for center stars */}
            <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0.8
                        0 1 0 0 0.6
                        0 0 1 0 0.2
                        0 0 0 1 0"
                result="coloredBlur"
              />
              <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
            </filter>
            
            {/* Cool blue glow for arm stars */}
            <filter id="armGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0.2 0 0 0 0
                        0 0.5 0 0 0.3
                        0 0 1 0 0.9
                        0 0 0 1 0"
                result="coloredBlur"
              />
              <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
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
