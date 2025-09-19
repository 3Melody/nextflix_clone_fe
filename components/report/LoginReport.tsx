import * as React from 'react';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface LoginData {
  login_date: string;
  total: number;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function BiaxialLineChart({ data }: { data: LoginData[] }) {
  

  const xLabels = data?.map((item) => item.login_date);
  const yData = data?.map((item) => item.total);

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Box sx={{ width: "100%", height: 300 }}>
          <LineChart
            series={[{ data: yData, label: "Total", yAxisId: "leftAxisId" }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            yAxis={[{ id: "leftAxisId", width: 50 }]}
          />
        </Box>
      </div>
    </ThemeProvider>
  );
}
