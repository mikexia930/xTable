export function generateTableData(listLength, columnLength, idPrefix = '', configure) {
  const arr = [];
  for (let i = 1; i <= listLength; i += 1) {
    const obj = {
      id: idPrefix ? `${idPrefix}${i}` : i,
    };
    for (let j = 1; j <= columnLength; j += 1) {
      if (configure && configure.isTestSpan) {
        if (j === 3) {
          if (i === 1) {
            obj[`c${j}`] = {
              colSpan: 1,
              rowSpan: 1,
              value: `${i} * ${j} = ${i * j}`,
            };
          } else if (i === 2) {
            obj[`c${j}`] = {
              colSpan: 1,
              rowSpan: 25,
              value: `${i} * ${j} = ${i * j}`,
            };
          } else if (i < 26) {
            obj[`c${j}`] = {
              colSpan: 1,
              rowSpan: 0,
              value: `${i} * ${j} = ${i * j}`,
            };
          } else {
            obj[`c${j}`] = {
              colSpan: 1,
              rowSpan: 1,
              value: `${i} * ${j} = ${i * j}`,
            };
          }
        } else {
          obj[`c${j}`] = {
            colSpan: 1,
            rowSpan: 1,
            value: `${i} * ${j} = ${i * j}`,
          };
        }
      } else if (configure && configure.isTestPivot) {
        if (j === 1) {
          if (i < 50) {
            obj[`c${j}`] = '1';
          } else {
            obj[`c${j}`] = `${i} * ${j} = ${i * j}`;
          }
        } else if (j === 2) {
          if (i < 5) {
            obj[`c${j}`] = '2';
          } else if (i < 20) {
            obj[`c${j}`] = '3';
          } else {
            obj[`c${j}`] = `${i} * ${j} = ${i * j}`;
          }
        } else {
          obj[`c${j}`] = `${i} * ${j} = ${i * j}`;
        }
      } else {
        if (j === 1) {
          if (i === 1) {
            obj[`c${j}`] = {
              colSpan: 1,
              rowSpan: 1,
              value: `${i} * ${j} = ${i * j}`,
            };
          } else {
            obj[`c${j}`] = {
              colSpan: 1,
              rowSpan: 1,
              value: `${i} * ${j} = ${i * j}`,
            };
          }
        } else {
          obj[`c${j}`] = {
            colSpan: 1,
            rowSpan: 1,
            value: `${i} * ${j} = ${i * j}`,
          };
        }
      }
    }
    arr.push(obj);
  }
  return arr;
}

export function generateTableExpandData(listLength, columnLength) {
  // expand_rowKey 作为打开标识
  const expandObj = {};
  const spanItemNumber = 3;
  for (let i = 5; i <= listLength; i += 1) {
    const expandItem = { // 必须以 'ex-' 开头
      isOpen: false, // 初始打开或关闭
      type: '', // span 合并单元格只支持slot / data 合并到当前数据里
      data: [], // data 时为数组 [] 格式如 tableData，span 时为 { rowKey: ''， data: {} } ，如 table 单列数据
    };
    let itemLength = 1;
    if (i < spanItemNumber) {
      expandItem.type = 'span';
      itemLength = 1;
    } else {
      expandItem.type = 'data';
      itemLength = Math.ceil(Math.random() * 5);
    }
    if (i === 6) {
      expandItem.isOpen = true;
    }
    expandItem.data = generateTableData(itemLength, columnLength, `ex-${i}-`);
    if (i < spanItemNumber) {
      let index = 0;
      Object.keys(expandItem.data[0]).forEach((key) => {
        if (key !== 'id') {
          if (index === 0) {
            expandItem.data[0].span = 'span';
          }
          index += 1;
        }
      });
    }
    expandObj[i] = expandItem;
  }
  return expandObj;
}

