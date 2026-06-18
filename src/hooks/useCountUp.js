import { useEffect, useState } from 'react';
import { useReveal } from './useReveal';

export function useCountUp(target, suffix = '') {
  const [ref, visible] = useReveal(0.5);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const t = setInterval(() => {
      current = Math.min(current + increment, target);
      setValue(Math.floor(current));
      if (current >= target) clearInterval(t);
    }, step);

    return () => clearInterval(t);
  }, [visible, target]);

  return [ref, `${value}${suffix}`];
}
