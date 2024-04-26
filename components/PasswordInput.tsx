import { Dispatch, SetStateAction, useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";

import styles from "./stylesheets/PasswordInput.module.css";

export default function PasswordInput(props: {
  placeholder: string;
  value: string;
  changePassword: Dispatch<SetStateAction<string>>;
}) {
  const { placeholder, value, changePassword } = props;

  //state
  const [passwordVisible, changePasswordVisible] = useState(false);

  // functions
  const handlePasswordVisible = () => {
    changePasswordVisible(!passwordVisible);
  };

  return (
    <Input
      className={styles.input}
      size="md"
      type={passwordVisible ? "text" : "password"}
      placeholder={placeholder}
      variant="outlined"
      color="neutral"
      value={value}
      onChange={(e) => {
        changePassword(e.target.value);
      }}
      endDecorator={
        <IconButton onClick={handlePasswordVisible}>
          {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      }
    />
  );
}
