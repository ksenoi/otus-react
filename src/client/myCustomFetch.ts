import { URL } from './config';
import React, { useState, useEffect, useCallback, useRef} from 'react';
import { TOKEN_KEY, storage } from './storahe';
import { useSelector } from 'react-redux';

export const useLazyCustomFetch = <T extends unknown>(): [(input: string, init?: RequestInit) 
  => () => void, {data: T, loading: boolean, error: unknown}] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const controller = useRef<AbortController>();

  const query = useCallback((input: string, init?: RequestInit) => {
    controller.current = new AbortController();
    setLoading(true);

    myCustomFetch<T>(input, {signal: controller.current.signal, ...init})
      .then(x => !controller.current.signal.aborted && setData(x))
      .finally(() => !controller.current.signal.aborted && setLoading(false))
      .catch(e => !controller.current.signal.aborted && setError(e))
    return () => {
      controller.current.abort();
    }}, []);

    useEffect(() => {

      return () => {
        controller.current.abort();
      }
    }, []);

    return [query, {data, loading, error}];
}

export const useCustomFetch = <T extends unknown>(input: string, init?: RequestInit) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    myCustomFetch<T>(input, {signal: controller.signal, ...init})
      .then(x => !controller.signal.aborted && setData(x))
      .finally(() => !controller.signal.aborted && setLoading(false))
      .catch(e => !controller.signal.aborted && setError(e))
    return () => {
      controller.abort();
    }
  }, []);
  
  return {data, loading, error};
}

export const myCustomFetch = <T = Response>(input: string, init?: RequestInit): Promise<T> =>{

  const token = storage.get(TOKEN_KEY);
  const headers = init?init.headers:{};
  return fetch(`${URL}${input}`, {...init,headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
  }}).then(async (res) => {
    if (res.status === 200) return res.json();
    return Promise.reject(await res.json());
  });}


export const myCustomXHR = <T = Response>(
  body: FormData,
  {
    onProgress,
  }: {
    onProgress: (loaded: number, total?: number) => void;
  }
): Promise<T> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = function (event) {
      onProgress(event.loaded, event.total);
    };
    xhr.onload = function () {
      if (xhr.status !== 200) {
        reject(xhr);
      } else {
        resolve(JSON.parse(xhr.response));
      }
    };

    xhr.onerror = () => {
      Object.assign(xhr, { message: 'unknown error' });
      reject(xhr);
    };

    xhr.open('POST', `${URL}/upload`);

    xhr.send(body);
  });
