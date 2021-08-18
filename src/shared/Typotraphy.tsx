import React from "react";
import {TTapography} from "../storage/types";

const Typography = ({level, children, ...props}: TTapography) =>
  React.createElement(level, {...props}, children);

export default Typography;
