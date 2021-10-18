# x-table-vue

> 表格列拖动改变宽度，表头列互换，固定表头，合并单元格。
> 增加 localstorage 保存表头交互数据。
> 增加列展开收起。
> 增加透视表功能。
> 增加 customCell 自定义单元格的 class 和 style
> 增加 extend 参与表头筛选
> 源码有完整示例代码。

[Demo](https://mikexia930.github.io/xTable/)

### 版本
***
* v3.2.2

### 基于
***
* vue2
* sortablejs
* lodash
* css sticky [浏览器支持](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
* setPointerCapture [浏览器支持](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setPointerCapture)

### 安装
***
````
npm install sortablejs
npm install x-table-vue
````

### 使用
***
**全局引入**

在main.js中引入
````
import xTable from 'x-table-vue';
vue.use(xTable);
````
**或者 在组件中引入**
```
import { XTable } from 'x-table-vue';
```

**组件中使用**
````
<x-table
    :is-use-storage="false"
    :is-use-single-table="isUseSingleTable"
    :is-fix-header="isFixHeader"
    :is-sticky="isSticky"
    :columns=tableColumns
    :config="tableConfig"
    :data="tableData"
    :expand-data="tableExpandData"
    :expand-action="tableExpandAction"
    :title="tableHeaderTitle"
    :header-data="tableHeaderData"
    :footer-data="tableFooterData"
    :page-data="pageData"
    :sort-data="sortData"
    :search-data="searchData"
    :filter-data="filterData"
    :pivot-table="pivotTable"
    :custom-cell="customCell"
    :expand-join-filter-search-columns="['c2']"
    :expend-filter-search-result-show-type="'fit'"
    @handleTable="handleTable"
>
    <tempalte v-slot:[`th-${dataIndex}`]="{ record, text }">表头单元格内容插槽</tempalte>
    <tempalte v-slot:[`th-sort-${dataIndex}`]="{ record, text }">表头排序插槽</tempalte>
    <tempalte v-slot:[`th-search-${dataIndex}`]="{ record, text }">表头搜索插槽</tempalte>
    <tempalte v-slot:[`th-filter-${dataIndex}`]="{ record, text }">表头筛选插槽</tempalte>
    <tempalte v-slot:th-drag>表头拖动交换位置插槽</tempalte>
    <tempalte v-slot:th-resize>表头拖动表格宽度插槽</tempalte>
    
    <tempalte v-slot:[`td-${dataIndex}`]="{ record, text, expand }">单元格内容插槽，expand的状态 ''/open/close </tempalte>
    
    <tempalte v-slot:[`tf-${dataIndex}`]="{ record, text }">尾部单元格内容插槽</tempalte>
</x-table>
````

### 参数说明
***
| 参数 | 类型 | 说明 |
| ------ | ------ | ------ |
|isUseStorage|boolean|是否启用storage缓存用户拖动交互后的column数据|
|isUseSingleTable| boolean | 是否使用单表格，单表格为只有一个table标签，不支持固定在浏览器顶部，需要设置height属性 |
|isFixHeader|boolean|固定表头开关|
|isSticky|boolean|固定列开关|
|config|object|表格配置数据，具体参考下方配置说明|
|columns|array|表格所有的列数据，具体参考下方表头说明|
|title|array|表头标题数据|
|data|array|表格数据|
|expandData|object|可展开行数据，只支持一层展开|
|expandAction|object|控制可展开行的展开关闭|
|headerData|array|表头数据|
|footerData|array|表尾数据|
|pageData|object|分页信息|
|sortData|object|列排序信息，每次只支持一列排序|
|searchData|object|列查询数据，查询数据会叠加计算|
|filterData|object|列筛选数据，筛选数据会叠加计算|
|pivotTable|array|透视表，需要合并行的列，[列索引, 列索引]|
|customCell|object|自定义单元格class和style|
|expandJoinFilterSearchColumns|array|参与筛选和查询的extendData [dataIndex, dataIndex]|
|expendFilterSearchResultShowType|string|extend筛选结果的展示方式 fit：符合结果的extend展开 open：全部打开 close：全部不打开|

### tableConfig 说明
```
{
    key: 'table', // 同页面有多个table组件时，区分不同表格使用，主要用在dom id上，所以需保证唯一。
    scrollHeight: '100%', // 表格的高度，超过高度，table会出现y轴滚动条，设置成100%，则根据父组件的设置。
    scrollWidth: '100%', // 表格的宽度，超过宽度，tbale会出现x轴滚动条，设置成100%，则根据父组件的设置。
    miniWidth: '160px', // columns 里没有设置表格宽度的列会默认使用最小width
    resizeMin: 160, // 动态改变表格列宽时，最小的宽度，小于当前宽度，会取该宽度值
    resizeMax: 500, // 动态改变表格列宽时，最大的宽度，大于当前宽度，会取该宽度值
    border: 1, // 0 无边框， 1 有边框， 2 四周无边框
    rowKey: 'id', // 循环表格数据的时候，:key 会取该设置的 data key的值
    noWrap: true, // 是否运行表格数据换行
    isUseNoWrapTitle: true, // 是否显示隐藏时的title
}
```

### columns 说明
```
{
    dataIndex: `显示数据的索引，对应 data 里的 key`,
    dragGroup: '', // 只在表头第一行绑定，拖动交互表格列的组，表头支持多组各种拖动更换顺序，不支持不同组之间的拖动。
    resizeable: true, // 是否开启拖动列改变列宽度，只在表头第一行绑定
    align: '', // 内容的对齐方式 left / right
    sticky: 'left'; // 列固定的方向，left / right
    widthLock: false, // 列宽固定，固定的列宽不会被重新赋值
    width: '220px'; // 列宽度，如果固定列，这个值需设置
    serach: true; // 是否开启查询， 通过 slot 设置样式，并自行获取用户查询的值，通过改变prop searchData，触发表格查询
    sort: 'init'; // 是否开启排序 init / up / down， 通过 slot 设置样式，并自行获取用户设置的值，通过改变prop sortData值，触发表格排序。
    filter: true; // 是否开启筛选， 通过 slot 设置样式，并自行获取用户选择的值，通过改变prop filterData值，触发表格筛选。
}
```

### title、data、headerData、footerData 说明
```
{
  colSpan: 1, // 合并的列数量，如果被合并，设置为 0，如果合并别人，设置为合并的列数(包含自己)，例如 3
  rowSpan: 1, // 合并的行数量，如果被合并，设置为 0，如果合并别人，设置为合并的行数(包含自己)，例如 3
  value: '', // 名称值
}
```

### expandData 说明
```
{
    rowKey: {
        type: '', // span时为行合并，data时为数据合并
        isOpen: false, // 是否打开，响应捕捉
        data: [], // 数据同data，span时需设置colSpan为列数
    }
}
```

### expandAction 说明
```
{
    rowKey: 'open/close'
}
```

### pageData 说明
```
{
    page: 1, // 当前页码
    size: 20, // 每页显示的条数
}
```

### sortData 说明
```
{
    dataIndex: '', // 排序列的索引
    sortType: '', // 排序类型 init / up / down
}
```

### searchData 说明
```
{
    dataIndex // 搜索列的索引 : {
      isShow: false, // 是否显示搜索弹层
      value: '', // 搜索的字符串
    },
    dataIndex // 搜索列的索引 : {
      isShow: false, // 是否显示搜索弹层
      value: '', // 搜索的字符串
    },
}
```

### filterData 说明
```
{
    dataIndex // 筛选列的索引 : {
      isShow: false, // 是否显示筛选弹层
      value: [], // 已选中的值
    },
    dataIndex // 筛选列的索引 : {
      isShow: false, // 是否显示筛选弹层
      value: [], // 已选中的值
    },
}
```

### pivotTable 说明
按下标顺序一级一级的透视
```
[
    dataIndex // 筛选列的索引
    dataIndex // 筛选列的索引
]
```

### customCell 说明
自定义单元格的 class 和 style
```
{
    // record 当前行的值，dataIndex 当前列的索引
    header: (record, dataIndex) => {
       return {
          class: {},
          style: {},
       }
    },
    body: (record, dataIndex) => {
       return {
          class: {},
          style: {},
       }
    },
    footer: (record, dataIndex) => {
       return {
          class: {},
          style: {},
       }
    }
}
```
### expandJoinFilterSearchColumns 说明
extend 参与表头查询和筛选的列，参数为列的 dataIndex
```
[dataIndex, dataIndex]
```

### expendFilterSearchResultShowType 说明
extend 搜索结果的展示方式
```
fit：extend 里有符合条件的展开
open：只有父和子里有一个符合条件就展开
close：只展示父
```

### handleTable 说明
组件会把变化 emit 出来，格式为：
```
{
    type: 'page',
    data: {
        page: '', // 当前页码
        total: '', // 当前条件下的数据总条数
    }
}
```

***
**样式说明 less**

组件只完成了核心功能，样式用户可根据各自的UI交互，自行完成。

|样式|说明|
| ------ | ------ |
|.x-table-wrapper|最外层包裹层|
|.x-table-area|表格区域｜
|.x-table-content|table包裹层|
|thead td .sort-up|表头的排序向上包裹层|
|thead td .sort-down|表头的排序向下包裹层｜
|.x-table-border|表格边框|
|.x-table-fix-header|固定表头时的表头|
|.x-head-dom|thead的class|
|.x-sticky-shadow|列固定的阴影|
|.x-sticky-left-shadow|列固定的左阴影|
|.x-sticky-right-shadow|列固定的右阴影|
|.x-resize-dom-handle|拖动改变列宽时候的响应元素|
|.x-drag-dom-handle|拖动交互列顺序时候的响应元素|
|.x-page-area|分页区域|

````
/deep/ .x-table-wrapper {
   ....
}
````
