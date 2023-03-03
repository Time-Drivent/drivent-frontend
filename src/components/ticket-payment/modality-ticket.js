import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function ModalityTicket({ setTicket }) {
  const [selected, setSelected] = useState(null);
  const selectedBox = (id) => {
    setSelected(id);
    if (id === 1) {
      setTicket({ text: 'Presencial', value: 250 });
    } else if (id === 2) {
      setTicket({ text: 'Online', value: 100 });
    }
  };

  return (
    <Container>
      <h1>Primeiro, escolha sua modalidade de ingresso</h1>
      <BoxOption>
        <Box
          selected={selected === 1}
          onClick={() => selectedBox(1)}
        >
          <h1>Presencial</h1>
          <h2>R$ 250</h2>
        </Box>

        <Box
          selected={selected === 2}
          onClick={() => selectedBox(2)}
        >
          <h1>Online</h1>
          <h2>R$ 100</h2>
        </Box>
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

