import '../assets/styles/loader.scss';

function Loader() {
  return (
    <div className="flex h-screen justify-center sm:mt-0 sm:items-center">
      <div className="loadingWrapper">
        <div className="bar one"></div>
        <div className="bar two"></div>
        <div className="bar three"></div>
      </div>
    </div>
  );
}

export default Loader;
