import { baseQuery } from '~/shared/api/base-query';

import type { PostColdExposureRequest } from '../model/contracts';
import type { IColdExposure } from '../model/types';

export const postColdExposure = async (
  newColdExposure: PostColdExposureRequest,
): Promise<Array<IColdExposure>> => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(newColdExposure),
  };

  const response = await baseQuery({
    endpoint: `cold_exposures`,
    options,
  });
  return response;
};
