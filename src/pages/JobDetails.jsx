import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { useGetPositionDetailsQuery } from '../redux/services/jobApi';
import { useParams, useNavigate } from 'react-router-dom';

import Loader from '../components/Loader';
import '../assets/styles/job.scss';

export default function JobDetails() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading, isFetching } = useGetPositionDetailsQuery(id);
  return (
    <div className="pageWrapper jobDetails bg-blue-100 px-24 py-6">
      {isLoading && <Loader />}
      <div className="flex items-center text-3xl">
        <MdOutlineArrowBackIos className="mr-3 cursor-pointer" onClick={() => navigate(-1)} />
        <h2 className="font-semibold">Job Details</h2>
      </div>
      <div className="mt-8 rounded-xl border border-gray-400 bg-white px-8 py-6 shadow">
        <div className="flex items-center">
          <img src={data?.company_logo} className="h-16 w-auto" alt="logo-company" />
          <div className="ml-6">
            <h3 className="text-xl font-semibold">
              {data?.title} ({data?.company})
            </h3>
            <h4 className="text-gray-500">{data?.type}</h4>
          </div>
        </div>
        <div className="mt-3">
          <div className="mt-3">
            <h5 className="text-lg font-medium">How to Apply:</h5>
            <p className="text-sm" dangerouslySetInnerHTML={{ __html: data?.how_to_apply }}></p>
          </div>
          <div className="mt-3">
            <h5 className="jobDetailsDesc text-lg font-medium">Description:</h5>
            <p className="text-sm" dangerouslySetInnerHTML={{ __html: data?.description }}></p>
          </div>
        </div>
      </div>
    </div>
  );
}
