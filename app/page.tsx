"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useColorScheme } from "@mui/joy/styles";

export default function Home() {
  // const [mounted, setMounted] = useState(false);
  const { mode, setMode } = useColorScheme();

  // // use effect
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) return null;

  return (
    <Sheet className={styles.main}>
      <Typography level="h1">Welcome To LAPA</Typography>
      <IconButton
        className={styles.fab}
        color="primary"
        variant="solid"
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      >
        {mode === "dark" ? "light" : "dark"} mode
      </IconButton>
    </Sheet>
  );
}
