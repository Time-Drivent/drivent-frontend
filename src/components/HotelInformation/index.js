import { useEffect, useState } from 'react';
import useHotel from '../../hooks/api/useHotel';
import HotelList from './HotelList';
import { RoomList } from './RoomList';

export default function HotelInformation({ booking, change, changed, setBooked, setChange, setChanged }) {
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

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    try {
      const response = await hotels();
      setHotelsData(() => response);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Erro');
    }
  }, []);

  return (
    <>
      <HotelList hotels={hotelsData} selected={hotelIdselected} handleSelect={handleSelect} setRooms={setRooms} />
      <RoomList
        booking={booking}
        change={change}
        changed={changed}
        hotelIdselected={hotelIdselected}
        roomIdselected={roomIdselected}
        rooms={rooms}
        setBooked={setBooked}
        setChange={setChange}
        setChanged={setChanged}
        setRoomIdSelected={setRoomIdSelected}
      />
    </>
  );
}
