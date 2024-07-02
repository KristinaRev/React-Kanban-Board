/**
 * Хук для переключения видимости элемента с задержкой
 */

import { useEffect, useState } from 'react';

export function useDelayUnmount(isMounted: boolean, delayTime: number): boolean {
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeoutId = window.setTimeout(() => setShowDiv(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, showDiv]);

  return showDiv;
}
