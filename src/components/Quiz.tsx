import { useState, useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Question } from "../types/quiz";
import { fetchQuizQuestions } from "../services/quizService";
import axios from "axios";

// ---------- Styled Components ----------
const QuizContainer = styled.div`
  width: 100%;
`;

const QuestionCard = styled.div`
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const QuestionText = styled.h3`
  color: #333;
  margin-bottom: 15px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  input {
    margin-right: 10px;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ResultMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 500px;
  margin: 20px auto;

  h2 {
    color: #2c3e50;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 600;
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4caf50, #45a049);
  border-radius: 50%;
  margin: 0 auto 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;

  &::after {
    content: "✓";
    color: white;
    font-size: 40px;
    font-weight: bold;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const ScoreDisplay = styled.div`
  margin-bottom: 40px;
`;

const ScoreLabel = styled.div`
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 10px;
`;

const ScoreValue = styled.div`
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, #3498db, #2980b9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const SocialShare = styled.div`
  margin-top: 25px;
  padding-top: 25px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  h4 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    color: #666;
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 1.5;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;

const SocialButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  transition: all 0.3s ease;

  &.linkedin {
    background: #0077b5;
  }

  &.twitter {
    background: #1da1f2;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
`;

// ---------- Main Component ----------
const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [questions, setQuestions] = useState([] as Question[]);
  const [currentAnswers, setCurrentAnswers] = useState(
    {} as Record<number, string>
  );
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAndLoadQuestions = async () => {
      try {
        const checkResponse = await axios.post<{ status: string }>(
          "https://workflow.joshsoftware.com/webhook/josh-quiz/check",
          { email }
        );

        if (checkResponse.data.status === "attempted") {
          navigate("/", { replace: true });
          return;
        }

        const quizQuestions = await fetchQuizQuestions();
        setQuestions(quizQuestions);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (email) {
      checkAndLoadQuestions();
    }
  }, [email]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setCurrentAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (currentAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const totalScore = correctAnswers * 20;
    setScore(totalScore);

    try {
      await axios.post(
        "https://workflow.joshsoftware.com/webhook/josh-quiz/submit",
        {
          email,
          score: totalScore,
        }
      );
      setShowResult(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("There was an error submitting your quiz. Please try again.");
    }
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const text = `Excited to have joined the Josh Quiz Challenge at Gophercon India! A perfect mix of fun, learning, and community spirit.
#JoshatGophercon #Joshsoftware #GCI25 #GopherconIndia #GopherConIndia2025`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  if (!email) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <LoadingMessage>Loading questions...</LoadingMessage>;
  }

  if (showResult) {
    const message = `
EExcited to have joined the Josh Quiz Challenge at Gophercon India! A perfect mix of fun, learning, and community spirit.
#JoshatGophercon #Joshsoftware #GCI25 #GopherconIndia #GopherConIndia2025`;

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(message);
        alert("Text copied! Paste it on LinkedIn when sharing 🚀");
      } catch (err) {
        console.error("Copy failed:", err);
      }
    };

    return (
      <ResultMessage>
        <SuccessIcon />
        <h2>Quiz Completed Successfully!</h2>

        <ScoreDisplay>
          <ScoreLabel>Your Score</ScoreLabel>
          <ScoreValue>
            {score}/{questions.length * 20}
          </ScoreValue>
        </ScoreDisplay>

        <SocialShare>
          <h4>Claim Your Swags!</h4>
          <b>
            Take a screenshot of your score and tag @joshsoftware to claim your
            swags!
          </b>

          {/* Prefilled text box */}
          <div style={{ margin: "20px 0" }}>
            <textarea
              value={message}
              readOnly
              rows={5}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
                resize: "none",
                marginBottom: "10px",
              }}
            />
            <button
              onClick={copyToClipboard}
              style={{
                padding: "8px 16px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Copy Text
            </button>
          </div>

          {/* Share Buttons */}
          <SocialButtons>
            <SocialButton className="linkedin" onClick={shareToLinkedIn}>
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
                alt="LinkedIn"
                style={{ width: 24, height: 24 }}
              />
            </SocialButton>

            <SocialButton className="twitter" onClick={shareToTwitter}>
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg"
                alt="Twitter"
                style={{ width: 24, height: 24 }}
              />
            </SocialButton>
          </SocialButtons>
        </SocialShare>
      </ResultMessage>
    );
  }

  const allQuestionsAnswered = questions.every((q) => currentAnswers[q.id]);

  return (
    <QuizContainer>
      {questions.map((question) => (
        <QuestionCard key={question.id}>
          <QuestionText>{question.question}</QuestionText>
          <Options>
            {Object.entries(question.options).map(([key, value]) => (
              <Option key={key}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={key}
                  checked={currentAnswers[question.id] === key}
                  onChange={() => handleAnswerChange(question.id, key)}
                />
                {value}
              </Option>
            ))}
          </Options>
        </QuestionCard>
      ))}
      <SubmitButton onClick={handleSubmit} disabled={!allQuestionsAnswered}>
        Submit Quiz
      </SubmitButton>
    </QuizContainer>
  );
};

export default Quiz;
