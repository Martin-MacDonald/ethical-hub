/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {container} from '../lib/commonStyles';

const SearchContainer = () => {
  return (
    <div css={searchContainer}>
      Search
    </div>
  );
};

export default SearchContainer;

const searchContainer = css`
  ${container}
`;