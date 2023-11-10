import styled from "styled-components";
import heart from "../../../assets/heart.svg";
import fullheart from "../../../assets/heartfull.svg";

const ButtonHeart = styled.button`
  display: block;
  height: 40px;
  width: 40px;

  background: center / 20px no-repeat #ffffff;
  border: none;

  cursor: pointer;

  &[data-fav="true"] {
    background-image: url(${fullheart});
  }

  &[data-fav="false"] {
    background-image: url(${heart});
  }

  transition: background-image 1s;
`;

export default ButtonHeart;


















// import React, { useCallback, useState } from "react";

// interface Props {
//   isFav: boolean,
//   onDelete: () => void,
//   onAdd: () => void
// }

// const ButtonHeart: React.FC<Props> = (props: Props) => {
//   const [ favMov, setFavMov ] = useState(props.isFav);

//   const callbacks = {
//     onAdd: useCallback(() => {
//       setFavMov(true);
//     }, []),
//     onDelete: useCallback(() => {
//       setFavMov(false);
//     }, [])
//   }

//   return(
//     <S.ButtonHeart type="button"
//       data-fav={favMov ? "true" : "false"}
//       aria-label={favMov ? "Remove from favorites" : "Add to favorites"}
//       onClick={() => {favMov ? callbacks.onDelete() : callbacks.onAdd()}}>
//     </S.ButtonHeart>
//   );
// };


