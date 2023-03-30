<template>
  <Layout>
    <x-table
      :is-fix-header="isFixHeader"
      :columns=tableColumns
      :config="tableConfig"
      :data="tableData"
      :title="tableHeaderTitle"
      :page-data="pageData"
    >
      <!--  表头  -->
      <template
        v-for="column in this.tableColumns"
        v-slot:[`th-${column.dataIndex}`]="{ text, record }"
      >
        <component
          :key="`th-${column.dataIndex}`"
          :is="component.th"
          :record="record"
          :column="column"
        />
      </template>
      <!--  数据列  -->
      <template
        v-for="column in this.tableColumns"
        v-slot:[`td-${column.dataIndex}`]="{ record }"
      >
        <component
          :key="`td-${column.dataIndex}`"
          :is="component.td"
          :record="record"
          :column="column"
          @change="handleTdChange"
        />
      </template>
    </x-table>
    <a-modal v-model="modalData.visible" title="Basic Modal" @ok="handleModalOk">
      {{ modalData.data }}
    </a-modal>
  </Layout>
</template>

<script>
import Layout from '../components/ui/Layout.vue';
import ThComponent from '../components/table/ThComponent.vue';
import TdComponent from '../components/table/TdComponent.vue';
import {
  generateTableData, generateTableTitle, generateColumnData,
} from '../libs/tableLib';

export default {
  name: 'Compo',
  components: {
    Layout,
    TdComponent,
    ThComponent,
  },
  created() {
    this.tableColumns = generateColumnData(30);
    this.tableData = generateTableData(100, 30);
    this.tableHeaderTitle = generateTableTitle(30);
  },
  data() {
    return {
      component: {
        td: TdComponent,
        th: ThComponent,
      },
      isFixHeader: true, // 是否 fix 在浏览器顶部
      tableColumns: [], // 表格的列
      tableHeaderTitle: [], // 表头
      tableData: [],
      tableConfig: {
        key: 'table-components',
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
      modalData: {
        visible: false,
        data: '',
      },
    };
  },
  methods: {
    handleModalOk() {
      this.modalData.visible = false;
    },
    handleTdChange(backData) {
      const { type, data } = backData;
      if (type === 'modal') {
        this.modalData.visible = true;
        this.modalData.data = data;
      }
    },
  },
};
</script>
