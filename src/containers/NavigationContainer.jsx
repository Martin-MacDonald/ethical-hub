/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import NavigationLink from '../components/navigation/NavigationLink';
import { colors } from '../lib/commonStyles';

const links = [
  { to: '/member', text: 'Member' },
  { to: '/memberss', text: 'Another' },
];

const NavigationContainer = () => {
  const [active, setActive] = useState(0);
  return (
    <nav css={navContainer}>
      { links.map((link, i) => <NavigationLink {...link} />) }
    </nav>
  );
};

export default NavigationContainer;

const navContainer = css`
  min-height: 100vh;
  background-color: ${colors.primary};
  color: ${colors.white};
  display: flex;
  flex-direction: column;
`;