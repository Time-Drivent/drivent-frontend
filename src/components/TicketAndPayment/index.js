import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useIsUserSubscribed from '../../hooks/useIsUserSubscribed';
import MessageContainer from '../MessageContainer';

export default function TicketAndPayment() {
  const [accessDenied, setAccessDenied] = useState(true);
  const isUserSubscribed = useIsUserSubscribed();
  const messageContainerPhrases = ['Você precisa completar sua inscrição antes', 'de prosseguir pra escolha de ingresso'];

  useEffect(() => {
    isUserSubscribed.then((res) => {
      if(res !== undefined)
        setAccessDenied(() => false);
    });
  }, [isUserSubscribed]);
  
  return <>
    <StyledTypography variant="h4">Ingressos e Pagamentos</StyledTypography>
    { accessDenied ? <MessageContainer phrases={messageContainerPhrases} /> : '' }
  </>;
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
