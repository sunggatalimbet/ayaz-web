import { baseQuery } from '~/shared/api/base-query';

import type { IColdExposure } from '../model/types';

export const getColdExposures = async (): Promise<Array<IColdExposure>> => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  const response = await baseQuery({
    endpoint: 'cold_exposures/user/fcf6968e-8e77-4afb-821f-839e057a458d',
    options,
  });
  return response;
};
