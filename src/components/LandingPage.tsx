import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { EmailCheckResponse } from "../types/quiz";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Logo = styled.img`
  max-width: 200px;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.div<{ error?: boolean }>`
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  ${(props) =>
    props.error &&
    `
    color: #dc3545;
    background-color: #f8d7da;
  `}
`;

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual n8n webhook URL
      const response = await axios.post<EmailCheckResponse>(
        "https://workflow.joshsoftware.com/webhook/josh-quiz/check",
        { email }
      );
      console.log(response.data);

      switch (response.data.status) {
        case "not_registered":
          setMessage(
            `You are not registered. Please scan the QR code at Josh's booth to get started.'`
          );
          setIsError(true);
          break;
        case "attempted":
          setMessage(
            `You have already attempted this quiz, If you haven't received the swags, please contact to our booth`
          );
          setIsError(true);
          break;
        case "not_attempted":
          setMessage("Loading quiz...");
          setIsError(false);
          navigate("/quiz", { state: { email } });
          break;
        default:
          setMessage(
            "You cannot attempt the quiz, please contact to our booth"
          );
          setIsError(true);
      }
    } catch (error) {
      setMessage("You cannot attempt the quiz, please contact to our booth");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Logo src="../assets/joshl.svg" alt="Josh Software Logo" />
      <Title>Welcome to the Josh Software Quiz!</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Enter your email to start"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Start Quiz"}
        </Button>
      </Form>
      {message && <Message error={isError}>{message}</Message>}
    </Container>
  );
};

export default LandingPage;
