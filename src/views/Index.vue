<template>
  <Layout>
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
      :expand-action="tableExpandAction"
      :expand-span-column-data="tableExpandSpanColumnData"
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
      <template #td-operator="{ record, expand }">
        <div style="cursor: pointer" @click="handleExpand(record, expand)">
          <span v-if="tableExpandData[record.id]">
            {{expand === 'open' ? 'CLOSE' : 'OPEN' }}-{{ record.id }}
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
  </Layout>
</template>

<script>
import Layout from '../components/ui/Layout.vue';
import {
  generateTableData, generateTableExpandData, generateTableFooterData, generateTableTitle, generateColumnData,
} from '../libs/tableLib';

export default {
  name: 'App',
  components: {
    Layout,
  },
  created() {
    this.tableColumns = generateColumnData(30, true,
      {
        isSearch: true,
        isResize: true,
        isStickyLeft: true,
        isStickyRight: true,
        isDrag: true,
        isFilter: true,
        isRank: true,
      });
    this.tableExpandSpanColumnData = {
      common: {
        dataIndex: 'span',
        sticky: '',
        width: '',
        dragGroup: '',
        resizeable: false,
        align: {
          title: '',
          header: '',
          content: 'left',
          footer: '',
        },
      },
    };
    this.tableData = generateTableData(100, 30);
    this.tableHeaderTitle = generateTableTitle(30);
    this.tableFooterData = generateTableFooterData(2, 30);
    this.tableExpandData = generateTableExpandData(100, 30);
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
      tableExpandSpanColumnData: {}, // 表格扩展的表格数据 {rowKey: {配置}, common: {} }
      tableExpandAction: {}, // 打开或者关闭
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
    handleExpand(record, expand) {
      if (this.tableExpandData[record.id]) {
        this.tableExpandAction = {
          [record.id]: expand === 'open' ? 'close' : 'open',
        };
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
