import { Button } from "@mui/material";
import React from "react";

const ButtonComponent = ({
    id="",
    variant="",
    onClick=()=>{},
    sx={},
    fullWidth=true,
    label=""

}) => {
  return (
    <>
      <Button
        id={id}
        label={label}
        variant={variant}
        onClick={onClick}
        fullWidth={fullWidth}
        sx={sx}
      >
        {label}
      </Button>

    </>
  );
};

export default ButtonComponent