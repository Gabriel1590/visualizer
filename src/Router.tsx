import { Router as ReachRouter, Redirect } from '@reach/router';
import { Sorting } from './pages/Sorting';

export const AppRouter = (): JSX.Element => (
  <ReachRouter>
    <Sorting path="/sorting" />
    <Redirect noThrow from="*" to="/sorting" />
  </ReachRouter>
);
