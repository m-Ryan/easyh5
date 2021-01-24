import React, { useState, useCallback, useMemo, useEffect } from 'react';
import styles from './index.module.scss';
import {
  Input,
  Popover,
  Select,
  Icon,
  Button,
  message,
  Popconfirm,
  Switch,
  Collapse
} from 'antd';
import { INodeStyle, INodeItem } from '@/components/templete/templete.type';
import './animate.scss';
import { Uploader } from '@/util/uploader';
import services from '@/services';
import { useSelector } from '@/modal';
import { componentMap } from '@/components/templete/components';
import { componentActionMap, NodeType, IComponentActionMapKey } from '@/components/templete/constants';
import { setTextFormat, getTextFormat } from '@/modal/useArticle';
import { getLocationParamValue, isNumber } from '@/util/utils';
import { IDialog } from '@/components/templete/components/custom/dialog';
import _ from 'lodash';

const Panel = Collapse.Panel;
const Option = Select.Option;
const overflowList = ['visible', 'auto', 'hidden', 'scroll', 'inherit'];

const showTestPanel = getLocationParamValue('is_test');
export const ConfigMenu = function ({ target }: { target: INodeItem<any> }) {
  const { updateLink, updateStyle, addItem, updateValue, updateVariable,
    updateAction, updateItem, list, deleteItem, initData, title, updateTitle, dialogList, focusElement } = useSelector('article');
  const { style, type, data: { action, link, variable } } = target;

  const onChangeValue = useCallback(
      (value: string) => {
        updateValue(value);
      },
      [updateValue]
  );

  const onChangeLink = useCallback(
      (link: string) => {
        updateLink(link);
      },
      [updateLink]
  );

  const onChangeStyle = useCallback(
    <T extends keyof INodeStyle>(property: T, value: any) => {
      updateStyle(property, value)
    },
    [updateStyle]
  );

  const addText = useCallback(() => {
    addItem({ type: NodeType.TEXT })
  }, [addItem]);

  const addBitmap = useCallback(() => {
    const uploader = new Uploader(services.common.uploadByQiniu, {
      accept: 'image'
    });

    uploader.on('success', urls => {
      addItem({ type: NodeType.BITMAP, payload: urls[0] });
    });

    uploader.on('error', errMsg => {
      message.error(errMsg);
    });

    uploader.chooseFile();
  }, [addItem]);

  const addShape = useCallback(() => {
    addItem({ type: NodeType.BLOCK });
  }, [addItem]);

  const onChangeVariable = useCallback(
      ({ group, name }: { group?: IComponentActionMapKey; name?: any }) => {
        const variableArr = getTextFormat(variable);
        let text = setTextFormat(variableArr.group, name)
        if (group) {
          text = setTextFormat(group, '')
        }
        updateVariable(text);
      },
      [variable, updateVariable]
  );

  const onChangeAction = useCallback(
      ({ group, name }: { group?: IComponentActionMapKey; name?: any }) => {
        const actionArr = getTextFormat(action);
        let text = setTextFormat(actionArr.group, name)
        if (group) {
          text = setTextFormat(group, '')
        }
        updateAction(text);
      },
      [action, updateAction]
  );

  const renderSpecialProperty = useMemo(() => {

    const component = Object.values(componentMap).find(child => {
      return child.type === type;
    });
    if (component) {
      return React.createElement(component.Config as any, {
        target: {
          type: target.type,
          style: target.style,
          data: target.data,
          id: target.id,
          parent: target.parent
        },
        onChangeStyle,
        onChangeValue,
        onChangeLink
      });
    }
    return null;
  }, [type, target.type, target.style, target.data, target.id, target.parent, onChangeStyle, onChangeValue, onChangeLink]);

  const renderBasicProperty = useMemo(() => {
    return (
      <>
        <div className={styles.listItem}>
          <div className={styles.key}>外边距</div>
        </div>
        <div className={styles.listItem}>
          <div className={styles.key}>上下：</div>
          <Input
            className={styles.value}
            value={style.marginTop}
            onChange={e => onChangeStyle('marginTop', e.target.value!)}
          />
          <Input
            className={styles.value}
            value={style.marginBottom}
            onChange={e => onChangeStyle('marginBottom', e.target.value!)}
          />
        </div>
        <div className={styles.listItem}>
          <div className={styles.key}>左右：</div>
          <Input
            className={styles.value}
            value={style.marginLeft}
            onChange={e => onChangeStyle('marginLeft', e.target.value!)}
          />
          <Input
            className={styles.value}
            value={style.marginRight}
            onChange={e => onChangeStyle('marginRight', e.target.value!)}
          />
        </div>
        <div className={styles.listItem}>
          <div className={styles.key}>內边距</div>
        </div>
        <div className={styles.listItem}>
          <div className={styles.key}>上下：</div>
          <Input
            className={styles.value}
            value={style.paddingTop}
            onChange={e => onChangeStyle('paddingTop', e.target.value!)}
          />
          <Input
            className={styles.value}
            value={style.paddingBottom}
            onChange={e => onChangeStyle('paddingBottom', e.target.value!)}
          />
        </div>
        <div className={styles.listItem}>
          <div className={styles.key}>左右：</div>
          <Input
            className={styles.value}
            value={style.paddingLeft}
            onChange={e => onChangeStyle('paddingLeft', e.target.value!)}
          />
          <Input
            className={styles.value}
            value={style.paddingRight}
            onChange={e => onChangeStyle('paddingRight', e.target.value!)}
          />
        </div>
        <div className={styles.listItem}>
          <div className={styles.key}>层级：</div>
          <Input
            className={styles.value}
            value={style.zIndex}
            onChange={e => onChangeStyle('zIndex', e.target.value!)}
          />
        </div>

        <div className={styles.listItem}>
          <div className={styles.key}>溢出隐藏：</div>
          <Select
            value={style.overflow}
            style={{ width: 90 }}
            onChange={(value: React.CSSProperties['overflow']) => onChangeStyle('overflow', value)}
          >
            {overflowList.map((item, index) => {
              return (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
        </div>
      </>
    );
  }, [onChangeStyle, style.marginBottom, style.marginLeft, style.marginRight, style.marginTop, style.overflow, style.paddingBottom, style.paddingLeft, style.paddingRight, style.paddingTop, style.zIndex]);

  const renderAction = useMemo(
      () => {
        const { group, name } = getTextFormat(action);
        let actionList = componentActionMap[group] ? componentActionMap[group].actions : [];
        if (group === 'dialog') {
          actionList = dialogList.map(((item: IDialog) => {
            return {
              name: item.data.value.uid.toString(),
              comment: item.data.value.title
            }
          }))
        }

        return (
          <>
            <div className={styles.listItem}>
              <div className={styles.key}>绑定动作：</div>

              <Select
                value={group}
                style={{ width: 90 }}
                onChange={(value: IComponentActionMapKey) => onChangeAction({ group: value })}
              >
                {Object.values(componentActionMap).map((item, index) => {
                  return (
                    <Option key={item.name} value={item.name}>
                      {item.comment}
                    </Option>
                  );
                })}
              </Select>
              <span>&emsp;</span>
              <Select
                value={name}
                style={{ width: 90 }}
                onChange={(value: string) => onChangeAction({ name: value })}
              >
                {
                  actionList.map(
                      (item, index) => {
                        return (
                          <Option key={item.name} value={item.name}>
                            {item.comment}
                          </Option>
                        );
                      }
                  )}
              </Select>
            </div>
          </>
        )
      },
      [action, dialogList, onChangeAction]
  );

  const renderVariable = useMemo(
      () => {
        const { group, name } = getTextFormat(variable);
        const variableList = componentActionMap[group] ? componentActionMap[group].variable : [];
        return (
          <>
            <div className={styles.listItem}>
              <div className={styles.key}>绑定变量：</div>

              <Select
                value={group}
                style={{ width: 90 }}
                onChange={(value: IComponentActionMapKey) => onChangeVariable({ group: value })}
              >
                {Object.values(componentActionMap).map((item, index) => {
                  return (
                    <Option key={index} value={item.name}>
                      {item.comment}
                    </Option>
                  );
                })}
              </Select>
              <span>&emsp;</span>
              <Select
                value={name}
                style={{ width: 90 }}
                onChange={(value: string) => onChangeVariable({ name: value })}
              >
                {
                  variableList.map(
                      (item, index) => {
                        return (
                          <Option key={index} value={item.name}>
                            {item.comment}
                          </Option>
                        );
                      }
                  )}
              </Select>
            </div>
          </>
        )
      },
      [onChangeVariable, variable]
  );

  const renderPosition = useMemo(() => {
    return (
      <>
        <div className={styles.listItem}>
          <div className={styles.key}>定位方式：</div>
          <Select
            value={style.position}
            style={{ width: 90 }}
            onChange={(value: string) => onChangeStyle('position', value)}
          >
            <Option value={'absolute'}>
              absolute
            </Option>
            <Option value={'relative'}>
              relative
            </Option>
            <Option value={'fixed'}>
              fixed
            </Option>
            <Option value={'static'}>
              static
            </Option>
          </Select>
        </div>
        <div className={styles.listItem}>
          <div className={styles.key}>位置：</div>
          <Input
            className={styles.value}
            value={style.left}
            onChange={e => onChangeStyle('left', e.target.value!)}
          />
          <Input
            className={styles.value}
            value={style.top}
            onChange={e => onChangeStyle('top', e.target.value!)}
          />
        </div>

      </>
    );
  }, [onChangeStyle, style.left, style.position, style.top]);

  const renderSize = useMemo(() => {
    return (
      <>
        <div className={styles.listItem}>
          <div className={styles.key}>大小：</div>
          <Input
            className={styles.value}
            value={style.width}
            onChange={(e) => onChangeStyle('width', e.target.value)}
          />
          <Input
            className={styles.value}
            value={style.height}
            onChange={(e) => onChangeStyle('height', e.target.value)}
          />


        </div>
      </>
    );
  }, [onChangeStyle, style.height, style.width]);

  const renderAnimation = useMemo(() => {
    return (
      <>
        <div className={styles.listItem}>
          <div className={styles.key}>链接：</div>

          <Popover
            content={
              <Input
                className={styles.value}
                value={link}
                onChange={e => onChangeLink(e.target.value)}
              />
            }
            title="链接"
            trigger="click"
          >
            <Icon className={styles.link} type="link" />
          </Popover>
          <div className={styles.key}>动画：</div>
          <Select
            value={style.animation ? style.animation.toString() : ''}
            style={{ width: 120 }}
            onChange={(value: string) => onChangeStyle('animation', value)}
          >
            <Option value="">无动画</Option>
            <Option value="app-animate-skip 1s both infinite">跳跃</Option>
            <Option value="app-animate-breathe 1s linear both infinite">
              呼吸
            </Option>
            <Option value="app-animate-flash 1s linear both infinite">
              闪动
            </Option>
            <Option value="app-animate-rotate 1s linear both infinite">
              旋转
            </Option>
          </Select>
        </div>
      </>
    );
  }, [link, style.animation, onChangeLink, onChangeStyle]);

  const renderInsert = useMemo(
      () => (
        <>
          <h3 className={styles.title}>插入元素</h3>
          <div className={styles.list}>
            <Button className={styles.insertItem} onClick={addText}>
              <Icon type="font-size" /> 文本
            </Button>
            <Button className={styles.insertItem} onClick={addBitmap}>
              <Icon type="picture" /> 图片
            </Button>
            <Button className={styles.insertItem} onClick={addShape}>
              <Icon type="block" /> 形状
            </Button>
            <Popconfirm
              title="你确定要删除吗"
              onConfirm={deleteItem}
              okText="确定"
              cancelText="取消"
            >
              <Button className={styles.insertItem}>
                <Icon type="delete" /> 删除
              </Button>
            </Popconfirm>
          </div>
        </>
      ),
      [addBitmap, addShape, addText, deleteItem]
  );

  const renderTempleteProperty = useMemo(() => {
    return (
      <>
        <h3 className={styles.title}>模板属性</h3>

        <div className={styles.listItem}>
          <div className={styles.key}>标题：</div>
          <Input
            className={styles.value}
            value={title}
            onChange={e => updateTitle(e.target.value)}
          />
        </div>
      </>
    );
  }, [title, updateTitle]);

  const onchangeSource = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    try {
      updateItem(JSON.parse(value)[0]);
    } catch (error) {
      message.warning('请检查格式');
    }
  }

  const onchangeTop = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = Array.isArray(event.target.value) ? event.target.value[0] : event.target.value;
    try {
      initData({
        list: JSON.parse(value)[0]
      })
    } catch (error) {
      message.warning('请检查格式');
    }
  }

  const getNodeItemString = useCallback((node: INodeItem) => {
    const deleteCicle = (item: INodeItem) => {
      delete item.parent;
      item.children.forEach(child => deleteCicle(child));
    }
    const templete = _.cloneDeep(node);

    deleteCicle(templete);
    return JSON.stringify([templete])
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.property}>
        <div className={styles.list}>
          {
            renderTempleteProperty
          }

          <h3 className={styles.title}>基础属性</h3>
          {/* 专有属性 */}
          {renderAnimation}
          {renderPosition}
          {renderSize}
          {renderBasicProperty}
          {renderAction}
          {renderVariable}
          {renderInsert}
          {renderSpecialProperty}

          {showTestPanel && focusElement && (
            <Collapse destroyInactivePanel defaultActiveKey={['1']}>
              <Panel header="当前元素" key="1">
                <Input.TextArea onBlur={onchangeSource} rows={10}  defaultValue={getNodeItemString(target)} />
              </Panel>
              <Panel header="顶层元素" key="2">
                <Input.TextArea onBlur={onchangeTop} rows={10} defaultValue={getNodeItemString(list[0])} />
              </Panel>
            </Collapse>
          )}
        </div>
      </div>
    </div>
  );
};
