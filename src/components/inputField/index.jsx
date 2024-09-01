import styled from "styled-components";

export const InputField = ({
  label,
  type = "text",
  inputType = "input",
  endIcon: EndIcon,
  disabled = false,
  placeholder = "",
  error = false,
  errorText = "",
  rows = 3,
  value,
  name = "",
  onChange = () => {},
  register,
  required,
  id,
  width,
  noShift = false,
  ...restProps
}) => {
  return (
    <TextFieldWrapper $width={width} $noShift={noShift}>
      {label && <Label htmlFor={name}>{label}</Label>}
      {inputType === "input" ? (
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
            value={value}
            {...(register ? register(name, { required }) : {})}
            {...restProps}
            $hasIcon={!!EndIcon}
          />
          {EndIcon && EndIcon}
        </IconWrapper>
      ) : inputType === "textarea" ? (
        <Textarea
          $isError={error}
          rows={rows}
          $width={width}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          name={name}
          {...(register ? register(name, { required }) : {})}
          {...restProps}
        />
      ) : null}
      {errorText.length > 0 && <Error>{errorText}</Error>}
    </TextFieldWrapper>
  );
};

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ $width }) => ($width ? $width : `100%`)};
  height: ${({ $noShift }) => ($noShift ? `90px` : `auto`)};
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const Input = styled.input`
  height: 44px;
  padding: 9.5px 12px;
  border: ${({ theme, $isError }) =>
    $isError
      ? `1px solid ${theme.colors.red100}`
      : `1px solid ${theme.colors.gray300}`};
  border-radius: 4px;
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
    border: ${({ theme }) => `1px solid ${theme.colors.primary50}`};
    background: ${({ theme }) => theme.colors.primary25};
    color: ${({ theme }) => theme.colors.primary300};

    &::placeholder {
      color: ${({ theme }) => theme.colors.primary300};
    }
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
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 20px;
  width: ${({ $width }) => ($width ? $width : `100%`)};
  outline-color: ${({ theme }) => theme.colors.primary};
  color: #999;
  margin: 0;

  &:focus {
    outline: none;
    border-color: #f4a261;
    box-shadow: 0 0 0 2px rgba(244, 162, 97, 0.2);
  }

  &::placeholder {
    color: #999;
  }

  &:disabled {
    border: ${({ theme }) => `1px solid ${theme.colors.primary50}`};
    background: ${({ theme }) => theme.colors.primary25};
    color: ${({ theme }) => theme.colors.primary300};

    &::placeholder {
      color: ${({ theme }) => theme.colors.primary300};
    }
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

const Error = styled.p`
  color: #e96d6d;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;
