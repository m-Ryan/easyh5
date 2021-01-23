import React from 'react';

interface IPictureProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLImageElement>, HTMLElement> {
	src: string;
	className?: string;
}
export function Picture(props: IPictureProps) {
  return (
    <picture
      {...{ ...props }}
      {...{
        src: undefined,
        style: {
          display: 'block',
          ...props.style
        }
      }}
    >
      <source type="image/webp" srcSet={props.src + '?imageView2/3/q/70/w/750/format/webp'} />
      <img style={{ width: '100%', height: '100%' }} src={props.src} alt="" />
    </picture>
  );
}
