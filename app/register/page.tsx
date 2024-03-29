"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Card from "@mui/joy/Card";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useColorScheme } from "@mui/joy/styles";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Register() {
  const [passwordVisible, changePasswordVisible] = useState(false);
  const [confirmPasswordVisible, changeConfirmPasswordVisible] =
    useState(false);
  const { mode, setMode } = useColorScheme();

  const handlePasswordVisible = () => {
    changePasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisible = () => {
    changeConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <Sheet className={styles.main}>
      <Card className={styles.card}>
        <form className={styles.form}>
          <Typography level="h4">Register to LAPA</Typography>
          <Input
            className={styles.input}
            size="md"
            placeholder="Username"
            variant="outlined"
            color="neutral"
          />
          <Input
            size="md"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            variant="outlined"
            color="neutral"
            endDecorator={
              <IconButton onClick={handlePasswordVisible}>
                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            }
          />
          <Input
            size="md"
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm password"
            variant="outlined"
            color="neutral"
            endDecorator={
              <IconButton onClick={handleConfirmPasswordVisible}>
                {confirmPasswordVisible ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            }
          />
          <Button type="submit" variant="solid">
            Register
          </Button>
        </form>
      </Card>
      <IconButton
        className={styles.fab}
        color="primary"
        variant="solid"
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      >
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Sheet>
  );
}
