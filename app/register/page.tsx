"use client";

import { FormEvent, useEffect, useState } from "react";

import FormSnackbar from "@/components/FormSnackbar";
import PasswordInput from "@/components/PasswordInput";
import ThemeToggle from "@/components/ThemeToggle";
import config from "@/config/config";
import { Link, SnackbarOrigin } from "@mui/joy";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import { ColorPaletteProp, useColorScheme } from "@mui/joy/styles";
import Typography from "@mui/joy/Typography";

import styles from "./page.module.css";

interface snackState {
  open: boolean;
  message: string;
  color: ColorPaletteProp;
  horizontal: SnackbarOrigin["horizontal"];
  vertical: SnackbarOrigin["vertical"];
}

export default function Register() {
  // state
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");
  const [confirmPassword, changeConfirmPassword] = useState("");
  const [snackbarState, changeSnackbarState] = useState<snackState>({
    open: false,
    message: "",
    color: "primary",
    horizontal: "center",
    vertical: "top",
  });
  const { mode, setMode } = useColorScheme();
  const [mounted, changeMounted] = useState(false);

  // functions
  const registerFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      // form validation
      // username length
      if (username.length < 8) {
        throw new Error("Username must be at least 8 characters long.");
      }

      // password validation
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()_+}{"':;?/.,<>=|\\[\]~-]).{8,20}$/;
      if (!password.match(passwordRegex)) {
        throw new Error(
          "Password must be between 8 to 20 characters long, including UPPER/lowercase, symbol and number."
        );
      }

      // password match
      if (password !== confirmPassword) {
        throw new Error("Password does not match.");
      }

      // register logic
      const registerAuthUrl =
        config.authencationServiceUrl +
        config.registerRoute +
        `username=${username}&password=${password}`;

      let response = await fetch(registerAuthUrl);
      if (response.status === 200) {
        let result = await response.json();
        console.log(result);
        changeSnackbarState((prevSnackState) => ({
          ...prevSnackState,
          open: true,
          message: "Login successful.",
          color: "success",
        }));
      } else {
        let result = await response.text();
        throw new Error(result);
      }
    } catch (err) {
      if (err instanceof Error) {
        // logic for opening snackbar here
        changeSnackbarState((prevSnackState) => ({
          ...prevSnackState,
          open: true,
          message: err.message,
          color: "danger",
        }));
      } else {
        // TODO: Handle error
        console.error(err);
      }
    }
  };

  // use effect
  useEffect(() => {
    changeMounted(true);
  }, []);
  if (!mounted) return null;

  // misc

  return (
    <Sheet className={styles.main}>
      <Card className={styles.card}>
        <form className={styles.form} onSubmit={registerFormSubmit}>
          <Typography level="h4">
            Register to {config.humanReadableAppName}
          </Typography>
          <Input
            className={styles.input}
            size="md"
            placeholder="Username"
            variant="outlined"
            color="neutral"
            value={username}
            onChange={(e) => {
              changeUsername(e.target.value);
            }}
            required
          />
          <PasswordInput
            placeholder="Password"
            value={password}
            changePassword={changePassword}
          />
          <PasswordInput
            placeholder="Confirm password"
            value={confirmPassword}
            changePassword={changeConfirmPassword}
          />
          <Button type="submit" variant="solid">
            Register
          </Button>
          <Typography level="body-xs">
            Already have an account?
            <Link href="login" underline="hover">
              <Typography className={styles.loginlink} level="body-xs">
                Login
              </Typography>
            </Link>
          </Typography>
        </form>
      </Card>
      <ThemeToggle mode={mode} setMode={setMode} />
      <FormSnackbar
        color={snackbarState.color}
        message={snackbarState.message}
        open={snackbarState.open}
        changeSnackState={changeSnackbarState}
        horizontal={snackbarState.horizontal}
        vertical={snackbarState.vertical}
      />
    </Sheet>
  );
}
