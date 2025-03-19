import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useSwipeable } from 'react-swipeable';

interface IProps { 
  children: React.JSX.Element
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}
const ProfileCard = ({ children, onSwipeLeft, onSwipeRight }:IProps) => {
  const [isSwiped, setIsSwiped] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [currentX, setCurrentX] = useState<number>(0);
  
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setIsSwiped(true);
      onSwipeLeft?.();
    },
    onSwipedRight: () => {
      setIsSwiped(true);
      onSwipeRight?.();
    },
    onSwiping: (event) => {
      setIsDragging(true);
      setCurrentX(event.deltaX);
    },
    onTouchStartOrOnMouseDown: () => {
      setIsDragging(false);
      setCurrentX(0);
    },
    trackMouse: true,
  });
  const { x, opacity } = useSpring({
    x: isSwiped ? (currentX > 0 ? 500 : -500) : isDragging ? currentX : 0,
    opacity: isSwiped ? 0 : 1,
    config: { tension: 200, friction: 20 },
  });
  return (
    <animated.div
      {...handlers}
      style={{
        transform: x.to((x) => `translate3d(${x}px, 0, 0)`),
        opacity,
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: 'grab',
      }}>
      {children}
    </animated.div>
  );
};

export default ProfileCard;