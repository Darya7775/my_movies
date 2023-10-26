import React, { useState, memo, useEffect } from "react";
import useMactchMedia from "../../../hooks/use-match-media";
import * as S from "./styles";

interface Props {
  signOut: () => Promise<void>,
  lettera: string | null | undefined
}

const MenuProfile: React.FC<Props> = (props: Props) => {
  const { isMobile } = useMactchMedia() as { isMobile: boolean };
  const [ stateMenu, setStateMenu ] = useState(false);

  useEffect(() => {
    if (stateMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
 }, [stateMenu]);

  return(
    <>
      {isMobile // на mobile
        ? ( stateMenu // если меню открыто
            ? (<>
                <S.Lettera>{props.lettera}</S.Lettera>
                <S.Overlay onClick={() => setStateMenu(!stateMenu)}/>
                <S.StyleNavigationActive>
                  <S.ButtonClose type="button" aria-label="close menu" onClick={() => setStateMenu(!stateMenu)}></S.ButtonClose>
                  <S.ListUser>
                    <li key={1}>
                      <S.ListUserLink to={"/movies"} onClick={() => setStateMenu(!stateMenu)}>My movies</S.ListUserLink>
                    </li>
                    <li key={2}>
                      <S.ListUserLink to={"/data_user"} onClick={() => setStateMenu(!stateMenu)}>Profile editing</S.ListUserLink>
                    </li>
                    <li key={3}>
                      <S.ButtonSingOut type="button" onClick={() => {props.signOut(); setStateMenu(!stateMenu)}}>Sing Out</S.ButtonSingOut>
                    </li>
                  </S.ListUser>
                </S.StyleNavigationActive>
              </>)
            : ( <S.ButtonAvatar type="button" aria-label="open menu" onClick={() => setStateMenu(!stateMenu)}>
                  {props.lettera}
                </S.ButtonAvatar>
              )
          )
        : (<S.ListUser>
            <li key={1}>
              <S.ListUserLink to={"/movies"}>My movies</S.ListUserLink>
            </li>
            <li key={2}>
              <S.ListUserLink to={"/data_user"}>Profile editing</S.ListUserLink>
            </li>
            <li key={3}>
              <S.ButtonSingOut type="button" onClick={props.signOut}>Sing Out</S.ButtonSingOut>
            </li>
          </S.ListUser>
          )
      }
    </>
  );
};

export default memo(MenuProfile);
