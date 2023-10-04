import React, {useState, useCallback, useLayoutEffect} from "react";
import debounce from "lodash.debounce";
import { InputWrapper } from "./styles";

interface Props {
  value?: string,
  onChange: (value: string) => void,
  text?: string,
  type?: string,
  id?: string
};

const Input: React.FC<Props> = (props: Props) => {
  // Внутренний стейт для быстрого отображения ввода
  const [ value, setValue ] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChange(value), 600),
    [props.onChange]
  );

  // Обработчик изменений в поле
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChangeDebounce(e.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  return(
    <InputWrapper>
      <input  type={props.type ? props.type : "text"}
              value={value}
              onChange={onChange}
              id={props.id ? props.id : props.text}
              name={props.text} />
      <label  htmlFor={props.id ? props.id : props.text}>{props.text}</label>
    </InputWrapper>
  );
}

export default Input;
