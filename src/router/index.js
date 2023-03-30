import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
  },
  {
    path: '/page',
    name: 'Page',
    component: () => import('../views/Page.vue'),
  },
  {
    path: '/fix-head',
    name: 'FixHead',
    component: () => import('../views/FixHead.vue'),
  },
  {
    path: '/fix-column',
    name: 'FixColumn',
    component: () => import('../views/FixColumn.vue'),
  },
  {
    path: '/pivot',
    name: 'Pivot',
    component: () => import('../views/Pivot.vue'),
  },
  {
    path: '/span',
    name: 'Span',
    component: () => import('../views/Span.vue'),
  },
  {
    path: '/resize',
    name: 'Resize',
    component: () => import('../views/Resize.vue'),
  },
  {
    path: '/exchange',
    name: 'Exchange',
    component: () => import('../views/Exchange.vue'),
  },
  {
    path: '/expand',
    name: 'Expand',
    component: () => import('../views/Expand.vue'),
  },
  {
    path: '/custom',
    name: 'Custom',
    component: () => import('../views/Custom.vue'),
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import('../views/Rank.vue'),
  },
  {
    path: '/filter',
    name: 'Filter',
    component: () => import('../views/Filter.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/out-search',
    name: 'OutSearch',
    component: () => import('../views/OutSearch.vue'),
  },
  {
    path: '/expand-search',
    name: 'ExpandSearch',
    component: () => import('../views/ExpandSearch.vue'),
  },
  {
    path: '/foot',
    name: 'Foot',
    component: () => import('../views/Foot.vue'),
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
    component: () => import('../views/Checkbox.vue'),
  },
  {
    path: '/compo',
    name: 'Compo',
    component: () => import('../views/Compo.vue'),
  },
  {
    path: '/waterfall',
    name: 'Waterfall',
    component: () => import('../views/Waterfall.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
