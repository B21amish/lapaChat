import Snackbar from "@mui/joy/Snackbar";

export type DefaultColorPalette =
  | "primary"
  | "neutral"
  | "danger"
  | "success"
  | "warning";

export default function FormSnackbar(props: any) {
  const { color, message, open, changeOpenState } = props;

  // state
  //function
  //effect

  return (
    <Snackbar
      // anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={4000}
      open={open}
      variant="outlined"
      color={color}
      onClose={(event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        changeOpenState(false);
      }}
    >
      {message}
    </Snackbar>
  );
}
