import React, { useState } from 'react';
import { useGetPositionsQuery } from '../redux/services/jobApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CardJob from '../components/CardJob';
import HeaderJob from '../components/HeaderJob';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { logoutUser } from '../redux/slices/authSlice';
import { MdOutlineErrorOutline, MdOutlineLogout } from 'react-icons/md';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [jobDesc, setJobDesc] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobFulltime, setJobFulltime] = useState(true);
  const auth = useSelector((state) => state.auth);

  const { data, error, isLoading, isFetching } = useGetPositionsQuery({ page, description: jobDesc, location: jobLocation, full_time: jobFulltime ? 'true' : 'false' });

  const searchJobDesc = (payload) => {
    setPage(1);
    setJobDesc(payload);
  };
  const searchJobLocation = (payload) => {
    setPage(1);
    setJobLocation(payload);
  };
  const filterJobFulltime = (payload) => {
    setPage(1);
    setJobFulltime(payload);
  };

  const handleClickLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/login');
    });
  };

  const DataNotFound = () => {
    return (
      <div className="my-4 flex h-80 w-full flex-col items-center justify-center">
        <MdOutlineErrorOutline className="my-1 text-5xl" />
        <h3 className="text-3xl font-medium">Sorry, job not found!</h3>
      </div>
    );
  };

  return (
    <div className="pageWrapper bg-blue-100 px-24 py-6">
      <HeaderJob searchJobDesc={searchJobDesc} searchJobLocation={searchJobLocation} filterJobFulltime={filterJobFulltime} />
      {(isLoading || isFetching) && <Loader />}
      <div className="mt-8 w-full">
        {data?.data?.map((item) => (
          <CardJob key={item.id} data={item} />
        ))}
      </div>
      {data?.data?.length ? <Pagination data={data} onClickPrev={() => setPage(page - 1)} onClickNext={() => setPage(page + 1)} /> : <DataNotFound />}
      <div className="mt-4 flex w-full justify-end">
        <button className="flex items-center justify-center rounded-md bg-white py-2 px-4 font-medium text-gray-400 shadow hover:text-black" onClick={handleClickLogout}>
          <p className="mr-2">Logout</p> <MdOutlineLogout />
        </button>
      </div>
    </div>
  );
}
