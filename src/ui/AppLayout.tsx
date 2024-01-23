import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Header />
      <SideBar />

      <main className="mx-4 my-4 h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
