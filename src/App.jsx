import { Outlet, useLocation } from 'react-router-dom';
import SidebarNav from './components/SidebarNav';
import BottomNav from './components/BottomNav';

export default function App() {
  const { pathname } = useLocation();
  const isChat = pathname.startsWith('/messages/');
  const hideBottomNav = isChat;

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
    >
      <SidebarNav />

      <main className={`flex-1 min-w-0 flex justify-center ${hideBottomNav ? '' : 'pb-16 md:pb-0'}`}>
        <div className="w-full max-w-[1200px] flex">
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </main>

      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
