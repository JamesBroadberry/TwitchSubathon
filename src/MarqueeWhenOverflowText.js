import React, { useState, useRef, useEffect } from "react";
import Marquee from "react-fast-marquee";
import calculateTextWidth from "calculate-text-width";

function MarqueeWhenOverflowText(props) {
  const text = props.children;
  const [overflowing, setOverflowing] = useState(false);
  const thisComponent = useRef(null);


  useEffect(() => {
    // ⚠ WARNING ⚠ - This needs adjusting every time the font changes
    const length = calculateTextWidth(text, 'normal 800 25px sans-serif');
    setOverflowing(length > thisComponent.current.offsetWidth)
  }, [text]);

  return <div ref={thisComponent}>
    {overflowing ?
      <><Marquee gradient={false} speed={40}>{text}&nbsp;-&nbsp;</Marquee></>
      :
      <>{text}</>}
  </div>;
}

export default MarqueeWhenOverflowText;