import { throttle } from 'lodash';
import { useEffect, useCallback, SetStateAction, Dispatch } from 'react';
import { IStudent } from '../types';

export default function useInfiniteScroll(
  items: IStudent[],
  totalItems: number | undefined,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  threshold = 128,
  throttleTime = 400
) {
  const onScroll = useCallback(() => {
    const doc: HTMLElement = document.documentElement;
    if (doc.scrollHeight - (doc.scrollTop + window.innerHeight) < threshold && totalItems && items.length < totalItems)
      setIsLoading(true);
  }, [items, totalItems]);

  useEffect(() => {
    const onScrollThrottled = throttle(onScroll, throttleTime);
    window.addEventListener('scroll', onScrollThrottled);
    return () => {
      onScrollThrottled.cancel();
      window.removeEventListener("scroll", onScrollThrottled);
    }
  }, [onScroll]);
};