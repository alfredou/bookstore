import React from 'react';
import './Button.css';
//para hoy cambiar el nombre del dominio y arreglar los estilos de la tabla de ordenes
const STYLES = ['btn--blue', 'btn--red', 'btn--test', 'btn--primary--solid'];

const SIZES = ['btn--medium', 'btn--small', 'btn--large'];

const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  disabled,
  loading
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`${checkButtonStyle} ${checkButtonSize} ${loading ? 'btn--loading' : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? <span className="btn__spinner"></span> : children}
    </button>
  );
};

export default Button