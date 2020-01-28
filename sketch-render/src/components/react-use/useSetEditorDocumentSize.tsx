import { useEffect } from "react";
import { PAGE_MAX_WIDTH, NORMAL_WIDTH } from '@/constants';

const className = 'mobile-editor-view-size';
const setFontSize = () => {
    
  document.body.classList.add(className);

  const standard = 100 * 100 / NORMAL_WIDTH;
  
  if (window.innerWidth > NORMAL_WIDTH) {
    document.documentElement.style.fontSize = standard * NORMAL_WIDTH / window.innerWidth + 'vw';
  } else {
    document.documentElement.style.fontSize = standard + 'vw';
  }
}

export function useSetEditorDocumentSize() {

  useEffect(()=> {

    setFontSize();

    return ()=> {
      document.body.classList.remove(className);
      document.documentElement.style.fontSize = 'normal'
    }
  }, [])

}