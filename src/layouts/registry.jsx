import { StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({ children }) {
  if (typeof window !== "undefined") return <>{children}</>;
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
