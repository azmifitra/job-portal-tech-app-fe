import React, { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import useIsMount from '../hooks/useIsMount';

export default function HeaderJob(props) {
  const isMount = useIsMount();

  const [jobDesc, setJobDesc] = useState('');
  const debouncedSearchJobDesc = useDebounce(jobDesc, 500);

  const [jobLocation, setJobLocation] = useState('');
  const debouncedSearchJobLocation = useDebounce(jobLocation, 500);

  const [jobFulltime, setJobFulltime] = useState(true);

  useEffect(() => {
    if (!isMount) {
      props.searchJobDesc(jobDesc);
      props.searchJobLocation(jobLocation);
      props.filterJobFulltime(jobFulltime);
    }
  }, [debouncedSearchJobDesc, debouncedSearchJobLocation, jobFulltime]);

  const onChangeDescription = (e) => {
    setJobDesc(e.target.value);
  };

  const onChangeLocation = (e) => {
    setJobLocation(e.target.value);
  };

  const handeClickFulltime = (e) => {
    if (jobFulltime) {
      setJobFulltime(false);
    } else {
      setJobFulltime(true);
    }
  };

  return (
    <div className="flex w-full justify-between">
      <h2 className="text-3xl font-semibold">Jobs</h2>
      <div className="flex">
        <div className="mx-2 flex flex-col">
          <label htmlFor="job-description">Job Description</label>
          <input type="text" className="inputFilter" value={jobDesc} onChange={onChangeDescription} />
        </div>
        <div className="mx-2 flex flex-col">
          <label htmlFor="job-location">Location</label>
          <input type="text" className="inputFilter" value={jobLocation} onChange={onChangeLocation} />
        </div>
        <div className="mx-2 mt-4 flex flex-row items-center">
          <label htmlFor="job-type" className="mx-1">
            Full Time
          </label>
          <input type="checkbox" className="mx-1 mt-1 cursor-pointer" checked={jobFulltime} onChange={handeClickFulltime} />
        </div>
      </div>
    </div>
  );
}
