import React, { memo } from "react";
import noPosterPng from "../../../assets/caps/no_poster.png";
import noPosterWebp from "../../../assets/caps/no_poster.webp";
import noPosterAvif from "../../../assets/caps/no_poster.avif";
import * as S from "./styles";

interface Props {
  width: number,
  height: number,
  card?: boolean
}

const NoPoster: React.FC<Props> = (props: Props) => {

  return(
    <picture>
      <source type="image/avif" srcSet={noPosterAvif} />
      <source type="image/webp" srcSet={noPosterWebp} />
      <S.ImgMovie src={noPosterPng} alt="Poster" width={props.width} height={props.height} data-card={props.card} />
    </picture>
  );
};

export default memo(NoPoster);
