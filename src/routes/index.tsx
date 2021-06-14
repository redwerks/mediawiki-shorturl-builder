import { Location } from 'history';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ServerDetectionError, ServerError } from '../api/error';
import { ServerData } from '../detector/types';
import HomeRoute from './Home';
import ResultRoute from './Result';
import ServerErrorRoute from './ServerError';

const Root = () => {
  const { state } = useLocation() as Location<{
    serverData?: ServerData;
    error?: ServerError | ServerDetectionError;
  }>;

  if (state?.serverData) {
    return <ResultRoute serverData={state.serverData} />;
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
