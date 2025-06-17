import { useRef, useEffect } from 'react';
import p5 from 'p5';

const GlitchPlaceholder = ({ width = 400, height = 300 }) => {
  const ref = useRef();

  useEffect(() => {
    let sketch = (p) => {
      p.setup = () => {
        p.createCanvas(width, height);
        p.noLoop();
        p.background(10, 10, 20);
        for (let i = 0; i < 20; i++) {
          p.stroke(p.random(100, 255), p.random(100, 255), p.random(255));
          p.strokeWeight(p.random(1, 6));
          p.line(
            p.random(width),
            p.random(height),
            p.random(width),
            p.random(height)
          );
        }
        for (let i = 0; i < 100; i++) {
          p.fill(p.random(100, 255), p.random(255), p.random(100, 255), 100);
          p.ellipse(p.random(width), p.random(height), p.random(10, 40));
        }
      };
    };
    const p5Instance = new p5(sketch, ref.current);
    return () => {
      p5Instance.remove();
    };
  }, [width, height]);

  return <div ref={ref} />;
};

export default GlitchPlaceholder;