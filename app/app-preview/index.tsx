// import React from 'react';
// import styles from './index.module.scss';
// import {observer, inject} from 'mobx-react';
// import { modal } from '@/store';
// import { IElementItem } from '@/store/app';
// import { ElementType } from '@/typings/ISketckItem';

// const onFocus = <T extends HTMLElement>(event: React.MouseEvent<T, MouseEvent>, item: IElementItem) => {
//   event.stopPropagation();
//   modal.app.setTarget(item.id, event);
// }
// export const AppPreview = inject('app')(observer((props: any)=> {
//   const elements = props.app.elements.slice();
//   const renderItem = (parents: IElementItem[]) => {
//     return parents.map((item, index) => {

//       switch (item.type) {
//         case ElementType.BITMAP:
//           return <img onMouseDown={(event)=>onFocus(event, item)} key={index} src={item.value} style={{...item.style}} alt="" />;
//         case ElementType.TEXT:
//           return <span onMouseDown={(event)=>onFocus(event, item)} key={index} style={{...item.style}}>{item.value}</span>;
//         default:
//           return (
//             <div onMouseDown={(event)=>onFocus(event, item)} key={index} style={{...item.style}}>
//               {
//                 item.children.length > 0
//                   ? (
//                     renderItem(item.children)
//                   )
//                   : null
//               }
//               {
//                 item.value ? item.value : null
//               }
//             </div>
//           )
//       }
//     })
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.appWrap}>
//         <div className={styles.app}>
//           {
//             renderItem(elements)
//           }
//         </div>
//       </div>
//     </div>
//   );
// }))
