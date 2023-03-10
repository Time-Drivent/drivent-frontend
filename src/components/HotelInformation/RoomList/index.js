import styled from 'styled-components';
import Button from '../../Form/Button';
import useSaveBooking from '../../../hooks/api/useSaveBooking';
import useChangeBooking from '../../../hooks/api/useChangeBooking';
import { toast } from 'react-toastify';
import { RoomItem } from './RoomItem';

export function RoomList({ booking, change, changed, hotelIdselected, roomIdselected, rooms, setBooked, setChange, setChanged, setRoomIdSelected }) {
  const { saveBooking, saveBookingLoading } = useSaveBooking();
  const { changeBooking, changeBookingLoading } = useChangeBooking();

  async function handleSubmit() {
    try {
      if (change) {
        await changeBooking(booking.bookingId, { roomId: roomIdselected });
        toast('Reserva alterada com sucesso');
        setChange(false);
        setChanged(!changed);
      } else {
        await saveBooking({ roomId: roomIdselected });
        toast('Reserva feita com sucesso');
        setBooked(true);
      }
    } catch (error) {
      toast('Ocorreu um erro ao reservar o quarto');
    }
  }

  return (
    <>
      {
        hotelIdselected ?
          <RoomListContainer>
            Ótima pedida! Agora escolha seu quarto:
            <div>
              {rooms.map(
                r => <li key={r.id}>
                  <RoomItem
                    bookings={r._count.Booking}
                    capacity={r.capacity}
                    id={r.id}
                    name={r.name}
                    roomIdselected={roomIdselected}
                    setRoomIdSelected={setRoomIdSelected}
                  />
                </li>
              )}
            </div>
          </RoomListContainer> :
          ''
      }
      {
        roomIdselected ?
          <Button type="submit" disabled={saveBookingLoading || changeBookingLoading} onClick={handleSubmit}>
            RESERVAR QUARTO
          </Button> :
          ''
      }
    </>
  );
}

const RoomListContainer = styled.ul`
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
