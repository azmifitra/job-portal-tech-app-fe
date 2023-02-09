import React from 'react';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

export default function Pagination({ data, onClickPrev, onClickNext }) {
  return (
    <div className="my-2 flex flex-col items-center sm:flex-row sm:justify-between">
      <div className="mx-2 flex items-center">
        <p>
          Showing {data?.offset + 1} to {data?.offset + data?.size >= data?.totalData ? data?.totalData : data?.offset + data?.size} of {data?.totalData} Results
        </p>
      </div>
      <div className="mx-2 my-2 flex items-center sm:my-0">
        <button className="buttonPagination" disabled={data?.offset === 0} onClick={onClickPrev}>
          <MdOutlineArrowBackIos className="text-white" />
        </button>
        <div>
          <p>
            Page {data?.page} / {data?.totalPages}
          </p>
        </div>
        <button className="buttonPagination" disabled={data?.offset + data?.size >= data?.totalData} onClick={onClickNext}>
          <MdOutlineArrowForwardIos className="text-white" />
        </button>
      </div>
    </div>
  );
}
