import { Dispatch, SetStateAction } from "react";

import { ColorPaletteProp } from "@mui/joy";
import Snackbar, { SnackbarOrigin } from "@mui/joy/Snackbar";

interface snackState {
  open: boolean;
  message: string;
  color: ColorPaletteProp;
  horizontal: SnackbarOrigin["horizontal"];
  vertical: SnackbarOrigin["vertical"];
}

export default function FormSnackbar(props: {
  color: ColorPaletteProp;
  message: string;
  open: boolean;
  changeSnackState: Dispatch<SetStateAction<snackState>>;
  horizontal: SnackbarOrigin["horizontal"];
  vertical: SnackbarOrigin["vertical"];
}) {
  const { color, message, open, changeSnackState, horizontal, vertical } =
    props;

  // state
  //function
  //effect

  return (
    <Snackbar
      anchorOrigin={{
        vertical: vertical,
        horizontal: horizontal,
      }}
      autoHideDuration={4000}
      open={open}
      variant="outlined"
      color={color}
      onClose={(event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        changeSnackState((prevSnackState) => ({
          ...prevSnackState,
          open: false,
          message: "",
          color: "primary",
        }));
      }}
    >
      {message}
    </Snackbar>
  );
}
