import React from 'react';

const CloseButton = ({ onClick }) => (
  <button onClick={onClick} style={{ background: 'red', color: 'white' }}>
    X
  </button>
);

export default CloseButton;
