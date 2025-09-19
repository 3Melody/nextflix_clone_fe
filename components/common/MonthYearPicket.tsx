import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const currentYear = dayjs();

const theme = createTheme({
  palette: {
    mode: "dark", // หรือ light + ปรับสีอื่น
  },
});


export default function DatePickerYearsOrder({
  value,
  onChange,
}: {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Years and Months"
          maxDate={currentYear}
          openTo="year"
          views={["year", "month"]}
          yearsOrder="desc"
          sx={{ minWidth: 250 }}
          value={value}
          onChange={(newValue) => {
            onChange(newValue ?? null);
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
