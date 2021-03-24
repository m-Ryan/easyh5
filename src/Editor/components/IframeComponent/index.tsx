import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const pageWidth = 375;

interface Props
  extends React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > {
  children: React.ReactNode;
  title?: string;
}
export const IframeComponent = ({ children, title, ...props }: Props) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const mountNode = contentRef?.contentWindow?.document?.body;
  const documentEle = contentRef?.contentWindow?.document.documentElement;

  useEffect(() => {
    if (!documentEle) return;
    const standard = (100 * 100) / pageWidth;

    documentEle.style.fontSize = standard + 'vw';
  }, [documentEle]);

  return (
    <iframe title={title} {...props} ref={setContentRef}>
      {mountNode &&
        createPortal(
          <>
            <div
              dangerouslySetInnerHTML={{ __html: document.head.innerHTML }}
            />
            {children}
          </>,
          mountNode
        )}
    </iframe>
  );
};
