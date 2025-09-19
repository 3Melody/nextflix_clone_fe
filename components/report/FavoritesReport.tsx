import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

interface DataItem {
  category: number;
  total: number;
}

export default function BasicBars({ data }: { data?: DataItem[] }) {

  const AllCategory = [
    { id: 28, name: "บู๊" }, { id: 12, name: "ผจญ" }, { id: 16, name: "แอนนิเมชั่น" },
    { id: 35, name: "ตลก" }, { id: 80, name: "อาชญากรรม" }, { id: 99, name: "สารคดี" },
    { id: 18, name: "หนังชีวิต" }, { id: 10751, name: "ครอบครัว" }, { id: 14, name: "จินตนาการ" },
    { id: 36, name: "ประวัติศาสตร์" }, { id: 27, name: "สยองขวัญ" }, { id: 10402, name: "ดนตรี" },
    { id: 9648, name: "ลึกลับ" }, { id: 10749, name: "หนังรักโรแมนติก" }, { id: 878, name: "นิยายวิทยาศาสตร์" },
    { id: 10770, name: "ภาพยนตร์โทรทัศน์" }, { id: 53, name: "ระทึกขวัญ" }, { id: 10752, name: "สงคราม" },
    { id: 37, name: "หนังคาวบอยตะวันตก" }
  ];

  const totalsMap = new Map(data?.map((item) => [item.category, item.total]) ?? []);

  const xLabels = AllCategory.map((cat) => cat.name);
  const totals = AllCategory.map((cat) => totalsMap.get(cat.id) ?? 0);

  return (
    <div className="overflow-x-auto scrollbar-glass">
      <div className="min-w-[500px]" style={{ width: `${xLabels.length * 120}px` }}>
        <BarChart
          xAxis={[{ data: xLabels, scaleType: 'band' }]}
          series={[{ data: totals }]}
          height={300}
          width={xLabels.length * 120}
        />
      </div>
    </div>
  );
}
