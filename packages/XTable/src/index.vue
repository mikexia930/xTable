<template>
  <div class="x-table-wrapper">
    <div class="x-table-area">
      <div v-if="!isUseSingleTable" class="x-table-fix-header" :style="{ width: this.config.scrollWidth, position: isFixHeader && isFixedHeader ? 'fixed' : null }">
        <div :id="domInit.header" class="x-table-border x-table-content" :style="{ width: this.config.scrollWidth }">
          <table class="x-fixed-table">
            <colgroup>
              <col
                :key="`col-${index}`"
                v-for="(col, index) in colgroupData"
                :style="{ width: col.width, minWidth: col.width }"
              >
            </colgroup>
            <thead class="x-head-dom">
              <tr v-for="(titleItem, titleIndex) in title" :key="`t-${config.key}-${titleIndex}`">
                <template v-for="(columnItem, columnIndex) in tableColumnsHead">
                  <x-td
                    :key="`th-${config.key}-${titleItem[config.rowKey]}-${titleIndex}-${columnItem.dataIndex}`"
                    from="th"
                    :is-sticky="isSticky"
                    :no-wrap="config.noWrap"
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
            :style="{'right': getStickyDistance((tableColumns.length - 1 - stickyRightColumns.length), (tableColumns.length - 1), 'right', 'shadow')}"
          ></div>
        </div>
      </div>
      <div :id="domInit.content" class="x-table-border x-table-content" :style="styleTable">
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
              <tr v-for="(titleItem, titleIndex) in title" :key="`t-${config.key}-${titleIndex}`">
                <template v-for="(columnItem, columnIndex) in tableColumnsHead">
                  <x-td
                    :key="`th-${config.key}-${titleItem[config.rowKey]}-${titleIndex}-${columnItem.dataIndex}`"
                    from="th"
                    :is-sticky="isSticky"
                    :no-wrap="config.noWrap"
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
                    <slot name="nodata">
                      no data
                    </slot>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(rowItem, rowIndex) in showData" :key="`td-${config.key}-${rowItem[config.rowKey]}-${rowIndex}`">
                  <template v-for="(columnItem, columnIndex) in tableColumns">
                    <x-td
                      :key="`td-${config.key}-${rowItem[config.rowKey]}-${rowIndex}-${columnItem.dataIndex}`"
                      from="td"
                      :is-sticky="isSticky"
                      :no-wrap="config.noWrap"
                      :row-index="rowIndex"
                      :row-item="rowItem"
                      :column-index="columnIndex"
                      :column-item="columnItem"
                      :colgroup-data="colgroupData"
                      :sticky-left-columns="stickyLeftColumns"
                      :sticky-right-columns="stickyRightColumns"
                      :column-length="tableColumns.length"
                    >
                      <template v-slot:[`td-${columnItem.dataIndex}`]="{ record, text}">
                        <slot
                          :name="`td-${columnItem.dataIndex}`"
                          :record="record"
                          :text="text"
                        ></slot>
                      </template>
                    </x-td>
                  </template>
                </tr>
              </template>
            </tbody>
            <tfoot v-if="footerData && footerData.length > 0">
              <tr v-for="(rowItem, rowIndex) in footerShowData" :key="`tf-${config.key}-${rowItem[config.rowKey]}-${rowIndex}`">
                <template v-for="(columnItem, columnIndex) in tableColumns">
                  <x-td
                    :key="`tf-${config.key}-${rowItem[config.rowKey]}-${rowIndex}-${columnItem.dataIndex}`"
                    from="tf"
                    :is-sticky="isSticky"
                    :no-wrap="config.noWrap"
                    :row-index="rowIndex"
                    :row-item="rowItem"
                    :column-index="columnIndex"
                    :column-item="columnItem"
                    :colgroup-data="colgroupData"
                    :sticky-left-columns="stickyLeftColumns"
                    :sticky-right-columns="stickyRightColumns"
                    :column-length="tableColumns.length"
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
        :style="{'right': getStickyDistance((tableColumns.length - 1 - stickyRightColumns.length), (tableColumns.length - 1), 'right', 'shadow')}"
      ></div>
    </div>
    <div class="x-page-area">
      <slot name="page"></slot>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import XTd from './td.vue';

