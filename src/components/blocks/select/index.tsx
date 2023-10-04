import React, { useState, memo } from "react";
import * as S from "./styles";

interface Props {
  options: {
    value: string,
    title: string
  }[],
  value: string,
  onChange: (arg0: string) => void,
  name: string
}

const Select: React.FC<Props> = (props: Props) => {
  // состояние открытия/закрытия
  const [ open, setOpen ] = useState(false);

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value);

  return(
    <S.WrapperSelect>
      <S.SelectStyle>
        {props.options.map((option, i) => (
          open
            ? (<S.SelectItem key={i}>
                  <label htmlFor={option.title}>{option.title}</label>
                  <input  type="radio" name={props.name} value={option.value}
                          id={option.title} onChange={onSelect} onClick={() => setOpen(!open)}
                          checked={props.value === option.value ? true : false} />
                </S.SelectItem>
              )
            : (props.value === option.value
                ? ( <S.SelectItem key={i}>
                      <label htmlFor={option.title}>{option.title}</label>
                      <input  type="radio" name={props.name} value={option.value}
                              id={option.title} checked readOnly onClick={() => setOpen(!open)} />
                    </S.SelectItem>
                  )
                : null
              )
        ))}
      </S.SelectStyle>
    </S.WrapperSelect>
  );
};

export default memo(Select);
