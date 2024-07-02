"use client";

import { error } from "console";
import Cookies from "js-cookie";
import { LapaAuthenticationHelper } from "lapaauthenticationhelper";
import { useEffect, useState } from "react";

import FormSnackbar from "@/components/FormSnackbar";
import ThemeToggle from "@/components/ThemeToggle";
import config from "@/config/config";
import { userData } from "@/context/UserDataContext";
import { SnackbarOrigin } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import { ColorPaletteProp, useColorScheme } from "@mui/joy/styles";

import styles from "./page.module.css";

interface snackState {
  open: boolean;
  message: string;
  color: ColorPaletteProp;
  horizontal: SnackbarOrigin["horizontal"];
  vertical: SnackbarOrigin["vertical"];
}

export default function Chat() {
  // state
  const [snackbarState, changeSnackbarState] = useState<snackState>({
    open: false,
    message: "",
    color: "primary",
    horizontal: "center",
    vertical: "top",
  });
  const { mode, setMode } = useColorScheme();
  const { accessToken, userId } = userData();
  const refreshToken = Cookies.get("RefreshToken");

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) {
      if (userId && refreshToken) {
        const getAccessToken = async () => {
          // get access token using authentication helper
          const lapaauthenticationhelper = new LapaAuthenticationHelper(
            config.lapaAuthenticationProtocol,
            config.lapaAuthenticationIp,
            config.lapaAuthenticationPort
          );
          let generateAccessTokenResponse =
            await lapaauthenticationhelper.generateAccessToken(
              userId,
              refreshToken
            );
          console.log(generateAccessTokenResponse);
        };
        getAccessToken();
      } else {
        throw new Error(
          `Failed to generate new access token for user_id : ${userId}`
        );
      }
    }
  }, []);

  // functions
  // use effect
  // misc

  return (
    <Sheet className={styles.main}>
      Hello
      {accessToken}
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
