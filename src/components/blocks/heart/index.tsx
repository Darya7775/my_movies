import React, { useState } from "react";
import useMactchMedia from "../../../hooks/use-match-media";
import ButtonHeart from "./styles";

interface Props {
  children?: [],
  isFav: boolean,
  onAdd?: () => void,
  onDelete?: () => void
}

const Heart: React.FC<Props> = (props: Props) => {
  const { isDesktop } = useMactchMedia() as { isDesktop: boolean };
  const [ favMov, setFavMov ] = useState(props.isFav);

  const callbacks = {
    //  добавить фильм в избранное
    onAdd: () => {
      setFavMov(true);
      props.onAdd && props.onAdd();
    },
    // удалить фильм из избранного
    onDelete: () => {
      setFavMov(false);
      props.onDelete && props.onDelete();
    }
  };

  return(
    <ButtonHeart
      type="button"
      data-fav={favMov}
      aria-label={favMov ? "Remove from favorites" : "Add to favorites"}
      {...(isDesktop ? {title: favMov ? "Remove from favorites" : "Add to favorites"} : {})}
      onClick={() => {
        favMov ? callbacks.onDelete() : callbacks.onAdd();
      }}>
      {props.children}
    </ButtonHeart>
  );
};

export default Heart;
