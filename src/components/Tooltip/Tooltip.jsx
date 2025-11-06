import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";

const Tooltip = ({
  content,
  placement = "top",
  children,
  interactive = true,
}) => {
  return (
    <Tippy
      content={content}
      placement={placement}
      animation="shift-away"
      delay={[100, 0]}
      arrow={true}
      interactive={interactive}
    >
      <span>{children}</span>
    </Tippy>
  );
};

export default Tooltip;
