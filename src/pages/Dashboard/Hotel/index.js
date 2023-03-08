import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import HotelInformation from '../../../components/HotelInformation';
import MessageContainer from '../../../components/MessageContainer';

export default function Hotel() {
  const [accessDenied, setAccessDenied] = useState(false);

  return <>
    <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography> 
    { accessDenied ? <MessageContainer phrases={['Problema']} /> : <HotelInformation /> }
  </>;
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
