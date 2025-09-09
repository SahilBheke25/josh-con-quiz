import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  text-align: center;
`;

const Text = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Text>
        © {new Date().getFullYear()} Josh Software |{' '}
        <Link href="https://joshsoftware.com" target="_blank" rel="noopener noreferrer">
          Visit our website
        </Link>
      </Text>
    </FooterContainer>
  );
};

export default Footer;
