import HeaderMenu from "./HeaderMenu";
import LogoIcon from "./LogoIcon";
import SearchBar from "./SearchBar";

function Header() {
  return (
    <header className="col-span-3 ml-4 grid grid-cols-3 border-b border-border px-2">
      <LogoIcon />
      <SearchBar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
