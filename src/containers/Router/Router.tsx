import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Page from '../Page/Page';
import PageNotFound from '../PageNotFound/PageNotFound';
import NavBar from '../../components/NavBar/NavBar';
import EditPage from '../EditPage/EditPage';

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
          <Route path="/pages/admin" element={
            <EditPage/>
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