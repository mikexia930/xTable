<template>
  <div id="app">
    <x-table
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
      <template #td-c1="{ record, text }">
        <div class="columnSticky">{{ text }}</div>
      </template>
      <template #th-sort-c1="{ record, dataIndex }">
        <span class="search_drop"  @click="handleSort(dataIndex, record.sort)">
          <span :class="{'sort-up': record.sort === 'up'}">[u]</span>
          <span :class="{'sort-down': record.sort === 'down'}">[d]</span>
        </span>
      </template>
      <template #th-sort-c2="{ record, dataIndex }">
        <span class="search_drop"  @click="handleSort(dataIndex, record.sort)">
          <span :class="{'sort-up': record.sort === 'up'}">[u]</span>
          <span :class="{'sort-down': record.sort === 'down'}">[d]</span>
        </span>
      </template>
      <template #th-search-c1="{ record, dataIndex }">
        <span class="search-area">
          <span @click.prevent="handleSearchDrop(dataIndex)">[s]</span>
          <div v-show="searchKeywords[dataIndex].isShow" class="search-drop">
            <div class="search-drop-input">
              <input type="text" maxlength="100" v-model="searchKeywords[dataIndex].value" />
            </div>
            <div class="search-drop-footer">
              <button @click.prevent="handleSearch(dataIndex)">确认</button>
            </div>
          </div>
        </span>
      </template>
      <template v-slot:page>
        <div>
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
        obj[`c${j}`] = {
          colSpan: 2,
          rowSpan: 1,
          value: `f-${i}-${j}`,
        };
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
    };
    if (i < 3) {
      obj.sticky = 'left';
      obj.width = '220px';
      obj.dragGroup = 'a1';
      obj.serach = true; // 是否支持查询
      obj.sort = 'init'; // 是否支持排序 init / up / down
      obj.filter = {
        data: [], // 全部列表
      }; // 是否支持筛选，取所有行的值，并筛选
    } else if (i >= labelLength) {
      obj.sticky = 'right';
      obj.width = '220px';
      obj.dragGroup = '';
    } else {
      obj.dragGroup = 'b1';
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
    this.tableFooterData = generateTableFooterData(1, 30);
  },
  data() {
    return {
      tableColumns: [], // 表格的列
      tableHeaderData: [], // 插在thead里的数据，默认只显示 headTitle
      tableFooterData: [], // 插在footer里的数据
      tableHeaderTitle: [], // 表头
      tableData: [],
      tableConfig: {
        key: 'table',
        scrollHeight: '500px',
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
        size: 10,
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
    handleSearchDrop(dataIndex) {
      this.showSearchDrop(dataIndex, true);
    },
    handleSearch(dataIndex) {
      this.showSearchDrop(dataIndex, false);
      this.searchData[dataIndex] = this.searchKeywords[dataIndex].value;
    },
    showSearchDrop(dataIndex, visible) {
      this.searchKeywords[dataIndex].isShow = visible;
      console.log(this.searchKeywords);
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
          this.pageData.page = data.page;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
  /deep/ .table-wrapper {
    td, th {
      height: 35px;
      line-height: 35px;
      &:after {
        background-color: #cccccc;
      }
    }
    th {
      .sort-up {
        color: #447CDD;
      }
      .sort-down {
        color: #447CDD;
      }
    }
    .columnSticky{
      background: #eeeeee;
    }
    .search-area {
      .search-drop {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2);
        box-sizing: border-box;
        padding: 8px 16px;
        position: absolute;
        text-align: left;
        background-color: #ffffff;
        top: 20px;
        left: 0;
        max-height: 500px;
        min-width: 250px;
        overflow: auto;
        z-index: 10000;
        .search-drop-input {
          input[type=text] {
            width: 98%;
            height: 30px;
            line-height: 30px;
            border: 1px solid #c1c1c1;
          }
        }
        .search-drop-footer{
          text-align: right;
          button {
            height: 28px;
            line-height: 25px;
            min-width: 80px;
            color: #ffffff;
            border: 0;
            background-color: red;
          }
        }
      }
    }
    .page_area {
      margin-top: 20px;
    }
  }
</style>
