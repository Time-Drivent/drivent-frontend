import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

export default function ModalityTicket({ setHasSelected, ticketTypes }) {
  const [selected, setSelected] = useState(null);
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    const modalities = ticketTypes
      .filter((t) => t.isRemote || !t.includesHotel)
      .map((t) => ({ text: t.isRemote ? 'Online' : 'Presencial', value: t.price, id: t.id }));
    setTicket(() => modalities);
  }, [ticketTypes]);

  const selectedBox = (info) => {
    setSelected(info.id);
    setHasSelected(info);
  };

  return (
    <Container>
      <h1>Primeiro, escolha sua modalidade de ingresso</h1>
      <BoxOption>
        {ticket.map((info, i) => (
          <Box key={i + 1} selected={selected === info.id} onClick={() => selectedBox(info)}>
            <h1>{info.text}</h1>
            <h2>R$ {info.value}</h2>
          </Box>
        ))}
      </BoxOption>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #8e8e8e;
  }
  gap: 16px;
  margin-bottom: 44px;
`;
const BoxOption = styled.div`
  display: flex;
  gap: 24px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  align-items: center;
  width: 145px;
  height: 145px;
  border: 1px solid #cecece;
  border-radius: 20px;
  background: ${(props) => (props.selected ? '#FFEED2' : '#fff')};
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #454545;
  }
  h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #898989;
  }
  :hover {
    cursor: pointer;
  }
`;
