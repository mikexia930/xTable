<template>
  <div class="x-table-wrapper" :id="domInit.wrap">
    <div class="x-table-area" v-if="data.length <= 0">
      <slot name="nodata">
        no data
      </slot>
    </div>
    <div class="x-table-area" v-else>
      <div
        v-if="!isUseSingleTable"
        class="x-table-fix-header"
        :style="stickyStyle"
      >
        <div
          :id="domInit.header"
          class="x-table-content"
          :class="headBorder"
          :style="{ width: styleTable.width, overflow: 'hidden' }"
        >
          <table class="x-fixed-table">
            <colgroup>
              <col
                :key="`col-${index}`"
                v-for="(col, index) in colgroupData"
                :style="{ width: col.width, minWidth: col.width }"
              >
            </colgroup>
            <thead class="x-head-dom">
            <tr
              v-for="(titleItem, titleIndex) in title"
              :key="`thr-${config.key}-${titleIndex}`"
              :class="titleItem.$class"
            >
              <template v-for="(columnItem, columnIndex) in tableColumnsHead">
                <x-td
                  :key="`th-${config.key}-${titleItem[config.rowKey]}-${titleIndex}-${columnItem.dataIndex}`"
                  from="th"
                  :is-sticky="isSticky"
                  :padding-length="paddingLength"
                  :no-wrap="config.noWrap"
                  :is-use-no-wrap-title="config.isUseNoWrapTitle"
                  :row-index="titleIndex"
                  :row-item="titleItem"
                  :column-index="columnIndex"
                  :column-item="columnItem"
                  :colgroup-data="colgroupData"
                  :sticky-left-columns="stickyLeftColumns"
                  :sticky-right-columns="stickyRightColumns"
                  :column-length="tableColumns.length"
                  :drag-columns="dragColumns"
                  :resize-columns="resizeColumns"
                  :custom-cell="customCell ? customCell.header : null"
                >
                  <template v-slot:[`th-${columnItem.dataIndex}`]="{ record, text}">
                    <slot
                      :name="`th-${columnItem.dataIndex}`"
                      :record="record"
                      :text="text"
                    ></slot>
                  </template>
                  <template v-slot:[`th-sort-${columnItem.dataIndex}`]="{ record, dataIndex}">
                    <slot
                      :name="`th-sort-${columnItem.dataIndex}`"
                      :record="record"
                      :dataIndex="dataIndex"
                    ></slot>
                  </template>
                  <template v-slot:[`th-search-${columnItem.dataIndex}`]="{ record, dataIndex}">
                    <slot
                      :name="`th-search-${columnItem.dataIndex}`"
                      :record="record"
                      :dataIndex="dataIndex"
                    ></slot>
                  </template>
                  <template v-slot:[`th-filter-${columnItem.dataIndex}`]="{ record, dataIndex}">
                    <slot
                      :name="`th-filter-${columnItem.dataIndex}`"
                      :record="record"
                      :dataIndex="dataIndex"
                    ></slot>
                  </template>
                  <template v-slot:th-drag>
                    <slot :name="`th-drag`"></slot>
                  </template>
                  <template v-slot:th-resize>
                    <slot :name="`th-resize`"></slot>
                  </template>
                </x-td>
              </template>
            </tr>
            </thead>
          </table>
          <div
            v-if="isSticky && stickyLeftColumns.length > 0"
            :id="domInit.leftHeader"
            class="x-sticky-shadow x-sticky-left-shadow"
            :style="{'left': getStickyDistance(stickyLeftColumns.length, (tableColumns.length - 1), 'left', 'shadow')}"
          ></div>
          <div
            v-if="isSticky && stickyRightColumns.length > 0"
            :id="domInit.rightHeader"
            class="x-sticky-shadow x-sticky-right-shadow"
            :style="{'left': getStickyDistance((tableColumns.length - 1 - stickyRightColumns.length), (tableColumns.length - 1), 'right', 'shadow')}"
          ></div>
        </div>
      </div>
      <div
        :id="domInit.content"
        class="x-table-content"
        :class="contentBorder"
        :style="styleTable"
      >
        <div>
          <table class="x-fixed-table">
            <colgroup>
              <col
                :key="`col-${index}`"
                v-for="(col, index) in colgroupData"
                :style="{ width: col.width, minWidth: col.width }"
              >
            </colgroup>
            <thead v-if="isUseSingleTable" class="x-head-dom">
            <tr
              v-for="(titleItem, titleIndex) in title"
              :key="`thr-${config.key}-${titleIndex}`"
              :class="titleItem.$class"
            >
              <template v-for="(columnItem, columnIndex) in tableColumnsHead">
                <x-td
                  :key="`th-${config.key}-${titleItem[config.rowKey]}-${titleIndex}-${columnItem.dataIndex}`"
                  from="th"
                  :is-sticky="isSticky"
                  :padding-length="paddingLength"
                  :no-wrap="config.noWrap"
                  :is-use-no-wrap-title="config.isUseNoWrapTitle"
                  :row-index="titleIndex"
                  :row-item="titleItem"
                  :column-index="columnIndex"
                  :column-item="columnItem"
                  :colgroup-data="colgroupData"
                  :sticky-left-columns="stickyLeftColumns"
                  :sticky-right-columns="stickyRightColumns"
                  :column-length="tableColumns.length"
                  :drag-columns="dragColumns"
                  :resize-columns="resizeColumns"
                  :custom-cell="customCell ? customCell.header : null"
                >
                  <template v-slot:[`th-${columnItem.dataIndex}`]="{ record, text}">
                    <slot
                      :name="`th-${columnItem.dataIndex}`"
                      :record="record"
                      :text="text"
                    ></slot>
                  </template>
                  <template v-slot:[`th-sort-${columnItem.dataIndex}`]="{ record, dataIndex}">
                    <slot
                      :name="`th-sort-${columnItem.dataIndex}`"
                      :record="record"
                      :dataIndex="dataIndex"
                    ></slot>
                  </template>
                  <template v-slot:[`th-search-${columnItem.dataIndex}`]="{ record, dataIndex}">
                    <slot
                      :name="`th-search-${columnItem.dataIndex}`"
                      :record="record"
                      :dataIndex="dataIndex"
                    ></slot>
                  </template>
                  <template v-slot:[`th-filter-${columnItem.dataIndex}`]="{ record, dataIndex}">
                    <slot
                      :name="`th-filter-${columnItem.dataIndex}`"
                      :record="record"
                      :dataIndex="dataIndex"
                    ></slot>
                  </template>
                  <template v-slot:th-drag>
                    <slot :name="`th-drag`"></slot>
                  </template>
                  <template v-slot:th-resize>
                    <slot :name="`th-resize`"></slot>
                  </template>
                </x-td>
              </template>
            </tr>
            </thead>
            <tbody>
            <template v-if="showData.length <= 0">
              <tr>
                <td class="x-no-data" :colspan="columns.length">
                  <slot name="noresult">
                    no result
                  </slot>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr
                v-for="(rowItem, rowIndex) in showData"
                :key="`tdr-${config.key}-${rowIndex}`"
                :class="rowItem.$class"
                :ref="rowItem.$expandKey"
              >
                <template v-if="rowItem.$expandType && rowItem.$expandType === 'span'">
                  <x-td
                    :key="`td-${config.key}-${rowIndex}-${rowItem[config.rowKey]}`"
                    from="td"
                    :is-span-expand="true"
                    :is-sticky="isSticky"
                    :padding-length="paddingLength"
                    :no-wrap="config.noWrap"
                    :is-use-no-wrap-title="config.isUseNoWrapTitle"
                    :row-index="rowIndex"
                    :row-item="rowItem"
                    :column-index="0"
                    :column-item="getExpandSpanColumnData"
                    :colgroup-data="colgroupData"
                    :column-length="tableColumns.length"
                    :custom-cell="customCell ? customCell.body : null"
                  >
                    <template v-slot:[`td-${getExpandSpanColumnData.dataIndex}`]="{ record, text, expand }">
                      <slot
                        :name="`td-${rowItem[config.rowKey]}`"
                        :record="record"
                        :text="text"
                        :expand="expand"
                      ></slot>
                    </template>
                  </x-td>
                </template>
                <template v-else>
                  <template v-for="(columnItem, columnIndex) in tableColumns">
                    <x-td
                      :key="`td-${config.key}-${rowIndex}-${columnIndex}`"
                      from="td"
                      :is-sticky="isSticky"
                      :padding-length="paddingLength"
                      :no-wrap="config.noWrap"
                      :is-use-no-wrap-title="config.isUseNoWrapTitle"
                      :row-index="rowIndex"
                      :row-item="rowItem"
                      :column-index="columnIndex"
                      :column-item="columnItem"
                      :colgroup-data="colgroupData"
                      :sticky-left-columns="stickyLeftColumns"
                      :sticky-right-columns="stickyRightColumns"
                      :column-length="tableColumns.length"
                      :custom-cell="customCell ? customCell.body : null"
                      :expand-status="getExpandStatus(rowItem)"
                    >
                      <template v-slot:[`td-${columnItem.dataIndex}`]="{ record, text, expand }">
                        <slot
                          :name="`td-${columnItem.dataIndex}`"
                          :record="record"
                          :text="text"
                          :expand="expand"
                        ></slot>
                      </template>
                    </x-td>
                  </template>
                </template>
              </tr>
            </template>
            </tbody>
            <tfoot v-if="footerData && footerData.length > 0">
            <tr
              v-for="(rowItem, rowIndex) in footerShowData"
              :key="`tfr-${config.key}-${rowIndex}`"
              :class="rowItem.$class"
            >
              <template v-for="(columnItem, columnIndex) in tableColumns">
                <x-td
                  :key="`tf-${config.key}-${rowIndex}-${columnIndex}`"
                  from="tf"
                  :is-sticky="isSticky"
                  :padding-length="paddingLength"
                  :no-wrap="config.noWrap"
                  :is-use-no-wrap-title="config.isUseNoWrapTitle"
                  :row-index="rowIndex"
                  :row-item="rowItem"
                  :column-index="columnIndex"
                  :column-item="columnItem"
                  :colgroup-data="colgroupData"
                  :sticky-left-columns="stickyLeftColumns"
                  :sticky-right-columns="stickyRightColumns"
                  :column-length="tableColumns.length"
                  :custom-cell="customCell ? customCell.footer : null"
                >
                  <template v-slot:[`tf-${columnItem.dataIndex}`]="{ record, text}">
                    <slot
                      :name="`tf-${columnItem.dataIndex}`"
                      :record="record"
                      :text="text"
                    ></slot>
                  </template>
                </x-td>
              </template>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div
        v-if="isSticky && stickyLeftColumns.length > 0"
        :id="domInit.left"
        class="x-sticky-shadow x-sticky-left-shadow"
        :style="{'left': getStickyDistance(stickyLeftColumns.length, (tableColumns.length - 1), 'left', 'shadow')}"
      ></div>
      <div
        v-if="isSticky && stickyRightColumns.length > 0"
        :id="domInit.right"
        class="x-sticky-shadow x-sticky-right-shadow"
        :style="{'left': getStickyDistance((tableColumns.length - 1 - stickyRightColumns.length), (tableColumns.length - 1), 'right', 'shadow')}"
      ></div>
    </div>
    <div class="x-page-area" v-if="showData.length > 0">
      <slot name="page"></slot>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import { debounce, cloneDeep } from 'lodash';
