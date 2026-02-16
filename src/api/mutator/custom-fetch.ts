export const customFetch = async <T>(url: string, options: RequestInit): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const requestUrl = new URL(url, baseUrl).toString();

  const response = await fetch(requestUrl, {
    ...options,
    credentials: 'include',
  });

  const body = [204, 205, 304].includes(response.status) ? null : await response.text();

  if (!response.ok) {
    const err: globalThis.Error & { info?: any; status?: number } = new globalThis.Error();
    const data = body ? JSON.parse(body) : {};
    err.info = data;
    err.status = response.status;
    throw err;
  }

  const data = body ? JSON.parse(body) : {};
  return { data, status: response.status, headers: response.headers } as T;
};
