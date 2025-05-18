interface BaseQueryProps {
  endpoint: string;
  options: RequestInit;
}

export const baseQuery = async ({ endpoint, options }: BaseQueryProps) => {
  const API_URL = import.meta.env.VITE_AYAZ_API_URL;
  const FETCH_URL = API_URL + endpoint;

  const response = await fetch(FETCH_URL, options);

  if (!response.ok) {
    throw new Error('API ERROR');
  }

  return await response.json();
};
