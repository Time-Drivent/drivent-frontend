import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import { useState } from 'react';

export function Room({ capacity, id, name, roomIdselected, setRoomIdSelected }) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setRoomIdSelected(id);
    setClicked(true);
  }

  return (
    <RoomButton onClick={handleClick}>
      {name}
      <span>
        {(roomIdselected === id && clicked) ? Array(capacity - 1).fill(<Vacancy />) : Array(capacity).fill(<Vacancy />)}
        {roomIdselected === id && clicked && <RoomSelected />}
      </span>
    </RoomButton>
  );
}

const RoomButton = styled.button`
  align-items: center;
  background-color: #FFFFFF;
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

  :focus {
    background-color: #FFEED2;
  }
`;

const Vacancy = styled(BsPerson)`
  font-size: 26px;
`;

const RoomSelected = styled(BsPersonFill)`
  color: #FF4791;  
  font-size: 26px;
`;
