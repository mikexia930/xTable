<template>
  <Layout>
    <x-table
      :is-fix-header="isFixHeader"
      :columns=tableColumns
      :config="tableConfig"
      :data="tableData"
      :title="tableHeaderTitle"
      :page-data="pageData"
      :filter-data="filterData"
      @handleTable="handleTable"
    >
      <template #th-filter-c1="{ record, dataIndex }">
        <a-popover trigger="click">
          <a slot="content">
            <div>
              <a-checkbox-group v-model="filterSelected[dataIndex]" :options="filters[dataIndex]" />
            </div>
            <div class="search-drop-footer">
              <a-button type="primary" @click="handleFilter(dataIndex)">筛选</a-button>
            </div>
          </a>
          <a-icon type="filter" />
        </a-popover>
      </template>
      <template #th-filter-c2="{ record, dataIndex }">
        <a-popover trigger="click">
          <a slot="content">
            <div>
              <a-radio-group v-model="filterSelected[dataIndex]" :options="filters[dataIndex]" />
            </div>
            <div class="search-drop-footer">
              <a-button type="primary" @click="handleFilter(dataIndex)">筛选</a-button>
            </div>
          </a>
          <a-icon type="filter" />
        </a-popover>
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
  generateTableData, generateTableTitle, generateColumnData,
} from '../libs/tableLib';

export default {
  name: 'Search',
  components: {
    Layout,
  },
  created() {
    this.tableColumns = generateColumnData(30, false, { isFilter: true });
    this.tableData = generateTableData(100, 30);
    this.tableHeaderTitle = generateTableTitle(30);
    this.pageData.total = this.tableData.length;
  },
  data() {
    return {
      isFixHeader: true, // 是否 fix 在浏览器顶部
      tableColumns: [], // 表格的列
      tableHeaderTitle: [], // 表头
      tableData: [],
      tableConfig: {
        key: 'table-filter',
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
      filters: {
        c1: [
          {
            label: '7 * 1 = 7',
            value: '7 * 1 = 7',
          },
          {
            label: '10 * 1 = 10',
            value: '10 * 1 = 10',
          },
        ],
        c2: [
          {
            label: '7 * 2 = 14',
            value: '7 * 2 = 14',
          },
          {
            label: '18 * 2 = 36',
            value: '18 * 2 = 36',
          },
        ],
      },
      filterSelected: {
        c1: [],
        c2: [],
      },
      filterData: {
        c1: [],
        c2: [],
      }, // dataIndex => [selected]
    };
  },
  methods: {
    handleFilter(dataIndex) {
      this.filterData[dataIndex] = this.filterSelected[dataIndex];
    },
    handleTable(backData) {
      const { type, data } = backData;
      if (type === 'filter' && data.page) {
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
  },
};
</script>
