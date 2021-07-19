<template>
  <div id="app">
    <div style="height: 200px"></div>
    <x-table
      :is-use-single-table="isUseSingleTable"
      :is-fix-header="isFixHeader"
      :is-sticky="isSticky"
      :columns=tableColumns
      :config="tableConfig"
      :data="tableData"
      :title="tableHeaderTitle"
      :headerData="tableHeaderData"
      :footerData="tableFooterData"
      :page-data="pageData"
      :sort-data="sortData"
      :search-data="searchData"
      :filter-data="filterData"
      @handleTable="handleTable"
    >
      <template v-slot:th-drag>
        <a-icon type="more" />
      </template>
      <template #td-c1="{ record, text }">
        <div class="column-sticky">{{ text }}</div>
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
      </template>>
    </x-table>
    <div style="height: 800px"></div>
  </div>
</template>

<script>
function generateTableData(listLength, columnLength) {
  const arr = [];
  for (let i = 1; i <= listLength; i += 1) {
    const obj = {
      id: i,
    };
    for (let j = 1; j <= columnLength; j += 1) {
      obj[`c${j}`] = {
        colSpan: 1,
        rowSpan: 1,
        value: `${i} * ${j} = ${i * j}`,
      };
    }
    arr.push(obj);
  }
  return arr;
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
      align: '', // text-align
    };
    if (i < 3) {
      obj.sticky = 'left';
      obj.width = '220px';
      obj.dragGroup = 'a1';
      obj.serach = true; // 是否支持查询
      obj.sort = 'init'; // 是否支持排序 init / up / down
      obj.filter = true; // 是否支持筛选，取所有行的值，并筛选
    } else if (i >= labelLength) {
      obj.sticky = 'right';
      obj.width = '220px';
      obj.dragGroup = '';
    } else {
      obj.dragGroup = 'b1';
      obj.align = 'right';
    }
    arr.push(obj);
  }
  return arr;
}

export default {
  name: 'App',
  created() {
    this.tableColumns = generateColumnData(30);
    this.tableData = generateTableData(100, 30);
    this.tableHeaderTitle = generateTableTitle(30);
    this.tableFooterData = generateTableFooterData(2, 30);
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
      this.filterData[dataIndex] = this.filterSelected[dataIndex].value;
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
