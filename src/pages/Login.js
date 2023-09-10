import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 10px;
  flex-direction: column;
  height: 100vh;
`;

const ContainerInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  background: rgba(255, 255, 255, 0.9);
  gap: 10px;
  flex-direction: column;
  min-width: 450px;
  min-height: 400px;
  border-radius: 10px;
`;

const Title = styled.span`
  font-weight: 800;
  font-size: 40px;
  margin-bottom: 10px;
  letter-spacing: 4px;
  border-bottom: 5px solid;
`;

const Subtitle = styled.span`
  font-size: 14px;
  margin-bottom: 50px;
  color: grey;
`;

const Input = styled.input`
  text-align: center;
  margin: 0px;
  width: 300px;
  height: 40px;
`;

const Button = styled.button`
  border: none;
  width: 310px;
  height: 35px;
  background: rgba(100, 100, 180, 0.8);
  &:hover {
    background: blue;
    color: white;
  }
`;

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username && password) {
      login();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Container>
      <ContainerInner>
        <Title>LOGIN</Title>
        <Subtitle>Get your own beer! Login here :D</Subtitle>
        <Input
          type="text"
          placeholder="Enter email..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
        {error && <p>{error}</p>}
      </ContainerInner>
    </Container>
  );
};

export default LoginPage;
