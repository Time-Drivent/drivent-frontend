import { useEffect, useState } from 'react';
import useHotel from '../../hooks/api/useHotel';
import HotelList from './HotelList';

export default function HotelInformation() {
  const { hotels } = useHotel();
  const [hotelsData, setHotelsData] = useState([]);
  const [hotelIdselected, sethotelIdSelected] = useState(0);

  function handleSelect(id) {
    sethotelIdSelected(() => id);
  }

  useEffect(async() => {
    try {
      const response = await hotels();
      setHotelsData(() => response);
    } catch (err) {
      console.error('Erro');
    }
  }, []);

  return <>
    <HotelList hotels={hotelsData} selected={hotelIdselected} handleSelect={handleSelect} />
  </>;
} 
