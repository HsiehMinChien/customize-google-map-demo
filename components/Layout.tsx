import React, { ReactNode } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
`;

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = '' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {/* Font family */}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
    </Head>
    {children}
    <footer>
      <hr />
      <StyledDiv> Demo by Jeff, 2021-04 </StyledDiv>
    </footer>
  </div>
)

export default Layout
