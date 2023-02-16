import React from 'react';

import './Button.css';

interface Props {
  buttonText: string;
  onClick: () => void;
}

export const Button: React.FC<Props> = ({ buttonText, onClick }) => {
  return (
    <button className='field__button' onClick={onClick}>
      {buttonText}
    </button>
  );
};
