import React, { useEffect } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
  offset?: number;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ 
  children, 
  offset = 80 
}) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;
      
      e.preventDefault();
      
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: targetPosition - offset,
        behavior: 'smooth'
      });
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [offset]);
  
  return <>{children}</>;
};

export default SmoothScroll;
