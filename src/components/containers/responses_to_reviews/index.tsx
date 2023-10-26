import React, { useState, useCallback, useEffect, memo } from "react";
import { collection, getDocs, onSnapshot, getCountFromServer, limitToLast, orderBy, startAfter, limit, query } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { useParams } from "react-router-dom";
import FormReview from "../form_review";
import Spinner from "../../ui/spinner";
import Button from "../../ui/button";
import * as T from "../../../types";

import List from "../../ui/list";
import OneReview from "../../blocks/one_review";
import LinkStyle from "../../ui/link_router";

interface Props {
  idParent: string,
  openAnswer: string,
  onOpenAnswer: (id: string) => void,
  onCancelOpenAnswer: () => void,
  parentChildren?: string[]
}

const ResponsesToReviews: React.FC<Props> = (props: Props) => {
  const { idmovie } = useParams() as { idmovie: string };

  const [ reviews, setReviews ] = useState<T.Children[]>([]); // все ответы на 1 отзыв
  const [ status, setStatus ] = useState<T.FetchingStatus>("idle"); // статус загрузки отзывов
  const [ error, setError ] = useState("");
  const [ downloadedDoc, setDownloadedDoc ] = useState(0); // всего загруженных документов
  const [ totalDocuments, setTotalDocuments ] = useState(0); // всего документов в базе
  const [ idLastDoc, setIdLastDoc ] = useState(""); // id последнего дока для запроса след партии

  useEffect(() => { // для 1 ответа
    const q = query(collection(db, idmovie, props.idParent, "children"), orderBy("id"), limitToLast(1));
    const unsubscribe = onSnapshot(q,
    (snapshot) => {
      let add: T.Children[] = [];

      snapshot.forEach(rev => {
        let copyRev = rev.data();
        copyRev.time = copyRev.time.toDate();
        add.push(copyRev as T.Children)
      });
      setDownloadedDoc(load => load + 1);
      setReviews(reviews => [...reviews, ...add]);
    },
    (error) => {
      setError(error.message);
    },);

    return () => {
      unsubscribe();
  	}
  }, [])

  useEffect(() => { // для первых 10 ответов
    setStatus("loading");

    const q = query(collection(db, idmovie, props.idParent, "children"), orderBy("id"), limit(10));
    const unsubscribe = onSnapshot(q,
    (snapshot) => {
      let add: T.Children[] = [];

      snapshot.forEach(rev => {
        let copyRev = rev.data();
        copyRev.time = copyRev.time.toDate();
        add.push(copyRev as T.Children);
      });

      setDownloadedDoc(snapshot.size);
      setReviews([...reviews, ...add]);
      if(snapshot.size !== 0) {
        setIdLastDoc(add[snapshot.size - 1].id);
      }
      setStatus("succeeded");
    },
    (error) => {
      setError(error.message);
      setStatus("failed");
    },);

    return () => {
      unsubscribe();
  	}
  }, [])

  const callbacks = {
    onLoadMore: async() => {
      try {
        setStatus("loading");
        const q = query(collection(db, idmovie, props.idParent, "children"), orderBy("id"), startAfter(idLastDoc), limit(10));
        const querySnapshot = await getDocs(q);

        let add: T.Children[] = [];

        querySnapshot.forEach(rev => {
          let copyRev = rev.data();
          copyRev.time = copyRev.time.toDate();
          add.push(copyRev as T.Children);
        });

        setReviews(reviews => [...reviews, ...add]);
        setIdLastDoc(add[querySnapshot.size - 1].id);
        setDownloadedDoc(downloadedDoc + querySnapshot.size);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
        setError(String(error));
      }
    },
    // запрос на общее кол-во док-тов
    onTotalDocs: useCallback(async () => {
      const coll = collection(db, idmovie, props.idParent, "children");
      const countDocs = await getCountFromServer(coll);
      setTotalDocuments(countDocs.data().count);
    }, [])
  }

  let content;
  if(status === "loading") {
    callbacks.onTotalDocs();
    content = <Spinner text="Loading..." />
  } else if(status === "succeeded") {
    content = totalDocuments <= downloadedDoc ? null : <Button type="button" onClick={callbacks.onLoadMore}>Load more</Button>;
  } else if(status === "failed") {
    content = <div>{error}</div>
  }

  let keysAdd: {[key: string]: string} = {}; // для того, чтоб не рендерить элементы с одинаковыми ключами

  return(
    <>
      <List data-nested="true">
        {reviews.map(reviewCh => {
          if(!keysAdd[reviewCh.id]) {
            keysAdd[reviewCh.id] = reviewCh.id;

            return(
              <OneReview review={reviewCh} key={reviewCh.id}>
                {props.openAnswer === reviewCh.id
                  ? (auth.currentUser !== null
                    ? <FormReview title="Answer" newRew={false} reset={true} openAnswer={props.onCancelOpenAnswer}
                                  idParent={reviewCh.idParent} parentChildren={props.parentChildren} />
                    : <>
                        <LinkStyle to={"/login"}>On login</LinkStyle>
                        <Button type="reset" onClick={props.onCancelOpenAnswer}>Reset</Button>
                      </>)
                  : <Button type="button" onClick={() => props.onOpenAnswer(reviewCh.id)}>Answer</Button>}
              </OneReview>);
          }
        })}
      </List>
      {content}
    </>
  );
};

export default memo(ResponsesToReviews);
