import React from 'react';

const Typography = ({ level, children, ...props }) => (
  React.createElement(level, {...props}, children)
);

export default Typography;