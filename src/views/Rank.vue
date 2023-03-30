<template>
  <Layout>
    <x-table
      :is-fix-header="isFixHeader"
      :columns=tableColumns
      :config="tableConfig"
      :data="tableData"
      :title="tableHeaderTitle"
      :page-data="pageData"
      :sort-data="sortData"
    >
      <template #th-sort-c1="{ record, dataIndex }">
        <span class="sort-icon"  @click="handleSort(dataIndex, record.sort)">
          <a-icon :class="{'sort-up': record.sort === 'up'}" type="caret-up" />
          <a-icon :class="{'sort-down': record.sort === 'down'}" type="caret-down" />
        </span>
      </template>
      <template #th-sort-c2="{ record, dataIndex }">
        <span class="sort-icon"  @click="handleSort(dataIndex, record.sort)">
          <a-icon :class="{'sort-up': record.sort === 'up'}" type="caret-up" />
          <a-icon :class="{'sort-down': record.sort === 'down'}" type="caret-down" />
        </span>
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
  name: 'Rank',
  components: {
    Layout,
  },
  created() {
    this.tableColumns = generateColumnData(30, false, { isRank: true });
    this.tableData = generateTableData(100, 30);
    this.tableHeaderTitle = generateTableTitle(30);
    this.tableColumns[1].sort = 'down';
  },
  data() {
    return {
      isFixHeader: true, // 是否 fix 在浏览器顶部
      tableColumns: [], // 表格的列
      tableHeaderTitle: [], // 表头
      tableData: [],
      tableConfig: {
        key: 'table-rank',
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
      sortData: {
        dataIndex: 'c2',
        sortType: 'down',
      },
      pageData: {
        page: 1,
        size: 10,
      },
    };
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
  },
};
</script>
