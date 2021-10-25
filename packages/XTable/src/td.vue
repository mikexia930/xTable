<template>
  <td
    v-if="getColSpan && getRowSpan"
    :colspan="getColSpan > 1 ? getColSpan : null"
    :rowspan="getRowSpan > 1 ? getRowSpan : null"
    :class="Object.assign({
      'x-fixed-column': getStickyDirection(columnItem.dataIndex),
      'x-left': isAlign('left'),
      'x-right': isAlign('right'),
      'x-drag-dom': from === 'th' && rowIndex === 0 && dragColumns.includes(columnItem.dataIndex),
    }, getCustomCell('class'))"
    :style="getTdStyle"
    :group="from === 'th' && rowIndex === 0 ? (columnItem.dragGroup || '') : null"
  >
    <div
      :title="noWrap && isUseNoWrapTitle ? getTdValue : null"
      :class="noWrap ? 'x-td-nowrap' : 'x-td'"
      :style="{ width: isSpanExpand ? null : getTdWidth(columnIndex, getColSpan) }"
    >
      <slot
        :name="`${from}-${columnItem.dataIndex}`"
        :record="getCleanRowItem"
        :text="getTdValue"
        :expand="expandStatus"
      >
        <span>{{ getTdValue }}</span>
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
        v-if="from === 'th' && rowIndex === 0 && columnItem.search"
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
    </div>
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
  </td>
</template>

<script>
export default {
  computed: {
    getColSpan() {
      let backData = 1;
      if (typeof this.rowItem[this.columnItem.dataIndex] === 'object') {
        if (this.rowItem[this.columnItem.dataIndex].colSpan === undefined) {
          backData = 1;
        } else {
          backData = this.rowItem[this.columnItem.dataIndex].colSpan;
        }
      }
      return parseInt(String(backData), 10);
    },
    getRowSpan() {
      let backData = 1;
      if (typeof this.rowItem[this.columnItem.dataIndex] === 'object') {
        if (this.rowItem[this.columnItem.dataIndex].colSpan === undefined) {
          backData = 1;
        } else {
          backData = this.rowItem[this.columnItem.dataIndex].rowSpan;
        }
      }
      return parseInt(String(backData), 10);
    },
    getTdStyle() {
      const customCellStyle = this.getCustomCell('style');
      const style = this.getStickyDirection(this.columnItem.dataIndex) ? {
        [this.getStickyDirection(this.columnItem.dataIndex)]: this.getStickyDistance(this.columnIndex, (this.columnLength - 1), this.getStickyDirection(this.columnItem.dataIndex)),
        width: this.isSpanExpand ? null : this.getTdWidth(this.columnIndex, this.getColSpan),
        zIndex: this.from === 'th' ? 2 + (100 - this.columnIndex) : 1 + (100 - this.columnIndex),
      } : {};
      const backData = Object.assign(style, customCellStyle);
      return backData;
    },
    getTdValue() {
      let backData = '';

      if (typeof this.rowItem[this.columnItem.dataIndex] === 'object') {
        backData = this.rowItem[this.columnItem.dataIndex].value;
      } else {
        backData = this.rowItem[this.columnItem.dataIndex];
      }
      return backData;
    },
    getCleanRowItem() {
      const backData = {};
      Object.keys(this.rowItem).forEach((dataIndex) => {
        let rowValue;
        if (typeof this.rowItem[dataIndex] === 'object') {
          rowValue = this.rowItem[dataIndex].value;
        } else {
          rowValue = this.rowItem[dataIndex];
        }
        backData[dataIndex] = rowValue;
      });
      return backData;
    },
  },
  name: 'x-td',
  props: {
    from: String,
    paddingLength: Number,
    isSticky: Boolean,
    noWrap: Boolean,
    isUseNoWrapTitle: Boolean,
    columnLength: Number,
    colgroupData: Array,
    rowIndex: Number,
    rowItem: Object,
    columnIndex: [Number, String],
    columnItem: Object,
    stickyLeftColumns: Array,
    stickyRightColumns: Array,
    customCell: [Function, Object],
    dragColumns: {
      type: Array,
      default: () => [],
    },
    resizeColumns: {
      type: Array,
      default: () => [],
    },
    expandStatus: String,
    isSpanExpand: Boolean,
  },
  methods: {
    /**
     * 获取 cell 配置的属性
     * return {object}
     */
    getCustomCell(type) {
      let backData = {};
      if (this.customCell) {
        const result = this.customCell(this.getCleanRowItem, this.columnItem.dataIndex);
        if (result[type] && result[type] instanceof Object) {
          backData = result[type];
        }
      }
      return backData;
    },
    /**
     * 单元格的对齐方式
     * @param direction 对齐方向 left/right
     * @return boolean
     */
    isAlign(direction) {
      let alignData = '';
      if (this.columnItem && this.columnItem.align) {
        switch (this.from) {
          case 'th': // 顶部标题
            alignData = this.columnItem.align.title;
            break;
          case 'thd': // 顶部数据
            alignData = this.columnItem.align.header;
            break;
          case 'td': // 内容数据
            alignData = this.columnItem.align.content;
            break;
          case 'tf': // 底部数据
            alignData = this.columnItem.align.footer;
            break;
          default:
            break;
        }
      }
      return alignData === direction;
    },
    /**
     * 获取sticky的方向 left/right
     * @param dataIndex 列索引
     * @return {string} 方向
     */
    getStickyDirection(dataIndex) {
      let backData = '';
      if (this.isSticky) {
        if (this.stickyLeftColumns && this.stickyLeftColumns.includes(dataIndex)) {
          backData = 'left';
        } else if (this.stickyRightColumns && this.stickyRightColumns.includes(dataIndex)) {
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
      let backWidth = parseInt(this.colgroupData[columnIndex].width, 10);
      if (colSpan > 1) {
        for (let i = 1; i < colSpan; i += 1) {
          backWidth += parseInt(this.colgroupData[columnIndex + i].width, 10);
        }
      }
      if (this.paddingLength) {
        backWidth -= this.paddingLength;
      }
      return `${backWidth}px`;
    },
  },
};
</script>

<style lang="less" scoped>
td{
  > div {
    position: relative;
    box-sizing: border-box;
  }
  &.x-left {
    text-align: left !important;
  }
  &.x-right {
    text-align: right !important;
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
