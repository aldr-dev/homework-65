import React, {useCallback, useEffect, useState} from 'react';
import {ApiPage, ApiSelectPage} from '../../types';
import {useNavigate} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import './EditPageForm.css';
import {enqueueSnackbar} from 'notistack';
import Preloader from '../Preloader/Preloader';

const EditPageForm = () => {
  const [data, setData] = useState<ApiPage>({
    title: '',
    content: '',
  });
  const [selectPage, setSelectPage] = useState<ApiSelectPage>({
    page: '',
  });
  const [fetchDataLoader, setFetchDataLoader] = useState(false);
  const [putDataLoader, setPutDataLoader] = useState(false);
  const navigate = useNavigate();


  const fetchData = useCallback(async () => {
    try {
      if (selectPage.page.length !== 0) {
        setFetchDataLoader(true);
        const response = await axiosApi.get<ApiPage | null>(`/pages/${selectPage.page}.json`);
        setFetchDataLoader(false);

        if (response.status !== 200) {
          enqueueSnackbar('An error has occurred. Failed to process data.', {variant: 'error'});
          throw new Error('An error has occurred. Failed to process data. ' + response.status);
        }

        if (response.data !== null) {
          setData((prevState) => {
            return {
              ...prevState,
              title: response.data.title,
              content: response.data.content,
            };
          });
        }
      }
    } catch (error) {
      setFetchDataLoader(false);
      enqueueSnackbar('An error has occurred. Failed to process data.', {variant: 'error'});
      console.error('An error has occurred. Failed to process data. ' + error);
    }
  }, [selectPage.page]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);


  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target;
    setSelectPage((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (data.title.length !== 0 && data.content.length !== 0) {
      try {
        if (selectPage.page.length !== 0) {
          setPutDataLoader(true);
          const response = await axiosApi.put(`/pages/${selectPage.page}.json`, data);
          setPutDataLoader(false);

          if (response.status !== 200) {
            enqueueSnackbar('An error has occurred. Failed to process data.', {variant: 'error'});
            throw new Error('An error has occurred. Failed to process data. ' + response.status);
          }
        }
      } catch (error) {
        setPutDataLoader(false);
        enqueueSnackbar('An error has occurred. Failed to process data.', {variant: 'error'});
        console.error('An error has occurred. Failed to process data. ' + error);
      }
    }
    navigate(`/pages/${selectPage.page}`);
  };

  return (
    <>
      <Preloader preloader={fetchDataLoader} />
      <div className="form-wrapper">
        <h3 className="form-title">Edit pages</h3>
        <form onSubmit={onFormSubmit} className="form">
          <label htmlFor="selectPage">Select edit page:</label>
          <select
            onChange={onChangeSelect}
            id="selectPage"
            value={selectPage.page}
            className="form-select"
            name="page"
            required>
            <option value="">Select page</option>
            <option value="home">Home</option>
            <option value="about">About</option>
            <option value="news">News</option>
            <option value="events">Events</option>
            <option value="faq">FAQ</option>
            <option value="contacts">Contacts</option>
          </select>
          <label htmlFor="title">Title:</label>
          <input
            onChange={onFieldChange}
            id="title"
            value={data.title}
            className="form-input"
            type="text"
            name="title"
            placeholder="Enter the name of the page title"
            required
          />
          <label htmlFor="content">Content:</label>
          <textarea
            onChange={onFieldChange}
            id="content"
            value={data.content}
            className="form-description"
            name="content"
            placeholder="Enter content description"
            required>
          </textarea>
          <button className="form-btn" disabled={putDataLoader} type="submit">
            <div className={putDataLoader ? 'spinner' : ''}>
              {putDataLoader ? '' : 'Save'}
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPageForm;