import useAsync from '../useAsync';
import useToken from '../useToken';

import * as dayApi from '../../services/dayApi';

export default function useDay() {
  const token = useToken();
  const { loading: getDayLoading, error: getDayError, act: getDay } = useAsync(() => dayApi.getDays(token), false);

  return {
    getDayLoading,
    getDayError,
    getDay,
  };
}
