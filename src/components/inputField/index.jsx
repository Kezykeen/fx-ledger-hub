import { useState } from "react";
import styled from "styled-components";
// import { ValidationText } from "../index";
// import { PasswordIcon } from "../../assets/svgs";

export const InputField = ({
  label,
  type = "text",
  inputType = "input",
  className = "",
  endIcon: EndIcon,
  disabled = false,
  placeholder = "",
  error = false,
  icon = "",
  errorText = "",
  rows = 3,
  name = "",
  onChange = () => {},
  register = () => {},
  setValue = () => {},
  required,
  id,
  width,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextFieldWrapper $width={width}>
      {label && <label htmlFor={name}>{label}</label>}
      {inputType === "input" ? (
        type === "password" ? (
          <IconWrapper>
            <Input
              type={showPassword ? "text" : type}
              $isError={error}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChange}
              name={name}
              {...register(name, { required })}
              {...restProps}
            />
            {/* <PasswordIcon
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            /> */}
          </IconWrapper>
        ) : (
          <IconWrapper>
            <Input
              type={type}
              $isError={error}
              placeholder={placeholder}
              disabled={disabled}
              $width={width}
              onChange={onChange}
              name={name}
              id={id}
              {...register(name, { required })}
              {...restProps}
              $hasIcon={!!EndIcon}
            />
            {EndIcon && EndIcon}
          </IconWrapper>
        )
      ) : inputType === "textarea" ? (
        <Textarea
          $isError={error}
          rows={rows}
          $width={width}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          name={name}
          {...register(name, { required })}
          {...restProps}
        />
      ) : (
        ""
      )}
      <div>
        {/* {errorText.length > 0 && <ValidationText message={errorText} />} */}
      </div>
    </TextFieldWrapper>
  );
};

const TextFieldWrapper = styled.div`
  width: ${({ $width }) => ($width ? $width : `100%`)};
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #667085;
  }
`;

const Input = styled.input`
  height: 44px;
  padding: 10px 14px;
  border: ${({ theme, $isError }) =>
    $isError
      ? `1px solid ${theme.colors.red400}`
      : `1px solid ${theme.colors.gray300}`};
  border-radius: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 20px;
  width: 100%;
  color: #999;
  padding-right: ${({ $hasIcon }) => $hasIcon && `45px`};
  outline-color: ${({ theme }) => theme.colors.primary};

  &:focus {
    outline: none;
    border-color: #f4a261;
    box-shadow: 0 0 0 2px rgba(244, 162, 97, 0.2);
  }

  &::placeholder {
    color: #999;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.N20};
    color: ${({ theme }) => theme.colors.GA5};
  }
`;

const Textarea = styled.textarea`
  padding: 9.5px 12px;
  height: 150px;

  border: ${({ theme, $isError }) =>
    $isError
      ? `1px solid ${theme.colors.red400}`
      : `1px solid ${theme.colors.gray300}`};
  border-radius: 4px;
  font-style: normal;
  font-weight: 450;
  font-size: 1rem;
  line-height: 20px;
  width: ${({ $width }) => ($width ? $width : `100%`)};
  color: #999;
  margin: 0;

  &:focus {
    outline-color: transparent !important;
    border: ${({ theme }) => `2px solid ${theme.colors.gray300} !important`};
  }

  &::placeholder {
    color: #999;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.N20};
    color: ${({ theme }) => theme.colors.GA5};
  }
`;

const IconWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;

  & > svg {
    position: absolute;
    top: 8px;
    right: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;
