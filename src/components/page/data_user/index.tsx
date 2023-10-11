import React, { useCallback, useState, memo } from "react";
import { updateProfile, User, deleteUser } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

import Button from "../../ui/button";
import WrapperInput from "../../ui/wrapper_input";
import Container from "../../ui/container";
import Form from "../../ui/form";
import Error from "../../ui/error";
import Success from "../../ui/success";

type FormValues = {
  name: string,
  url: string
}

const DataUser: React.FC = () => {
  const navigate = useNavigate();

  const [ error, setError ] = useState("");
  const [ success, setSuccess ] = useState("");
  const [ errorDelete, setErrorDelete ] = useState("");
  const [ successDelete, setSuccessDelete ] = useState("");

  const { register, formState, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: "Guest",
      url: "https://via.placeholder.com/150/b0f7cc"
    }
  });
  const { isValid, isSubmitting } = formState;

  const callbacks = {
    // обновление имя и фото
    onSubmit: useCallback(async (user: FormValues) => {
      try {
        await updateProfile(auth.currentUser as User, { displayName: user.name, photoURL: user.url });
        setSuccess("Data updated successfully");
      } catch (error: any) {
        setError(error.message.split(":")[1]);
      }

      if(auth.currentUser === null) {
        navigate("/register");
      }
    }, [auth.currentUser]),
    // delete пользователя
    onDelete: useCallback(async () => {
      try {
        await deleteUser(auth.currentUser as User);
        setSuccessDelete("Account delete successfully");
        const deb = debounce(() => navigate("/register"), 1500);
        deb();
      } catch (error: any) {
        setErrorDelete(error.message.split(":")[1]);
        navigate("/login");
      }
    }, [auth.currentUser])
  };
  // задержка для success
  const delay = (arg: JSX.Element, arg2: (ar: "") => void) => {
    const deb = debounce((set: typeof arg2) => set(""), 3000)
    deb(arg2);
    return arg;
  };

  return(
    <main>
      <Container>
        <Form method="POST" onSubmit={handleSubmit(callbacks.onSubmit)}>
          {success &&  delay(<Success>{success}</Success>, setSuccess)}
          {error && <Error>{error}</Error>}
          {successDelete && delay(<Success>{successDelete}</Success>, setSuccessDelete)}
          {errorDelete && <Error>{errorDelete}</Error>}

          <WrapperInput>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Margot Robbie" aria-label="Enter your name"
              {...register("name", {
                required: true,
                min: 2,
                maxLength: 50,
                pattern: {
                  message: "Only letters and hyphen",
                  value: /^[A-Z]([a-z]| |-|[A-Z]){1,50}$/
              }
            })} />
          </WrapperInput>

          <WrapperInput>
            <label htmlFor="foto">Foto</label>
            <input type="text" id="foto" placeholder="https://example.com/jane-q-user/profile.jpg" aria-label="Enter your url foto"
              {...register("url", {
                required: true,
                pattern: {
                  value: /^https:\/\/.+$/,
                  message: "https://example.com/jane-q-user/profile.jpg"
              }
            })} />
          </WrapperInput>

          <Button type="submit" disabled={!isValid || isSubmitting}>Send</Button>
          <Button data-red="true" type="button" onClick={callbacks.onDelete}>Delete account</Button>

        </Form>
      </Container>
    </main>
  );
};

export default memo(DataUser);
