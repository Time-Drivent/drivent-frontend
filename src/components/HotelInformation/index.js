import { useEffect, useState } from 'react';
import useHotel from '../../hooks/api/useHotel';
import HotelList from './HotelList';
import { RoomList } from './RoomList';

export default function HotelInformation({ setBooked }) {
  const { hotels } = useHotel();
  const [hotelsData, setHotelsData] = useState([]);
  const [hotelIdselected, sethotelIdSelected] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [roomIdselected, setRoomIdSelected] = useState(0);

  function handleSelect(id, rooms) {
    sethotelIdSelected(() => id);
    setRooms(rooms);
    setRoomIdSelected(0);
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
    <HotelList hotels={hotelsData} selected={hotelIdselected} handleSelect={handleSelect} setRooms={setRooms} />
    <RoomList hotelIdselected={hotelIdselected} roomIdselected={roomIdselected} rooms={rooms} setBooked={setBooked} setRoomIdSelected={setRoomIdSelected} />
  </>;
}
