import React from "react";
import Content from "./Content";
import GlobalStyle from "./Header/GlobalStyle";
import MenuHeader from "./Header";

export default function Layout(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <MenuHeader />
      <Content />
    </>
  );
}
