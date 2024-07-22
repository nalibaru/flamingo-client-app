import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import SideContent from './sidecontent';
import Footer from './footer';
const Layout = () => (
    <div className='grid-container'>
    <Header />
    <SideContent />
    <main><Outlet /></main>
    <Footer />
    </div>
);

export default Layout;