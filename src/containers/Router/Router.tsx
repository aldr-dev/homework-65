import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Page from '../Page/Page';
import PageNotFound from '../PageNotFound/PageNotFound';
import NavBar from '../../components/NavBar/NavBar';

const Router = () => {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={
            <Page />
          }/>
          <Route path="/pages/:pageName" element={
            <Page/>
          }/>
          <Route path="*" element={
            <PageNotFound/>
          }/>
        </Routes>
      </main>
    </>
  );
};

export default Router;