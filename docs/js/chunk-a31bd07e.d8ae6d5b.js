(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a31bd07e"],{"129f":function(a,t){a.exports=Object.is||function(a,t){return a===t?0!==a||1/a===1/t:a!=a&&t!=t}},"18b7":function(a,t,e){},"66ec":function(a,t,e){"use strict";e("18b7")},"68bc":function(a,t,e){"use strict";var n=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"layout_content"},[e("div",{staticClass:"layout_left"},[a._m(0),e("div",{staticClass:"menu"},[e("ul",a._l(a.menus,(function(t){return e("li",{key:t.value},[e("router-link",{attrs:{to:{name:t.value}}},[a._v(a._s(t.label))])],1)})),0)])]),e("div",{staticClass:"layout_right"},[e("div",[e("h2",[a._v(a._s(a.menuName))])]),a._t("default")],2)])},c=[function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"header"},[e("div",[a._v("XTable V4.0.2")]),e("a",{attrs:{href:"https://github.com/mikexia930/xTable/tree/master/src/views",target:"_blank"}},[a._v("查看示例源码")])])}],o=(e("b0c0"),e("159b"),{name:"Layout",data:function(){return{menus:[{value:"Index",label:"基本用法"},{value:"Page",label:"分页"},{value:"FixHead",label:"固定表头"},{value:"FixColumn",label:"固定列"},{value:"Filter",label:"表头筛选"},{value:"Search",label:"表头搜索"},{value:"ExpandSearch",label:"展开行加入搜索"},{value:"OutSearch",label:"外部搜索"},{value:"Rank",label:"表头排序"},{value:"Span",label:"行列合并"},{value:"Pivot",label:"透视表"},{value:"Resize",label:"拖动列"},{value:"Exchange",label:"交换列"},{value:"Expand",label:"展开收起"},{value:"Custom",label:"自定义列"},{value:"Foot",label:"表格底部"},{value:"Checkbox",label:"多选框"},{value:"Waterfall",label:"滚动加载"},{value:"Compo",label:"组件单元格"}],menuName:""}},beforeMount:function(){var a=this,t=this.$route.name;this.menus.forEach((function(e){return e.value!==t||(a.menuName=e.label,!1)}))}}),r=o,l=(e("66ec"),e("2877")),i=Object(l["a"])(r,n,c,!1,null,"ae2b3922",null);t["a"]=i.exports},"7b03":function(a,t,e){"use strict";e.r(t);var n=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("Layout",[e("x-table",{attrs:{"is-fix-header":a.isFixHeader,columns:a.tableColumns,config:a.tableConfig,data:a.tableData,title:a.tableHeaderTitle,"footer-data":a.tableFooterData,"page-data":a.pageData},scopedSlots:a._u([{key:"page",fn:function(){return[e("div",{staticClass:"page-area"},[e("a-pagination",{attrs:{"show-size-changer":"","default-current":a.pageData.page,"page-size":a.pageData.size,total:a.dataAmount},on:{"update:pageSize":function(t){return a.$set(a.pageData,"size",t)},"update:page-size":function(t){return a.$set(a.pageData,"size",t)},change:a.handlePageChange,showSizeChange:a.handlePageSizeChange}})],1)]},proxy:!0}])})],1)},c=[],o=e("68bc"),r=e("d894"),l={name:"Foot",components:{Layout:o["a"]},created:function(){this.tableColumns=Object(r["a"])(30),this.tableData=Object(r["b"])(100,30),this.tableHeaderTitle=Object(r["e"])(30),this.tableFooterData=Object(r["d"])(2,30)},data:function(){return{isFixHeader:!0,tableColumns:[],tableHeaderTitle:[],tableFooterData:[],tableData:[],tableConfig:{key:"table-foot",scrollHeight:"100%",scrollWidth:"100%",scrollBarWidth:15,scrollBarHeight:15,miniWidth:"160px",resizeMin:160,resizeMax:500,border:1,rowKey:"id",noWrap:!0,isUseNoWrapTitle:!0},pageData:{page:1,size:10}}},computed:{dataAmount:function(){return this.tableData.length}},methods:{handlePageChange:function(a){this.pageData.page=a},handlePageSizeChange:function(a,t){this.pageData.page=a,this.pageData.size=t}}},i=l,u=e("2877"),s=Object(u["a"])(i,n,c,!1,null,null,null);t["default"]=s.exports},"841c":function(a,t,e){"use strict";var n=e("d784"),c=e("825a"),o=e("1d80"),r=e("129f"),l=e("14c3");n("search",1,(function(a,t,e){return[function(t){var e=o(this),n=void 0==t?void 0:t[a];return void 0!==n?n.call(t,e):new RegExp(t)[a](String(e))},function(a){var n=e(t,a,this);if(n.done)return n.value;var o=c(a),i=String(this),u=o.lastIndex;r(u,0)||(o.lastIndex=0);var s=l(o,i);return r(o.lastIndex,u)||(o.lastIndex=u),null===s?-1:s.index}]}))},"99af":function(a,t,e){"use strict";var n=e("23e7"),c=e("d039"),o=e("e8b5"),r=e("861d"),l=e("7b0b"),i=e("50c4"),u=e("8418"),s=e("65f0"),d=e("1dde"),p=e("b622"),f=e("2d00"),v=p("isConcatSpreadable"),h=9007199254740991,b="Maximum allowed index exceeded",g=f>=51||!c((function(){var a=[];return a[v]=!1,a.concat()[0]!==a})),S=d("concat"),m=function(a){if(!r(a))return!1;var t=a[v];return void 0!==t?!!t:o(a)},x=!g||!S;n({target:"Array",proto:!0,forced:x},{concat:function(a){var t,e,n,c,o,r=l(this),d=s(r,0),p=0;for(t=-1,n=arguments.length;t<n;t++)if(o=-1===t?r:arguments[t],m(o)){if(c=i(o.length),p+c>h)throw TypeError(b);for(e=0;e<c;e++,p++)e in o&&u(d,p,o[e])}else{if(p>=h)throw TypeError(b);u(d,p++,o)}return d.length=p,d}})},d894:function(a,t,e){"use strict";e.d(t,"b",(function(){return n})),e.d(t,"c",(function(){return c})),e.d(t,"d",(function(){return o})),e.d(t,"e",(function(){return r})),e.d(t,"a",(function(){return l}));e("99af"),e("159b"),e("b64b"),e("ac1f"),e("841c"),e("4e82"),e("4de4");function n(a,t){for(var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3?arguments[3]:void 0,c=[],o=1;o<=a;o+=1){for(var r={id:e?"".concat(e).concat(o):o},l=1;l<=t;l+=1)n&&n.isTestSpan?r["c".concat(l)]=3===l?1===o?{colSpan:1,rowSpan:1,value:"".concat(o," * ").concat(l," = ").concat(o*l)}:2===o?{colSpan:1,rowSpan:25,value:"".concat(o," * ").concat(l," = ").concat(o*l)}:o<26?{colSpan:1,rowSpan:0,value:"".concat(o," * ").concat(l," = ").concat(o*l)}:{colSpan:1,rowSpan:1,value:"".concat(o," * ").concat(l," = ").concat(o*l)}:{colSpan:1,rowSpan:1,value:"".concat(o," * ").concat(l," = ").concat(o*l)}:n&&n.isTestPivot?r["c".concat(l)]=1===l?o<50?"1":"".concat(o," * ").concat(l," = ").concat(o*l):2===l?o<5?"2":o<20?"3":"".concat(o," * ").concat(l," = ").concat(o*l):"".concat(o," * ").concat(l," = ").concat(o*l):r["c".concat(l)]={colSpan:1,rowSpan:1,value:"".concat(o," * ").concat(l," = ").concat(o*l)};c.push(r)}return c}function c(a,t){for(var e={},c=3,o=function(a){var o={isOpen:!1,type:"",data:[]},r=1;if(a<c?(o.type="span",r=1):(o.type="data",r=Math.ceil(5*Math.random())),6===a&&(o.isOpen=!0),o.data=n(r,t,"ex-".concat(a,"-")),a<c){var l=0;Object.keys(o.data[0]).forEach((function(a){"id"!==a&&(0===l&&(o.data[0].span="span"),l+=1)}))}e[a]=o},r=5;r<=a;r+=1)o(r);return e}function o(a,t){for(var e=[],n=1;n<=a;n+=1){for(var c={id:"f-".concat(n)},o=1;o<=t;o+=1)c["c".concat(o)]=1===o?2===n?{colSpan:2,rowSpan:0,value:"f-".concat(n,"-").concat(o)}:{colSpan:2,rowSpan:2,value:"f-".concat(n,"-").concat(o)}:o<3?{colSpan:0,rowSpan:1}:{colSpan:1,rowSpan:1,value:"f-".concat(n,"-").concat(o)};e.push(c)}return e}function r(a){for(var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=[],n={},c=1;c<=a;c+=1)n["c".concat(c)]={colSpan:1,rowSpan:1,value:"T".concat(c)};return t&&(n.operator={colSpan:1,rowSpan:1,value:"operator"}),e.push(n),e}function l(a){for(var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=arguments.length>2?arguments[2]:void 0,n=[],c=1;c<=a;c+=1){var o={dataIndex:"c".concat(c),dragGroup:"",align:{title:"",header:"",content:"",footer:""}};e&&e.isResize&&(o.resizeable=!0),c<3?(e&&(e.isStickyLeft&&(o.sticky="left"),e.isSearch&&(o.search=!0),e.isDrag&&(o.dragGroup="a1"),e.isRank&&(o.sort="init"),e.isFilter&&(o.filter=!0)),o.width="220px"):c>=a?(e&&e.isStickyRight&&(o.sticky="right"),o.width="220px",o.dragGroup=""):(e&&e.isDrag&&(o.dragGroup="b1"),e&&e.contentAlign&&(o.align.content=e.contentAlign)),n.push(o)}return t&&n.push({dataIndex:"operator",sticky:"right",width:"100px",dragGroup:"",resizeable:!1,align:{title:"",header:"",content:"",footer:""}}),n}}}]);