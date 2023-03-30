<template>
  <Layout>
    <x-table
      :is-fix-header="isFixHeader"
      :columns=tableColumns
      :config="tableConfig"
      :data="tableData"
      :title="tableHeaderTitle"
      :page-data="pageData"
      :search-data="searchData"
      :expand-join-filter-search-columns="expandJoinFilterSearchColumns"
      :expend-filter-search-result-show-type="expendFilterSearchResultShowType"
      :expand-data="tableExpandData"
      :expand-action="tableExpandAction"
      @handleTable="handleTable"
    >
      <template #th-search-c1="{ record, dataIndex }">
        <a-popover trigger="click">
          <a slot="content">
            <a-input v-model="searchKeywords[dataIndex]" />
            <div class="search-drop-footer">
              <a-button type="primary" @click="handleSearch(dataIndex)">查询</a-button>
            </div>
          </a>
          <a-icon type="search" />
        </a-popover>
      </template>
      <template #td-operator="{ record, expand }">
        <div style="cursor: pointer" @click.stop="handleExpand(record, expand)">
          <span v-if="tableExpandData[record.id]">
            {{ expand === 'open' ? '关闭' : '打开' }}
          </span>
        </div>
      </template>
      <template v-slot:page>
        <div class="page-area">
          <a-pagination
            show-size-changer
            :default-current="pageData.page"
            :page-size.sync="pageData.size"
            :total="pageData.total"
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
  generateTableData, generateTableTitle, generateColumnData, generateTableExpandData,
} from '../libs/tableLib';

export default {
  name: 'ExpandSearch',
  components: {
    Layout,
  },
  created() {
    this.tableColumns = generateColumnData(5, true, { isSearch: true });
    this.tableData = generateTableData(100, 5);
    this.tableHeaderTitle = generateTableTitle(5);
    this.tableExpandData = generateTableExpandData(100, 5);
    this.pageData.total = this.tableData.length;
  },
  data() {
    return {
      isFixHeader: true, // 是否 fix 在浏览器顶部
      tableColumns: [], // 表格的列
      tableHeaderTitle: [], // 表头
      tableData: [],
      tableExpandData: {}, // 表格扩展
      tableExpandAction: {}, // 打开或者关闭
      tableConfig: {
        key: 'table-expand-search',
        scrollHeight: '100%',
        scrollWidth: '100%',
        scrollBarWidth: 15, // 滚动条宽度
        scrollBarHeight: 15, // 滚动条高度
        miniWidth: '160px', // 没有设置表格宽度会默认使用最小width
        resizeMin: 160,
        resizeMax: 500,
        border: 1, // 0 无边框， 1 有边框， 2 四周无边框
        rowKey: 'id',
        noWrap: true,
        isUseNoWrapTitle: true,
      },
      pageData: {
        page: 1,
        size: 10,
        total: 0,
      },
      expandJoinFilterSearchColumns: ['c1'],
      expendFilterSearchResultShowType: 'fit', // fit 符合的打开/close 全部关闭/open 全部打开
      searchKeywords: {
        c1: '',
      },
      searchData: {
        c1: '',
      },
    };
  },
  methods: {
    handleSearch(dataIndex) {
      this.searchData[dataIndex] = this.searchKeywords[dataIndex];
    },
    handleTable(backData) {
      const { type, data } = backData;
      if (type === 'search' && data.page) {
        this.pageData.page = data.page;
        this.pageData.total = data.total;
      }
    },
    handlePageChange(current) {
      this.pageData.page = current;
    },
    handlePageSizeChange(current, pageSize) {
      this.pageData.page = current;
      this.pageData.size = pageSize;
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
