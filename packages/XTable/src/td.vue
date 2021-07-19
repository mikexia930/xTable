<template>
  <td
    v-if="rowItem[columnItem.dataIndex].colSpan && rowItem[columnItem.dataIndex].rowSpan"
    :key="`${from}-${rowIndex}-${columnIndex}`"
    :colspan="rowItem[columnItem.dataIndex].colSpan > 1 ? rowItem[columnItem.dataIndex].colSpan : null"
    :rowspan="rowItem[columnItem.dataIndex].rowSpan > 1 ? rowItem[columnItem.dataIndex].colSpan : null"
    :class="{
      'x-fixed-column': getStickyDirection(columnItem.dataIndex),
      'x-left': columnItem.align === 'left',
      'x-right': columnItem.align === 'right',
      'x-drag-dom': from === 'th' && rowIndex === 0 && dragColumns.includes(columnItem.dataIndex),
    }"
    :style="getStickyDirection(columnItem.dataIndex) ? {
      [getStickyDirection(columnItem.dataIndex)]: getStickyDistance(columnIndex, (columnLength - 1), getStickyDirection(columnItem.dataIndex)),
      width: `${ colgroupData[columnIndex].width }`,
      zIndex: from === 'th' ? 2 + (100-columnIndex) : 1 + (100-columnIndex)
    } : {}"
    :group="from === 'th' && rowIndex === 0 ? (columnItem.dragGroup || '') : 'null'"
  >
    <div
      :title="noWrap ? rowItem[columnItem.dataIndex].value : null"
      :class="noWrap ? 'x-td-nowrap' : 'x-td'"
      :style="{ width: getTdWidth(columnIndex, rowItem[columnItem.dataIndex].colSpan) }"
    >
      <slot
        :name="`${from}-${columnItem.dataIndex}`"
        :record="rowItem"
        :text="rowItem[columnItem.dataIndex].value"
      >
        <span>{{ rowItem[columnItem.dataIndex].value }}</span>
      </slot>

      <span
        v-if="from === 'th' && rowIndex === 0 && columnItem.sort"
        class="x-sort"
      >
        <slot
          :name="`${from}-sort-${columnItem.dataIndex}`"
          :record="columnItem"
          :dataIndex="columnItem.dataIndex"
        ></slot>
      </span>

      <span
        v-if="from === 'th' && rowIndex === 0 && columnItem.serach"
        class="x-search"
      >
        <slot
          :name="`${from}-search-${columnItem.dataIndex}`"
          :record="columnItem"
          :dataIndex="columnItem.dataIndex"
        ></slot>
      </span>

      <span
        v-if="from === 'th' && rowIndex === 0 && columnItem.filter"
        class="x-filter"
      >
        <slot
          :name="`${from}-filter-${columnItem.dataIndex}`"
          :record="columnItem"
          :dataIndex="columnItem.dataIndex"
        ></slot>
      </span>

      <span
        v-if="from === 'th' && rowIndex === 0 && dragColumns.includes(columnItem.dataIndex)"
        class="x-drag-dom-handle"
      >
        <slot :name="`${from}-drag`"></slot>
      </span>

      <span
        v-if="from === 'th' && rowIndex === 0 && resizeColumns.includes(columnItem.dataIndex)"
        class="x-resize-dom-handle"
      >
        <slot :name="`${from}-resize`"></slot>
      </span>
    </div>
  </td>
</template>

<script>
export default {
  name: 'x-td',
  props: {
    from: String,
    isSticky: Boolean,
    noWrap: Boolean,
    columnLength: Number,
    colgroupData: Array,
    rowIndex: Number,
    rowItem: Object,
    columnIndex: Number,
    columnItem: Object,
    stickyLeftColumns: Array,
    stickyRightColumns: Array,
    dragColumns: {
      type: Array,
      default: () => [],
    },
    resizeColumns: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
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
  },
};
</script>

<style lang="less" scoped>
  td{
    > div {
      position: relative;
    }
    &.x-left {
      text-align: left !important;
      >div {
        padding: 0 8px;
      }
    }
    &.x-right {
      text-align: right !important;
      >div {
        padding: 0 8px;
      }
    }
    .x-td {
      white-space:pre-wrap;
      word-wrap:break-word;
    }
    .x-td-nowrap{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .x-search, .x-sort, x-filter{
    position: relative;
    cursor: pointer;
  }
</style>
