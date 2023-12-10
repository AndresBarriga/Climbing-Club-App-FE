import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const SwipeableCard = ({ children }) => {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    set({ x: down ? mx : 0, y: down ? my : 0 });
  });

  return (
    <animated.div
      {...bind()}
      style={{
        transform: x.to((x) => `translate3d(${x}px,${y}px,0)`),
      }}
    >
      { children }
    </animated.div>
  );
};

export default SwipeableCard;