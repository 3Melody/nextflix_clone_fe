'use client'

import React, { use, useEffect, useState } from 'react'
import FavoritesReport from '@/components/report/FavoritesReport';
import SideBarReport from '@/components/report/sideBarReport';
import DatePicker from '@/components/common/DatePicker';
import LoginReport from '@/components/report/LoginReport';
import MonthYear from '@/components/common/MonthYearPicket'
import dayjs, { Dayjs } from 'dayjs';
import { useUi } from '@/components/stateMenage/UiProvider';
export default function page() {

  const today = dayjs();
const threeMonthsAgo = today.subtract(3, 'month');

const apiUrl = process.env.NEXT_PUBLIC_DOTNET_PUBLIC_API_URL;
const [startDate, setStartDate] = useState<Dayjs | null>(threeMonthsAgo);
const [endDate, setEndDate] = useState<Dayjs | null>(today);
const [monthYear, setMonthYear] = useState<Dayjs | null>(today);
const token = localStorage.getItem("authToken");
const [loginLog, setLoginLog] = useState([]);
const [favorites, setFavorites] = useState([]);
const { setAuth } = useUi();



 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/report/favorites?startDate=${startDate?.format('YYYY-MM-DD')}&endDate=${endDate?.format('YYYY-MM-DD')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if(response.status === 403){
        setAuth("forbidden");
        return;
      }

      if (!response.ok) {
        console.error('Favorites fetch failed:', response.statusText);
        return;
      }

      const text = await response.text();
      if (!text) {
        console.warn('Favorites response is empty');
        return;
      }

      const data = JSON.parse(text);
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites data:', error);
    }
  };

  const fetchLoginLog = async () => {
    try {
      const response = await fetch(`${apiUrl}/report/loginLogs?startDate=${monthYear?.format('YYYY-MM-DD')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if(response.status === 403){
        setAuth("forbidden");
        return;
      }

      if (!response.ok) {
        console.error('LoginLog fetch failed:', response.statusText);
        return;
      }

      const text = await response.text();
      if (!text) {
        console.warn('LoginLog response is empty');
        return;
      }

      const data = JSON.parse(text);
      setLoginLog(data);
    } catch (error) {
      console.error('Error fetching login log:', error);
    }
  };

  fetchData();
  fetchLoginLog();
}, [startDate, endDate , monthYear]);


  


  return (
 <div className='pt-10'>
      <SideBarReport />
     <div className='p-6'>
       <div className='flex justify-between items-center mb-10'> 
        <div className='text-3xl font-bold'>Dashboard</div>
        <div className='flex gap-4'>
         <DatePicker
          label="Start Date"
          value={startDate}
           onChange={(newValue) => setStartDate(newValue)} 
        />
        <DatePicker
          label="End Date"
          value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
        />
        </div>
        </div>
        <FavoritesReport data={favorites} />
       <div className='mt-15'>
         <div className='flex justify-end'> 
          <MonthYear 
           value={monthYear}
           onChange={(newValue) => setMonthYear(newValue)} />
          </div>
          <LoginReport data={loginLog} />
       </div>
     </div>
 </div>
  )
}
