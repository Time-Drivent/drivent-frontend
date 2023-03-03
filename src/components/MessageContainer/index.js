import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function MessageContainer({ phrases }) {
  return <Container>
    { phrases.map((phrase, i) => <Typography variant="body1" key={i}> {phrase} </Typography>) }
  </Container>;
}

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #8E8E8E;
`;
