<template>
  <div class="layout_content">
    <div class="layout_left">
      <div class="header">
        <div>XTable V4.0.2</div>
        <a href="https://github.com/mikexia930/xTable/tree/master/src/views" target="_blank">查看示例源码</a>
      </div>
      <div class="menu">
        <ul>
          <li :key="menu.value" v-for="(menu) in menus">
            <router-link :to="{ name: menu.value }">{{ menu.label }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="layout_right">
      <div>
        <h2>{{ menuName }}</h2>
      </div>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      menus: [
        {
          value: 'Index',
          label: '基本用法',
        },
        {
          value: 'Page',
          label: '分页',
        },
        {
          value: 'FixHead',
          label: '固定表头',
        },
        {
          value: 'FixColumn',
          label: '固定列',
        },
        {
          value: 'Filter',
          label: '表头筛选',
        },
        {
          value: 'Search',
          label: '表头搜索',
        },
        {
          value: 'ExpandSearch',
          label: '展开行加入搜索',
        },
        {
          value: 'OutSearch',
          label: '外部搜索',
        },
        {
          value: 'Rank',
          label: '表头排序',
        },
        {
          value: 'Span',
          label: '行列合并',
        },
        {
          value: 'Pivot',
          label: '透视表',
        },
        {
          value: 'Resize',
          label: '拖动列',
        },
        {
          value: 'Exchange',
          label: '交换列',
        },
        {
          value: 'Expand',
          label: '展开收起',
        },
        {
          value: 'Custom',
          label: '自定义列',
        },
        {
          value: 'Foot',
          label: '表格底部',
        },
        {
          value: 'Checkbox',
          label: '多选框',
        },
        {
          value: 'Waterfall',
          label: '滚动加载',
        },
        {
          value: 'Compo',
          label: '组件单元格',
        },
      ],
      menuName: '',
    };
  },
  beforeMount() {
    const curRouteName = this.$route.name;
    this.menus.forEach((item) => {
      if (item.value === curRouteName) {
        this.menuName = item.label;
        return false;
      }
      return true;
    });
  },
};
</script>

<style lang="less" scoped>
.layout_content {
  display: flex;
  height: 100%;
  .layout_left {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 200px;
    overflow-y: auto;
    border-right: 1px solid #e1e1e1;
    background-color: #f1f1f1;
    .header {
      height: 68px;
      border-bottom: 1px solid #c1c1c1;
      margin-bottom: 12px;
      > div {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 12px;
        margin-top: 12px;
      }
      a {
        color: #ff4d4f;
        text-align: center;
        display: block;
      }
    }
    .menu {
      li {
        height: 36px;
        line-height: 36px;
      }
    }
  }
  .layout_right {
    margin-left: 200px;
    box-sizing: border-box;
    padding: 16px;
    width: 100%;
    height: 100%;
    flex-grow: 1;
  }
}
</style>
