import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppSelector from "../../../hooks/use-selector";

interface Props {
  children: JSX.Element,
  redirect: string
}

const Protected: React.FC<Props> = (props: Props) => {

  const email = useAppSelector(state => state.user.email);
  console.log(email);
  // @todo при перезагрузке отправляет на login

  const navigate = useNavigate();

  const redirect = () => {
    console.log("outside", email);
    if (!email) {
      console.log(!email);
      navigate(props.redirect);
    }
  };

  useEffect(() => {
    window.addEventListener("onload", redirect);

    return window.removeEventListener("onload", redirect);
  }, [email]);

  return props.children;
};

export default memo(Protected);
