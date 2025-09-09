import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createGlobalStyle, styled } from 'styled-components';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import Header from './components/Header';
import Footer from './components/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContentBox = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
  }

  button {
    font-family: inherit;
  }

  input {
    font-family: inherit;
  }
`;

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContent>
          <ContentBox>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ContentBox>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App;
