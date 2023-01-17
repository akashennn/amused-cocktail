import { Spin } from "antd";
import React from "react";
import styled from "styled-components";

const Loader = (): JSX.Element => {
  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

export default Loader;
