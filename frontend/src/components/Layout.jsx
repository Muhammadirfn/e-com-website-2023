import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Helmet from "react-helmet";


const Layout = ({children, title, description, author,keywords}) => {
  return (
    <div>
    
    <Helmet>
        <meta charSet="utf-8" />
        <meta className="description" content={description} />
        <meta className="keywords" content={keywords} />
        <meta className="author" content={author} />
        <title>{title}</title>
      </Helmet>
      
    <Header />
    <main style={{minHeight: '70vh'}}>
    
      {children}
    </main>
    <Footer />
  </div>
  
  )
}

export default Layout;