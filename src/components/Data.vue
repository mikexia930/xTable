<template>
  <tr v-for="(rowItem, rowIndex) in data" :key="`${rowItem[config.rowKey]}-${rowIndex}`">
    <template v-for="(columnItem, columnIndex) in columns">
      <td
        v-if="rowItem[columnItem.dataIndex].colSpan && rowItem[columnItem.dataIndex].rowSpan"
        :colspan="rowItem[columnItem.dataIndex].colSpan > 1 ? rowItem[columnItem.dataIndex].colSpan : null"
        :rowspan="rowItem[columnItem.dataIndex].rowSpan > 1 ? rowItem[columnItem.dataIndex].colSpan : null"
        :key="`td-${rowIndex}-${columnIndex}`"
        :class="getStickyDirection(columnItem.dataIndex) ? 'fixed-column' : ''"
        :style="getStickyDirection(columnItem.dataIndex) ? {
                  [getStickyDirection(columnItem.dataIndex)]: getStickyDistance(columnIndex, (columns.length - 1), getStickyDirection(columnItem.dataIndex)),
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
</template>

<script>
export default {
  name: 'Data',
  props: {
    columns: Array,
    data: Array,
    config: Object,
    stickyLeftColumns: Array,
    stickyRightColumns: Array,
    colgroupData: Array,
  },
  data() {
    return {
      rowSpans: [],
      colSpans: [],
    };
  },
  methods: {
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
    emitTo(type, data) {
      this.$emit('handleTable', {
        type,
        data,
      });
    },
  },
};
</script>
