import { baseQuery } from '~/shared/api/base-query';

import type { IColdExposure } from '../model/types';

export const getColdExposures = async (
  userId: string,
): Promise<Array<IColdExposure>> => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  const response = await baseQuery({
    endpoint: `cold_exposures/user/${userId}`,
    options,
  });
  return response;
};
