"use client";

import { useEffect, useState } from "react";

import ThemeToggle from "@/components/ThemeToggle";
import config from "@/config/config";
import { Link } from "@mui/joy";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import { useColorScheme } from "@mui/joy/styles";
import Typography from "@mui/joy/Typography";

import styles from "./page.module.css";

export default function Home() {
  const [mounted, changeMounted] = useState(false);
  const { mode, setMode } = useColorScheme();

  // use effect
  useEffect(() => {
    changeMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <Sheet className={styles.main}>
      <Typography level="h1">
        Welcome To {config.humanReadableAppName}
      </Typography>
      <Button>
        <Link href="register" underline="hover">
          Register
        </Link>
      </Button>
      <Button>
        <Link href="login" underline="hover">
          Login
        </Link>
      </Button>
      <ThemeToggle mode={mode} setMode={setMode} />
    </Sheet>
  );
}
