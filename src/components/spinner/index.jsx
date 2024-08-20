import { RotatingLines } from "react-loader-spinner";
import { useTheme } from "styled-components";

export const Spinner = ({
  width = 96,
  height = 96,
  strokeWidth = 2,
  color,
}) => {
  const theme = useTheme();
  return (
    <RotatingLines
      visible={true}
      height={width}
      width={height}
      color={color || theme.colors.G85}
      strokeColor={color || theme.colors.G85}
      strokeWidth={strokeWidth}
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
