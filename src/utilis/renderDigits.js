import { useState } from "react";

export const RenderDigits = (number) => {

    const [animate, setAnimate] = useState(false);

    const newNum = number?.toString()?.split('');

    return newNum?.map((digit, index) => (
      <span
        key={index}
        className={`digit 
          ${animate ? 'animateup' : ''}
          `}
        onAnimationEnd={() => setAnimate(false)}
      >
        {digit}
      </span>
    ));
  };