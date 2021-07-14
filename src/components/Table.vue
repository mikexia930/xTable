<template>
  <div class="table-wrapper">
    <div class="table-area" :style="styleTable">
      <div id="x-table-content" class="table-border table-content" :style="styleTable">
        <table ref="tbody" class="fixed-table">
          <colgroup>
            <col
              :key="`col-${index}`"
              v-for="(col, index) in colgroupData"
              :style="{ width: col.width, minWidth: col.width }"
            >
          </colgroup>
          <thead class="head-dom">
            <tr v-for="(titleItem, titleIndex) in title" :key="`t-${titleIndex}`">
              <template v-for="(columnItem, columnIndex) in tableColumnsHead">
                <th
                  v-if="titleItem[columnItem.dataIndex].colSpan && titleItem[columnItem.dataIndex].rowSpan"
                  :colspan="titleItem[columnItem.dataIndex].colSpan > 1 ? titleItem[columnItem.dataIndex].colSpan : null"
                  :rowspan="titleItem[columnItem.dataIndex].rowSpan > 1 ? titleItem[columnItem.dataIndex].colSpan : null"
                  :key="`th-${titleIndex}-${columnIndex}`"
                  :group="titleIndex === 0 ? (columnItem.dragGroup || '') : ''"
                  :class="{
                    'drag-dom': titleIndex === 0 && dragColumns.includes(columnItem.dataIndex),
                    'fixed-column': getStickyDirection(columnItem.dataIndex)
                  }"
                  :style="getStickyDirection(columnItem.dataIndex) ? {
                    [getStickyDirection(columnItem.dataIndex)]: getStickyDistance(columnIndex, (tableColumnsHead.length - 1), getStickyDirection(columnItem.dataIndex)),
                    width: `${ colgroupData[columnIndex].width }`,
                    zIndex: 2 + (200-columnIndex)
                  } : {}"
                >
                  <slot :name="`th-name-${columnItem.dataIndex}`" :record="columnItem" :text="titleItem[columnItem.dataIndex].value">
                    <span>{{ titleItem[columnItem.dataIndex].value }}</span>
                  </slot>
                  <span v-if="columnItem.sort">
                    <slot
                      :name="`th-sort-${columnItem.dataIndex}`"
                      :record="columnItem"
                      :dataIndex="columnItem.dataIndex"
                    ></slot>
                  </span>
                  <span class="search-handle" v-if="titleIndex === 0 && columnItem.serach" :tabIndex="titleIndex">
                     <slot
                       :name="`th-search-${columnItem.dataIndex}`"
                       :record="columnItem"
                       :dataIndex="columnItem.dataIndex"
                     >
                     </slot>
                  </span>
                  <span class="drag-dom-handle" v-if="titleIndex === 0 && dragColumns.includes(columnItem.dataIndex)"></span>
                  <span class="resize-dom-handle" v-if="titleIndex === 0 && resizeColumns.includes(columnItem.dataIndex)"></span>
                </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rowItem, rowIndex) in showData" :key="`${rowItem[config.rowKey]}-${rowIndex}`">
              <template v-for="(columnItem, columnIndex) in tableColumns">
                <td
                  v-if="rowItem[columnItem.dataIndex].colSpan && rowItem[columnItem.dataIndex].rowSpan"
                  :colspan="rowItem[columnItem.dataIndex].colSpan > 1 ? rowItem[columnItem.dataIndex].colSpan : null"
                  :rowspan="rowItem[columnItem.dataIndex].rowSpan > 1 ? rowItem[columnItem.dataIndex].colSpan : null"
                  :key="`td-${rowIndex}-${columnIndex}`"
                  :class="getStickyDirection(columnItem.dataIndex) ? 'fixed-column' : ''"
                  :style="getStickyDirection(columnItem.dataIndex) ? {
                      [getStickyDirection(columnItem.dataIndex)]: getStickyDistance(columnIndex, (tableColumns.length - 1), getStickyDirection(columnItem.dataIndex)),
                      width: `${ colgroupData[columnIndex].width }`,
                      zIndex: 1 + (100-columnIndex)
                    } : {}"
                >
                  <slot :name="`td-${columnItem.dataIndex}`" :record="rowItem" :text="rowItem[columnItem.dataIndex].value">
                    <span
                      class="td-nowrap"
                      :style="{ width: colgroupData[columnIndex].width }"
                      v-if="config.noWrap"
                    >
                      {{ rowItem[columnItem.dataIndex].value }}
                    </span>
                    <template v-else>
                      {{ rowItem[columnItem.dataIndex].value }}
                    </template>
                  </slot>
                </td>
              </template>
            </tr>
          </tbody>
          <tfoot v-if="footerData && footerData.length > 0">
            <tr>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div
        id="x-sticky_left_shadow"
        class="sticky-shadow sticky_left_shadow"
        :style="{'left': getStickyDistance(stickyLeftColumns.length, (tableColumns.length - 1), 'left', 'shadow')}"
      ></div>
      <div
        id="x-sticky_right_shadow"
        class="sticky-shadow sticky_right_shadow"
        :style="{'right': getStickyDistance((tableColumns.length - 1 - stickyRightColumns.length), (tableColumns.length - 1), 'right', 'shadow')}"
      ></div>
    </div>
    <div class="page_area">
      <page
        :page-size="pageSize"
        :current-page="currentPageUse"
        :data-amount="dataAmount"
        @handlePage="handlePage"
      />
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import Page from './Page.vue';

