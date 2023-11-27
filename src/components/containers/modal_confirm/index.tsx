import React, { useState, useCallback, memo } from "react";
import { User, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { deleteUserRedux } from "../../../slices_redux/user_slice";
import useAppDispatch from "../../../hooks/use-dispatch";
import { auth } from "../../../firebase/firebase";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import delay from "../../../utils/delay";

import Button from "../../ui/button";
import WrapperInput from "../../ui/wrapper_input";
import Form from "../../ui/form";
import Error from "../../ui/error";
import Modal from "../../blocks/modal";
import EyeImg from "../../ui/eye";

import eye from "../../../assets/eye.svg";
import eyeClose from "../../../assets/eye_close.svg";

interface Props {
  handlerShowModal: (ar: boolean) => void,
  handlerSuccess: (ar: string) => void,
  showModal: boolean
}

export type FormValues = {
  confirm_password: string
}

const ModalConfirm: React.FC<Props> = (props: Props) => {
  const DELAY = 1000;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [ errorConfirm, setErrorConfirm ] = useState("");
  const [ showPas, setShowPas ] = useState(false);

  const { register, formState, handleSubmit } = useForm<FormValues>();
  const { isValid, isSubmitting } = formState;

  const callbacks = {
    // подтверждение авторизации and delete пользователя
    confirmAuthAndDelete: useCallback(async(user: FormValues) => {
      try {
        const credential = EmailAuthProvider.credential(
          auth.currentUser?.email as string,
          user.confirm_password
        );
        await reauthenticateWithCredential(auth.currentUser as User, credential);
        props.handlerShowModal(false);
        await deleteUser(auth.currentUser as User);
        dispatch(deleteUserRedux());
        props.handlerSuccess("Account delete successfully");
        const deb = debounce(() => navigate("/register"), DELAY);
        deb();
      } catch (error: unknown) {
        const knownError = error as {message: string};
        setErrorConfirm(knownError.message.split(":")[1]);
      }
    }, [auth.currentUser]),
    // открытие/закрытие пароля
    onPassword: () => setShowPas(!showPas),
  };

  return(
    <Modal state={props.showModal} title="Confirm deletion" onHandler={() => props.handlerShowModal(false)}>
      <Form method="POST" onSubmit={handleSubmit(callbacks.confirmAuthAndDelete)}>
        {errorConfirm && delay(<Error>{errorConfirm}</Error>, setErrorConfirm)}

        <WrapperInput>
          <label htmlFor="confirm_password">Enter Password</label>
          <input type={showPas ? "text" : "password"} role="textbox" id="confirm_password" aria-label="Enter your password"
            placeholder="8-20 symbols. Example: 1P3a5s)?"
            {...register("confirm_password", {
              required: true,
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/,
                message: "From 8 to 20 characters, The password must contain: - !?@#$%*_=() minimum one special character, - A-Z: minimum one letter in uppercase, - a-z: minimum one lowercase letter"
              }
            })} />
          <EyeImg src={showPas ? eye : eyeClose} width={30} height={25} alt={showPas ? "hide password" : "show password"} onClick={callbacks.onPassword}/>
        </WrapperInput>
        <Button type="submit" disabled={!isValid || isSubmitting}>Confirm</Button>

      </Form>
    </Modal>
  );
};

export default memo(ModalConfirm);
