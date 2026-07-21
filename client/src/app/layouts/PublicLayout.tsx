import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div>
      <header>Landing Nav</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
