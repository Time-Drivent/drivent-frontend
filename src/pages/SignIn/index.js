import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  FaGithub,
} from 'react-icons/fa';
import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import useSignUp from '../../hooks/api/useSignUp';
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);
  const { loadingSignIn, signIn } = useSignIn();
  const { loadingSignUp, signUp } = useSignUp();
  const provider = new GithubAuthProvider();
  const navigate = useNavigate();

  async function submitGithub(event) {
    const auth = getAuth();
    event.preventDefault();
    try {
      signInWithPopup(auth, provider)    
        .then(async(result) => {
          signUp(result.user.email, result.user.uid)
            .then ( async(res) => {
              const userData = await signIn(result.user.email, result.user.uid);
              setUserData(userData);
              navigate('/dashboard');
              toast('Login realizado com sucesso!');
            })
            .catch(async(error) => {
              const userData = await signIn(result.user.email, result.user.uid);
              setUserData(userData);
              navigate('/dashboard');
              toast('Login realizado com sucesso!');
            });
        }
        ).catch((error) => {
          toast('Não foi possível fazer o login!', error);
        });
    } catch (err) {
      toast('Não foi possível fazer login!', err);
    }
  }  
  
  async function submit(event) {
    event.preventDefault();
    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      navigate('/dashboard');
      toast('Login realizado com sucesso!');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }  

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
        </form>
        <Button onClick={submitGithub} color="primary" fullWidth disabled={loadingSignUp}><FaGithub></FaGithub>Github</Button>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
