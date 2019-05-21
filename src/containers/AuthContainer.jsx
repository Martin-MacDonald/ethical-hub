/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import NavigationContainer from './NavigationContainer';

const AuthContainer = ({ children }) => {
  return (
    <div css={authContainer}>
      <NavigationContainer />
      {children}
    </div>
  );
};

export default AuthContainer;

const authContainer = css`
  display: flex;
`;