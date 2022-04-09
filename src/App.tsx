import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorPageBoundary } from './error/ErrorPage';
import AppRoutes from './routes';
import { ThemeRoot } from './theme';

const App = () => {
  return (
    <ThemeRoot>
      <ErrorPageBoundary>
        <Router>
          <AppRoutes />
        </Router>
      </ErrorPageBoundary>
    </ThemeRoot>
  );
};

export default App;
