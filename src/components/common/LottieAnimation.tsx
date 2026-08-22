import React from 'react';

interface LottieAnimationProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
}

export default function LottieAnimation({
  src,
  className = 'w-full h-full',
  autoplay = true,
  loop = true,
  speed = 1,
}: LottieAnimationProps) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      {React.createElement('dotlottie-wc', {
        src,
        autoplay: autoplay ? 'true' : undefined,
        loop: loop ? 'true' : undefined,
        speed: speed.toString(),
        style: { width: '100%', height: '100%' },
      })}
    </div>
  );
}
