import React, { useCallback, useState, memo } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import useMactchMedia from "../../../hooks/use-match-media";

import Button from "../../ui/button";
import WrapperInput from "../../ui/wrapper_input";
import Container from "../../ui/container";
import Form from "../../ui/form";
import EyeImg from "../../ui/eye";
import Error from "../../ui/error";

import eye from "../../../assets/eye.svg";
import eyeClose from "../../../assets/eye_close.svg";

type FormValues = {
  register_email: string
  register_password: string
  register_password_confirm: string
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { isMobile } = useMactchMedia() as { isMobile: boolean };

  const [ error, setError ] = useState("");
  const [ show, setShow ] = useState(false);
  const [ openPrompt, setOpenPrompt ] = useState(false);

  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { isValid, isSubmitting } = formState;

  const callbacks = {
    // регистрация и перенаправление на страницу с именем и фото
    onSubmit: useCallback(async (user: FormValues) => {
      try {
        await createUserWithEmailAndPassword(auth, user.register_email, user.register_password);
        navigate("/data_user");
      } catch (error: any) {
        setError(error.message.split(":")[1]);
      }
    }, []),
    // ошибка при отправлении
    onError: useCallback((errors: FieldErrors<FormValues>) => {
      console.log(errors)
    }, []),
    // открытие/закрытие пароля
    onPassword: () => setShow(!show),
    // открытие/закрытие подсказки пароля
    onPrompt: () => setOpenPrompt(!openPrompt)
  };

  const listPrompts = <ul>From 8 to 20 characters. <br/> The password must contain:
                        <li><b>!?@#$%*_=()</b> minimum one special character</li>
                        <li><b>A-Z</b>: minimum one letter in uppercase</li>
                        <li><b>a-z</b>: minimum one lowercase letter</li>
                      </ul>;

  return(
    <main>
      <Container>
        <Form method="POST" onSubmit={handleSubmit(callbacks.onSubmit, callbacks.onError)} noValidate>
          <h2>Registration</h2>
          {error && <Error>{error}</Error>}

          <WrapperInput>
            <label htmlFor="register_email">E-mail</label>
            <input type="text" id="register_email" autoFocus placeholder="example@gmail.com" aria-label="Enter your email"
              {...register("register_email", {
                required: true,
                pattern: {
                  value: /\w+@\w+\.\w+/,
                  message: "example@gmail.com"
              }
            })} />
          </WrapperInput>

          <WrapperInput>
            <label htmlFor="register_password">Password</label>
            <input type={show ? "text" : "password"} id="register_password" aria-label="Enter your password"
              placeholder="8-20 symbols. Example: 1P3a5s)?"
              {...register("register_password", {
                required: true,
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/,
                  message: "From 8 to 20 characters, The password must contain: - !?@#$%*_=() minimum one special character, - A-Z: minimum one letter in uppercase, - a-z: minimum one lowercase letter"
              }
            })} />
            <EyeImg src={show ? eye : eyeClose} width={30} height={25} alt={show ? "hide password" : "show password"} onClick={callbacks.onPassword}/>
            {isMobile
              ? (listPrompts)
              : (openPrompt
                  ? (<><button type="button" aria-label="password hint" onClick={callbacks.onPrompt}></button>
                      {listPrompts}</>)
                  : (<button type="button" aria-label="password hint" onClick={callbacks.onPrompt}></button>)
                )
            }
          </WrapperInput>

          <Button type="submit" disabled={!isValid || isSubmitting}>Register</Button>
        </Form>
      </Container>
    </main>
  );
};

export default memo(Register);
