import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { DashboardPage } from "./pages/DashboardPage";

export function App() {
  const [active, setActive] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-150">
      <Sidebar
        active={active}
        onSelect={setActive}
        menuOpen={menuOpen}
        onCloseMenu={() => setMenuOpen(false)}
      />

      <main className="max-w-[1800px] px-[16px] pt-[20px] pb-[24px] min-[761px]:ml-[230px] min-[761px]:px-[24px] min-[761px]:py-[32px] min-[1151px]:ml-[260px] min-[1401px]:px-[36px] min-[1401px]:pt-[38px] min-[1401px]:pb-[26px]">
        <DashboardPage onNavigate={setActive} />
      </main>
    </div>
  );
}

export default App;
