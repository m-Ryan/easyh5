var nodeStylePropertys = [
  'zIndex',
  'position',
  'left',
  'top',
  'width',
  'height',
  'opacity',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'background',
  'fontSize',
  'borderColor',
  'borderStyle',
  'borderWidth',
  'color',
  'underline',
  'lineHeight',
  'overflow',
  'textAlign',
  'textDecoration',
  'fontWeight',
  'fontStyle',
  'animation: ',
  'display',
  'alignItems',
  'justifyContent',
  'transform',
  'borderRadius',
  'boxShadow',
  'letterSpacing',
  'flexWrap',
  'WebkitLineClamp',
  'WebkitBoxOrient'
]

var id = 1;
function tranformDIYComponent(element) {

  if (element.nodeType === 3) {
    return;
  }

  if (!(element instanceof HTMLElement)) {
    return;
  }

  if (element.tagName.toLocaleLowerCase().indexOf('style')!== -1 || element.tagName.toLocaleLowerCase().indexOf('javascript')!== -1) {
    return;
  }

  const computedStyle = window.getComputedStyle(element);

  const tranform = (elementt) => {

    const createItem = (type = 'block') => {
      let value = '';
      const object = {
        type,
        id: id++,
        data: {
          value: ''
        },
        style: {
       
        },
        children: []
      }

      return object;
    }

    const box = createItem();

    box.children = Array.from(element.childNodes).map(item => tranformDIYComponent(item)).filter(item => !!item);

    if (element.tagName.toLocaleLowerCase().indexOf('span') !== -1) {
      box.type = 'text';
      box.data.value = element.textContent || '';
    }

    if (element.tagName.toLocaleLowerCase() === 'img') {
      box.type = 'bitmap';
      box.data.value = element['src'];
    }

    if (box.children.length >= 1) {
      box.type = 'block';
    }

    nodeStylePropertys.forEach(property => {
      if (!computedStyle[property]) {
        return;
      }

      if ((['padding', 'margin', 'borderRadius', 'letterSpacing'].some(item => property.indexOf(item) !== -1)) && computedStyle[property] === '0px') {
        return;
      }

      if ((['transform', 'textDecoration', 'borderStyle', 'boxShadow', 'WebkitLineClamp'].some(item => property.indexOf(item) !== -1)) && computedStyle[property].indexOf('none') !== -1) {
        return;
      }

      if ((['alignItems', 'justifyContent', 'fontStyle'].some(item => property.indexOf(item) !== -1)) && computedStyle[property] === 'normal') {
        return;
      }

      if (property === 'overflow' && computedStyle[property].indexOf('visible') !== -1) {
        return;
      }

      if (property === 'WebkitBoxOrient' && computedStyle[property].indexOf('horizontal') !== -1) {
        return;
      }

      if (property === 'flexWrap' && computedStyle[property].indexOf('nowrap') !== -1) {
        return;
      }

      if (property === 'fontWeight' && computedStyle[property].indexOf('400') !== -1) {
        return;
      }

      if (property === 'textAlign' && computedStyle[property].indexOf('start') !== -1) {
        return;
      }

      if (property === 'letterSpacing' && computedStyle[property].indexOf('normal') !== -1) {
        return;
      }

      if (property === 'flexWrap' && computedStyle[property].indexOf('horizontal') !== -1) {
        return;
      }

      if ((['borderWidth', 'borderColor'].some(item => property.indexOf(item) !== -1)) && computedStyle.borderWidth === '0px') {
        return;
      }

      if ((['color'].some(item => property.indexOf(item) !== -1)) && computedStyle[property] === 'rgba(0, 0, 0, 0)') {
        return;
      }

      if (property === 'display' && (computedStyle[property] === 'block' && box.type === 'box' || (computedStyle[property] === 'inline' && box.type !== 'box'))) {
        return
      }

      box.style[property] = computedStyle[property];
    });
    return box;
  }

  return tranform(element)
}

// 处理纯文本
var textTranform = (ele) => {
  const parentNode = ele.parentNode;

  if (!(parentNode instanceof HTMLElement)) {
    return;
  }

  if (parentNode.tagName.toLocaleLowerCase().indexOf('style')!== -1 || parentNode.tagName.toLocaleLowerCase().indexOf('javascript')!== -1) {
    return;
  }


  if (ele.nodeType === 3 && ele.textContent.trim() && (parentNode['tagName'].toLocaleLowerCase() !== 'span' || parentNode.childNodes.length > 1)) {
    const text = document.createElement('span-text');
    text.textContent = ele.textContent;
    parentNode.replaceChild(text, ele);
  } else {
    Array.from(ele.childNodes).forEach(item => textTranform(item));
  }
}
function isNumber(num) {
  return num === +num;
}
const tranformScale = (nodeList) => {
  const scale = 375 / document.body.clientWidth;

  function conver(declaration, scale) {
    if (isNumber(declaration)) {
      return declaration * scale;
    }
    const pattern = new RegExp(`\\b(\\d+(\\.\\d+)?)(px)\\b`, 'mig');
    const fixProperty =  declaration.replace(pattern, function(group1, group2, group3, group4) {
      const newText = parseFloat((Number(group2) * scale).toFixed(2)) + 'px';
      return newText;
    });
    return isNumber(fixProperty) ? parseFloat(fixProperty) : fixProperty;
  }

  nodeList.forEach(item => {
    for (let property in item.style) {
      // 首先转换大小

      item.style[property] = conver(item.style[property], scale);
    }
    tranformScale(item.children);
  });
};
var container = document.querySelector('.app-wrap');

textTranform(container);
const node = tranformDIYComponent(container)
tranformScale([node])
JSON.stringify(node)