export default {
  name: 'Index',
  props: {
    columns: Array,
    title: Array,
    data: Array,
    footerData: Array,
    headerData: Array,
    config: Object,
    currentPage: Number,
    pageSize: Number,
    sortData: Object,
    searchData: Object,
    filterData: Object,
  },
  components: {
    Page,
  },
  data() {
    return {
      styleTable: {
        height: `${this.config.scrollHeight}`,
        width: `${this.config.scrollWidth}`,
      },
      tableColumns: [...this.columns],
      tableColumnsHead: [...this.columns],
      rowSpans: [],
      colSpans: [],
      scrollWidth: 0,
      scrollHeight: 0,
      stickyLeftColumns: [],
      stickyRightColumns: [],
      colgroupData: [],
      dragGroup: [],
      dragColumns: [],
      resizeColumns: [],
      searchColumns: [],
      filterColumns: [],
      resizeThrottle: null,
      initResize: {
        index: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
      currentPageUse: this.currentPage,
      dataUse: [...this.data],
      showData: [],
    };
  },
  computed: {
    dataAmount() {
      return this.dataUse.length;
    },
  },
  watch: {
    sortData: {
      handler(newVal) {
        if (this.data && this.data.length > 0) {
          this.doSort(newVal.dataIndex, newVal.sortType);
        }
      },
      deep: true,
    },
    searchData: {
      handler(newVal) {
        if (this.data && this.data.length > 0) {
          this.doSearch(newVal);
        }
      },
      deep: true,
    },
    filterData(newVal) {
      console.log('filterData', newVal);
      this.doFilter(newVal);
    },
  },
  created() {
    console.log(this.sortData);
    this.initData();
  },
  mounted() {
    if (this.resizeColumns && this.resizeColumns.length > 0) {
      this.resizeThrottle = this.getResize;// throttle(this.getResize, 1);
      const resizeDom = document.querySelectorAll('.resize-dom-handle');
      resizeDom.forEach((dom) => {
        dom.addEventListener('mousedown', this.doResize, false);
      });
    }
    if (this.dragGroup && this.dragGroup.length > 0) {
      this.doDrag();
    }
    const leftShadowDom = document.getElementById('x-sticky_left_shadow');
    const rightShadowDom = document.getElementById('x-sticky_right_shadow');
    if (leftShadowDom && rightShadowDom) {
      const contentDom = document.getElementById('x-table-content');
      if (rightShadowDom && contentDom.clientWidth < contentDom.scrollWidth) {
        rightShadowDom.style.display = 'block';
      }
      contentDom.addEventListener('scroll', (e) => {
        const { target } = e;
        if (leftShadowDom) {
          if (target.scrollLeft > 0) {
            leftShadowDom.style.display = 'block';
          } else {
            leftShadowDom.style.display = 'none';
          }
        }
        if (rightShadowDom) {
          if (target.clientWidth + target.scrollLeft === target.scrollWidth) {
            rightShadowDom.style.display = 'none';
          } else {
            rightShadowDom.style.display = 'block';
          }
        }
      });
    }
  },
  methods: {
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
    getShowData() {
      const begin = (this.currentPageUse - 1) * this.pageSize;
      const end = begin + this.pageSize;
      this.showData = this.dataUse.slice(begin, end);
    },
    getStickyDirection(dataIndex) {
      let backData = '';
      if (this.stickyLeftColumns.includes(dataIndex)) {
        backData = 'left';
      } else if (this.stickyRightColumns.includes(dataIndex)) {
        backData = 'right';
      }
      return backData;
    },
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
    doResize(e) {
      const domIndex = e.target.parentNode.cellIndex;
      this.initResize = {
        index: domIndex,
        width: parseInt(e.target.parentElement.offsetWidth, 10),
        x: e.clientX,
        y: e.clientY,
      };
      document.documentElement.addEventListener('mousemove', this.resizeThrottle, false);
      document.documentElement.addEventListener('mouseup', this.stopResize, false);
    },
    getResize(e) {
      let width = this.initResize.width + (e.clientX - this.initResize.x);
      if (width > this.config.resizeMax) {
        width = this.config.resizeMax;
      } else if (width < this.config.resizeMin) {
        width = this.config.resizeMin;
      }
      this.setResize(`${width}px`);
    },
    setResize(width) {
      this.colgroupData.splice(this.initResize.index, 1, {
        width,
      });
    },
    stopResize() {
      console.log('stop');
      document.documentElement.removeEventListener('mousemove', this.resizeThrottle, false);
      document.documentElement.removeEventListener('mouseup', this.stopResize, false);
    },
    doDrag() {
      const wrapperTr = document.querySelector('.head-dom tr');
      if (wrapperTr) {
        const that = this;
        Sortable.create(wrapperTr, {
          animation: 180,
          delay: 0,
          draggable: '.drag-dom',
          handle: '.drag-dom-handle',
          onMove(evt) {
            let backStatus = true;
            const dragGroupTo = evt.related.attributes?.group?.value;
            const dragGroupFrom = evt.dragged.attributes?.group?.value;
            if (!(dragGroupTo && dragGroupFrom && dragGroupTo === dragGroupFrom)) {
              backStatus = false;
            }
            console.log('wrapperTr', backStatus);
            return backStatus;
          },
          onEnd({ newIndex, oldIndex }) {
            if (newIndex !== oldIndex) {
              const newItem = that.tableColumns[newIndex];
              const oldItem = that.tableColumns[oldIndex];
              that.tableColumns.splice(newIndex, 1, oldItem);
              that.tableColumns.splice(oldIndex, 1, newItem);
              console.log(that.tableColumns);
            }
          },
        });
      }
    },
    doSearch(searchData) {
      this.dataUse = this.data.filter((itemData) => {
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
      if (this.dataUse && this.dataUse.length > 1) {
        this.doSortData(this.sortData.dataIndex, this.sortData.sortType);
      }
      this.currentPageUse = 1;
      this.getShowData();
    },
    doFilter(filterData) {
      this.dataUse = this.data.filter((itemData) => {
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
      if (this.dataUse && this.dataUse.length > 1) {
        this.doSortData(this.sortData.dataIndex, this.sortData.sortType);
      }
      this.currentPageUse = 1;
      this.getShowData();
    },
    doSort(dataIndex, currentSort) {
      switch (currentSort) {
        case 'down':
        case 'up':
          this.doSortData(dataIndex, currentSort);
          break;
        case 'init':
        default:
          this.dataUse = [...this.data];
          break;
      }
      this.currentPageUse = 1;
      this.toggleSortStatus(dataIndex, currentSort);
      this.getShowData();
    },
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
    toggleSortStatus(dataIndex, currentSort) {
      const newTableColumnsHead = this.tableColumnsHead.map((item) => {
        const backData = { ...item };
        if (item.dataIndex === dataIndex) {
          backData.sort = currentSort;
        } else if (item.sort) {
          backData.sort = 'init';
        }
        return backData;
      });
      this.tableColumnsHead = newTableColumnsHead;
    },
    handlePage(data) {
      switch (data.type) {
        case 'changePage':
        default:
          this.currentPageUse = data.data.page;
          this.emitTo(data.type, data.data);
          this.getShowData();
          break;
      }
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
.table-wrapper {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .table-area {
    position: relative;
    .table-border {
      border: 1px solid #cccccc;
    }
    .sticky-shadow{
      height: 100%;
      position: absolute;
      box-sizing: border-box;
      width: 1px;
      z-index: 1000;
      top: 0;
      background-color: #f0f0f0;
    }
    .sticky_left_shadow{
      display: none;
      box-shadow: 5px 0px 5px #000000;
    }
    .sticky_right_shadow{
      display: none;
      box-shadow: -5px 0px 5px #000000;
    }
    .table-content {
      width: 1000px;
      overflow: auto;
      .td-nowrap{
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .search-handle{
        position: relative;
      }
      .resize-dom-handle {
        position: absolute;
        right: 1px;
        top: 10px;
        display: none;
        width: 2px;
        height: 20px;
        background-color: red;
        cursor: col-resize;
      }
      .drag-dom-handle{
        position: absolute;
        left: 3px;
        top: 15px;
        display: none;
        width: 10px;
        height: 10px;
        background-color: red;
        cursor: move;
      }
      .sticky-dom{
        position: sticky;
      }
      .fixed-table {
        border-collapse: collapse;
        table-layout: fixed;
      }
      th {
        &:hover{
          .resize-dom-handle {
            display: inline-block;
          }
          .drag-dom-handle {
            display: inline-block;
          }
        }
      }
      th, td{
        background: #ffffff;
        text-align: center;
        font-size: 12px;
        position: relative;
        &.fixed-column {
          position: sticky;
        }
      }
      th, td {
        &:after{
          content: '';
          display: block;
          width: 1px;
          height: 100%;
          background-color: #cccccc;
          position: absolute;
          right: 0;
          top: 0;
        }
        &:before {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background-color: #cccccc;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
      th:last-child, td:last-child{
        &:after{
          width: 0;
        }
      }
      tbody tr:last-child {
        th, td {
          &:before {
            height: 0;
          }
        }
      }
      th {
        position: sticky;
        top: 0;
        z-index: 3;
        background-color: #eeeeee;
      }
    }
  }
  .page_area{
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: flex-end;
  }
}

</style>
