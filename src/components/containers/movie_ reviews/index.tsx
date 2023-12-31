import React, { useState, useCallback, useEffect, memo, useRef } from "react";
import { collection, getCountFromServer, onSnapshot, orderBy, limit, query, getDocs, startAfter } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { useParams } from "react-router-dom";
import useMactchMedia from "../../../hooks/use-match-media";
import ResponsesToReviews from "../responses_to_reviews";
import FormReview from "../form_review";
import * as T from "../../../types";

import LinkStyle from "../../ui/link_router";
import Spinner from "../../ui/spinner";
import Button from "../../ui/button";
import Modal from "../../blocks/modal";
import List from "../../ui/list";
import Wrapper from "../../ui/wrapper";
import OneReview from "../../blocks/one_review";
import Section from "../../ui/section";
import WrapperMiniReviews from "../../blocks/wrapper_mini_reviews";
// @todo разобраться в перерисовках,

const MovieReviews: React.FC = () => {
  const NUMBERS_OF_DOCUMENTS = 10;
  const { idmovie } = useParams() as { idmovie: string };
  const { isMobile } = useMactchMedia() as { isMobile: boolean };

  const [ stateReviews, setStateReviews ] = useState(false); // флаг открытия/закрытия секции на mobile
  const [ reviews, setReviews ] = useState<T.Review[]>([]); // в который добавляем новый отзыв
  const [ openAnswer, setOpenAnswer ] = useState(""); // флаг открытия формы ответа
  const [ status, setStatus ] = useState<T.FetchingStatus>("idle"); // статус загрузки отзывов
  const [ errorFetch, setErrorFetch ] = useState("");
  const [ downloadedDoc, setDownloadedDoc ] = useState(0); // всего загруженных документов
  const [ totalDocuments, setTotalDocuments ] = useState(0); // всего докумнтов в базе
  const [ idLastDoc, setIdLastDoc ] = useState(""); // id последнего дока для запроса след партии
  const [ openAnswersR, setOpenAnswersR ] = useState(""); // флаг открытия ответов на отзыв

  const [ isLoading, setIsLoading ] = useState(false); // infinity scroll
  const [ statusLoadMore, setStatusLoadMore ] = useState<T.FetchingStatus>("idle");
  const refParent = useRef<HTMLDivElement | null>(null);
  const refUl = useRef<HTMLUListElement | null>(null);

  const handleScroll = async() => {
    if(refUl.current !== null) {
      if (window.innerHeight + (refParent.current?.scrollTop as number) < refUl.current?.offsetHeight || isLoading) {
        return;
      }
      if(downloadedDoc < totalDocuments) {
        await callbacks.onLoadMore(idLastDoc);
      }
    }
  };

  useEffect(() => { // for style body on modal
    if (stateReviews) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [stateReviews]);

  useEffect(() => { // for scroll
    refParent.current?.addEventListener("scroll", handleScroll);

    return () => {
      refParent.current?.removeEventListener("scroll", handleScroll);
    };
  }, [ isLoading, idLastDoc, totalDocuments, downloadedDoc, refUl.current, refParent.current, stateReviews ]);

  useEffect(() => { // for subscribe on firestore
    setStatus("loading");

    const q = query(collection(db, idmovie), orderBy("id", "desc"), limit(NUMBERS_OF_DOCUMENTS));
    const unsubscribe = onSnapshot(q,

      (snapshot) => {
        setDownloadedDoc(snapshot.size);
        const add: T.Review[] = [];

        snapshot.forEach(rev => {
          const copyRev = rev.data();
          copyRev.time = copyRev.time.toDate();
          add.push(copyRev as T.Review);
        });

        setReviews([ ...reviews, ...add ]);
        if(snapshot.size !== 0) {
          setIdLastDoc(add[snapshot.size - 1].id);
        }
        setStatus("succeeded");
      },
      (error) => {
        setStatus("failed");
        setErrorFetch(error.message);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const callbacks = {
    onLoadMore: async(idLastDocument: string) => {
      setIsLoading(true);
      setStatusLoadMore("loading");
      try {
        const q = query(collection(db, idmovie), orderBy("id", "desc"), startAfter(idLastDocument), limit(NUMBERS_OF_DOCUMENTS));
        const querySnapshot = await getDocs(q);
        const add: T.Review[] = [];

        querySnapshot.forEach(rev => {
          const copyRev = rev.data();
          copyRev.time = copyRev.time.toDate();
          add.push(copyRev as T.Review);
        });

        setReviews(reviewsPrev => [ ...reviewsPrev, ...add ]);
        setIdLastDoc(add[querySnapshot.size - 1].id);
        setDownloadedDoc(downloadedDoc + querySnapshot.size);
        setStatusLoadMore("succeeded");
      } catch (error) {
        setStatusLoadMore("failed");
        setErrorFetch(String(error));
      } finally {
        setIsLoading(false);
      }
    },
    // запрос на общее кол-во док-тов
    onTotalDocs: useCallback(async () => {
      const coll = collection(db, idmovie);
      const countDocs = await getCountFromServer(coll);
      setTotalDocuments(countDocs.data().count);
    }, [])
  };

  let contentLoadMore;
  if(statusLoadMore === "loading") {
    contentLoadMore = <Spinner text="Loading..." />;
  } else if(statusLoadMore === "failed") {
    contentLoadMore = <div>{errorFetch}</div>;
  }

  // Plural
  const enOrdinalRules = new Intl.PluralRules("en-US", { type: "cardinal" });
  const suffixes = new Map([
    [ "one", "answer" ],
    [ "other", "answers" ],
  ]);
  const formatCardinals = (n: number) => {
    const rule = enOrdinalRules.select(n);
    const suffix = suffixes.get(rule);
    return `${n} ${suffix}`;
  }; //

  let content;
  if(status === "loading") {
    callbacks.onTotalDocs();
    content = <Spinner text="Loading..." />;
  } else if(status === "succeeded") {
    content = <List ref={refUl}>{reviews.map(review => (
      <OneReview review={review} key={review.id}>
        <>
          {openAnswer === review.id
            ? (auth.currentUser !== null
              ? <FormReview title="Answer" newRew={false} reset={true} openAnswer={() => setOpenAnswer("")}
                idParent={review.id} parentChildren={review.children} />
              :<>
                <Button type="submit">on login</Button>
                <Button type="reset" onClick={() => setOpenAnswer("")}>Cancel</Button>
              </>)
            : <Button type="button" onClick={() => setOpenAnswer(review.id)}>Answer</Button>}
          {review.children.length
            ? (openAnswersR === review.id
              ?<><Button type="button" onClick={() => setOpenAnswersR("")} aria-label="Close answers">{formatCardinals(review.children.length)}</Button>
                <ResponsesToReviews
                  idParent={review.id} openAnswer={openAnswer}
                  onCancelOpenAnswer={() => setOpenAnswer("")} onOpenAnswer={setOpenAnswer}
                  parentChildren={review.children} /></>
              : <Button type="button" onClick={() => setOpenAnswersR(review.id)} aria-label="Open answers">{formatCardinals(review.children.length)}</Button>)
            : null}
        </>
      </OneReview>))}
    {contentLoadMore}
    </List>;
  } else if(status === "failed") {
    content = <div>{errorFetch}</div>;
  }

  return(
    <>
      {isMobile // на mobile
        ? (stateReviews // если комментарии открыты
          ?(<Modal ref={refParent} state={stateReviews} title="Reviews" onHandler={() => setStateReviews(false)}>
            <>{openAnswer === ""
              && (auth.currentUser !== null
                ? <FormReview title="New Review" newRew={true} />
                : <div><LinkStyle to={"/login"}>On login</LinkStyle> to write review</div>)
            }
            {content}</>
          </Modal>)
          : (openAnswer === ""
              && (auth.currentUser !== null
                ? <WrapperMiniReviews onHandler={() => setStateReviews(true)} totalDocuments={totalDocuments} >
                  <FormReview title="New Review" newRew={true} />
                </WrapperMiniReviews>
                : <WrapperMiniReviews onHandler={() => setStateReviews(true)} totalDocuments={totalDocuments} >
                  <div><LinkStyle to={"/login"}>On login</LinkStyle> to write review</div>
                </WrapperMiniReviews>)
          )
        )
        : (<Section ref={refParent}>
          <Wrapper data-vertical="start">
            <h2>Reviews</h2>
            <span>{totalDocuments}</span>
          </Wrapper>
          {openAnswer === ""
            &&(auth.currentUser !== null
              ? <FormReview title="New Review" newRew={true} />
              : <div><LinkStyle to={"/login"}>On login</LinkStyle> to write review</div>)
          }
          {content}
        </Section>)
      }
    </>
  );
};

export default memo(MovieReviews);
