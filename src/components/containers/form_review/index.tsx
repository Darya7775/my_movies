import React, { useState, memo, useEffect, useRef } from "react";
import { Timestamp, setDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { useParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import useAutosizeTextArea from "../../../hooks/use-autosize-textarea";
import delay from "../../../utils/delay";

import Button from "../../ui/button";
import Form from "../../ui/form";
import Error from "../../ui/error";
import Success from "../../ui/success";
import WrapperTextarea from "../../ui/wrapper_textarea";

interface Props {
  title: string,
  newRew: boolean,
  reset?: boolean,
  openAnswer?: () => void,
  idParent?: string,
  parentChildren?: string[] | undefined
}

type FormValues = {
  review: string
}

const FormReview: React.FC<Props> = (props: Props) => {
  const { idmovie } = useParams() as { idmovie: string };
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [ error, setError ] = useState("");
  const [ success, setSuccess ] = useState("");
  const { register, formState, handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues: {
      review: ""
    }
  });
  const { ref, ...rest } = register("review", {
    required: true,
    min: 2,
    maxLength: 500
  });
  const { isValid, isSubmitting, isSubmitSuccessful } = formState;

  useEffect(() => {
    reset();
  }, [ isSubmitSuccessful, reset ]);

  const watchReview = useWatch({ control: control, name: "review" });
  useAutosizeTextArea(textAreaRef.current, watchReview);

  const callbacks = {
    // добавление отзыва в базу
    onAddReview: async(comment: FormValues) => {
      try {
        const id = new Date().valueOf().toString();

        await setDoc(doc(db, idmovie, id), {
          id: id,
          idMovie: idmovie,
          children: [],
          name: auth.currentUser?.displayName,
          comment: comment.review,
          time: Timestamp.now()
        });
        setSuccess("Review sent");
      } catch (e) {
        setError(String(e));
      }
    },
    // добавление ответа
    onAddAnswer: async(parentId: string, comment: FormValues) => {
      const id = new Date().valueOf().toString();

      try {
        // add in parent array children
        const parentRef = doc(db, idmovie, props.idParent as string);
        await updateDoc(parentRef, {
          children: [ ...props.parentChildren as string[], id ]
        });

        // add in parent subcollection
        const revRef = doc(db, idmovie, parentId, "children", id);
        await setDoc(revRef, {
          id: id,
          idMovie: idmovie,
          idParent: parentId,
          name: auth.currentUser?.displayName,
          comment: comment.review,
          time: Timestamp.now()
        });

        setSuccess("Answer sent");
      } catch (e) {
        setError(String(e));
      }
    }
  };

  return(
    <Form onSubmit={handleSubmit((comment: FormValues) => props.newRew ? callbacks.onAddReview(comment) : callbacks.onAddAnswer(props.idParent as string, comment))}>
      {success &&  delay(<Success>{success}</Success>, setSuccess)}
      {error && <Error>{error}</Error>}

      <WrapperTextarea>
        <label htmlFor="review">{props.title}</label>
        <textarea placeholder="Enter a review" id="review" rows={1}
          {...rest} ref={(e) => {
            ref(e);
            textAreaRef.current = e;
          }}>
        </textarea>
      </WrapperTextarea>

      <Button type="submit" disabled={!isValid || isSubmitting}>Send Review</Button>
      {props.reset && <Button type="reset" onClick={props.openAnswer}>Cancel</Button>}
    </Form>
  );
};

export default memo(FormReview);
