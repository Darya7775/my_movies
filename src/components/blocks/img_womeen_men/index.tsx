import React from "react";
import womanJpg from "../../../assets/caps/woman.jpg";
import womanWebp from "../../../assets/caps/woman.webp";
import womanAvif from "../../../assets/caps/woman.avif";
import manJpg from "../../../assets/caps/man.jpg";
import manWebp from "../../../assets/caps/man.webp";
import manAvif from "../../../assets/caps/man.avif";
import * as S from "./styles";

export const Woman: React.FC = () => {
  return(
    <picture>
      <source type="image/avif" srcSet={womanAvif} />
      <source type="image/webp" srcSet={womanWebp} />
      <S.ImgCast src={womanJpg} alt="No foto" width={100} height={150} />
    </picture>
  );
};

export const Man: React.FC = () => {
  return(
    <picture>
      <source type="image/avif" srcSet={manAvif} />
      <source type="image/webp" srcSet={manWebp} />
      <S.ImgCast src={manJpg} alt="No foto" width={100} height={150} />
    </picture>
  );
};
