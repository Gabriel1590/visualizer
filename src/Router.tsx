import { Router as ReachRouter, Redirect } from '@reach/router';
import { Sorting } from './pages/Sorting';

export const AppRouter = (): JSX.Element => (
  <ReachRouter>
    <Redirect from="/" to="/sorting" />

    <Sorting path="/sorting" />
  </ReachRouter>
);
