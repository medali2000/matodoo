import { useTheme } from './hooks/useTheme';
import { useScrollProgress, useCursorGlow } from './hooks/useScrollEffects';
import { useRippleEffect } from './hooks/useRippleEffect';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Training from './components/Training';
import Experience from './components/Experience';
import Stack from './components/Stack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  const { theme, toggleTheme } = useTheme();
  const progress = useScrollProgress();
  const glowRef = useCursorGlow();
  useRippleEffect();

  return (
    <>
      <div className="scroll-bar" style={{ width: `${progress}%` }}></div>
      <div className="cursor-glow" ref={glowRef}></div>

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Training />
      <Experience />
      <Stack />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;
