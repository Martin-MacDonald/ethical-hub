/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from '@reach/router';
import { containerPadding, colors } from '../../lib/commonStyles';

const NavigationLink = ({ text, ...rest }) => {
  return (
    <Link
      css={linkContainer}
      {...rest}
      getProps={({ isCurrent }) => {
        return {
          style: {
            backgroundColor: isCurrent ? colors.navActive : '',
          },
        };
      }}
    >
      {text}
    </Link>
  );
};

export default NavigationLink;

const linkContainer = css`
  ${containerPadding}
  color: ${colors.white};
  :hover {
    background-color: ${colors.navActive};
  }
`;