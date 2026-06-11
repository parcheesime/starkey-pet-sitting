/**
 * Walking Paws Animation Utility
 * Supports two animation modes for simulating walking footprints:
 * 
 * 1. Circular Mode (.walking-paws-circle):
 *    Auto-generates paw print SVGs arranged in a circle.
 * 
 * 2. Path Mode (.walking-paws-path):
 *    Sequentially animates pre-existing child elements (e.g., SVG paws, emojis, images) 
 *    placed anywhere in any layout (lines, curves, trails).
 */
document.addEventListener('DOMContentLoaded', () => {
  // SVG markup for a generated paw print (used in circular mode)
  const pawSvg = `
    <svg viewBox="0 0 20 20" fill="currentColor" style="width: 100%; height: 100%; display: block;">
      <path d="M10 13.5c1.38 0 2.5-1.12 2.5-2.5S11.38 8.5 10 8.5s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5zm-3-2.5c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm6 0c.83 0 1.5-.67 1.5-1.5S13.83 8 13 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-4-4.5c.69 0 1.25-.56 1.25-1.25S9.69 4 9 4s-1.25.56-1.25 1.25S8.31 6.5 9 6.5zm2 0c.69 0 1.25-.56 1.25-1.25S11.69 4 11 4s-1.25.56-1.25 1.25S10.31 6.5 11 6.5z"/>
    </svg>
  `;

  // Initialize Circular Animations
  const initCircularPaws = () => {
    const containers = document.querySelectorAll('.walking-paws-circle');
    
    containers.forEach(container => {
      if (container.classList.contains('initialized')) return;
      container.classList.add('initialized');

      const pawCount = parseInt(container.getAttribute('data-paws')) || 8;
      const radius = parseFloat(container.getAttribute('data-radius')) || 30; // radius in percent
      const speed = parseInt(container.getAttribute('data-speed')) || 350; // ms per step
      const fadeDelay = parseInt(container.getAttribute('data-fade-delay')) || 1200; // ms before fading out
      const clockwise = container.getAttribute('data-direction') !== 'counter';
      
      container.style.position = 'relative';
      const paws = [];
      
      for (let i = 0; i < pawCount; i++) {
        const angleDeg = clockwise ? (i * 360) / pawCount : 360 - ((i * 360) / pawCount);
        const angleRad = (angleDeg * Math.PI) / 180;
        
        const x = 50 + radius * Math.cos(angleRad);
        const y = 50 + radius * Math.sin(angleRad);
        
        const paw = document.createElement('div');
        paw.className = 'walking-paw';
        paw.style.position = 'absolute';
        paw.style.width = '16px';
        paw.style.height = '16px';
        paw.style.left = `${x}%`;
        paw.style.top = `${y}%`;
        
        const facingAngle = angleDeg + 90;
        paw.style.transform = `translate(-50%, -50%) rotate(${facingAngle}deg)`;
        paw.style.opacity = '0.1';
        paw.style.transition = 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out';
        paw.innerHTML = pawSvg;
        
        container.appendChild(paw);
        paws.push(paw);
      }
      
      let currentIndex = 0;
      
      const walk = () => {
        if (paws.length === 0) return;
        const currentPaw = paws[currentIndex];
        
        currentPaw.style.opacity = '1';
        currentPaw.style.transform = `translate(-50%, -50%) rotate(${(clockwise ? (currentIndex * 360) / pawCount : 360 - ((currentIndex * 360) / pawCount)) + 90}deg) scale(1.15)`;
        
        setTimeout(() => {
          currentPaw.style.opacity = '0.1';
          currentPaw.style.transform = `translate(-50%, -50%) rotate(${(clockwise ? (currentIndex * 360) / pawCount : 360 - ((currentIndex * 360) / pawCount)) + 90}deg) scale(1.0)`;
        }, fadeDelay);
        
        currentIndex = (currentIndex + 1) % pawCount;
        setTimeout(walk, speed);
      };
      
      walk();
    });
  };

  // Initialize Path / Linear Animations (animates custom placed children)
  const initPathPaws = () => {
    const containers = document.querySelectorAll('.walking-paws-path');
    
    containers.forEach(container => {
      if (container.classList.contains('initialized')) return;
      container.classList.add('initialized');

      const speed = parseInt(container.getAttribute('data-speed')) || 400; // ms per step
      const fadeDelay = parseInt(container.getAttribute('data-fade-delay')) || 1200; // ms before fading out
      
      // Get all child elements to animate
      const paws = Array.from(container.children);
      
      // Prepare children transition properties
      paws.forEach(paw => {
        paw.style.transition = 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out';
        paw.style.opacity = '0.15'; // default dim opacity
      });
      
      let currentIndex = 0;
      
      const walk = () => {
        if (paws.length === 0) return;
        const currentPaw = paws[currentIndex];
        
        // Highlight step
        currentPaw.style.opacity = '1';
        currentPaw.style.transform = 'scale(1.25)';
        
        // Schedule fade out
        setTimeout(() => {
          currentPaw.style.opacity = '0.15';
          currentPaw.style.transform = 'scale(1.0)';
        }, fadeDelay);
        
        currentIndex = (currentIndex + 1) % paws.length;
        setTimeout(walk, speed);
      };
      
      walk();
    });
  };

  // Run initializers
  initCircularPaws();
  initPathPaws();
});
