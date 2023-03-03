import { getPersonalInformations } from '../services/enrollmentApi';
import useToken from './useToken';

export default async function useIsUserSubscribed() {
  const token = useToken();

  try {
    const response = await getPersonalInformations(token);
    return response;
  } catch (error) {
    return undefined;
  }
}