export function generateTableHeaderData(listLength, columnLength) {
  const arr = [];
  for (let i = 1; i <= listLength; i += 1) {
    const obj = {
      id: `h-${i}`,
    };
    for (let j = 1; j <= columnLength; j += 1) {
      if (j === 1) {
        if (i === 2) {
          obj[`c${j}`] = {
            colSpan: 2,
            rowSpan: 0,
            value: `h-${i}-${j}`,
          };
        } else {
          obj[`c${j}`] = {
            colSpan: 2,
            rowSpan: 2,
            value: `h-${i}-${j}`,
          };
        }
      } else if (j < 3) {
        obj[`c${j}`] = {
          colSpan: 0,
          rowSpan: 1,
        };
      } else {
        obj[`c${j}`] = {
          colSpan: 1,
          rowSpan: 1,
          value: `h-${i}-${j}`,
        };
      }
    }
    arr.push(obj);
  }
  return arr;
}

export function generateTableFooterData(listLength, columnLength) {
  const arr = [];
  for (let i = 1; i <= listLength; i += 1) {
    const obj = {
      id: `f-${i}`,
    };
    for (let j = 1; j <= columnLength; j += 1) {
      if (j === 1) {
        if (i === 2) {
          obj[`c${j}`] = {
            colSpan: 2,
            rowSpan: 0,
            value: `f-${i}-${j}`,
          };
        } else {
          obj[`c${j}`] = {
            colSpan: 2,
            rowSpan: 2,
            value: `f-${i}-${j}`,
          };
        }
      } else if (j < 3) {
        obj[`c${j}`] = {
          colSpan: 0,
          rowSpan: 1,
        };
      } else {
        obj[`c${j}`] = {
          colSpan: 1,
          rowSpan: 1,
          value: `f-${i}-${j}`,
        };
      }
    }
    arr.push(obj);
  }
  return arr;
}

export function generateTableTitle(columnLength, isOperator = false) {
  const arr = [];
  const obj = {};
  for (let j = 1; j <= columnLength; j += 1) {
    obj[`c${j}`] = {
      colSpan: 1,
      rowSpan: 1,
      value: `T${j}`,
    };
  }
  if (isOperator) {
    obj.operator = {
      colSpan: 1,
      rowSpan: 1,
      value: 'operator',
    };
  }
  arr.push(obj);
  return arr;
}

export function generateColumnData(labelLength, isOperator = false, configure) {
  const arr = [];
  for (let i = 1; i <= labelLength; i += 1) {
    const obj = {
      dataIndex: `c${i}`,
      dragGroup: '', // 只在第一行绑定
      align: {
        title: '',
        header: '',
        content: '',
        footer: '',
      }, // text-align
    };
    if (configure && configure.isResize) {
      obj.resizeable = true; // 只在第一行绑定
    }
    if (i < 3) {
      if (configure) {
        if (configure.isStickyLeft) {
          obj.sticky = 'left';
        }
        if (configure.isSearch) {
          obj.search = true; // 是否支持查询
        }
        if (configure.isDrag) {
          obj.dragGroup = 'a1';
        }
        if (configure.isRank) {
          obj.sort = 'init'; // 是否支持排序 init / up / down
        }
        if (configure.isFilter) {
          obj.filter = true; // 是否支持筛选，取所有行的值，并筛选
        }
      }
      obj.width = '220px';
    } else if (i >= labelLength) {
      if (configure) {
        if (configure.isStickyRight) {
          obj.sticky = 'right';
        }
      }
      obj.width = '220px';
      obj.dragGroup = '';
    } else {
      if (configure && configure.isDrag) {
        obj.dragGroup = 'b1';
      }
      if (configure && configure.contentAlign) {
        obj.align.content = configure.contentAlign; // right
      }
    }
    arr.push(obj);
  }
  if (isOperator) {
    arr.push({
      dataIndex: 'operator',
      sticky: 'right',
      width: '100px',
      dragGroup: '',
      resizeable: false,
      align: {
        title: '',
        header: '',
        content: '',
        footer: '',
      },
    });
  }
  return arr;
}
