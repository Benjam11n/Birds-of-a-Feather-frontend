import NavLogo from "./NavLogo";
import MainNav from "./MainNav";

function SideBar() {
  return (
    <aside className="ml-16 grid grid-cols-1 grid-rows-[auto_auto_auto_auto_auto_auto_auto_1fr] border-r border-border px-4 py-3">
      <div>
        <NavLogo />
        <MainNav />
      </div>
    </aside>
  );
}

export default SideBar;
