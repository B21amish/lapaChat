"use client";

import { FormEvent, useState } from "react";

import FormSnackbar from "@/components/FormSnackbar";
import PasswordInput from "@/components/PasswordInput";
import ThemeToggle from "@/components/ThemeToggle";
import config from "@/config/config";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Sheet from "@mui/joy/Sheet";
import { useColorScheme } from "@mui/joy/styles";
import Typography from "@mui/joy/Typography";

import styles from "./page.module.css";

export type DefaultColorPalette =
  | "primary"
  | "neutral"
  | "danger"
  | "success"
  | "warning";

export default function Register() {
  // state
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");
  const [confirmPassword, changeConfirmPassword] = useState("");
  const [snackState, changeSnackState] = useState(false);
  const [snackMessage, changeSnackMessage] = useState("");
  const [snackColor, changeSnackColor] =
    useState<DefaultColorPalette>("primary");
  const { mode, setMode } = useColorScheme();

  // functions
  const registerFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      // submit logic
      changeSnackColor("success");
      changeSnackState(true);
      changeSnackMessage("Login successful.");
    } catch (err) {
      if (err instanceof Error) {
        // logic for opening snackbar here
        changeSnackColor("danger");
        changeSnackState(true);
        changeSnackMessage(err.message);
      } else {
        console.error(err);
      }
    }
  };

  // useEffects
  // misc

  return (
    <Sheet className={styles.main}>
      <FormSnackbar
        color={snackColor}
        message={snackMessage}
        open={snackState}
        changeOpenState={changeSnackState}
      />
      <Card className={styles.card}>
        <form className={styles.form} onSubmit={registerFormSubmit}>
          <Typography level="h4">
            Login to {config.humanReadableAppName}
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
          <Link className={styles.forgetpassword} href="" underline="hover">
            <Typography level="body-xs">Forget password?</Typography>
          </Link>
          <Button type="submit" variant="solid">
            Login
          </Button>
          <Typography level="body-xs">
            Don't have an account?
            <Link href="register" underline="hover">
              <Typography className={styles.registerlink} level="body-xs">
                Register
              </Typography>
            </Link>
          </Typography>
        </form>
      </Card>
      <ThemeToggle mode={mode} setMode={setMode} />
    </Sheet>
  );
}
