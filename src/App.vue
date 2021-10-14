<template>
  <div id="app">
    <div style="height: 200px"></div>
    <x-table
      :is-use-storage="false"
      :is-use-single-table="isUseSingleTable"
      :is-fix-header="isFixHeader"
      :is-sticky="isSticky"
      :columns=tableColumns
      :config="tableConfig"
      :data="tableData"
      :title="tableHeaderTitle"
      :header-data="tableHeaderData"
      :footer-data="tableFooterData"
      :expand-data="tableExpandData"
      :page-data="pageData"
      :sort-data="sortData"
      :search-data="searchData"
      :filter-data="filterData"
      :pivot-table="['c1', 'c2']"
      :custom-cell="customCell"
      :expand-join-filter-search-columns="['c2']"
      expend-filter-search-result-show-type="fit"
      @handleTable="handleTable"
    >
      <template v-slot:th-drag>
        <a-icon type="more" />
      </template>
      <template #td-c1="{ record, text, expand }">
        <div class="column-sticky">{{ text }} {{ expand }}</div>
      </template>
      <template #td-operator="{ record }">
        <div style="cursor: pointer" @click="handleExpand(record)">
          <span v-if="tableExpandData[record.id]">
            {{tableExpandData[record.id].isOpen ? 'CLOSE' : 'OPEN' }}-{{ record.id }}
          </span>
        </div>
      </template>
      <template #th-sort-c1="{ record, dataIndex }">
        <span class="sort_icon"  @click="handleSort(dataIndex, record.sort)">
          <a-icon :class="{'sort-up': record.sort === 'up'}" type="caret-up" />
          <a-icon :class="{'sort-down': record.sort === 'down'}" type="caret-down" />
        </span>
      </template>
      <template #th-sort-c2="{ record, dataIndex }">
        <span class="sort_icon"  @click="handleSort(dataIndex, record.sort)">
          <a-icon :class="{'sort-up': record.sort === 'up'}" type="caret-up" />
          <a-icon :class="{'sort-down': record.sort === 'down'}" type="caret-down" />
        </span>
      </template>
      <template #th-search-c1="{ record, dataIndex }">
        <a-popover v-model="searchKeywords[dataIndex].isShow" trigger="click">
          <a slot="content">
            <a-input v-model="searchKeywords[dataIndex].value" />
            <div class="search-drop-footer">
              <a-button type="primary" @click="handleSearch(dataIndex)">查询</a-button>
            </div>
          </a>
          <a-icon type="search" />
        </a-popover>
      </template>
      <template #th-filter-c1="{ record, dataIndex }">
        <a-popover v-model="filterSelected[dataIndex].isShow" trigger="click">
          <a slot="content">
            {{ filterSelected[dataIndex].value }}
            <div class="search-drop-footer">
              <a-button type="primary" @click="handleFilter(dataIndex)">筛选</a-button>
            </div>
          </a>
          <a-icon type="filter" />
        </a-popover>
      </template>
      <template #th-search-c2="{ record, dataIndex }">
        <a-popover v-model="searchKeywords[dataIndex].isShow" trigger="click">
          <a slot="content">
            <a-input v-model="searchKeywords[dataIndex].value" />
            <div class="search-drop-footer">
              <a-button type="primary" @click="handleSearch(dataIndex)">查询</a-button>
            </div>
          </a>
          <a-icon type="search" />
        </a-popover>
      </template>
      <template v-slot:page>
        <div class="page-area">
          <a-pagination
            show-size-changer
            :default-current="pageData.page"
            :page-size.sync="pageData.size"
            :total="dataAmount"
            @change="handlePageChange"
            @showSizeChange="handlePageSizeChange"
          />
        </div>
      </template>
    </x-table>
    <div style="height: 1200px"></div>
  </div>
</template>

