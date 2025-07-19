import { useState, useEffect, useRef } from 'react';

const AnimatedElement = ({ 
  children, 
  animation = 'fade-in-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  triggerOnce = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold, triggerOnce]);

  const getAnimationStyle = () => {
    const baseStyle = {
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    };

    if (!isVisible) {
      switch (animation) {
        case 'fade-in':
          return { ...baseStyle, opacity: 0 };
        case 'fade-in-up':
          return { ...baseStyle, opacity: 0, transform: 'translateY(30px)' };
        case 'fade-in-down':
          return { ...baseStyle, opacity: 0, transform: 'translateY(-30px)' };
        case 'slide-in-left':
          return { ...baseStyle, opacity: 0, transform: 'translateX(-50px)' };
        case 'slide-in-right':
          return { ...baseStyle, opacity: 0, transform: 'translateX(50px)' };
        case 'scale-in':
          return { ...baseStyle, opacity: 0, transform: 'scale(0.8)' };
        default:
          return { ...baseStyle, opacity: 0 };
      }
    }

    return { ...baseStyle, opacity: 1, transform: 'translateY(0) translateX(0) scale(1)' };
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={getAnimationStyle()}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;
