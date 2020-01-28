import { useEffect } from "react";

export function useWindowResize(fn: Function) {

  useEffect(() => {

    const onResize = () => {
      fn();
    }

    document.addEventListener('resize', onResize)

    return () => {
      document.removeEventListener('resize', onResize)
    }
  }, [fn])

}