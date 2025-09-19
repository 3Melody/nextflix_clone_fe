"use client";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Dayjs } from 'dayjs';

const theme = createTheme({
  palette: {
    mode: "dark", // หรือ light + ปรับสีอื่น
  },
});

export default function WhiteDatePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}) {

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={(newValue) => {
          onChange(newValue ?? null);
        }}
          slotProps={{ textField: { variant: "outlined" } }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
