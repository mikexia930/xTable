<template>
  <Layout>
    <div>
      <h3>相同列</h3>
    </div>
    <div>
      <x-table
        :is-use-single-table="true"
        :columns=tableColumns
        :config="array.tableConfig"
        :data="tableData"
        :title="tableHeaderTitle"
        :page-data="pageData"
        :expand-data="array.tableExpandData"
        :expand-action="array.tableExpandAction"
      >
        <template #td-operator="{ record, expand }">
          <div style="cursor: pointer" @click.stop="handleExpand(record, expand)">
          <span v-if="array.tableExpandData[record.id]">
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
              :total="dataAmount"
              @change="handlePageChange"
              @showSizeChange="handlePageSizeChange"
            />
          </div>
        </template>
      </x-table>
    </div>
    <div style="padding-top: 32px">
      <h3>合并列</h3>
    </div>
    <div>
      <x-table
        :is-use-single-table="true"
        :columns=tableColumns
        :config="span.tableConfig"
        :data="tableData"
        :title="tableHeaderTitle"
        :page-data="pageData"
        :expand-data="span.tableExpandData"
        :expand-action="span.tableExpandAction"
        :expand-span-column-data="span.tableExpandSpanColumnData"
      >
        <template #td-operator="{ record, expand }">
          <div style="cursor: pointer" @click.stop="handleSpanExpand(record, expand)">
          <span v-if="span.tableExpandData[record.id]">
            {{ expand === 'open' ? '关闭' : '打开' }}
          </span>
          </div>
        </template>
      </x-table>
    </div>
  </Layout>
</template>

<script>
import Layout from '../components/ui/Layout.vue';
import {
  generateTableData, generateTableTitle, generateColumnData, generateTableExpandData,
} from '../libs/tableLib';

export default {
  name: 'Expand',
  components: {
    Layout,
  },
  created() {
    this.tableColumns = generateColumnData(5, true);
    this.tableData = generateTableData(100, 5);
    this.tableHeaderTitle = generateTableTitle(5, true);
    this.array.tableExpandData = generateTableExpandData(100, 5);
  },
  data() {
    return {
      tableColumns: [], // 表格的列
      tableHeaderTitle: [], // 表头
      tableData: [],
      pageData: {
        page: 1,
        size: 10,
      },
      array: {
        tableExpandData: {}, // 表格扩展
        tableExpandAction: {}, // 打开或者关闭
        tableConfig: {
          key: 'table-expand-array',
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
      },
      span: {
        tableExpandData: {
          5: {
            isOpen: false, // 初始打开或关闭
            type: 'span', // span 合并单元格只支持slot / data 合并到当前数据里
            data: [
              {
                span: '合并表格5',
              },
            ], // data 时为数组 [] 格式如 tableData，span 时为 { rowKey: ''， data: {} } ，如 table 单列数据
          },
          8: {
            isOpen: true,
            type: 'span',
            data: [
              {
                span: '合并表格8',
              },
            ],
          },
        }, // 表格扩展
        tableExpandSpanColumnData: {
          common: {
            dataIndex: 'span',
            sticky: '',
            width: '',
            dragGroup: '',
            resizeable: false,
            align: {
              title: '',
              header: '',
              content: 'center',
              footer: '',
            },
          },
        }, // 表格扩展的表格数据 {rowKey: {配置}, common: {} }
        tableExpandAction: {}, // 打开或者关闭
        tableConfig: {
          key: 'table-expand-span',
          scrollHeight: '100%',
          scrollWidth: '100%',
          miniWidth: '160px', // 没有设置表格宽度会默认使用最小width
          scrollBarWidth: 15, // 滚动条宽度
          scrollBarHeight: 15, // 滚动条高度
          resizeMin: 160,
          resizeMax: 500,
          border: 1, // 0 无边框， 1 有边框， 2 四周无边框
          rowKey: 'id',
          noWrap: true,
          isUseNoWrapTitle: true,
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
    handleExpand(record, expand) {
      if (this.array.tableExpandData[record.id]) {
        this.array.tableExpandAction = {
          [record.id]: expand === 'open' ? 'close' : 'open',
        };
      }
    },
    handleSpanExpand(record, expand) {
      if (this.span.tableExpandData[record.id]) {
        this.span.tableExpandAction = {
          [record.id]: expand === 'open' ? 'close' : 'open',
        };
      }
    },
  },
};
</script>
