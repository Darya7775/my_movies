import React, { useCallback, useState, memo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

import Button from "../../ui/button";
import WrapperInput from "../../ui/wrapper_input";
import Container from "../../ui/container";
import Form from "../../ui/form";
import EyeImg from "../../ui/eye";
import Error from "../../ui/error";

import eye from "../../../assets/eye.svg";
import eyeClose from "../../../assets/eye_close.svg";

type FormValues = {
  login: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState('');
  const [ show, setShow ] = useState(false);

  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { isValid, isSubmitting } = formState;

  const callbacks = {
    // авторизация и перенаправление на страницу с которой пришли или на главную
    onSubmit: useCallback(async (user: FormValues) => {
      try {
        await signInWithEmailAndPassword(auth, user.login, user.password);
        const back =  location.state?.back && location.state?.back !== location.pathname
                      ? location.state?.back
                      : '/';
        navigate(back);
      } catch (error: any) {
        setError(error.message.split(":")[1]);
      }
    }, []),
    // открытие/закрытие пароля
    onPassword: () => setShow(!show),
  };

  return(
    <main>
      <Container>
        <Form method="POST" onSubmit={handleSubmit(callbacks.onSubmit)} >
          <h2>Login</h2>
          {error && <Error>{error}</Error>}

          <WrapperInput>
            <label htmlFor="login">Login</label>
            <input type="text" id="login" autoFocus placeholder="example@gmail.com" aria-label="Enter your email"
              {...register("login", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "example@gmail.com"
              }
            })} />
          </WrapperInput>

          <WrapperInput>
            <label htmlFor="password">Password</label>
            <input type={show ? "text" : "password"} id="password" placeholder="1P3a5s)?" aria-label="Enter your password"
              {...register("password", {
                required: true,
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/,
                  message: "From 8 to 20 characters, The password must contain: - !?@#$%*_=() minimum one special character, - A-Z: minimum one letter in uppercase, - a-z: minimum one lowercase letter"
              }
            })} />
            <EyeImg src={show ? eye : eyeClose} width={30} height={25} alt={show ? "hide password" : "show password"} onClick={callbacks.onPassword}/>
          </WrapperInput>

          <Button type="submit" disabled={!isValid || isSubmitting}>Login</Button>
          <Link to="/reset_password">Forgot your password?</Link>

        </Form>
      </Container>
    </main>
  );
};

export default memo(Login);
