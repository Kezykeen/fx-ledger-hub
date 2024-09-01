import styled, { keyframes } from "styled-components";

const move = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(calc(5 / 2 * 100%));
  }
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  width: calc(100% * 2 / 9);
  height: ${({ height }) => height};
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

const ProgressBar = styled.div`
  width: ${({ width }) => width};
  background-color: ${({ theme }) => theme.colors.primary300};
  animation: ${move} 2s linear infinite;
`;

export const InfiniteProgressBar = ({ height = "2.5px", width = "100%" }) => {
  return (
    <ProgressBarContainer
      height={height}
      className="progress infinite-progress-bar"
    >
      <ProgressBar role="progressbar" width={width} />
    </ProgressBarContainer>
  );
};
