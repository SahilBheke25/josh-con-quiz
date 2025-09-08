import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Question } from '../types/quiz';
import { fetchQuizQuestions } from '../services/quizService';
import axios from 'axios';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const QuestionCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  padding: 20px;
  background-color: #e9ecef;
  border-radius: 8px;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    margin-bottom: 15px;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
`;

const Quiz = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [questions, setQuestions] = useState([] as Question[]);
  const [currentAnswers, setCurrentAnswers] = useState({} as Record<number, string>);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const quizQuestions = await fetchQuizQuestions();
        setQuestions(quizQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (currentAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    
    try {
      await axios.post('https://workflow.joshsoftware.com/webhook-test/josh-quiz/submit', {
        email,
        score: correctAnswers
      });
      setShowResult(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('There was an error submitting your quiz. Please try again.');
    }
  };

  if (!email) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <LoadingMessage>Loading questions...</LoadingMessage>;
  }

  if (showResult) {
    return (
      <QuizContainer>
        <ResultMessage>
          <h2>Quiz Complete!</h2>
          <p>You scored {score}/{questions.length}</p>
          <p>To get your swags, post a screenshot of your score on LinkedIn or Twitter by tagging @JoshSoftware.</p>
        </ResultMessage>
      </QuizContainer>
    );
  }

  const allQuestionsAnswered = questions.every(q => currentAnswers[q.id]);

  return (
    <QuizContainer>
      {questions.map(question => (
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
      <SubmitButton 
        onClick={handleSubmit}
        disabled={!allQuestionsAnswered}
      >
        Submit Quiz
      </SubmitButton>
    </QuizContainer>
  );
};

export default Quiz;
