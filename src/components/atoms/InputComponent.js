import { TextField } from "@mui/material";
import React from "react";

const InputComponent = ({
  label = "",
  placeholder = "",
  name = "",
  value = "",
  onChange = () => {},
  type = "",
  sx = {},
  fullWidth = true,
}) => {
  return (
    <div>
      <TextField
        fullWidth={fullWidth}
        label={label}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        sx={sx}
      />
    </div>
  );
};

export default InputComponent;
