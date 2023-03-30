<template>
  <Layout>
    <x-table
      :is-fix-header="isFixHeader"
      :columns=tableColumns
      :config="tableConfig"
      :data="tableData"
      :title="tableHeaderTitle"
      :page-data="pageData"
      :custom-cell="customCell"
    />
  </Layout>
</template>

<script>
import Layout from '../components/ui/Layout.vue';
import {
  generateTableData, generateTableTitle, generateColumnData,
} from '../libs/tableLib';

export default {
  name: 'Custom',
  components: {
    Layout,
  },
  created() {
    this.tableColumns = generateColumnData(20);
    this.tableData = generateTableData(30, 20);
    this.tableHeaderTitle = generateTableTitle(20);
  },
  data() {
    return {
      isFixHeader: true, // 是否 fix 在浏览器顶部
      tableColumns: [], // 表格的列
      tableHeaderTitle: [], // 表头
      tableData: [],
      tableConfig: {
        key: 'table-custom',
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
      customCell: {
        header: (record, dataIndex) => {
          const backData = {
            style: {},
            class: {},
          };
          if (dataIndex === 'c3') {
            backData.style = {
              background: '#fff000',
            };
          }
          return backData;
        },
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
          } else if (dataIndex === 'c10') {
            backData.style = {
              background: '#e1e200',
            };
            backData.class = {
              'use-class': true,
            };
          }
          return backData;
        },
      },
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
