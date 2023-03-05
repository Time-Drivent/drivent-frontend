import { getPersonalInformations } from '../services/enrollmentApi';
import useAsync from './useAsync';
import useToken from './useToken';

export default function useIsUserSubscribed() {
  const token = useToken();

  const {
    loading: getUserLoading,
    error: getUserError,
    act: getUser
  } = useAsync(() => getPersonalInformations(token), false);

  return {
    getUserLoading,
    getUserError,
    getUser
  };
}
