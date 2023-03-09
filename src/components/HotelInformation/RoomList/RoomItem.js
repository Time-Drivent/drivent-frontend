import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

export function RoomItem({ bookings, capacity, id, name, roomIdselected, setRoomIdSelected }) {
  function handleClick() {
    setRoomIdSelected(id);
  }

  return (
    <RoomButton clicked={roomIdselected === id} disabled={capacity === bookings} onClick={handleClick}>
      {name}
      <span>
        {Array(capacity - bookings - (roomIdselected === id ? 1 : 0)).fill().map((_, i) => <Vacancy key={i} />)}
        {(roomIdselected === id) && <RoomSelected />}
        {Array(bookings).fill().map((_, i) => <RoomBooked key={i} />)}
      </span>
    </RoomButton>
  );
}

const RoomButton = styled.button`
  align-items: center;
  background-color: ${({ clicked }) => clicked ? '#FFEED2' : '#FFFFFF'};
  border: 1px solid #CECECE;
  border-radius: 10px;
  color: #000000;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  height: 45px;
  justify-content: space-between;
  margin: 8px 17px 0 0;
  padding: 0 10px;
  width: 190px;

  :disabled {
    background-color: #E9E9E9;
    color: #9D9D9D;
    cursor: auto;

    * {
      color: #8C8C8C;
    }
  }
`;

const Vacancy = styled(BsPerson)`
  font-size: 26px;
`;

const RoomSelected = styled(BsPersonFill)`
  color: #FF4791;  
  font-size: 26px;
`;

const RoomBooked = styled(BsPersonFill)`
  color: #000000;  
  font-size: 26px;
`;
