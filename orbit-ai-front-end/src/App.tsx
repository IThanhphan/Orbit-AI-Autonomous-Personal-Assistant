import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { DashboardPage } from "./pages/DashboardPage";
import { ChatPage } from "./pages/ChatPage";

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-150">
      <Sidebar
        menuOpen={menuOpen}
        onCloseMenu={() => setMenuOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />

      <main
        className={`max-w-[1800px] px-[16px] pt-[20px] pb-[24px] transition-[margin] duration-200 ease-out min-[761px]:px-[24px] min-[761px]:py-[32px] min-[1401px]:px-[36px] min-[1401px]:pt-[38px] min-[1401px]:pb-[26px] ${
          collapsed
            ? "min-[761px]:ml-[82px]"
            : "min-[761px]:ml-[230px] min-[1151px]:ml-[260px]"
        }`}
      >
        <Outlet context={{ openMobileMenu: () => setMenuOpen(true) }} />
      </main>
    </div>
  );
}

function DashboardRoute() {
  const navigate = useNavigate();

  const handleNavigate = (label: string) => {
    const routeMap: Record<string, string> = {
      Dashboard: "/",
      Chat: "/chat",
      Tasks: "/tasks",
      Plans: "/plans",
      Calendar: "/calendar",
      Activity: "/activity",
      Notifications: "/notifications",
      Settings: "/settings",
    };
    navigate(routeMap[label] ?? "/");
  };

  return <DashboardPage onNavigate={handleNavigate} />;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<DashboardRoute />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="chat/:threadId" element={<ChatPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
