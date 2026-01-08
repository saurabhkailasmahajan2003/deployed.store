import { useState, useEffect, useRef } from 'react';

const AutoCarousel = ({ items, speed = 40, className = '' }) => {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const animationFrameRef = useRef(null);
  const positionRef = useRef(0);
  const singleSetWidthRef = useRef(0);

  // Duplicate items for seamless infinite loop
  const duplicatedItems = [...items, ...items];

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    
    const calculateWidth = () => {
      // Calculate the width of one complete set of items
      if (carousel.children.length >= items.length) {
        let width = 0;
        const gap = window.innerWidth >= 1024 ? 64 : window.innerWidth >= 768 ? 48 : 32; // lg:gap-16 md:gap-12 gap-8
        
        for (let i = 0; i < items.length; i++) {
          const child = carousel.children[i];
          if (child) {
            width += child.offsetWidth + (i < items.length - 1 ? gap : 0);
          }
        }
        
        singleSetWidthRef.current = width;
        positionRef.current = 0; // Reset position when width changes
      }
    };

    // Calculate width after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(calculateWidth, 50);
    
    // Recalculate on resize
    const handleResize = () => {
      calculateWidth();
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!isPaused && carousel && singleSetWidthRef.current > 0) {
        positionRef.current += speed / 60; // Adjust for 60fps
        
        // Reset when we've scrolled through one complete set
        if (positionRef.current >= singleSetWidthRef.current) {
          positionRef.current = 0;
        }
        
        carousel.style.transform = `translateX(-${positionRef.current}px)`;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPaused, items, speed]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={carouselRef}
        className="flex gap-8 md:gap-12 lg:gap-16 will-change-transform"
        style={{
          transition: isPaused ? 'transform 0.2s ease-out' : 'none',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 whitespace-nowrap flex items-center"
          >
            {typeof item === 'string' ? (
              <span className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 tracking-tight">
                {item}
              </span>
            ) : (
              item
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoCarousel;
