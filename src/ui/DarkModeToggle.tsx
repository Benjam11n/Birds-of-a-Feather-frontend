import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/ui/DarkModeProvider";

function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? <FiMoon /> : <FiSun />}
    </Button>
  );
}

export default DarkModeToggle;
