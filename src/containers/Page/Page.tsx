import React, {useCallback, useEffect, useState} from 'react';
import {ApiPage} from '../../types';
import {Location, useLocation} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import {enqueueSnackbar} from 'notistack';
import Preloader from '../../components/Preloader/Preloader';
import './Page.css';

const Page = () => {
  const location: Location = useLocation();
  const [content, setContent] = useState<ApiPage | null>();
  const [isLoader, setIsLoader] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      if (location.pathname !== '/pages/admin') {
        setIsLoader(true);
        let response;
        if (location.pathname === '/') {
          response = await axiosApi.get<ApiPage | null>('/pages/home.json');
        } else {
          response = await axiosApi.get<ApiPage | null>(`${location.pathname}.json`);
        }
        setIsLoader(false);

        if (response.status !== 200) {
          enqueueSnackbar('An error has occurred. Failed to process data.', {variant: 'error'});
          throw new Error('An error has occurred. Failed to process data. ' + response.status);
        }

        if (response.data !== null) {
          setContent(response.data);
        }
      }
    } catch (error) {
      setIsLoader(false);
      enqueueSnackbar('An error has occurred. Failed to process data.', {variant: 'error'});
      console.error('An error has occurred. Failed to process data. ' + error);
    }
  }, [location.pathname]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);


  return (
    <>
      <Preloader preloader={isLoader}/>
      {content && (
        <>
          <h3 className="page-title">{content.title}</h3>
          <div className="page-content" dangerouslySetInnerHTML={{__html: content.content}}></div>
        </>
      )}
    </>
  );
};

export default Page;