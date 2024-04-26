import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/joy/IconButton";
import { Mode } from "@mui/system/cssVars/useCurrentColorScheme";

import styles from "./stylesheets/ThemeToggle.module.css";

export default function ThemeToggle(props: {
  mode: Mode | undefined;
  setMode: (mode: Mode | null) => void;
}) {
  const { mode, setMode } = props;

  return (
    <IconButton
      className={styles.fab}
      color="primary"
      variant="solid"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
