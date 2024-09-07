import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { DeleteIcon } from "../../assets/svgs";
import styled from "styled-components";

export const DocumentUpload = ({ control, errors, name, label, width }) => {
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const truncateDocName = (name) => {
    return name?.length > 35
      ? `${name.slice(0, 10)}...${name.slice(-14)}`
      : name;
  };

  const handleFileSelect = (e, onChange) => {
    const newFile = e.target.files[0];
    const parsedName = {
      name: truncateDocName(newFile?.name),
      size: Number(newFile?.size / 1024).toFixed(0),
    };
    setFile(parsedName);
    onChange(newFile);
  };

  const removeFile = (onChange) => {
    setFile(null);
    onChange(null);
  };

  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <Container $width={width}>
      {label && <Label>{label}</Label>}
      <Controller
        name={name}
        control={control}
        defaultValue={file}
        render={({ field: { onChange, value } }) => (
          <>
            <UploadBox id="drag-area" $isError={errors[name]}>
              <UploadTxt onClick={handleClick}>Browse File</UploadTxt>
              <DocTxtWrapper>
                <DocTxt>{file ? file?.name : `No file chosen`}</DocTxt>
                {file && <SizeTxt>{`${file?.size} KB`}</SizeTxt>}
              </DocTxtWrapper>
              <Input
                ref={(e) => {
                  inputRef.current = e;
                }}
                type="file"
                onChange={(e) => handleFileSelect(e, onChange)}
                accept="image/pdf"
              />
              {value && <DeleteIcon onClick={() => removeFile(onChange)} />}
            </UploadBox>
            {errors[name] && <Error>{errors[name].message}</Error>}
          </>
        )}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ $width }) => ($width ? $width : `100%`)};
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const UploadBox = styled.div`
  isolation: isolate;
  position: relative;
  display: inline-flex;
  gap: 14px;
  height: 44px;
  width: 100%;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  border: ${({ $isError }) =>
    $isError ? `1px solid #E61C23` : `1px solid #D0D5DD`};
  box-shadow: 0px 1px 2px 0px #1018280d;
  background: var(--Shade-White, #fff);
  transition: all 0.25s ease;

  & > svg {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 20px;
    height: 20px;
    z-index: 2;
    cursor: pointer;
    fill: #f9fafb;
  }
`;

const UploadTxt = styled.p`
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.primary300};
  border-right: 1px solid #d0d5dd;
  padding: 10px 12px 10px 14px;
  cursor: pointer;
`;

const DocTxt = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #667085;
`;

const SizeTxt = styled(DocTxt)`
  color: #959ba8;
`;

const DocTxtWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 25px;
`;

const Input = styled.input`
  display: none;
`;

const Error = styled.p`
  color: #e96d6d;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;
