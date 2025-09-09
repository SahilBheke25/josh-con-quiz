import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.img`
  height: 50px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo 
        src="https://intranet.joshsoftware.com/assets/josh-logo-de1a07a4494ca567c40d99e3ea53d9e9fb9bbd5279edce395b5f3d817501d6f7.svg" 
        alt="Josh Software Logo" 
      />
    </HeaderContainer>
  );
};

export default Header;
