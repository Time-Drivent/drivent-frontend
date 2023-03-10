import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import { FaFileContract, FaMoneyBill, FaBed, FaCalendarWeek, FaCertificate, FaPowerOff } from 'react-icons/fa';
import { toast } from 'react-toastify';
import NavigationButton from './NavigationButton';

export default function NavigationBar() {
  const { setUserData } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  function isActive(buttonPath) {
    return location.pathname === buttonPath;
  }
  function Logout() {
    try {
      const newUserData = {};
      setUserData(newUserData);
      localStorage.setItem('userData', JSON.stringify(newUserData));
      navigate('/sign-in');
      toast('Logout realizado com sucesso!');
    } catch (error) {
      toast('Não foi possível fazer o Logout!');
    }
  }

  return (
    <Container>
      <Link to="/dashboard/subscription">
        <NavigationButton active={isActive('/dashboard/subscription')}>
          <FaFileContract />
          <span>Inscrição</span>
        </NavigationButton>
      </Link>

      <Link to="/dashboard/payment">
        <NavigationButton active={isActive('/dashboard/payment')}>
          <FaMoneyBill />
          <span>Pagamento</span>
        </NavigationButton>
      </Link>

      <Link to="/dashboard/hotel">
        <NavigationButton active={isActive('/dashboard/hotel')}>
          <FaBed />
          <span>Hotel</span>
        </NavigationButton>
      </Link>

      <Link to="/dashboard/activities">
        <NavigationButton active={isActive('/dashboard/activitie')}>
          <FaCalendarWeek />
          <span>Atividades</span>
        </NavigationButton>
      </Link>

      <Link to="/dashboard/certificate">
        <NavigationButton active={isActive('/dashboard/certificat')}>
          <FaCertificate />
          <span>Certificado</span>
        </NavigationButton>
      </Link>
      <Link onClick={Logout} to="/sign-in">
        <NavigationButton active={isActive('/')}>
          <FaPowerOff />
          <span>Logout</span>
        </NavigationButton>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  box-shadow: 2px 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 100px;
  flex-shrink: 0;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  > a {
    text-decoration: none;
    @media (max-width: 400px) {
      height: 80px;
      flex-direction: row;
    }
    @media (max-width: 350px) {
      height: 80px;
      flex-direction: row;
    }
  }
  @media (max-width: 480px) {
    overflow-x: scroll;
    justify-content: flex-start;
  }
  @media (max-width: 600px) {
    width: 100%;
    height: 80px;
    flex-direction: row;
  }
`;
