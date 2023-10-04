import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

import Form from "../../ui/form";
import WrapperInput from "../../ui/wrapper_input";
import Container from "../../ui/container";
import Error from "../../ui/error";
import Button from "../../ui/button";

type FormValues = {
  reset_password_email: string
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const { register, formState, handleSubmit } = useForm<FormValues>();
  const { isValid } = formState;

  const callbacks = {
    // сброс пароля и перенаправление на страницу с текстом проверки email
    onSubmit: useCallback(async (email: FormValues) => {
      try {
        await sendPasswordResetEmail(auth, email.reset_password_email, {url: "https://mymovies-1f13f.firebaseapp.com/"});
        navigate("check_email");
      } catch (error: any) {
        setError(error.message.split(":")[1]);
      }
    }, []),
  };

  return(
    <main>
      <Container>
        {error && <Error>{error}</Error>}
        <p>What's your email address?</p>
        <p>Enter the email you used to register</p>

        <Form method="POST" onSubmit={handleSubmit(callbacks.onSubmit)}>

          <WrapperInput>
            <label htmlFor="reset_password_email">E-mail</label>
            <input type="text" id="reset_password_email" autoFocus placeholder="example@gmail.com" aria-label="Enter your email"
              {...register("reset_password_email", {
                required: true,
                pattern: {
                  value: /\w+@\w+\.\w+/,
                  message: "example@gmail.com"
              }
            })} />
          </WrapperInput>

          <Button type="submit" disabled={!isValid}>Send password reset email</Button>
        </Form>

      </Container>
    </main>
  );
};

export default memo(ResetPassword);
