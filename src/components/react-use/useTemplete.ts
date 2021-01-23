import { useEffect, useState } from "react";
import { message } from "antd";
import services from "@/services";
import { useSelector } from "@/modal";
import { NORMAL_WIDTH, PAGE_MAX_WIDTH, ASSET_DOMAIN } from "@/constants";
import { unZipStyle } from "../templete/style-tranform";
import { INodeItem } from "../templete/templete.type";
import { NodeType, tranformProperty } from "../templete/constants";
import { previewLoadImage, getImageFile, isNumber } from '@/util/utils';
import { unitConver } from '../../util/utils';

type State = {
  list: INodeItem[];
  title?: string;
  articleId?: number;
  focusId?: string;
  picture?: string;
  loading: boolean;
}

const tranformOutSitePicture = async (list: INodeItem[])=> {
  await Promise.all(list.map(async(item)=> {
    const value = item.data.value;
    if (item.type === NodeType.BITMAP) {
      if (!value.startsWith(ASSET_DOMAIN)) {
        if (value.startsWith('data:image')) {
          item.data.value = await services.common.uploadByQiniu(await getImageFile(value))
        } else {
          item.data.value = await services.common.uploadByUrl(value)
        }
        
      }
      const backgroundImage = item.style.backgroundImage;
      if (backgroundImage && backgroundImage.startsWith('http') && !backgroundImage.startsWith(ASSET_DOMAIN)) {
        item.style.backgroundImage = await services.common.uploadByUrl(backgroundImage);
      }
    }
    item.children = await tranformOutSitePicture(item.children);
    return item;
  })).catch(e=>e)
  return list;
}

export function useTemplete(id?: string, isEditor: boolean = false) {
  const { initData, setData } = useSelector('article');

  useEffect(() => {
    const getArticle = async () => {
      try {
        if (id) {
          setData({ loading: true });
          const data = await services.article.getArticle(id);
          const content = unZipStyle(JSON.parse(data.content.content) as INodeItem[]);
          await tranformOutSitePicture(content)

          // 非编辑
          if (!isEditor) {
            tranformScale(content);
          }
          initData({
            list: content,
            articleId: data.article_id,
            picture: data.picture,
            title: data.title,
            tagId: data.tags[0].tag_id
          })
          setData({ loading: false, isEditor });
        } else {
          initData({
            list: []
          })
        }
      } catch (error) {
        message.error(error.message);
      }
    }

    getArticle()
  }, [id, initData, isEditor, setData])

}

const tranformScale = (nodeList: INodeItem[], scale: number = 1) => {
  nodeList.forEach(item => {

    for (const property in item.style) {
      const text = item.style[property];

      if (isNumber(item.style[property])) {
        if (property !== 'zIndex' ) {
          item.style[property] = parseFloat(text) * 0.01 + 'rem';
        }
      
      } else {
        item.style[property] = unitConver(text, {
          originUnit: 'px',
          replaceUnit: 'rem',
          precision: 2,
          times: 0.01
        });
  
      }

      if (property === 'transform' && text.indexOf('matrix') !== -1) {
        const scale = window.innerWidth > PAGE_MAX_WIDTH ? PAGE_MAX_WIDTH / NORMAL_WIDTH : window.innerWidth / NORMAL_WIDTH
        const matrix = text.replace(/(matrix\((.*)\))/, '$2').split(',')
        const tranX = parseFloat(matrix[4]) * scale;
        const tranY = parseFloat(matrix[5]) * scale;
        item.style.transform = `matrix(${matrix[0]}, ${matrix[1]}, ${matrix[2]}, ${matrix[3]}, ${tranX}, ${tranY})`;
      }
    }
    tranformScale(item.children, scale);
  });
};
