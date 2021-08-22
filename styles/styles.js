import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

export const globalStyles = (
  <Global
    styles={css`
      @font-face {
        font-weight: 400;
        font-family: "Inter";
        src: url("../public/fonts/Inter-Regular.woff2") format('woff2');
      }

      html,
      body {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem 1rem;
        margin: 0;
        background: #fff;
        min-height: 100%;
        font-family: Inter, sans-serif;
        font-size: 24px;
      }

      section {
        display: flex;

        width: 700px;
      }

      .name-time,
      .name-event {
        margin: 2px 5px;

        font-size: 10px;
      }

      .name-event {
        font-weight: 700;
        overflow-x: hidden;

        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `}
  />
)

export const Button = styled('button')`
  box-sizing: border-box;

  margin: 0.3em;
  padding: 0 20px;
  height: 70px;
  overflow-x: hidden;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${(props) => props.className === 'active' ? '#fff' : 'black'};
  background-color: ${(props) => props.className === 'active' ? '#4C4C55' : '#fff'};
  font-size: 24px;
  border-radius: 10px;
  border: 0;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  outline: none;
  &:hover {
    color: #fff;
    background-color: #4C4C55;
  }

  cursor: pointer;
`;
