<template>
  <div class="x-page-list">
    <ul>
      <li
        :key="index"
        :class="{ 'liOn': currentPageUse === page }"
        v-for="(page, index) in pageArr"
        @click="handlePage(page)"
      >
        {{ page }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    dataAmount: Number,
    pageSize: Number,
    currentPage: Number,
  },
  computed: {
    totalPage() {
      return Math.ceil(this.dataAmount / this.pageSize);
    },
    currentPageUse() {
      return this.currentPage;
    },
    pageArr() {
      const backData = [];
      for (let i = 1; i <= this.totalPage; i += 1) {
        backData.push(i);
      }
      return backData;
    },
  },
  methods: {
    handlePage(page) {
      if (page !== this.currentPageUse) {
        this.emitTo('changePage', {
          page,
        });
      }
    },
    emitTo(type, data) {
      this.$emit('handlePage', {
        type,
        data,
      });
    },
  },
};
</script>

<style lang="less" scoped>
  .x-page-list {
    margin-top: 20px;
    ul, li {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 14px;
    }
    ul {
      position: relative;
      li {
        float: left;
        width: 30px;
        line-height: 30px;
        border: 1px solid #c1c1c1;
        text-align: center;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
      }
      .liOn {
        background-color: seagreen;
        color: #ffffff;
      }
      li:not(.liOn) {
        cursor: pointer;
      }
    }
  }
</style>
