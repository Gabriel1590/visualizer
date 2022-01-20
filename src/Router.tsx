import {
  Routes,
  Route,
  Navigate,
  HashRouter,
} from 'react-router-dom';
import { Sorting } from './pages/Sorting';

export const AppRouter = (): JSX.Element => (
  <HashRouter>
    <Routes>
      <Route path="/sorting" element={<Sorting />} />
      <Route
        path="*"
        element={<Navigate to="/sorting" />}
      />
    </Routes>
  </HashRouter>
);
