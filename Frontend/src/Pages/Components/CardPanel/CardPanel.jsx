import { React, useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import "./CardPanel.css";

export const CardPanel = (props) => {
  const [counterOn, setCounterOn] = useState(false);
  return (
    <div>
      <div className="com-admin-block">
        <span className="com-admin-block-title">{props.title}</span>
        <span className="com-admin-block-number">
          <ScrollTrigger
            onEnter={() => setCounterOn(true)}
          >
            {counterOn && (
              <CountUp start={0} end={props.number} duration={3} delay={0} />
            )}
          </ScrollTrigger>
        </span>
      </div>
    </div>
  );
};
