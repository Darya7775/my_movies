import React, { memo, useState } from "react";
import useMactchMedia from "../../../hooks/use-match-media";
import search from "../../../assets/search.svg";
import Select from "../select";

// обязательно должны быть эти компоненты
import Input from "../../ui/input";
import Button from "../../ui/button";
import * as S from "./styles";

interface Props {
  onSubmit: (e: React.SyntheticEvent) => void,
  onChangeValue: (q: string) => void,
  value: string,
  // для select
  options: {
    [key: string]: {
      value: string,
      title: string
    }[]
  },
  values: {
    [key: string]: string
  },
  handlers: {
    [key: string]: (arg0: string) => void,
  },
  nameSel: {
    [key: string]: string
  }
}

const Search: React.FC<Props> = (props: Props) => {

  const { isMobile, isTablet } = useMactchMedia() as { isMobile: boolean, isTablet: boolean };
  // флаг открытия и закрытия на экранах до 768
  const [ openSearch, setOpenSearch ] = useState(false);
  // флаг открытия и закрытия options на экранах свыше 768
  const [ openOptions, setOpenOptions ] = useState(false);

  const callbacks = {
    onChangeSearch: () => setOpenSearch(!openSearch),
    onChangeOptions: () => setOpenOptions(!openOptions)
  };

  const content = <S.FormSearch onSubmit={props.onSubmit}>
    {isTablet
      && <S.ButtonOptions  type="button"
        onClick={callbacks.onChangeOptions}
        aria-label={openOptions ? "Close options" : "Open options"}
        title="Options">
      </S.ButtonOptions>}

    <S.Wrapper>
      <Input type="search" text="for example: Barbie" value={props.value} onChange={props.onChangeValue} />
      <Button type="submit">Search</Button>
    </S.Wrapper>

    <S.WrapperSelect {...(isTablet ? {"data-open": openOptions ? "true" : "false"} : {})} >
      <Select options={props.options.l} value={props.values.l} onChange={props.handlers.onChangeLan} name={props.nameSel.l} />
      <Select options={props.options.y} value={props.values.y} onChange={props.handlers.onChangeYear} name={props.nameSel.y} />
      <Select options={props.options.a} value={props.values.a} onChange={props.handlers.onChangeAdult} name={props.nameSel.a} />
    </S.WrapperSelect>
  </S.FormSearch>;

  return(
    <>
      {isMobile // если мобильная (до 768px) версия
        ? (openSearch // если поиск открыт
          ? (<>
            <S.ButtonCloseSearch type="button" aria-label="close search" onClick={callbacks.onChangeSearch}></S.ButtonCloseSearch>
            {content}
          </>)
          : (<S.ButtonOpen type="button" aria-label="open search" onClick={callbacks.onChangeSearch}>
            <img src={search} alt="search" width={30} height={30} />
          </S.ButtonOpen>)
        )
        : (<>{content}</>) // если выше (768px)
      }
    </>
  );
};

export default memo(Search);
