import React, { useState } from "react";
import styled from "styled-components";
import bgImg from "../../assets/img/userFormBG.jpeg";
import Signup from "./Signup";
import Login from "./Login";
import Main from "./Main";

const UserForm = ({ loginFlag }) => {
  const [loginPage, setLoginPage] = useState(loginFlag);

  return (
    <Container>
      <Wrapper>
        {loginPage ? (
          <Login setLoginPage={setLoginPage} />
        ) : (
          <Signup setLoginPage={setLoginPage} />
        )}
        <Main />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background: #eefcff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const Wrapper = styled.div`
  background-image: url(${bgImg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
`;

export default UserForm;
