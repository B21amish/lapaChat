"use client";

import Cookies from "js-cookie";
import { LapaAuthenticationHelper } from "lapaauthenticationhelper";
import { FormEvent, useEffect, useState } from "react";

import FormSnackbar from "@/components/FormSnackbar";
import PasswordInput from "@/components/PasswordInput";
import ThemeToggle from "@/components/ThemeToggle";
import config from "@/config/config";
import { SnackbarOrigin } from "@mui/joy";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
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

export default function Login() {
  // state
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");
  const [snackbarState, changeSnackbarState] = useState<snackState>({
    open: false,
    message: "",
    color: "primary",
    horizontal: "center",
    vertical: "top",
  });
  const { mode, setMode } = useColorScheme();
  const [mounted, changeMounted] = useState(false);
  let userId: string;
  let accessToken: string;

  // functions
  const loginFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const lapaauthenticationhelper = new LapaAuthenticationHelper(
        config.lapaAuthenticationProtocol,
        config.lapaAuthenticationIp,
        config.lapaAuthenticationPort
      );
      let loginResponse = await lapaauthenticationhelper.login(
        username,
        password
      );
      userId = loginResponse["user_id"];
      accessToken = loginResponse["access_token"];

      // store refresh token in cookie
      let refreshToken = loginResponse["refresh_token"];
      Cookies.set("RefreshToken", refreshToken);

      changeSnackbarState((prevSnackState) => ({
        ...prevSnackState,
        open: true,
        message: "Login successsful.",
        color: "success",
      }));
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
        <form className={styles.form} onSubmit={loginFormSubmit}>
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
            Don&apos;t have an account?
            <Link href="register" underline="hover">
              <Typography className={styles.registerlink} level="body-xs">
                Register
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
