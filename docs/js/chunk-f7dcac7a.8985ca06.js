(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f7dcac7a"],{"129f":function(a,t){a.exports=Object.is||function(a,t){return a===t?0!==a||1/a===1/t:a!=a&&t!=t}},"156f":function(a,t,e){"use strict";e("6d7c")},"673f":function(a,t,e){"use strict";e.r(t);var n=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("Layout",[e("div",[e("h3",[a._v("相同列")])]),e("div",[e("x-table",{attrs:{"is-use-single-table":!0,columns:a.tableColumns,config:a.array.tableConfig,data:a.tableData,title:a.tableHeaderTitle,"page-data":a.pageData,"expand-data":a.array.tableExpandData,"expand-action":a.array.tableExpandAction},scopedSlots:a._u([{key:"td-operator",fn:function(t){var n=t.record,o=t.expand;return[e("div",{staticStyle:{cursor:"pointer"},on:{click:function(t){return t.stopPropagation(),a.handleExpand(n,o)}}},[a.array.tableExpandData[n.id]?e("span",[a._v(" "+a._s("open"===o?"关闭":"打开")+" ")]):a._e()])]}},{key:"page",fn:function(){return[e("div",{staticClass:"page-area"},[e("a-pagination",{attrs:{"show-size-changer":"","default-current":a.pageData.page,"page-size":a.pageData.size,total:a.dataAmount},on:{"update:pageSize":function(t){return a.$set(a.pageData,"size",t)},"update:page-size":function(t){return a.$set(a.pageData,"size",t)},change:a.handlePageChange,showSizeChange:a.handlePageSizeChange}})],1)]},proxy:!0}])})],1),e("div",{staticStyle:{"padding-top":"32px"}},[e("h3",[a._v("合并列")])]),e("div",[e("x-table",{attrs:{"is-use-single-table":!0,columns:a.tableColumns,config:a.span.tableConfig,data:a.tableData,title:a.tableHeaderTitle,"page-data":a.pageData,"expand-data":a.span.tableExpandData,"expand-action":a.span.tableExpandAction,"expand-span-column-data":a.span.tableExpandSpanColumnData},scopedSlots:a._u([{key:"td-operator",fn:function(t){var n=t.record,o=t.expand;return[e("div",{staticStyle:{cursor:"pointer"},on:{click:function(t){return t.stopPropagation(),a.handleSpanExpand(n,o)}}},[a.span.tableExpandData[n.id]?e("span",[a._v(" "+a._s("open"===o?"关闭":"打开")+" ")]):a._e()])]}}])})],1)])},o=[],c=e("ade3"),r=e("68bc"),i=e("d894"),l={name:"Expand",components:{Layout:r["a"]},created:function(){this.tableColumns=Object(i["a"])(5,!0),this.tableData=Object(i["b"])(100,5),this.tableHeaderTitle=Object(i["e"])(5,!0),this.array.tableExpandData=Object(i["c"])(100,5)},data:function(){return{tableColumns:[],tableHeaderTitle:[],tableData:[],pageData:{page:1,size:10},array:{tableExpandData:{},tableExpandAction:{},tableConfig:{key:"table-expand-array",scrollHeight:"100%",scrollWidth:"100%",scrollBarWidth:15,scrollBarHeight:15,miniWidth:"160px",resizeMin:160,resizeMax:500,border:1,rowKey:"id",noWrap:!0,isUseNoWrapTitle:!0}},span:{tableExpandData:{5:{isOpen:!1,type:"span",data:[{span:"合并表格5"}]},8:{isOpen:!0,type:"span",data:[{span:"合并表格8"}]}},tableExpandSpanColumnData:{common:{dataIndex:"span",sticky:"",width:"",dragGroup:"",resizeable:!1,align:{title:"",header:"",content:"center",footer:""}}},tableExpandAction:{},tableConfig:{key:"table-expand-span",scrollHeight:"100%",scrollWidth:"100%",miniWidth:"160px",scrollBarWidth:15,scrollBarHeight:15,resizeMin:160,resizeMax:500,border:1,rowKey:"id",noWrap:!0,isUseNoWrapTitle:!0}}}},computed:{dataAmount:function(){return this.tableData.length}},methods:{handlePageChange:function(a){this.pageData.page=a},handlePageSizeChange:function(a,t){this.pageData.page=a,this.pageData.size=t},handleExpand:function(a,t){this.array.tableExpandData[a.id]&&(this.array.tableExpandAction=Object(c["a"])({},a.id,"open"===t?"close":"open"))},handleSpanExpand:function(a,t){this.span.tableExpandData[a.id]&&(this.span.tableExpandAction=Object(c["a"])({},a.id,"open"===t?"close":"open"))}}},s=l,u=e("2877"),d=Object(u["a"])(s,n,o,!1,null,null,null);t["default"]=d.exports},"68bc":function(a,t,e){"use strict";var n=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"layout_content"},[e("div",{staticClass:"layout_left"},[e("div",{staticClass:"header"}),e("div",{staticClass:"menu"},[e("ul",a._l(a.menus,(function(t){return e("li",{key:t.value},[e("router-link",{attrs:{to:{name:t.value}}},[a._v(a._s(t.label))])],1)})),0)])]),e("div",{staticClass:"layout_right"},[e("div",[e("h2",[a._v(a._s(a.menuName))])]),a._t("default")],2)])},o=[],c=(e("b0c0"),e("159b"),{name:"Layout",data:function(){return{menus:[{value:"Index",label:"基本用法"},{value:"Page",label:"分页"},{value:"FixHead",label:"固定表头"},{value:"FixColumn",label:"固定列"},{value:"Filter",label:"表头筛选"},{value:"Search",label:"表头搜索"},{value:"ExpandSearch",label:"展开行加入搜索"},{value:"OutSearch",label:"外部搜索"},{value:"Rank",label:"表头排序"},{value:"Span",label:"行列合并"},{value:"Pivot",label:"透视表"},{value:"Resize",label:"拖动列"},{value:"Exchange",label:"交换列"},{value:"Expand",label:"展开收起"},{value:"Custom",label:"自定义列"},{value:"Foot",label:"表格底部"},{value:"Checkbox",label:"多选框"},{value:"Waterfall",label:"滚动加载"},{value:"Compo",label:"组件单元格"}],menuName:""}},beforeMount:function(){var a=this,t=this.$route.name;this.menus.forEach((function(e){return e.value!==t||(a.menuName=e.label,!1)}))}}),r=c,i=(e("156f"),e("2877")),l=Object(i["a"])(r,n,o,!1,null,"9b64e6b6",null);t["a"]=l.exports},"6d7c":function(a,t,e){},"841c":function(a,t,e){"use strict";var n=e("d784"),o=e("825a"),c=e("1d80"),r=e("129f"),i=e("14c3");n("search",1,(function(a,t,e){return[function(t){var e=c(this),n=void 0==t?void 0:t[a];return void 0!==n?n.call(t,e):new RegExp(t)[a](String(e))},function(a){var n=e(t,a,this);if(n.done)return n.value;var c=o(a),l=String(this),s=c.lastIndex;r(s,0)||(c.lastIndex=0);var u=i(c,l);return r(c.lastIndex,s)||(c.lastIndex=s),null===u?-1:u.index}]}))},"99af":function(a,t,e){"use strict";var n=e("23e7"),o=e("d039"),c=e("e8b5"),r=e("861d"),i=e("7b0b"),l=e("50c4"),s=e("8418"),u=e("65f0"),d=e("1dde"),p=e("b622"),f=e("2d00"),b=p("isConcatSpreadable"),h=9007199254740991,v="Maximum allowed index exceeded",g=f>=51||!o((function(){var a=[];return a[b]=!1,a.concat()[0]!==a})),x=d("concat"),S=function(a){if(!r(a))return!1;var t=a[b];return void 0!==t?!!t:c(a)},y=!g||!x;n({target:"Array",proto:!0,forced:y},{concat:function(a){var t,e,n,o,c,r=i(this),d=u(r,0),p=0;for(t=-1,n=arguments.length;t<n;t++)if(c=-1===t?r:arguments[t],S(c)){if(o=l(c.length),p+o>h)throw TypeError(v);for(e=0;e<o;e++,p++)e in c&&s(d,p,c[e])}else{if(p>=h)throw TypeError(v);s(d,p++,c)}return d.length=p,d}})},d894:function(a,t,e){"use strict";e.d(t,"b",(function(){return n})),e.d(t,"c",(function(){return o})),e.d(t,"d",(function(){return c})),e.d(t,"e",(function(){return r})),e.d(t,"a",(function(){return i}));e("99af"),e("159b"),e("b64b"),e("ac1f"),e("841c"),e("4e82"),e("4de4");function n(a,t){for(var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3?arguments[3]:void 0,o=[],c=1;c<=a;c+=1){for(var r={id:e?"".concat(e).concat(c):c},i=1;i<=t;i+=1)n&&n.isTestSpan?r["c".concat(i)]=3===i?1===c?{colSpan:1,rowSpan:1,value:"".concat(c," * ").concat(i," = ").concat(c*i)}:2===c?{colSpan:1,rowSpan:25,value:"".concat(c," * ").concat(i," = ").concat(c*i)}:c<26?{colSpan:1,rowSpan:0,value:"".concat(c," * ").concat(i," = ").concat(c*i)}:{colSpan:1,rowSpan:1,value:"".concat(c," * ").concat(i," = ").concat(c*i)}:{colSpan:1,rowSpan:1,value:"".concat(c," * ").concat(i," = ").concat(c*i)}:n&&n.isTestPivot?r["c".concat(i)]=1===i?c<50?"1":"".concat(c," * ").concat(i," = ").concat(c*i):2===i?c<5?"2":c<20?"3":"".concat(c," * ").concat(i," = ").concat(c*i):"".concat(c," * ").concat(i," = ").concat(c*i):r["c".concat(i)]={colSpan:1,rowSpan:1,value:"".concat(c," * ").concat(i," = ").concat(c*i)};o.push(r)}return o}function o(a,t){for(var e={},o=3,c=function(a){var c={isOpen:!1,type:"",data:[]},r=1;if(a<o?(c.type="span",r=1):(c.type="data",r=Math.ceil(5*Math.random())),6===a&&(c.isOpen=!0),c.data=n(r,t,"ex-".concat(a,"-")),a<o){var i=0;Object.keys(c.data[0]).forEach((function(a){"id"!==a&&(0===i&&(c.data[0].span="span"),i+=1)}))}e[a]=c},r=5;r<=a;r+=1)c(r);return e}function c(a,t){for(var e=[],n=1;n<=a;n+=1){for(var o={id:"f-".concat(n)},c=1;c<=t;c+=1)o["c".concat(c)]=1===c?2===n?{colSpan:2,rowSpan:0,value:"f-".concat(n,"-").concat(c)}:{colSpan:2,rowSpan:2,value:"f-".concat(n,"-").concat(c)}:c<3?{colSpan:0,rowSpan:1}:{colSpan:1,rowSpan:1,value:"f-".concat(n,"-").concat(c)};e.push(o)}return e}function r(a){for(var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=[],n={},o=1;o<=a;o+=1)n["c".concat(o)]={colSpan:1,rowSpan:1,value:"T".concat(o)};return t&&(n.operator={colSpan:1,rowSpan:1,value:"operator"}),e.push(n),e}function i(a){for(var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=arguments.length>2?arguments[2]:void 0,n=[],o=1;o<=a;o+=1){var c={dataIndex:"c".concat(o),dragGroup:"",align:{title:"",header:"",content:"",footer:""}};e&&e.isResize&&(c.resizeable=!0),o<3?(e&&(e.isStickyLeft&&(c.sticky="left"),e.isSearch&&(c.search=!0),e.isDrag&&(c.dragGroup="a1"),e.isRank&&(c.sort="init"),e.isFilter&&(c.filter=!0)),c.width="220px"):o>=a?(e&&e.isStickyRight&&(c.sticky="right"),c.width="220px",c.dragGroup=""):(e&&e.isDrag&&(c.dragGroup="b1"),e&&e.contentAlign&&(c.align.content=e.contentAlign)),n.push(c)}return t&&n.push({dataIndex:"operator",sticky:"right",width:"100px",dragGroup:"",resizeable:!1,align:{title:"",header:"",content:"",footer:""}}),n}}}]);