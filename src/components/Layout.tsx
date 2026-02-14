import { Outlet } from 'react-router';
import { Navigation } from './Navigation';

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <Navigation />
      <Outlet />
    </div>
  );
}