export default {
  name: 'x-table',
  props: {
    isUseSingleTable: Boolean, // 是否启用表头固定
    isFixHeader: Boolean, // 是否启用表头固定
    isSticky: Boolean, // 是否启用列固定，打开后columns里设置的sticky才有效果
    columns: Array, // 列数据
    title: Array, // 表头数据
    data: Array, // 表数据
    footerData: Array, // footer数据
    headerData: Array, // header数据，不同于表头，表头为固定，headerData为表头下面继续展示的数据
    config: Object, // 表格的配置
    pageData: Object, // 分页数据 { page: 当前页码，size：每页的条数 }
    sortData: Object, // 排序列数据 { dataIndex: 列索引, sortType: 排序方式 init/up/down }，同一时间只能对一个列排序
    searchData: Object, // { key1: string1, key2: string2 } key 为 dataIndex, string为查询关键词，多个查询会叠加作用
    filterData: Object, // { key1: array1, key2: array2 } key 为 dataIndex, array为已选中的值数组，多个筛选会叠加作用
  },
  components: {
    XTd,
  },
  data() {
    return {
      styleTable: {
        height: `${this.config.scrollHeight}`,
        width: `${this.config.scrollWidth}`,
      },
      tableColumns: [...this.columns],
      tableColumnsHead: [...this.columns], // 为了拖动表格后的顺序bug，单独生产一个头部使用的列数据
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
      dataUse: [...this.data], // 保留prop data 为了排序还原数据使用
      showData: [], // 分页显示的数据
      isFixedHeader: false,
      domMap: {},
    };
  },
  computed: {
    /**
     * 当前最大的页码
     */
    maxPage() {
      return Math.ceil(this.dataAmount / this.pageData.size) || 1;
    },
    /**
     * 当前数据条数
     */
    dataAmount() {
      return this.dataUse.length;
    },
    /**
     * dom的初始化，config.key 避免同一页使用多个table，getElementById重名
     */
    domInit() {
      return {
        header: `${this.config.key}-x-table-header`, // 表格包围dom
        content: `${this.config.key}-x-table-content`, // 表格包围dom
        left: `${this.config.key}-x-sticky-left-shadow`, // left sticky的阴影条
        right: `${this.config.key}-x-sticky-right-shadow`, // right sticky的阴影条
        leftHeader: `${this.config.key}-x-sticky-left-header-shadow`, // 表头 left sticky的阴影条
        rightHeader: `${this.config.key}-x-sticky-right-header-shadow`, // 表头 right sticky的阴影条
      };
    },
    /**
     * 表格footer数据，主要为了rowSpan的计算
     */
    footerShowData() {
      return this.getRowSpan(this.footerData);
    },
  },
  watch: {
    /**
     * 监听换页和切换每页显示条数
     */
    pageData: {
      handler() {
        this.resetPage('page');
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
    filterData(newVal) {
      this.doFilter(newVal);
    },
  },
  created() {
    this.initData();
  },
  mounted() {
    // 初始化dom
    this.domMap = this.getDomMap('static');
    // dom绑定动作
    this.initDomAction();
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
    if (this.domMap.left || this.domMap.right || this.isFixHeader) {
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
  },
  methods: {
    /**
     * 数据初始化
     */
    initData() {
      const { miniWidth } = this.config;
      this.columns.forEach((column) => {
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
      this.getShowData();
    },
    /**
     * 表头切换的时候重新绑定事件
     */
    initDomAction() {
      // 如果存在拖动改变列宽的列，则设置 mousedown 监听
      if (this.resizeColumns && this.resizeColumns.length > 0) {
        this.resizeThrottle = this.getResize;// throttle(this.getResize, 1); 使用的lodash的throttle，打开需安装lodash
        const resizeDom = document.querySelectorAll('.x-resize-dom-handle');
        resizeDom.forEach((dom) => {
          // dom.addEventListener('mousedown', this.doResize, false);
          const domCopy = dom;
          domCopy.onpointerdown = this.doResize;
        });
      }
      // 如果存在列拖动交换的列
      if (this.dragGroup && this.dragGroup.length > 0) {
        this.doDrag();
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
     * 显示 sticky 左右的列阴影
     */
    showLineShadow() {
      const leftDistance = this.domMap.content.scrollLeft;
      const rightDistance = this.domMap.content.clientWidth + this.domMap.content.scrollLeft === this.domMap.content.scrollWidth;
      const leftHeaderShadowDom = this.getDomMap('dynamic', 'leftHeader');
      const rightHeaderShadowDom = this.getDomMap('dynamic', 'rightHeader');
      if (this.domMap.left) {
        this.domMap.left.style.display = leftDistance ? 'block' : 'none';
        if (leftHeaderShadowDom) {
          leftHeaderShadowDom.style.display = leftDistance ? 'block' : 'none';
        }
      }
      if (this.domMap.right) {
        this.domMap.right.style.display = rightDistance ? 'none' : 'block';
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
      if (top <= 35) {
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
     * 获取当前页显示的数据
     * getRowSpan为设置当前页的行合并数据
     */
    getShowData() {
      const begin = (this.pageData.page - 1) * this.pageData.size;
      const end = begin + this.pageData.size;
      this.showData = this.getRowSpan(this.dataUse.slice(begin, end));
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
          distance += 2;
        } else if (direction === 'right') {
          distance += 3;
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
      const domIndex = e.target.parentNode.parentNode.cellIndex;
      this.initResize = {
        index: domIndex,
        width: parseInt(e.target.parentElement.parentElement.offsetWidth, 10),
        x: e.clientX,
        y: e.clientY,
      };
      // document.documentElement.addEventListener('mousemove', this.resizeThrottle, false);
      // document.documentElement.addEventListener('mouseup', this.stopResize, false);
      e.target.onpointermove = this.resizeThrottle;
      e.target.setPointerCapture(e.pointerId);
      e.target.onpointerup = this.stopResize;
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
      this.setResize(`${width}px`);
    },
    /**
     * 设置拖动列的宽度
     */
    setResize(width) {
      this.colgroupData.splice(this.initResize.index, 1, {
        width,
      });
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
              that.tableColumns.splice(newIndex, 1, oldItem);
              that.tableColumns.splice(oldIndex, 1, newItem);
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
     * @param searchData { key: value } key 对应 dataIndex, value(string) 对应查询关键词
     * @return {array}
     */
    getSearchData(data, searchData) {
      return data.filter((itemData) => {
        let backData = true;
        Object.keys(searchData).forEach((key) => {
          if (searchData[key]) {
            if ((itemData[key].value.toString()).includes(searchData[key])) {
              return false;
            }
            backData = false;
          }
          return true;
        });
        return backData;
      });
    },
    /**
     * 表头筛选数据，筛选完对对结果数据排序
     * @param filterData { key: value } key 对应 dataIndex，value(array) 对应已选中的
     */
    doFilter(filterData) {
      this.dataUse = this.getFilterData(this.data, filterData);
      this.doReInitData('filter');
      this.resetPage('filter');
    },
    /**
     * 表头筛选数据计算
     * @param data 需要筛选的数据
     * @param filterData { key: value } key 对应 dataIndex, value(array) 对应已选中的
     * @return {array}
     */
    getFilterData(data, filterData) {
      return data.filter((itemData) => {
        let backData = true;
        Object.keys(filterData).forEach((key) => {
          if (filterData[key] && filterData[key].length > 0) {
            if (filterData[key].includes(itemData[key].value)) {
              return false;
            }
            backData = false;
          }
          return true;
        });
        return backData;
      });
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
          if (sortType === 'up') {
            if (prev[dataIndex].value < next[dataIndex].value) {
              back = -1;
            } else if (prev[dataIndex].value > next[dataIndex].value) {
              back = 1;
            }
          } else if (sortType === 'down') {
            if (prev[dataIndex].value > next[dataIndex].value) {
              back = -1;
            } else if (prev[dataIndex].value < next[dataIndex].value) {
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
        currentPage = this.pageData.page;
        if (this.maxPage < this.pageData.page) {
          currentPage = this.maxPage;
        }
      }
      if (currentPage === this.pageData.page) {
        this.getShowData();
      }
      this.emitTo(type, {
        page: currentPage, // 当前页码
        total: this.dataAmount, // 当前条件下的数据总条数
      });
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
        let colSpan = 1;
        for (let i = length; i >= 0; i -= 1) {
          if (dataCopy[i].rowSpan === 0) {
            colSpan += 1;
          } else if (colSpan > 1) {
            dataCopy[i].colSpan = colSpan;
            colSpan = 1;
          } else {
            dataCopy[i].colSpan = 1;
          }
        }
        if (dataCopy[0].colSpan === 0) {
          dataCopy[0].colSpan = colSpan;
          colSpan = 1;
          if (this.pageData.page > 1) {
            dataCopy[0].value = this.getLastRowSpanValue();
          }
        }
      }
      return dataCopy;
    },
    /**
     * 避免 page 截断 colSpan，然后当前 page 获取不到列的值
     * @return {string}
     */
    getLastRowSpanValue() {
      let backValue = '';
      const begin = (this.pageData.page - 1) * this.pageData.size;
      for (let i = begin; i >= 0; i -= 1) {
        if (this.dataUse[i].colSpan > 0) {
          backValue = this.dataUse[i].value;
          break;
        }
      }
      return backValue;
    },
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
@lineColor: #cccccc;
@headerBgColor: #eeeeee;
.x-table-wrapper {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .x-table-area {
    position: relative;
    -webkit-overflow-scrolling: touch;
    .x-sticky-shadow{
      height: 100%;
      position: absolute;
      box-sizing: border-box;
      width: 1px;
      z-index: 1000;
      top: 0;
      background-color: #f0f0f0;
    }
    .x-sticky-left-shadow{
      display: none;
      box-shadow: 5px 0px 5px #000000;
    }
    .x-sticky-right-shadow{
      display: none;
      box-shadow: -5px 0px 5px #000000;
    }
    .x-table-fix-header{
      top: 0;
      left: 0;
      z-index: 10000;
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
    }
    .x-fixed-table {
      border-collapse: collapse;
      table-layout: fixed;
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
    .x-table-content {
      width: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
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
