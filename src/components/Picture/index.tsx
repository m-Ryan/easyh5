import React, { useEffect, useState } from 'react';

interface IPictureProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLImageElement>, HTMLElement> {
  src: string;
  className?: string;
}
const fallbackPicture = 'http://assets.maocanhua.cn/FrtDhP0Bly3etOe0i6S_4QW8kTlU';

export function Picture(props: IPictureProps) {
  const [url, setUrl] = useState(props.src);

  useEffect(() => {
    setUrl(props.src);
  }, [props.src]);

  return (
    <picture
      {...{ ...props }}
      {...{
        src: undefined,
        style: {
          display: 'inline-block',
          ...props.style
        }
      }}
      onError={() => url !== fallbackPicture && setUrl(fallbackPicture)}
    >
      <source type="image/webp" srcSet={url + '?imageView2/3/q/70/w/750/format/webp'} />
      <img crossOrigin="" style={{ width: '100%', height: '100%' }} src={url} alt="" />
    </picture>
  );
}