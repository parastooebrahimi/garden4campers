import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledMain = styled.main`
  padding: 10px;
`;

function Content() {
  return (
    <StyledMain>
      <Outlet />
    </StyledMain>
  );
}

export default Content;
