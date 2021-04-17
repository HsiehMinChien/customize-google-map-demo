import React, { ReactNode } from 'react'
import Head from 'next/head'

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
      {/* Google map api */}
      <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC5PwnmMtE8G1RwBREdJTAR1PSijmnuBxQ&map_ids=7938d5eb683d060b" />
    </Head>
    {children}
    <footer>
      <hr />
      <span>Demo by Jeff</span>
    </footer>
  </div>
)

export default Layout
