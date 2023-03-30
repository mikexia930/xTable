<template>
  <Layout>
    <div class="tips-area">
      <ul>
        <li>dataIndex 为 checkbox 时，会被解释为 checkbox 多选框；只支持一列多选。</li>
        <li>checkbox 的 value 值为 dataIndex 为 config 里 rowKey 的值。(record[config.rowKey])</li>
      </ul>
    </div>
    <div>
      <h3>不使用自定义 Checkbox</h3>
    </div>
    <div>
      <x-table
        :is-fix-header="isFixHeader"
        :is-use-single-table="isUseSingleTable"
        :columns=tableColumns
        :config="self.tableConfig"
        :data="tableData"
        :title="tableHeaderTitle"
        :page-data="self.pageData"
        :checkbox-selected-data="self.checkboxSelectedData"
        @handleTable="handleSelfTable"
      >
        <template v-slot:page>
          <div class="page-area">
            <a-pagination
              show-size-changer
              :default-current="self.pageData.page"
              :page-size.sync="self.pageData.size"
              :total="dataAmount"
              @change="handleSelfPageChange"
              @showSizeChange="handleSelfPageSizeChange"
            />
          </div>
        </template>
      </x-table>
    </div>
    <div>
      <div>
        <h3>使用自定义 Checkbox</h3>
      </div>
      <div>
        <x-table
          :is-fix-header="isFixHeader"
          :is-use-single-table="isUseSingleTable"
          :columns=tableColumns
          :config="custom.tableConfig"
          :data="tableData"
          :title="tableHeaderTitle"
          :page-data="custom.pageData"
          :checkbox-selected-data="custom.checkboxSelectedData"
          @handleTable="handleCustomTable"
        >
          <template #th-checkbox="{ record, checked, checkbox }">
            <a-checkbox :checked="checked" @click="checkbox"></a-checkbox>
          </template>
          <template #td-checkbox="{ record, checked, checkbox }">
            <a-checkbox :checked="checked" @click="(selected) => checkbox(selected, record)"></a-checkbox>
          </template>
          <template v-slot:page>
            <div class="page-area">
              <a-pagination
                show-size-changer
                :default-current="custom.pageData.page"
                :page-size.sync="custom.pageData.size"
                :total="dataAmount"
                @change="handleCustomPageChange"
                @showSizeChange="handleCustomPageSizeChange"
              />
            </div>
          </template>
        </x-table>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '../components/ui/Layout.vue';
import {
  generateTableData, generateTableTitle, generateColumnData,
} from '../libs/tableLib';

export default {
  name: 'Checkbox',
  components: {
    Layout,
  },
  created() {
    this.tableColumns = generateColumnData(30);
    this.tableData = generateTableData(100, 30);
    this.tableHeaderTitle = generateTableTitle(30);
    this.tableColumns.unshift({
      dataIndex: 'checkbox',
      dragGroup: '', // 只在第一行绑定
      align: {
        title: '',
        header: '',
        content: '',
        footer: '',
      }, // text-align
    });
  },
  data() {
    return {
      isFixHeader: false, // 是否 fix 在浏览器顶部
      isUseSingleTable: true,
      tableColumns: [], // 表格的列
      tableHeaderTitle: [], // 表头
      tableData: [],
      custom: {
        tableConfig: {
          key: 'table-checkbox-custom',
          scrollHeight: '300px',
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
        checkboxSelectedData: [],
      },
      self: {
        tableConfig: {
          key: 'table-checkbox-self',
          scrollHeight: '300px',
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
        checkboxSelectedData: [],
      },
    };
  },
  computed: {
    dataAmount() {
      return this.tableData.length;
    },
  },
  methods: {
    handleSelfPageChange(current) {
      this.self.pageData.page = current;
    },
    handleSelfPageSizeChange(current, pageSize) {
      this.self.pageData.page = current;
      this.self.pageData.size = pageSize;
    },
    handleSelfTable(backData) {
      const { type, data } = backData;
      if (type === 'checkbox' && data.select) {
        this.self.checkboxSelectedData = [...data.select];
      }
    },
    handleCustomPageChange(current) {
      this.custom.pageData.page = current;
    },
    handleCustomPageSizeChange(current, pageSize) {
      this.custom.pageData.page = current;
      this.custom.pageData.size = pageSize;
    },
    handleCustomTable(backData) {
      const { type, data } = backData;
      if (type === 'checkbox' && data.select) {
        this.custom.checkboxSelectedData = [...data.select];
      }
    },
  },
};
</script>
