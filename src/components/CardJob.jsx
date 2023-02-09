import React from 'react';
import { MdTimer } from 'react-icons/md';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/job.scss';

export default function CardJob({ data }) {
  const navigate = useNavigate();
  return (
    <div className="mb-4 grid grid-cols-3 gap-4 rounded-2xl border border-gray-400 bg-white px-6 py-4 shadow">
      <div className="col-span-2 pb-0">
        <h2 className="pb-1.5 text-lg font-bold">
          {data.title} - {data.type}
        </h2>
        <p className="cardJob" dangerouslySetInnerHTML={{ __html: data.description }}></p>
      </div>
      <div className="flex flex-col items-end justify-center">
        <div className="text-gray-neutral flex items-center justify-end pb-2 text-gray-400">
          <MdTimer className="mr-2" />
          <p className="text-sm">Posted date: {moment(data.created_at).format('DD MMMM YYYY')}</p>
        </div>
        <button className="buttonDetails" onClick={(e) => navigate(`/job-details/${data.id}`)}>
          See Details
        </button>
      </div>
    </div>
  );
}
