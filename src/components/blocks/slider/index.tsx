import React, { useRef, useEffect } from "react";
import Swiper from "swiper";
import { register } from "swiper/element/bundle";
import type { SwiperSlideProps, SwiperProps } from "swiper/react";

import * as S from "./styles";

interface Props {
  items: {
    [key: string]: string | number
  }[],
  template: (item: {
    [key: string]: string | number
  }) => JSX.Element
}

type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "swiper-container": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperProps,
        HTMLElement
      >;
      "swiper-slide": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperSlideProps,
        HTMLElement
      >;
    }
  }
}

const Slider: React.FC<Props> = (props: Props) => {
  const LEAST_NUMBER_OF_SLIDES = 3;
  const swiperElRef = useRef<SwiperRef>(null);

  useEffect(() => {
    register();

    const params = {
      slidesPerView: 3,
      slidesPerGroup: 3,
      loop: true,
      spaceBetween: 5,
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
      breakpoints: {
        425: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        525: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
        625: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },
        767: {
          slidesPerView: 7,
          slidesPerGroup: 7,
        },
        1366: {
          slidesPerView: 10,
          slidesPerGroup: 10,
        },
        1600: {
          slidesPerView: 14,
          slidesPerGroup: 14,
        },
        1920: {
          slidesPerView: 17,
          slidesPerGroup: 17,
        },
      },
    };

    Object.assign(swiperElRef.current as SwiperRef, params);
    swiperElRef.current?.initialize();

    // listen for Swiper events using addEventListener\

    //   swiperElRef.current?.addEventListener('progress', (ev: ProgressEvent<EventTarget>) => {
    //   const [ swiper, progress ] = ev.detail;
    //   console.log(progress);
    //  });

    //   swiperElRef.current?.addEventListener('slidechange', (e) => {
    //     console.log('slide changed');
    //   });
  }, []);

  return (
    <S.WrapperSlider>
      <swiper-container
        ref={swiperElRef}
        init={false}
      >
        {props.items.map((item, i) => (<swiper-slide key={i}>{props.template(item)}</swiper-slide>))}
      </swiper-container>
      {props.items.length > LEAST_NUMBER_OF_SLIDES // если слайдов меньше 3, не показывать стрелки
      && <>
        <S.Next className="next" />
        <S.Prev className="prev" />
      </>
      }
    </S.WrapperSlider>
  );
};

export default Slider;
