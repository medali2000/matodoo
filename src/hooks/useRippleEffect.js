import { useEffect } from 'react';

/**
 * Adds a ripple-on-click effect to any element matching the given selector,
 * using event delegation on document so it works for dynamically rendered buttons/links.
 */
export function useRippleEffect(selector = '.btn-primary, .nav-cta, .form-submit') {
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest(selector);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;

      const prevPosition = getComputedStyle(target).position;
      if (prevPosition === 'static') target.style.position = 'relative';
      target.style.overflow = 'hidden';
      target.appendChild(ripple);

      setTimeout(() => ripple.remove(), 700);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [selector]);
}
