import styled from 'styled-components';
import { useState } from 'react';
import NotRemoteOptions from '../../../components/Payment/NotRemote';
import ModalityTicket from '../../../components/ticket-payment/modality-ticket';

export default function Payment() {
  const [ticket, setTicket] = useState([]);
  console.log(ticket);
  return (
    <>
      <Title>Ingresso e pagamento</Title>

      <ModalityTicket setTicket={setTicket} />
      {ticket.length !== 0 &&  <NotRemoteOptions />}
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
