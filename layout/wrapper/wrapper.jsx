import React, { ReactNode } from 'react'
import Header from '../header';
// import Footer from '../footer';




const Wrapper = ({ children }) => {
  return (
    <>
        <Header />
            <main>{children}</main>
        {/* <Footer /> */}
    </>
  )
}

export default Wrapper