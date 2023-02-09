import Home from './pages/Home';
import Login from './pages/Login';
import JobDetails from './pages/JobDetails';
import { Route, Routes } from 'react-router-dom';
import { AuthGuardHome, AuthGuardLogin } from './routes/AuthGuard.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <AuthGuardHome>
              <Login />
            </AuthGuardHome>
          }
        ></Route>
        <Route
          path="/"
          element={
            <AuthGuardLogin>
              <Home />
            </AuthGuardLogin>
          }
        ></Route>
        <Route
          path="/job-details/:id"
          element={
            <AuthGuardLogin>
              <JobDetails />
            </AuthGuardLogin>
          }
        ></Route>
      </Routes>{' '}
    </div>
  );
}

export default App;
