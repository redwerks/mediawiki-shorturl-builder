import { Location } from 'history';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ServerData } from '../detector/types';
import HomeRoute from './Home';
import ServerErrorRoute from './ServerError';
import { ServerError, ServerDetectionError } from '../api/error';

const Root = () => {
  const { state } = useLocation() as Location<{
    serverData?: ServerData;
    error?: ServerError | ServerDetectionError;
  }>;

  if (state?.serverData) {
    // @todo Handle server data with config questions and instructions
  }

  if (state?.error) {
    return <ServerErrorRoute error={state.error} />;
  }

  return <HomeRoute />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
    </Routes>
  );
};

export default AppRoutes;