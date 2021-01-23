import { useEffect } from "react";
import { PAGE_MAX_WIDTH, NORMAL_WIDTH } from '@/constants';

const className = 'mobile-view-size';
const setFontSize = () => {
    
  document.body.classList.add(className);

  const standard = 100 * 100 / NORMAL_WIDTH;
  
  if (window.innerWidth > PAGE_MAX_WIDTH) {
    document.documentElement.style.fontSize = standard * PAGE_MAX_WIDTH / window.innerWidth + 'vw';
  } else {
    document.documentElement.style.fontSize = standard + 'vw';
  }
}

export function useSetDocumentSize() {

  useEffect(()=> {

    setFontSize();

    return ()=> {
      document.body.classList.remove(className);
      document.documentElement.style.fontSize = 'normal'
    }
  }, [])

}