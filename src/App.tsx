import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { ThemeRoot } from './theme';

const App = () => {
  return (
    <ThemeRoot>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeRoot>
  );
};

export default App;
