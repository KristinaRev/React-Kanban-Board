/**
 * Хук для переключения видимости элемента с задержкой
 */

import { useEffect, useState } from 'react';

export function useDelayUnmount(isMounted: boolean, delayTime: number): boolean {
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeoutId = setTimeout(() => setShowDiv(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, showDiv]);

  return showDiv;
}
