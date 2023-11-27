import React, { useState, useEffect, useCallback, memo } from "react";
import useAppDispatch from "../../../hooks/use-dispatch";
import useAppSelector from "../../../hooks/use-selector";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { getDataUser } from "../../../slices_redux/user_slice";

import MenuProfile from "../../blocks/menu_profile";
import Error from "../../ui/error";
import LinkStyle from "../../ui/link_router";
import * as S from "./styles";

const Authorization: React.FC = () => {
  const dispatch = useAppDispatch();

  const [ errorSingOut, setErrorSingOut ] = useState("");

  useEffect(() => {
    // подписка на обновление user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // получение данных в state Redux
      console.log(user?.email);
      dispatch(getDataUser({displayName: user?.displayName, phoneNumber: user?.phoneNumber, email: user?.email}));
    });
    return unsubscribe;
  }, [auth.currentUser]);

  const callbacks = {
    // выход пользователя
    onSingOut: useCallback(async () => {
      try {
        await signOut(auth);
      } catch (error: unknown) {
        const knownError = error as {message: string};
        setErrorSingOut(knownError.message.split(":")[1]);
      }
    }, [])
  };

  const lettera = useAppSelector(state => state.user.lettera);

  return(
    <S.Wrapper>
      {errorSingOut && <Error>{errorSingOut}</Error>}

      {auth.currentUser !== null
        ? <MenuProfile lettera={lettera} signOut={callbacks.onSingOut} />
        : <>
          <LinkStyle to="/login">Login</LinkStyle>
          <LinkStyle to="/register">Register now</LinkStyle>
        </>
      }
    </S.Wrapper>
  );
};

export default memo(Authorization);