<script>
function generateTableData(listLength, columnLength, idPrefix = '') {
  const arr = [];
  for (let i = 1; i <= listLength; i += 1) {
    const obj = {
      id: idPrefix ? `${idPrefix}${i}` : i,
    };
    for (let j = 1; j <= columnLength; j += 1) {
      /*
      if (j === 1) {
        if (i === 1) {
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
      */
      if (j === 1) {
        if (i < 10) {
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
    }
    arr.push(obj);
  }
  return arr;
}

function generateTableExpandData(listLength, columnLength) {
  // expand_rowKey 作为打开标识
  const expandObj = {};
  const spanItemNumber = 3;
  for (let i = 10; i <= listLength; i += 1) {
    const expandItem = { // 必须以 'ex-' 开头
      isOpen: false,
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
    expandItem.data = generateTableData(itemLength, columnLength, `ex-${i}-`);
    if (i < spanItemNumber) {
      let index = 0;
      Object.keys(expandItem.data[0]).forEach((key) => {
        if (key !== 'id') {
          if (index === 0) {
            expandItem.data[0][key] = {
              ...expandItem.data[0][key],
              colSpan: columnLength,
            };
          } else {
            expandItem.data[0][key] = {
              ...expandItem.data[0][key],
              colSpan: 0,
            };
          }
          index += 1;
        }
      });
    }
    expandObj[i] = expandItem;
  }
  return expandObj;
}

function generateTableFooterData(listLength, columnLength) {
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

function generateTableTitle(columnLength) {
  const arr = [];
  const obj = {};
  for (let j = 1; j <= columnLength; j += 1) {
    obj[`c${j}`] = {
      colSpan: 1,
      rowSpan: 1,
      value: `T${j}`,
    };
  }
  obj.operator = {
    colSpan: 1,
    rowSpan: 1,
    value: 'operator',
  };
  arr.push(obj);
  return arr;
}

function generateColumnData(labelLength) {
  const arr = [];
  for (let i = 1; i <= labelLength; i += 1) {
    const obj = {
      dataIndex: `c${i}`,
      dragGroup: '', // 只在第一行绑定
      resizeable: true, // 只在第一行绑定
      align: {
        title: '',
        header: '',
        content: '',
        footer: '',
      }, // text-align
    };
    if (i < 3) {
      obj.sticky = 'left';
      obj.width = '220px';
      obj.dragGroup = 'a1';
      obj.search = true; // 是否支持查询
      obj.sort = 'init'; // 是否支持排序 init / up / down
      obj.filter = true; // 是否支持筛选，取所有行的值，并筛选
    } else if (i >= labelLength) {
      obj.sticky = 'right';
      obj.width = '220px';
      obj.dragGroup = '';
    } else {
      obj.dragGroup = 'b1';
      obj.align.content = 'right';
    }
    arr.push(obj);
  }
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
  return arr;
}

export default {
  name: 'App',
  created() {
    this.tableColumns = generateColumnData(30);
    this.tableData = generateTableData(100, 30);
    this.tableHeaderTitle = generateTableTitle(30);
    this.tableFooterData = generateTableFooterData(2, 30);
    this.tableExpandData = generateTableExpandData(100, 30);
    console.log(this.tableData, this.tableColumns, this.tableHeaderTitle, this.tableExpandData);
  },
  data() {
    return {
      isSticky: true, // 是否固定列
      isFixHeader: true, // 是否 fix 在浏览器顶部
      isUseSingleTable: false, // 单表格不支持fix顶部操作
      tableColumns: [], // 表格的列
      tableHeaderData: [], // 插在thead里的数据，默认只显示 headTitle
      tableFooterData: [], // 插在footer里的数据
      tableHeaderTitle: [], // 表头
      tableExpandData: {}, // 表格扩展
      tableData: [],
      tableConfig: {
        key: 'table',
        scrollHeight: '100%',
        scrollWidth: '100%',
        miniWidth: '160px', // 没有设置表格宽度会默认使用最小width
        resizeMin: 160,
        resizeMax: 500,
        border: 1, // 0 无边框， 1 有边框， 2 四周无边框
        rowKey: 'id',
        noWrap: true,
        isUseNoWrapTitle: true,
      },
      customCell: {
        body: (record, dataIndex) => {
          const backData = {
            style: {},
            class: {},
          };
          if (dataIndex === 'c5') {
            backData.style = {
              background: '#ff0000',
            };
            backData.class = {
              'use-class': true,
            };
          }
          return backData;
        },
      },
      pageData: {
        page: 1,
        size: 20,
      },
      sortData: {
        dataIndex: '',
        sortType: '',
      },
      searchKeywords: {
        c1: {
          isShow: false,
          value: '',
        },
        c2: {
          isShow: false,
          value: '',
        },
      },
      searchData: {
        c1: '',
        c2: '',
      }, // dataIndex => keywords
      filterSelected: {
        c1: {
          isShow: false,
          value: [],
        },
        c2: {
          isShow: false,
          value: [],
        },
      },
      filterData: {
        c1: [],
        c2: [],
      }, // dataIndex => [selected]
    };
  },
  computed: {
    dataAmount() {
      return this.tableData.length;
    },
  },
  methods: {
    handleSort(dataIndex, sortType) {
      let currentSort = '';
      switch (sortType) {
        case 'init':
          currentSort = 'up';
          break;
        case 'up':
          currentSort = 'down';
          break;
        default:
          currentSort = 'init';
          break;
      }
      this.sortData = {
        dataIndex,
        sortType: currentSort,
      };
    },
    handleSearch(dataIndex) {
      this.showSearchOrFilterDrop('search', dataIndex, false);
      this.searchData[dataIndex] = this.searchKeywords[dataIndex].value;
    },
    handleFilter(dataIndex) {
      this.showSearchOrFilterDrop('filter', dataIndex, false);
      this.filterSelected[dataIndex] = this.filterSelected[dataIndex].value;
    },
    showSearchOrFilterDrop(from, dataIndex, visible) {
      if (from === 'search') {
        this.searchKeywords[dataIndex].isShow = visible;
      } else if (from === 'filter') {
        this.filterSelected[dataIndex].isShow = visible;
      }
    },
    handlePageChange(current) {
      this.pageData.page = current;
    },
    handlePageSizeChange(current, pageSize) {
      this.pageData.page = current;
      this.pageData.size = pageSize;
    },
    handleTable(backData) {
      const { type, data } = backData;
      switch (type) {
        case 'page':
        case 'search':
        case 'filter':
          if (data.page) {
            this.pageData.page = data.page;
          }
          break;
        default:
          break;
      }
    },
    handleExpand(record) {
      console.log('record', record);
      if (this.tableExpandData[record.id]) {
        this.tableExpandData[record.id].isOpen = !this.tableExpandData[record.id].isOpen;
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .x-table-wrapper {
  thead {
    td {
      .sort-up {
        color: #447CDD;
      }
      .sort-down {
        color: #447CDD;
      }
    }
  }
  tbody {
    tr {
      &:hover {
        background-color: #ffedeb;
        td {
          background-color: #ffedeb;
        }
      }
    }
  }
  td {
    text-align: center;
    height: 35px;
    line-height: 35px;
  }
  .column-sticky{
    background: #eeeeee;
  }
  .page-area {
    margin-top: 20px;
  }
}
/deep/ .sort_icon {
  width: 20px;
  display: inline-block;
  i {
    height: 8px;
    display: block !important;
  }
}
/deep/ .search-drop-footer {
  text-align: right;
  margin-top: 10px;
  button {
    height: 28px;
    line-height: 25px;
    min-width: 80px;
  }
}
/deep/ .page-area {
  margin-top: 20px;
}
</style>
