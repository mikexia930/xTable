<template>
  <Layout>
    <x-table
      :columns=tableColumns
      :config="tableConfig"
      :data="tableData"
      :title="tableHeaderTitle"
      :page-data="pageData"
      :pivot-table="pivotTable"
    >
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
  generateTableData, generateTableTitle, generateColumnData,
} from '../libs/tableLib';

export default {
  name: 'Pivot',
  components: {
    Layout,
  },
  created() {
    this.tableColumns = generateColumnData(30);
    this.tableData = generateTableData(100, 30, '', { isTestPivot: true });
    this.tableHeaderTitle = generateTableTitle(30);
  },
  data() {
    return {
      tableColumns: [], // 表格的列
      tableHeaderTitle: [], // 表头
      tableData: [],
      tableConfig: {
        key: 'table-pivot',
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
      },
      pivotTable: ['c1', 'c2'], // dataIndex 数组
    };
  },
  computed: {
    dataAmount() {
      return this.tableData.length;
    },
  },
  methods: {
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
