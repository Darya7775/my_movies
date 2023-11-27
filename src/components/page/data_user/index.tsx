import React, { useCallback, useState, memo } from "react";
import { updateProfile, User } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import delay from "../../../utils/delay";
import { updateUserRedux } from "../../../slices_redux/user_slice";
import useAppDispatch from "../../../hooks/use-dispatch";

import ModalConfirm from "../../containers/modal_confirm";
import Button from "../../ui/button";
import WrapperInput from "../../ui/wrapper_input";
import Container from "../../ui/container";
import Form from "../../ui/form";
import Error from "../../ui/error";
import Success from "../../ui/success";

type FormValues = {
  name: string,
  url: string,
}

const DataUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [ errorFetch, setErrorFetch ] = useState("");
  const [ success, setSuccess ] = useState("");
  const [ successDelete, setSuccessDelete ] = useState("");
  const [ showModal, setShowModal ] = useState(false);

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
        dispatch(updateUserRedux({ displayName: user.name }));
        setSuccess("Data updated successfully");
      } catch (error: unknown) {
        const knownError = error as {message: string};
        setErrorFetch(knownError.message.split(":")[1]);
      }

      if(auth.currentUser === null) {
        navigate("/register");
      }
    }, [auth.currentUser]),
  };

  return(
    <main>
      <Container>
        <Form method="POST" onSubmit={handleSubmit(callbacks.onSubmit)}>
          {success &&  delay(<Success>{success}</Success>, setSuccess)}
          {errorFetch && <Error>{errorFetch}</Error>}
          {successDelete && delay(<Success>{successDelete}</Success>, setSuccessDelete)}

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
          <Button data-red="true" type="button" onClick={() => setShowModal(true)}>Delete account</Button>
        </Form>

        <ModalConfirm showModal={showModal} handlerShowModal={setShowModal} handlerSuccess={setSuccessDelete} />

      </Container>
    </main>
  );
};

export default memo(DataUser);