import { getStorage, setStorage, removeStorage } from './storage';
import XTd from './td.vue';

export default {
  name: 'x-table',
  props: {
    isUseStorage: Boolean, // 是否启用缓存记录表格变化，位置和宽度
    isUseSingleTable: Boolean, // 是否使用单表格，高度固定时可以启用，避免渲染多个 table
    isFixHeader: Boolean, // 是否启用表头固定
    isSticky: Boolean, // 是否启用列固定，打开后columns里设置的sticky才有效果
    paddingLength: Number, // 表格 td padding 占位宽度，用于计算内部 dom 的宽度
    columns: Array, // 列数据
    title: Array, // 表头数据
    data: Array, // 表数据
    expandData: Object, // 表扩展列数据
    footerData: Array, // footer数据
    headerData: Array, // header数据，不同于表头，表头为固定，headerData为表头下面继续展示的数据
    config: Object, // 表格的配置
    pageData: Object, // 分页数据 { page: 当前页码，size：每页的条数 }
    sortData: Object, // 排序列数据 { dataIndex: 列索引, sortType: 排序方式 init/up/down }，同一时间只能对一个列排序
    searchData: Object, // { key1: string1, key2: string2 } key 为 dataIndex, string为查询关键词，多个查询会叠加作用
    filterData: Object, // { key1: array1, key2: array2 } key 为 dataIndex, array为已选中的值数组，多个筛选会叠加作用
    expandAction: Object, // { dataIndex: open/close }
    pivotTable: Array, // 数组不为空，则开启透视表（行合并）， [key1, key2] key 为 dataIndex，需要开启的列。多列开启,规则为 按数组下标顺序，按第一列组，第二列组依次合并，不在上一组的相同值不会合并。
    customCell: Object, // td的自定义格式，{ header: (record, dataIndex) => {}, body: (record, dataIndex) => {}, , footer: (record, dataIndex) => {}}返回值必须为对象，现在只返回 style 和 class
    expandJoinFilterSearchColumns: Array, // 表扩展列数据参与筛选的列
    expendFilterSearchResultShowType: String, // 查询结果显示 open 全部打开 fit 符合的打开 close 全部关闭
    expandSpanColumnData: Object, // { rowKey: {}, common: {} } 没有 rowKey 的时候使用 common
  },
  components: {
    XTd,
  },
  data() {
    return {
      wrapAreaWidth: 0,
      wrapLeftSpan: 0,
      tableColumns: [],
      tableColumnsHead: [], // 为了拖动表格后的顺序bug，单独生产一个头部使用的列数据
      stickyLeftColumns: [], // 需要left sticky的列数组，[ dataIndex ]
      stickyRightColumns: [], // 需要right sticky的列数组，[ dataIndex ]
      colgroupData: [], // 列宽数据
      dragGroup: [], // 表头可拖动的分组
      dragColumns: [], // 表头可拖动的列，[ dataIndex ]
      resizeColumns: [], // 可拖动改变列宽的列，[ dataIndex ]
      searchColumns: [], // 表头带查询功能的列，[ dataIndex ]
      filterColumns: [], // 表头带筛选功能的列，[ dataIndex ]
      resizeThrottle: null, // 表头拖动防抖
      initResize: {
        index: 0, // columns的索引
        width: 0, // 当前列的宽度
        height: 0, // 当前列的宽度，暂不支持改变高度
        x: 0, // x坐标的数据
        y: 0, // y坐标的数据
      },
      dataUse: cloneDeep(this.data), // 保留prop data 为了排序还原数据使用
      pageDataUse: { ...this.pageData },
      showData: [], // 分页显示的数据
      isFixedHeader: false,
      domMap: {},
      domInit: {
        wrap: `${this.config.key}-x-table-wrapper`, // 外层包围dom
        header: `${this.config.key}-x-table-header`, // 表头包围dom
        content: `${this.config.key}-x-table-content`, // 表格包围dom
        left: `${this.config.key}-x-sticky-left-shadow`, // left sticky的阴影条
        right: `${this.config.key}-x-sticky-right-shadow`, // right sticky的阴影条
        leftHeader: `${this.config.key}-x-sticky-left-header-shadow`, // 表头 left sticky的阴影条
        rightHeader: `${this.config.key}-x-sticky-right-header-shadow`, // 表头 right sticky的阴影条
      },
    };
  },
  computed: {
    getExpandSpanColumnData() {
      let backData = {};
      if (this.expandSpanColumnData && this.expandSpanColumnData.common) {
        backData = this.expandSpanColumnData.common;
      }
      return backData;
    },
    /**
     * 百分比转具体值，保证浮动表头和内容的列宽一致
     */
    styleTable() {
      const backData = {
        height: `${this.config.scrollHeight}`,
        width: `${this.config.scrollWidth}`,
      };
      const widthStr = String(this.config.scrollWidth);
      if (widthStr.substring(widthStr.length - 1) === '%') {
        const width = Math.ceil(this.wrapAreaWidth * (parseInt(backData.width, 10) / 100));
        backData.width = `${width}px`;
      }
      return backData;
    },
    /**
     * 配置头部 border
     */
    headBorder() {
      let backData = '';
      switch (String(this.config.border)) {
        case '0':
          break;
        case '1':
          backData = 'x-table-border-no-bottom x-td-border';
          break;
        case '2':
          backData = 'x-td-border';
          break;
        case '3':
          backData = 'x-td-border x-table-border-no-vertical';
          break;
        default:
          break;
      }
      return backData;
    },
    /**
     * 配置内容区域 border
     */
    contentBorder() {
      let backData = '';
      switch (String(this.config.border)) {
        case '0':
          break;
        case '1':
          if (this.isUseSingleTable) {
            backData = 'x-table-border x-td-border';
          } else {
            backData = 'x-table-border-no-top x-td-border';
          }
          break;
        case '2':
          backData = 'x-td-border';
          break;
        case '3':
          backData = 'x-td-border x-table-border-no-vertical';
          break;
        default:
          break;
      }
      return backData;
    },
    /**
     * 设置 header sticky 的样式，主要是是否启用 sticky 属性，和sticky 的距离
     */
    stickyStyle() {
      const isFixHeader = this.isFixHeader && this.isFixedHeader;
      const backData = {
        width: this.styleTable.width,
        position: isFixHeader ? 'fixed' : null,
        left: isFixHeader ? `${this.wrapLeftSpan}px` : null,
      };
      return backData;
    },
    /**
     * 当前最大的页码
     */
    maxPage() {
      return Math.ceil(this.dataAmount / this.pageDataUse.size) || 1;
    },
    /**
     * 当前数据条数
     */
    dataAmount() {
      return this.dataUse.length;
    },
    /**
     * 表格footer数据，主要为了rowSpan的计算
     */
    footerShowData() {
      return this.getRowSpan(this.footerData);
    },
  },
  watch: {
    columns: {
      handler() {
        this.initColumnPercentWidth();
        this.resetColumnsByStorage();
        this.initColumnWidth();
        this.initData();
      },
      deep: true,
    },
    data: {
      handler(newVal) {
        this.dataUse = cloneDeep(newVal);
        this.doReInitData('init');
        this.getShowData();
        if (newVal.length > 0) {
          this.$nextTick(() => {
            this.initDom();
          });
        }
      },
      deep: true,
    },
    /**
     * 监听切换每页显示条数
     */
    pageData: {
      handler(newVal) {
        if (newVal.size !== this.pageDataUse.size || newVal.page !== this.pageDataUse.page) {
          this.pageDataUse.size = newVal.size;
          this.pageDataUse.page = newVal.page;
          this.resetPage('page');
        }
      },
      deep: true,
    },
    /**
     * 监听排序
     */
    sortData: {
      handler(newVal) {
        if (this.data && this.data.length > 0) {
          this.doSort(newVal.dataIndex, newVal.sortType);
        }
      },
      deep: true,
    },
    /**
     * 监听查询
     */
    searchData: {
      handler(newVal) {
        if (this.data && this.data.length > 0) {
          this.doSearch(newVal);
        }
      },
      deep: true,
    },
    /**
     * 监听筛选
     */
    filterData: {
      handler(newVal) {
        if (this.data && this.data.length > 0) {
          this.doFilter(newVal);
        }
      },
      deep: true,
    },
    /**
     * 监听表格展开
     */
    expandAction: {
      handler(newVal) {
        this.openExpand(newVal);
      },
      deep: true,
    },
  },
  created() {
    window.onresize = debounce(() => {
      this.initWrap();
      this.initColumnWidth();
    }, 500);
    /*
    if (this.tableColumns.length > 0) {
      this.initColumnWidth();
      this.initData();
      this.getShowData();
    }
    */
  },
  mounted() {
    this.initWrap();
    if (this.tableColumns.length > 0) {
      if (this.tableColumns.length > 0) {
        // 数据格式化
        this.initColumnWidth();
        this.initData();
        this.getShowData();
        // dom 监听
        this.initDom();
      }
    }
  },
  beforeDestroy() {
    // TODO
  },
  methods: {
    /**
     * 初始化表格区域位置
     */
    initWrap() {
      const wrapDom = this.getDomMap('dynamic', 'wrap');
      if (wrapDom) {
        this.wrapLeftSpan = wrapDom.getBoundingClientRect().left;
        this.wrapAreaWidth = wrapDom.clientWidth;
      }
    },
    /**
     * 初始 dom 相关
     */
    initDom() {
      // 初始化dom
      this.domMap = this.getDomMap('static');
      // dom绑定动作
      this.initDomAction();
      if (this.domMap.content) {
        // 如果开启表头固定
        if (!this.isUseSingleTable && this.isFixHeader) {
          this.showFixHeader(this.domMap.content.getBoundingClientRect().top);
          window.addEventListener('scroll', () => {
            this.showFixHeader(this.domMap.content.getBoundingClientRect().top, this.domMap.content.getBoundingClientRect().bottom);
          });
        }
        // 初始 stick 左右阴影是否显示
        if (this.domMap.left || this.domMap.right) {
          this.showLineShadow();
        }
        // 如果需要监听监听内容横向滚动条
        if ((this.domMap.left || this.domMap.right || this.isFixHeader) && this.domMap.content) {
          this.domMap.content.addEventListener('scroll', (e) => {
            const { target } = e;
            if (!this.isUseSingleTable) {
              this.scrollPosition('header', target.scrollLeft);
            }
            // 监听 stick 左右阴影是否显示
            if (this.domMap.left || this.domMap.right) {
              this.showLineShadow();
            }
          });
        }
      }
    },
    /**
     * 数据初始化
     */
    initData() {
      const { miniWidth } = this.config;
      this.colgroupData = [];
      this.dragGroup = [];
      this.dragColumns = [];
      this.resizeColumns = [];
      this.stickyLeftColumns = [];
      this.stickyRightColumns = [];
      this.tableColumns.forEach((column) => {
        // 汇总可以drag的列
        if (column.dragGroup) {
          if (!this.dragGroup.includes(column.dragGroup)) {
            this.dragGroup.push(column.dragGroup);
          }
          this.dragColumns.push(column.dataIndex);
        }
        // 汇总改变宽度的列
        if (column.resizeable) {
          this.resizeColumns.push(column.dataIndex);
        }
        this.colgroupData.push({
          width: column.width || miniWidth || '',
        });
        if (column.sticky) {
          if (column.sticky === 'left') {
            this.stickyLeftColumns.push(column.dataIndex);
          } else if (column.sticky === 'right') {
            this.stickyRightColumns.push(column.dataIndex);
          }
        }
      });
    },
    /**
     * 表头切换的时候重新绑定事件
     */
    initDomAction() {
      this.initResizeAction();
      this.initDragAction();
    },
    initResizeAction() {
      // 如果存在拖动改变列宽的列，则设置 mousedown 监听
      this.$nextTick(() => {
        if (this.resizeColumns && this.resizeColumns.length > 0) {
          this.resizeThrottle = this.getResize;// throttle(this.getResize, 1); 使用的lodash的throttle，打开需安装lodash
          const resizeDom = document.querySelectorAll('.x-resize-dom-handle');
          resizeDom.forEach((dom) => {
            const domCopy = dom;
            domCopy.removeEventListener('pointerdown', this.doResize);
            domCopy.onpointerdown = this.doResize;
            // dom.addEventListener('mousedown', this.doResize, false);
          });
        }
      });
    },
    initDragAction() {
      // 如果存在列拖动交换的列
      this.$nextTick(() => {
        if (this.dragGroup && this.dragGroup.length > 0) {
          this.doDrag();
        }
      });
    },
    /**
     * 根据 storage 的缓存顺序和宽度，重置
     */
    resetColumnsByStorage() {
      const { key } = this.config;
      const storageData = getStorage(key);
      let curColumns = this.columns;
      if (!this.isUseStorage) {
        // 删除
        if (storageData) {
          removeStorage(key);
        }
      } else {
        // 获取
        const newColumns = [];
        const hadColumns = [];
        if (storageData && Array.isArray(storageData)) {
          storageData.forEach((item) => {
            const columnData = this.getColumnDataByDataIndex(item.dataIndex);
            if (columnData) {
              newColumns.push({
                ...columnData,
                width: item.width,
              });
              hadColumns.push(item.dataIndex);
            }
          });
          // 验证现有 column 数据
          let isHasNoStorageColumn = false;
          this.columns.forEach((item) => {
            if (!hadColumns.includes(item.dataIndex)) {
              isHasNoStorageColumn = true;
            }
          });
          // 如果 缓存的 columns 和 当前的不一样，则取当前的
          if (!isHasNoStorageColumn) {
            curColumns = newColumns;
          }
        }
      }
      this.tableColumns = cloneDeep(curColumns);
      this.tableColumnsHead = cloneDeep(curColumns);
    },
    /**
     * 通过 dataIndex 获取 column 的值
     */
    getColumnDataByDataIndex(dataIndex) {
      let backData;
      this.columns.forEach((item) => {
        if (item.dataIndex === dataIndex) {
          backData = item;
          return false;
        }
        return true;
      });
      return backData;
    },
    /**
     * 初始化百分比的宽度到数字，小数点后2位
     */
    initColumnPercentWidth() {
      const columnData = [];
      this.columns.forEach((column) => {
        const itemData = column;
        if (itemData.width) {
          const widthStr = String(column.width);
          if (widthStr.substring(widthStr.length - 1) === '%') {
            itemData.width = (this.wrapAreaWidth * (parseFloat(itemData.width) / 100)).toFixed(0);
            itemData.width = `${itemData.width}px`;
          }
        }
        columnData.push(itemData);
      });
      this.tableColumns = cloneDeep(columnData);
      this.tableColumnsHead = cloneDeep(columnData);
    },
    /**
     * 重置列宽，如果列宽小于表格区域宽度，则最后一列自适应，如果最后一列也设置了宽度，强制取消
     */
    initColumnWidth() {
      const { miniWidth } = this.config;
      let totalColumnWidth = 0;
      let withOutLastColumnWidth = 0;
      let settleColumnWidth = 0;
      const totalLength = this.tableColumns.length;
      const lockedColumns = []; // index
      const settleWidthColumns = []; // 已设置的宽度的列
      const emptyWidthColumns = []; // 未设置的宽度的列
      this.tableColumns.forEach((column, index) => {
        if (column.widthLock && column.width) {
          lockedColumns.push(index);
        } else if (column.width) {
          settleWidthColumns.push(index);
        } else {
          emptyWidthColumns.push(index);
        }
      });
      // 先给表格使用默认设置最小设置，如果小于最小设置的话，
      this.tableColumns.forEach((column, index) => {
        let curColumnWidth = 0;
        if (column.width) {
          curColumnWidth = parseFloat(column.width);
          settleColumnWidth += curColumnWidth;
        } else if (miniWidth) {
          curColumnWidth = parseFloat(miniWidth);
        }
        totalColumnWidth += curColumnWidth;
        if (index < (totalLength - 1)) {
          withOutLastColumnWidth += curColumnWidth;
        }
      });
      if (totalColumnWidth < this.wrapAreaWidth) {
        const lastWithoutSettleWidth = this.wrapAreaWidth - settleColumnWidth;
        const emptyColumnLength = emptyWidthColumns.length;
        const settleColumnLength = settleWidthColumns.length;
        if (emptyColumnLength > 0) {
          // 如果有未设置宽度的
          const modWidth = lastWithoutSettleWidth % emptyColumnLength;
          const everyWidth = (lastWithoutSettleWidth - modWidth) / emptyColumnLength;
          emptyWidthColumns.forEach((itemIndex, index) => {
            let curItemWidth = 0;
            if (index === (emptyColumnLength - 1)) {
              curItemWidth = everyWidth + modWidth;
            } else {
              curItemWidth = everyWidth;
            }
            this.tableColumns[itemIndex].width = `${curItemWidth}px`;
          });
        } else if (settleColumnLength > 0) {
          this.tableColumns[settleWidthColumns[settleColumnLength - 1]].width = `${this.wrapAreaWidth - withOutLastColumnWidth}px`;
        }
      }
    },
    /**
     * 获取dom
     */
    getDomMap(type, dom = '') {
      let backData;
      switch (type) {
        case 'static':
          backData = {
            left: document.getElementById(this.domInit.left),
            right: document.getElementById(this.domInit.right),
            content: document.getElementById(this.domInit.content),
          };
          break;
        default:
          backData = document.getElementById(this.domInit[dom]);
          break;
      }
      return backData;
    },
    /**
     * 显示/隐藏 sticky 左右的列阴影
     */
    showLineShadow() {
      const leftDistance = this.domMap.content.scrollLeft;
      const rightDistance = this.domMap.content.clientWidth + this.domMap.content.scrollLeft === this.domMap.content.scrollWidth;
      const leftHeaderShadowDom = this.getDomMap('dynamic', 'leftHeader');
      const rightHeaderShadowDom = this.getDomMap('dynamic', 'rightHeader');
      if (this.domMap.left) {
        this.domMap.left.style.display = (leftDistance && this.showData.length) ? 'block' : 'none';
        if (leftHeaderShadowDom) {
          leftHeaderShadowDom.style.display = leftDistance ? 'block' : 'none';
        }
      }
      if (this.domMap.right) {
        this.domMap.right.style.display = (rightDistance || !this.showData.length) ? 'none' : 'block';
        if (rightHeaderShadowDom) {
          rightHeaderShadowDom.style.display = rightDistance ? 'none' : 'block';
        }
      }
    },
    /**
     * 监听滚动，并同步
     * @param target 目标
     * @param leftDistance 距离左边的距离
     */
    scrollPosition(target, leftDistance) {
      switch (target) {
        case 'header':
          this.getDomMap('dynamic', 'header').scrollTo(leftDistance, 0);
          break;
        case 'content':
        default:
          this.domMap.content.scrollTo(leftDistance, 0);
          break;
      }
    },
    /**
     * 是否显示固定顶部头部
     * @param top 顶部离可视窗口的距离
     * @param bottom 底部离可视窗口的距离
     */
    showFixHeader(top, bottom) {
      if (top <= 48) {
        this.isFixedHeader = true;
      } else {
        this.isFixedHeader = false;
      }
      this.$nextTick(() => {
        const fixHeaderDom = this.getDomMap('dynamic', 'header');
        if (fixHeaderDom) {
          fixHeaderDom.style.display = bottom < 5 ? 'none' : 'block';
        }
      });
    },
    /**
     * 初始 header 里的距离，sticky 阴影的显示
     */
    /* fix 表格头和固定头切换时候使用，暂取消
    initFixHeader() {
      if (!this.isInitFixedHeader) {
        this.isInitFixedHeader = true;
        this.scrollPosition('header', this.domMap.content.scrollLeft);
        this.showLineShadow();
        this.getDomMap('dynamic', 'header').addEventListener('scroll', (e) => {
          const { target } = e;
          this.scrollPosition('content', target.scrollLeft);
        });
      }
    },
    */
    /**
     * row expand 的状态
     * @param rowData
     * @return {string}
     */
    getExpandStatus(rowData) {
      const expandKey = rowData[this.config.rowKey];
      let backData = '';
      if (this.expandData[expandKey]) {
        backData = this.expandData[expandKey].isOpen ? 'open' : 'close';
      }
      return backData;
    },
    /**
     * 获取当前页显示的数据
     * getRowSpan为设置当前页的行合并数据
     */
    getShowData() {
      const begin = (this.pageDataUse.page - 1) * this.pageDataUse.size;
      const end = begin + this.pageDataUse.size;
      // this.showData = this.getRowSpan(this.dataUse.slice(begin, end));
      let useData = [];
      if (this.pivotTable && this.pivotTable.length > 0) {
        useData = this.getPivotTableData(this.dataUse.slice(begin, end));
      } else {
        useData = this.getRowSpan(this.dataUse.slice(begin, end));
      }
      this.getShowDataWithExpand(useData);
    },
    /**
     * 设置 showData 里的 expand 数据
     * @param useData
     * @param rowKeys 需要添加 expand 数据的 rowKeys
     */
    getShowDataWithExpand(useData, rowKeys) {
      const { expandData } = this;
      const newShowData = [];
      useData.forEach((item) => {
        newShowData.push(item);
        const expandKey = item[this.config.rowKey];
        let isAllow = true;
        if (rowKeys) {
          if (!rowKeys.includes(String(expandKey))) {
            isAllow = false;
          }
        } else {
          isAllow = expandData && expandData[expandKey] && expandData[expandKey].isOpen;
        }
        if (isAllow) {
          // 没有渲染过
          let curExpandData = [];
          const expandType = expandData[expandKey].type;
          switch (expandType) {
            case 'span':
            case 'data':
              curExpandData = expandData[expandKey].data;
              break;
            default:
              break;
          }
          if (curExpandData.length > 0) {
            curExpandData.forEach((curData) => {
              const useCurData = curData;
              if (expandType === 'span') {
                const { dataIndex } = this.getExpandSpanColumnData;
                let curValue = '';
                if (curData[dataIndex]) {
                  if (typeof curData[dataIndex] === 'object') {
                    curValue = curData[dataIndex].value;
                  } else {
                    curValue = curData[dataIndex];
                  }
                }
                useCurData[dataIndex] = {
                  value: curValue,
                  colSpan: this.columns.length,
                  rowSpan: 1,
                };
              }
              useCurData.$expandKey = this.getExpandRowRefKey(expandKey);
              useCurData.$expandType = expandType;
              newShowData.push(useCurData);
            });
          }
        }
      });
      this.showData = newShowData;
    },
    /**
     * 获取 expand 的 tr 的 getExpandRowRefKey
     */
    getExpandRowRefKey(expandKey) {
      return `ex-${expandKey}`;
    },
    /**
     * expand，从显示中找到有显示并打开的，如果没有 dom，证明需要把 expand 数据添加进去
     * @params expandActionData
     */
    openExpand(expandActionData) {
      const { expandData } = this;
      const needAddExpandRowKeys = [];
      Object.keys(expandActionData).forEach((expandKey) => {
        // 判断 dom 是否已经存在
        const expandDom = this.$refs[this.getExpandRowRefKey(expandKey)];
        if (expandData && expandData[expandKey]) {
          if (expandActionData[expandKey] === 'open') {
            expandData[expandKey].isOpen = true;
            if (expandDom && expandDom.length > 0) {
              this.switchExpand(expandDom, true);
            } else {
              // 需要添加数据到showData
              needAddExpandRowKeys.push(expandKey);
            }
          } else {
            expandData[expandKey].isOpen = false;
            this.switchExpand(expandDom, false);
          }
        }
      });
      if (needAddExpandRowKeys.length > 0) {
        this.getShowDataWithExpand(this.showData, needAddExpandRowKeys);
      }
    },
    /**
     * 开关 expandData
     * @param expandDom array
     * @param isOpen boolean
     */
    switchExpand(expandDom, isOpen) {
      if (expandDom) {
        const expandDomCopy = expandDom;
        for (let i = 0; i < expandDomCopy.length; i += 1) {
          if (isOpen) {
            expandDomCopy[i].style.display = '';
          } else {
            expandDomCopy[i].style.display = 'none';
          }
        }
      }
    },
    /**
     * 获取sticky的方向 left/right
     * @param dataIndex 列索引
     * @return {string} 方向
     */
    getStickyDirection(dataIndex) {
      let backData = '';
      if (this.isSticky) {
        if (this.stickyLeftColumns.includes(dataIndex)) {
          backData = 'left';
        } else if (this.stickyRightColumns.includes(dataIndex)) {
          backData = 'right';
        }
      }
      return backData;
    },
    /**
     * 获取固定列的宽度
     * @param index 当前的列索引
     * @param total 总共固定的列数
     * @param direction 方向 left/right
     * @param from sticky/shadow 默认sticky，shadow为滚动阴影
     * @return {string} 宽度
     */
    getStickyDistance(index, total, direction, from = 'sticky') {
      let distance = 0;
      if (total > 0) {
        if (direction === 'left') {
          for (let i = 0; i < index; i += 1) {
            distance += parseInt(this.colgroupData[i].width, 10);
          }
        } else if (direction === 'right') {
          for (let i = total; i > index; i -= 1) {
            distance += parseInt(this.colgroupData[i].width, 10);
          }
        }
        if (from === 'shadow') {
          if (direction === 'left') {
            distance -= 1;
          } else if (direction === 'right') {
            distance = this.wrapAreaWidth - distance;
            distance -= 1;
          }
        }
      }
      return `${distance}px`;
    },
    /**
     * 主要获取 colSpan 时的宽度
     * @param columnIndex 当前列的索引
     * @param colSpan 当前合并的列数
     * @return {*}
     */
    getTdWidth(columnIndex, colSpan) {
      let backWidth = this.colgroupData[columnIndex].width;
      if (colSpan > 1) {
        for (let i = 1; i < colSpan; i += 1) {
          backWidth += this.colgroupData[columnIndex + i].width;
        }
      }
      return backWidth;
    },
    /**
     * 监听拖动事件，监听鼠标拖动和鼠标的松开。防抖效果不好，去除
     * @param e 拖动的event
     */
    doResize(e) {
      const domIndex = e.target.parentNode.cellIndex;
      this.initResize = {
        index: domIndex,
        width: parseInt(e.target.parentElement.offsetWidth, 10),
        x: e.clientX,
        y: e.clientY,
      };
      e.target.onpointermove = this.resizeThrottle;
      e.target.setPointerCapture(e.pointerId);
      e.target.onpointerup = this.stopResize;
      // document.documentElement.addEventListener('mousemove', this.resizeThrottle, false);
      // document.documentElement.addEventListener('mouseup', this.stopResize, false);
    },
    /**
     * 开始拖动列宽，区间为 config里的最大、最小值
     * @param e 拖动的event
     */
    getResize(e) {
      let width = this.initResize.width + (e.clientX - this.initResize.x);
      if (width > this.config.resizeMax) {
        width = this.config.resizeMax;
      } else if (width < this.config.resizeMin) {
        width = this.config.resizeMin;
      }
      width = Math.round(width);
      this.setResize(`${width}px`);
    },
    /**
     * 设置拖动列的宽度
     */
    setResize(width) {
      this.colgroupData.splice(this.initResize.index, 1, {
        width,
      });
      this.setColumnsStorage();
    },
    /**
     * 结束拖动更改列宽，去除监听事件
     */
    stopResize(e) {
      e.target.onpointermove = null;
      e.target.releasePointerCapture(e.pointerId);
      // document.documentElement.removeEventListener('mousemove', this.resizeThrottle, false);
      // document.documentElement.removeEventListener('mouseup', this.stopResize, false);
    },
    /**
     * 表头互换，借助第三方sortablejs
     * 表头可按组互换，组之间隔离
     */
    doDrag() {
      const wrapperTr = document.querySelector('.x-head-dom tr');
      if (wrapperTr) {
        const that = this;
        Sortable.create(wrapperTr, {
          animation: 180,
          delay: 0,
          draggable: '.x-drag-dom',
          handle: '.x-drag-dom-handle',
          onMove(evt) {
            let backStatus = true;
            const dragGroupTo = evt.related.attributes?.group?.value;
            const dragGroupFrom = evt.dragged.attributes?.group?.value;
            if (!(dragGroupTo && dragGroupFrom && dragGroupTo === dragGroupFrom)) {
              backStatus = false;
            }
            return backStatus;
          },
          onEnd({ newIndex, oldIndex }) {
            if (newIndex !== oldIndex) {
              const newItem = that.tableColumns[newIndex];
              const oldItem = that.tableColumns[oldIndex];
              const newGroupItem = that.colgroupData[newIndex];
              const oldGroupItem = that.colgroupData[oldIndex];
              that.tableColumns.splice(newIndex, 1, oldItem);
              that.tableColumns.splice(oldIndex, 1, newItem);
              that.tableColumnsHead.splice(newIndex, 1, oldItem);
              that.tableColumnsHead.splice(oldIndex, 1, newItem);
              that.colgroupData.splice(newIndex, 1, oldGroupItem);
              that.colgroupData.splice(oldIndex, 1, newGroupItem);
              that.setColumnsStorage();
              that.initResizeAction();
            }
          },
        });
      }
    },
    /**
     * 是否需要搜索
     */
    isHasSearch() {
      let backData = false;
      if (this.searchData) {
        Object.keys(this.searchData).forEach((key) => {
          if (this.searchData[key]) {
            backData = true;
            return false;
          }
          return true;
        });
      }
      return backData;
    },
    /**
     * 是否需要筛选
     */
    isHasFilter() {
      let backData = false;
      if (this.filterData) {
        Object.keys(this.filterData).forEach((key) => {
          if (this.filterData[key] && this.filterData[key].length > 0) {
            backData = true;
            return false;
          }
          return true;
        });
      }
      return backData;
    },
    /**
     * 排序状态变为 init 时候，数据的初始化，去 search 和 filter, 或者 filter 后，去计算其它的
     * @param from 上一步操作是什么 sort/filter/search
     */
    doReInitData(from) {
      if (this.dataUse && this.dataUse.length > 1) {
        switch (from) {
          case 'search':
            if (this.isHasFilter()) {
              this.dataUse = this.getFilterData(this.dataUse, this.filterData);
            }
            this.doSortData(this.sortData.dataIndex, this.sortData.sortType);
            break;
          case 'filter':
            if (this.isHasSearch()) {
              this.dataUse = this.getSearchData(this.dataUse, this.searchData);
            }
            this.doSortData(this.sortData.dataIndex, this.sortData.sortType);
            break;
          case 'sort':
            if (this.isHasFilter()) {
              this.dataUse = this.getFilterData(this.dataUse, this.filterData);
            }
            if (this.isHasSearch()) {
              this.dataUse = this.getSearchData(this.dataUse, this.searchData);
            }
            break;
          case 'init':
            if (this.isHasFilter()) {
              this.dataUse = this.getFilterData(this.dataUse, this.filterData);
            }
            if (this.isHasSearch()) {
              this.dataUse = this.getSearchData(this.dataUse, this.searchData);
            }
            this.doSortData(this.sortData.dataIndex, this.sortData.sortType);
            break;
          default:
            break;
        }
      }
    },
    /**
     * 表头搜索数据，搜索完对结果数据排序
     * @param searchData { key: value } key 对应 dataIndex, value(string) 对应查询关键词
     */
    doSearch(searchData) {
      this.dataUse = this.getSearchData(this.data, searchData);
      this.doReInitData('search');
      this.resetPage('search');
    },
    /**
     * 表头搜索数据计算
     * @param data 需要查询的数据
     * @param Object searchData // { key: value } key 对应 dataIndex, value(string) 对应查询关键词
     * @return {array}
     */
    getSearchData(data, searchData) {
      return this.getSearchFilterData('search', data, searchData);
    },
    /**
     * 表头筛选数据，筛选完对对结果数据排序
     * @param filterData { key: value } key 对应 dataIndex，value(array) 对应已选中的
     */
    doFilter(filterData) {
      this.dataUse = this.getFilterData(this.data, filterData);
      this.doReInitData('filter');
      this.resetPage('filter');
      this.showLineShadow();
    },
    /**
     * 表头筛选数据计算
     * 如果 expand 参与筛选，先选出符合条件的 expand 的父id，然后再筛选 data 数据
     * @param data 需要筛选的数据
     * @param Object filterData { key: value } key 对应 dataIndex, value(array) 对应已选中的
     * @return {array}
     */
    getFilterData(data, filterData) {
      return this.getSearchFilterData('filter', data, filterData);
    },
    /**
     * 获取查询的数据计算，主要筛选出符合条件的父节点，子里面只有有一个符合的，父和所有子全部显示
     * @param from filter / search
     * @param Object searchFilterData // { key: value } key 对应 dataIndex, value(string) 对应查询关键词
     * @return {array}
     */
    getSearchFilterData(from, data, filterSearchData) {
      const expandRowKeys = this.getSearchFilterExpandData(from, filterSearchData);
      return data.filter((itemData) => {
        let backData = true;
        const rowKey = itemData[this.config.rowKey];
        Object.keys(filterSearchData).forEach((key) => {
          let isUseful = false;
          if (filterSearchData[key]) {
            if (from === 'filter') {
              isUseful = filterSearchData[key].length > 0;
            } else {
              isUseful = true;
            }
          }
          if (isUseful) {
            let curValue = '';
            if (itemData[key]) {
              curValue = itemData[key].value || itemData[key];
            }
            let isInclude = false;
            if (from === 'filter') {
              isInclude = filterSearchData[key].includes(curValue);
            } else if (from === 'search') {
              isInclude = curValue.includes(filterSearchData[key]);
            }
            if (!isInclude) {
              backData = false;
            }
          }
        });
        // 如果某列的父不在，但子在，则也显示
        if (!backData && expandRowKeys.length > 0 && expandRowKeys.includes(String(rowKey))) {
          backData = true;
        }
        if (backData && this.expendFilterSearchResultShowType === 'open' && this.expandData[rowKey]) {
          this.expandData[rowKey].isOpen = true;
        }
        return backData;
      });
    },
    /**
     * 获取符合条件的expand的数据
     * @param from
     * @param filterSearchData
     * @return {array}
     */
    getSearchFilterExpandData(from, filterSearchData) {
      const { expandData } = this;
      const rowKeys = [];
      if (this.expandJoinFilterSearchColumns && this.expandJoinFilterSearchColumns.length > 0 && expandData) {
        const usedFilterSearchData = {};
        Object.keys(filterSearchData).forEach((dataIndex) => {
          if (this.expandJoinFilterSearchColumns.includes(dataIndex)) {
            usedFilterSearchData[dataIndex] = filterSearchData[dataIndex];
          }
        });
        if (Object.keys(usedFilterSearchData).length > 0) {
          Object.keys(expandData).forEach((rowKey) => {
            const curExpandData = expandData[rowKey];
            let curExpandHasResult = false;
            // 合并列模式不参与
            if (curExpandData && curExpandData.type === 'data' && curExpandData.data && curExpandData.data.length > 0) {
              curExpandData.data.forEach((itemData) => {
                let backData = true;
                if (!rowKeys.includes(rowKey)) {
                  Object.keys(usedFilterSearchData).forEach((key) => {
                    let isUseful = false;
                    if (usedFilterSearchData[key]) {
                      if (from === 'filter') {
                        isUseful = usedFilterSearchData[key].length > 0;
                      } else {
                        isUseful = true;
                      }
                    }
                    if (isUseful && this.expandJoinFilterSearchColumns.includes(key)) {
                      let curValue = '';
                      if (itemData[key]) {
                        curValue = itemData[key].value || itemData[key];
                      }
                      let isInclude = false;
                      if (from === 'filter') {
                        isInclude = usedFilterSearchData[key].includes(curValue);
                      } else if (from === 'search') {
                        isInclude = curValue.includes(usedFilterSearchData[key]);
                      }
                      if (!isInclude) {
                        backData = false;
                        return false;
                      }
                    }
                    return true;
                  });
                  if (backData) {
                    rowKeys.push(rowKey);
                    curExpandHasResult = true;
                  }
                }
                return backData;
              });
            }
            if (curExpandHasResult) {
              if (this.expendFilterSearchResultShowType !== 'close') {
                expandData[rowKey].isOpen = true;
              }
            } else {
              expandData[rowKey].isOpen = false;
            }
          });
        }
      }
      return rowKeys;
    },
    /**
     *  表头排序
     * @param dataIndex 排序列的data索引
     * @param sortType 排序方式 init/up/down
     */
    doSort(dataIndex, sortType) {
      switch (sortType) {
        case 'down':
        case 'up':
          this.doSortData(dataIndex, sortType);
          break;
        case 'init':
        default:
          this.dataUse = [...this.data];
          this.doReInitData('sort');
          break;
      }
      this.toggleSortStatus(dataIndex, sortType);
      this.getShowData();
    },
    /**
     * 按列对数据进行排序
     * @param dataIndex 排序列的data索引
     * @param sortType 排序方式 init/up/down
     * @return {array}
     */
    doSortData(dataIndex, sortType) {
      if (sortType && sortType !== 'init') {
        this.dataUse.sort((prev, next) => {
          let back = 0;
          let prevValue = '';
          let nextValue = '';
          if (prev[dataIndex]) {
            prevValue = prev[dataIndex].value || prev[dataIndex];
          }
          if (next[dataIndex]) {
            nextValue = next[dataIndex].value || next[dataIndex];
          }
          if (sortType === 'up') {
            if (prevValue < nextValue) {
              back = -1;
            } else if (prevValue > nextValue) {
              back = 1;
            }
          } else if (sortType === 'down') {
            if (prevValue > nextValue) {
              back = -1;
            } else if (prevValue < nextValue) {
              back = 1;
            }
          }
          return back;
        });
      }
    },
    /**
     * 每次只能有一列排序，恢复其余的排序为init类型
     * @param dataIndex 排序列的data索引
     * @param sortType 当前使用的排序方式
     */
    toggleSortStatus(dataIndex, sortType) {
      const newTableColumnsHead = this.tableColumnsHead.map((item) => {
        const backData = { ...item };
        if (item.dataIndex === dataIndex) {
          backData.sort = sortType;
        } else if (item.sort) {
          backData.sort = 'init';
        }
        return backData;
      });
      this.tableColumnsHead = newTableColumnsHead;
    },
    /**
     * 重置页码，主要为了通知和父组件和驱动当前更新的数据更新
     * 如果当前数据的总条数的最大页码小于当前的页码（主要是查询和筛选），则重置页码为最大的页码
     * @param type 类型 filter/search/page
     * @param page 页码（可选）
     */
    resetPage(type, page = '') {
      let currentPage = page;
      if (!page) {
        currentPage = this.pageDataUse.page;
        if (this.maxPage < this.pageDataUse.page) {
          currentPage = this.maxPage;
        }
      }
      if (currentPage === this.pageDataUse.page) {
        this.getShowData();
      }
      this.emitTo(type, {
        page: currentPage, // 当前页码
        total: this.dataAmount, // 当前条件下的数据总条数
      });
    },
    /**
     * 如果开启透视表 pivotTable，重组数组的 rowSpan
     * @param data 当前分页的数据
     * @return {object}
     */
    getPivotTableData(data) {
      let backData = data;
      const pivotTableLength = this.pivotTable.length;
      for (let i = 0; i < pivotTableLength; i += 1) {
        backData = this.computePivotTableData(this.pivotTable[i - 1], this.pivotTable[i], backData);
      }
      return backData;
    },
    /**
     * 计算分组的 rowSpan
     * @param dataIndex 当前透视的列
     * @param data 当前分组的数据
     * @return {object}
     */
    computePivotTableData(preDataIndex, dataIndex, data) {
      const dataLength = data.length - 1;
      const backData = [];
      if (dataLength > 1) {
        let groupIndex = 0;
        let spanRowNumber = 1;
        for (let i = dataLength; i >= 1; i -= 1) {
          backData[i] = { ...data[i] };
          const valueIsObject = typeof data[i][dataIndex] === 'object';
          const preValueIsObject = typeof data[i - 1][dataIndex] === 'object';
          const value = valueIsObject ? data[i][dataIndex].value : data[i][dataIndex];
          const preValue = preValueIsObject ? data[i - 1][dataIndex].value : data[i - 1][dataIndex];
          let isSameGroup = true;
          if (preDataIndex) {
            if (data[i][preDataIndex].groupIndex !== data[i - 1][preDataIndex].groupIndex) {
              isSameGroup = false;
            }
          }
          if (isSameGroup && value === preValue) {
            spanRowNumber += 1;
            backData[i][dataIndex] = {
              rowSpan: 0,
              colSpan: valueIsObject ? data[i][dataIndex].colSpan : 1,
              value,
              groupIndex,
            };
          } else {
            backData[i][dataIndex] = {
              rowSpan: spanRowNumber,
              colSpan: valueIsObject ? data[i][dataIndex].colSpan : 1,
              value,
              groupIndex,
            };
            spanRowNumber = 1;
            groupIndex += 1;
          }
          // 补全最后一个
          if (i === 1) {
            backData[i - 1] = { ...data[i - 1] };
            backData[i - 1][dataIndex] = {
              rowSpan: spanRowNumber,
              colSpan: preValueIsObject ? data[i - 1][dataIndex].colSpan : 1,
              value: preValue,
              groupIndex,
            };
          }
        }
      }
      return backData;
    },
    /**
     * 获取行合并，主要考虑分页
     * @param data 当前分页的数据
     * @return {object}
     */
    getRowSpan(data) {
      const dataCopy = data;
      if (dataCopy && dataCopy.length > 0) {
        const length = dataCopy.length - 1;
        const rowSpanObj = {};
        const firstRowEmptySpanKeys = [];
        Object.keys(dataCopy[0]).forEach((dataIndex) => {
          rowSpanObj[dataIndex] = 1;
          if (dataCopy[0][dataIndex].rowSpan === 0) {
            firstRowEmptySpanKeys.push(dataIndex);
          }
        });
        for (let i = length; i >= 0; i -= 1) {
          Object.keys(dataCopy[i]).forEach((dataIndex) => {
            const curRowSpan = dataCopy[i][dataIndex].rowSpan;
            if (curRowSpan === 0) {
              rowSpanObj[dataIndex] += 1;
            } else if (curRowSpan > 1) {
              dataCopy[i][dataIndex].rowSpan = rowSpanObj[dataIndex];
              rowSpanObj[dataIndex] = 1;
            } else if (curRowSpan) {
              dataCopy[i][dataIndex].rowSpan = 1;
            }
          });
        }
        if (firstRowEmptySpanKeys.length > 0) {
          for (let i = 0; i < firstRowEmptySpanKeys.length; i += 1) {
            const dataIndex = firstRowEmptySpanKeys[i];
            dataCopy[0][dataIndex].rowSpan = rowSpanObj[dataIndex];
            rowSpanObj[dataIndex] = 1;
            if (this.pageDataUse.page > 1) {
              dataCopy[0][dataIndex].value = this.getLastRowSpanValue(dataIndex);
            }
          }
        }
      }
      return dataCopy;
    },
    /**
     * 避免 page 截断 rowSpan，然后当前 page 获取不到列的值
     * @param dataIndex
     * @return {string}
     */
    getLastRowSpanValue(dataIndex) {
      let backValue = '';
      const begin = (this.pageDataUse.page - 1) * this.pageDataUse.size - 1;
      for (let i = begin; i >= 0; i -= 1) {
        if (this.dataUse[i][dataIndex].rowSpan > 0) {
          backValue = this.dataUse[i][dataIndex].value;
          break;
        }
      }
      return backValue;
    },
    /**
     * 客户端缓存用户更换的顺序和表格宽度
     */
    setColumnsStorage() {
      if (this.isUseStorage) {
        const curStorageColumns = [];
        this.tableColumns.forEach((column, index) => {
          curStorageColumns.push({
            dataIndex: column.dataIndex,
            width: this.colgroupData[index]?.width || column.width,
          });
        });
        const { key } = this.config;
        setStorage(key, curStorageColumns);
      }
    },
    /**
     * emit数据
     * @param type
     * @param data
     */
    emitTo(type, data) {
      this.$emit('handleTable', {
        type,
        data,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@bgColor: #cccccc;
@lineColor: #e8e8e8;
@headerBgColor: #fafafa;
.x-table-wrapper {
  .x-table-area {
    position: relative;
    -webkit-overflow-scrolling: touch;
    .x-sticky-shadow{
      height: calc(100% - 48px);
      position: absolute;
      box-sizing: border-box;
      width: 1px;
      z-index: 998;
      top: 48px;
      background-color: @lineColor;
    }
    .x-sticky-left-shadow{
      display: none;
      box-shadow: 2px 0 5px rgba(173, 179, 190, 0.44);
    }
    .x-sticky-right-shadow{
      display: none;
      box-shadow: -2px 0 5px rgba(173, 179, 190, 0.44);
    }
    .x-table-fix-header{
      top: 0;
      left: 0;
      z-index: 999;
      .x-sticky-shadow{
        height: 48px;
        top: 0;
      }
      .x-table-content {
        -ms-overflow-style: none; /* IE 10+ */
        scrollbar-width: none; /* Firefox */
      }
      .x-table-content::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
    }
    .x-table-border {
      border: 1px solid @lineColor;
    }
    .x-table-border-no-top {
      border-left: 1px solid @lineColor;
      border-right: 1px solid @lineColor;
      border-bottom: 1px solid @lineColor;
    }
    .x-table-border-no-bottom {
      border-left: 1px solid @lineColor;
      border-right: 1px solid @lineColor;
      border-top: 1px solid @lineColor;
    }
    /deep/ .x-resize-dom-handle {
      position: absolute;
      right: 1px;
      top: 10px;
      display: none;
      width: 2px;
      height: 20px;
      background-color: @bgColor;
      cursor: col-resize;
    }
    /deep/ .x-drag-dom-handle{
      position: absolute;
      left: 3px;
      display: none;
      cursor: move;
      top: 1px;
    }
    .x-fixed-table {
      border-collapse: collapse;
      table-layout: fixed;
    }
    /deep/ .x-td-border {
      td{
        &:after{
          content: '';
          display: block;
          width: 1px;
          height: 100%;
          background-color: @lineColor;
          position: absolute;
          right: 0;
          top: 0;
        }
        &:before {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background-color: @lineColor;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        &:last-child{
          &:after{
            width: 0;
          }
        }
      }
      &.x-table-border-no-vertical {
        td::after {
          content: none;
        }
      }
    }
    /deep/ .x-head-dom {
      td {
        position: sticky;
        top: 0;
        z-index: 3;
        background-color: @headerBgColor;
        &:hover{
          .x-resize-dom-handle, .x-drag-dom-handle {
            display: inline-block;
          }
        }
        &:last-child {
          &:after{
            width: 0;
          }
        }
      }
    }
    td{
      background: #ffffff;
      position: relative;
      &.x-fixed-column {
        position: sticky;
      }
    }
    .x-table-content {
      width: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        height: 8px;
      }
      .x-no-data{
        height: 200px;
        text-align: center;
        vertical-align: center;
      }
      tbody tr:last-child {
        td {
          &:before {
            height: 0;
          }
        }
      }
      tfoot {
        border-top: 1px solid @lineColor;
      }
    }
  }
  .x-page-area{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
