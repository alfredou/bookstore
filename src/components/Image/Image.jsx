import React from "react";
import { useNearScreen } from "../../hooks/useNearScreen";

export const Image = ({ src, imageClass, alt, style }) => {
  const [isNear, fromRef] = useNearScreen();

  return (
    <figure className="image__figure" ref={fromRef}>
      {isNear && <img src={src} className={imageClass} alt={alt || ''} style={style} />}
    </figure>
  );
};
