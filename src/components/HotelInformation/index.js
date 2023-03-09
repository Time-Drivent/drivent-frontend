import { useEffect, useState } from 'react';
import useHotel from '../../hooks/api/useHotel';
import HotelList from './HotelList';
import { Room } from './Room';
import styled from 'styled-components';
import Button from '../Form/Button';
import useSaveBooking from '../../hooks/api/useSaveBooking';
import { toast } from 'react-toastify';

export default function HotelInformation() {
  const { hotels } = useHotel();
  const [hotelsData, setHotelsData] = useState([]);
  const [hotelIdselected, sethotelIdSelected] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [roomIdselected, setRoomIdSelected] = useState(0);
  const { saveBooking, saveBookingLoading } = useSaveBooking();

  function handleSelect(id, rooms) {
    sethotelIdSelected(() => id);
    setRooms(rooms);
    setRoomIdSelected(0);
  }

  async function handleSubmit() {
    try {
      await saveBooking({ roomId: roomIdselected });
      toast('Reserva feita com sucesso');
    } catch (error) {
      toast('Ocorreu um erro ao reservar o quarto');
    }
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
    {
      hotelIdselected ?
        <RoomList>
          Ótima pedida! Agora escolha seu quarto:
          <div>
            {rooms.map(r => <li><Room capacity={r.capacity} id={r.id} key={r.id} name={r.name} roomIdselected={roomIdselected} setRoomIdSelected={setRoomIdSelected} /></li>)}
          </div>
        </RoomList> :
        ''
    }
    {
      roomIdselected ?
        <Button type="submit" disabled={saveBookingLoading} onClick={handleSubmit}>
          RESERVAR QUARTO
        </Button> :
        ''
    }
  </>;
}

const RoomList = styled.ul`
  color: #8E8E8E;
  font-family: 'Roboto';
  font-size: 18px;
  margin: 50px 0 45px 0;

  div {
    display: flex;
    margin-top: 15px;
    flex-wrap: wrap;
  }
`;
