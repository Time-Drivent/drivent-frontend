import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Confirmation } from '../../../components/Payment/Confirmation';
import NotRemoteOptions from '../../../components/Payment/NotRemote';
import ModalityTicket from '../../../components/ticket-payment/modality-ticket';
import { Typography } from '@material-ui/core';
import useIsUserSubscribed from '../../../hooks/useIsUserSubscribed';
import MessageContainer from '../../../components/MessageContainer';

export default function Payment() {
  const [accessDenied, setAccessDenied] = useState(true);
  const isUserSubscribed = useIsUserSubscribed();
  const messageContainerPhrases = [
    'Você precisa completar sua inscrição antes',
    'de prosseguir pra escolha de ingresso',
  ];
  const [ticket, setTicket] = useState([]);
  const [hasHotel, setHasHotel] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    isUserSubscribed.then((res) => {
      if (res !== undefined) setAccessDenied(() => false);
    });
  }, [isUserSubscribed]);

  return (
    <>
      <Title>Ingresso e pagamento</Title>
      {accessDenied ? (
        <MessageContainer phrases={messageContainerPhrases} />
      ) : (
        <>
          <ModalityTicket setTicket={setTicket} setHasSelected={setHasSelected} />
          {ticket.text === 'Presencial' && (
            <NotRemoteOptions
              hasHotel={hasHotel}
              setHasHotel={setHasHotel}
              hasSelected={hasSelected}
              setHasSelected={setHasSelected}
            />
          )}
          {(hasSelected || ticket.text === 'Online') && (
            <Confirmation price={ticket.text === 'Online' ? 100 : hasHotel ? 600 : 250} />
          )}
        </>
      )}
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

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
