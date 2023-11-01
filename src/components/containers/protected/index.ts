import React, { memo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAppSelector from "../../../hooks/use-selector";

interface Props {
  children: JSX.Element,
  redirect: string
}

const Protected: React.FC<Props> = (props: Props) => {

  const name = useAppSelector(state => state.user.displayName);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!name) {
      navigate(props.redirect, {state: { back: location.pathname }});
    }
  }, [name]);

  if(!name) {
    return null;
  }
  return props.children;
};

export default memo(Protected);
