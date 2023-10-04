import React, { useState, useEffect, useCallback, memo } from "react";
import useAppDispatch from "../../../hooks/use-dispatch";
import useAppSelector from "../../../hooks/use-selector";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { getDataUser } from "../../../slices_redux/user_slice";

import MenuProfile from "../../blocks/menu_profile";
import Error from "../../ui/error";
import * as S from "./styles";

const Authorization: React.FC = () => {
  const dispatch = useAppDispatch();

  const [ error, setError ] = useState("");

  useEffect(() => {
    // подписка на обновление user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // получение данных в state Redux
      dispatch(getDataUser({displayName: user?.displayName, phoneNumber: user?.phoneNumber, email: user?.email}));
    });
    return unsubscribe;
  }, [auth.currentUser]);

  const callbacks = {
    // выход пользователя
    onSingOut: useCallback(async () => {
      try {
        await signOut(auth);
      } catch (error: any) {
        setError(error.message.split(":")[1]);
      }
    }, [])
  };

  const lettera = useAppSelector(state => state.user.lettera);

  return(
    <S.Wrapper>
      {error && <Error>{error}</Error>}

      {auth.currentUser !== null
        ? <MenuProfile lettera={lettera} signOut={callbacks.onSingOut} />
        : <>
            <S.AutLinkSingIn to="/login">Login</S.AutLinkSingIn>
            <S.AutLinkSingIn to="/register">Register now</S.AutLinkSingIn>
          </>
      }
    </S.Wrapper>
  );
}

export default memo(Authorization);
