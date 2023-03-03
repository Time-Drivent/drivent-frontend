import styled from 'styled-components';
import { useState } from 'react';
import { Confirmation } from '../../../components/Payment/Confirmation';
import NotRemoteOptions from '../../../components/Payment/NotRemote';
import ModalityTicket from '../../../components/ticket-payment/modality-ticket';

export default function Payment() {
  const [ticket, setTicket] = useState([]);
  const [hasHotel, setHasHotel] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);

  return (
    <>
      <Title>Ingresso e pagamento</Title>

      <ModalityTicket setTicket={setTicket} setHasSelected={setHasSelected} />
      {ticket.text === 'Presencial' && <NotRemoteOptions hasHotel={hasHotel} setHasHotel={setHasHotel} hasSelected={hasSelected} setHasSelected={setHasSelected} />}
      {(hasSelected || ticket.text === 'Online') && <Confirmation price={ticket.text === 'Online' ? 100 : (hasHotel ? 600 : 250)}/>}
    </>
  );
}

const Title = styled.div`
  font-size: 34px;
  font-weight: 400;
  line-height: 39.84px;
  color: #000000;
  font-family: 'Roboto', sans-serif;
  padding-bottom: 37px;
`;
