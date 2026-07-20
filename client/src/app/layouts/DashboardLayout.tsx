import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r">Sidebar</aside>
      <div className="flex flex-1 flex-col">
        <header className="border-b">Topnav</header>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
