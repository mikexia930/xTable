(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-17cb804d"],{"129f":function(t,a){t.exports=Object.is||function(t,a){return t===a?0!==t||1/t===1/a:t!=t&&a!=a}},"18b7":function(t,a,e){},"66ec":function(t,a,e){"use strict";e("18b7")},"68bc":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"layout_content"},[e("div",{staticClass:"layout_left"},[t._m(0),e("div",{staticClass:"menu"},[e("ul",t._l(t.menus,(function(a){return e("li",{key:a.value},[e("router-link",{attrs:{to:{name:a.value}}},[t._v(t._s(a.label))])],1)})),0)])]),e("div",{staticClass:"layout_right"},[e("div",[e("h2",[t._v(t._s(t.menuName))])]),t._t("default")],2)])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"header"},[e("div",[t._v("XTable V4.0.2")]),e("a",{attrs:{href:"https://github.com/mikexia930/xTable/tree/master/src/views",target:"_blank"}},[t._v("查看示例源码")])])}],c=(e("b0c0"),e("159b"),{name:"Layout",data:function(){return{menus:[{value:"Index",label:"基本用法"},{value:"Page",label:"分页"},{value:"FixHead",label:"固定表头"},{value:"FixColumn",label:"固定列"},{value:"Filter",label:"表头筛选"},{value:"Search",label:"表头搜索"},{value:"ExpandSearch",label:"展开行加入搜索"},{value:"OutSearch",label:"外部搜索"},{value:"Rank",label:"表头排序"},{value:"Span",label:"行列合并"},{value:"Pivot",label:"透视表"},{value:"Resize",label:"拖动列"},{value:"Exchange",label:"交换列"},{value:"Expand",label:"展开收起"},{value:"Custom",label:"自定义列"},{value:"Foot",label:"表格底部"},{value:"Checkbox",label:"多选框"},{value:"Waterfall",label:"滚动加载"},{value:"Compo",label:"组件单元格"}],menuName:""}},beforeMount:function(){var t=this,a=this.$route.name;this.menus.forEach((function(e){return e.value!==a||(t.menuName=e.label,!1)}))}}),l=c,o=(e("66ec"),e("2877")),r=Object(o["a"])(l,n,i,!1,null,"ae2b3922",null);a["a"]=r.exports},"841c":function(t,a,e){"use strict";var n=e("d784"),i=e("825a"),c=e("1d80"),l=e("129f"),o=e("14c3");n("search",1,(function(t,a,e){return[function(a){var e=c(this),n=void 0==a?void 0:a[t];return void 0!==n?n.call(a,e):new RegExp(a)[t](String(e))},function(t){var n=e(a,t,this);if(n.done)return n.value;var c=i(t),r=String(this),s=c.lastIndex;l(s,0)||(c.lastIndex=0);var u=o(c,r);return l(c.lastIndex,s)||(c.lastIndex=s),null===u?-1:u.index}]}))},"99af":function(t,a,e){"use strict";var n=e("23e7"),i=e("d039"),c=e("e8b5"),l=e("861d"),o=e("7b0b"),r=e("50c4"),s=e("8418"),u=e("65f0"),d=e("1dde"),f=e("b622"),b=e("2d00"),v=f("isConcatSpreadable"),p=9007199254740991,h="Maximum allowed index exceeded",g=b>=51||!i((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),m=d("concat"),S=function(t){if(!l(t))return!1;var a=t[v];return void 0!==a?!!a:c(t)},x=!g||!m;n({target:"Array",proto:!0,forced:x},{concat:function(t){var a,e,n,i,c,l=o(this),d=u(l,0),f=0;for(a=-1,n=arguments.length;a<n;a++)if(c=-1===a?l:arguments[a],S(c)){if(i=r(c.length),f+i>p)throw TypeError(h);for(e=0;e<i;e++,f++)e in c&&s(d,f,c[e])}else{if(f>=p)throw TypeError(h);s(d,f++,c)}return d.length=f,d}})},d894:function(t,a,e){"use strict";e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return i})),e.d(a,"d",(function(){return c})),e.d(a,"e",(function(){return l})),e.d(a,"a",(function(){return o}));e("99af"),e("159b"),e("b64b"),e("ac1f"),e("841c"),e("4e82"),e("4de4");function n(t,a){for(var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3?arguments[3]:void 0,i=[],c=1;c<=t;c+=1){for(var l={id:e?"".concat(e).concat(c):c},o=1;o<=a;o+=1)n&&n.isTestSpan?l["c".concat(o)]=3===o?1===c?{colSpan:1,rowSpan:1,value:"".concat(c," * ").concat(o," = ").concat(c*o)}:2===c?{colSpan:1,rowSpan:25,value:"".concat(c," * ").concat(o," = ").concat(c*o)}:c<26?{colSpan:1,rowSpan:0,value:"".concat(c," * ").concat(o," = ").concat(c*o)}:{colSpan:1,rowSpan:1,value:"".concat(c," * ").concat(o," = ").concat(c*o)}:{colSpan:1,rowSpan:1,value:"".concat(c," * ").concat(o," = ").concat(c*o)}:n&&n.isTestPivot?l["c".concat(o)]=1===o?c<50?"1":"".concat(c," * ").concat(o," = ").concat(c*o):2===o?c<5?"2":c<20?"3":"".concat(c," * ").concat(o," = ").concat(c*o):"".concat(c," * ").concat(o," = ").concat(c*o):l["c".concat(o)]={colSpan:1,rowSpan:1,value:"".concat(c," * ").concat(o," = ").concat(c*o)};i.push(l)}return i}function i(t,a){for(var e={},i=3,c=function(t){var c={isOpen:!1,type:"",data:[]},l=1;if(t<i?(c.type="span",l=1):(c.type="data",l=Math.ceil(5*Math.random())),6===t&&(c.isOpen=!0),c.data=n(l,a,"ex-".concat(t,"-")),t<i){var o=0;Object.keys(c.data[0]).forEach((function(t){"id"!==t&&(0===o&&(c.data[0].span="span"),o+=1)}))}e[t]=c},l=5;l<=t;l+=1)c(l);return e}function c(t,a){for(var e=[],n=1;n<=t;n+=1){for(var i={id:"f-".concat(n)},c=1;c<=a;c+=1)i["c".concat(c)]=1===c?2===n?{colSpan:2,rowSpan:0,value:"f-".concat(n,"-").concat(c)}:{colSpan:2,rowSpan:2,value:"f-".concat(n,"-").concat(c)}:c<3?{colSpan:0,rowSpan:1}:{colSpan:1,rowSpan:1,value:"f-".concat(n,"-").concat(c)};e.push(i)}return e}function l(t){for(var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=[],n={},i=1;i<=t;i+=1)n["c".concat(i)]={colSpan:1,rowSpan:1,value:"T".concat(i)};return a&&(n.operator={colSpan:1,rowSpan:1,value:"operator"}),e.push(n),e}function o(t){for(var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=arguments.length>2?arguments[2]:void 0,n=[],i=1;i<=t;i+=1){var c={dataIndex:"c".concat(i),dragGroup:"",align:{title:"",header:"",content:"",footer:""}};e&&e.isResize&&(c.resizeable=!0),i<3?(e&&(e.isStickyLeft&&(c.sticky="left"),e.isSearch&&(c.search=!0),e.isDrag&&(c.dragGroup="a1"),e.isRank&&(c.sort="init"),e.isFilter&&(c.filter=!0)),c.width="220px"):i>=t?(e&&e.isStickyRight&&(c.sticky="right"),c.width="220px",c.dragGroup=""):(e&&e.isDrag&&(c.dragGroup="b1"),e&&e.contentAlign&&(c.align.content=e.contentAlign)),n.push(c)}return a&&n.push({dataIndex:"operator",sticky:"right",width:"100px",dragGroup:"",resizeable:!1,align:{title:"",header:"",content:"",footer:""}}),n}},dc47:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("Layout",[e("div",[e("h3",[t._v("固定左侧")])]),e("div",[e("x-table",{attrs:{"is-sticky":t.isSticky,columns:t.left.tableColumns,config:t.left.tableConfig,data:t.tableData,title:t.tableHeaderTitle,"page-data":t.pageData}})],1),e("div",{staticStyle:{"margin-top":"32px"}},[e("h3",[t._v("固定右侧")])]),e("div",[e("x-table",{attrs:{"is-sticky":t.isSticky,columns:t.right.tableColumns,config:t.right.tableConfig,data:t.tableData,title:t.tableHeaderTitle,"page-data":t.pageData}})],1),e("div",{staticStyle:{"margin-top":"32px"}},[e("h3",[t._v("固定两侧")])]),e("div",[e("x-table",{attrs:{"is-sticky":t.isSticky,columns:t.side.tableColumns,config:t.side.tableConfig,data:t.tableData,title:t.tableHeaderTitle,"page-data":t.pageData}})],1)])},i=[],c=e("68bc"),l=e("d894"),o={name:"FixHead",components:{Layout:c["a"]},created:function(){this.left.tableColumns=Object(l["a"])(30,!1,{isStickyLeft:!0}),this.right.tableColumns=Object(l["a"])(30,!1,{isStickyRight:!0}),this.side.tableColumns=Object(l["a"])(30,!1,{isStickyLeft:!0,isStickyRight:!0}),this.tableData=Object(l["b"])(10,30),this.tableHeaderTitle=Object(l["e"])(30)},data:function(){return{isSticky:!0,tableHeaderTitle:[],tableData:[],pageData:{page:1,size:10},left:{tableColumns:[],tableConfig:{key:"table-fix-column-left",scrollHeight:"100%",scrollWidth:"100%",miniWidth:"160px",resizeMin:160,resizeMax:500,border:1,rowKey:"id",noWrap:!0,isUseNoWrapTitle:!0}},right:{tableColumns:[],tableConfig:{key:"table-fix-right",scrollHeight:"100%",scrollWidth:"100%",scrollBarWidth:15,scrollBarHeight:15,miniWidth:"160px",resizeMin:160,resizeMax:500,border:1,rowKey:"id",noWrap:!0,isUseNoWrapTitle:!0}},side:{tableColumns:[],tableConfig:{key:"table-fix-side",scrollHeight:"100%",scrollWidth:"100%",scrollBarWidth:15,scrollBarHeight:15,miniWidth:"160px",resizeMin:160,resizeMax:500,border:1,rowKey:"id",noWrap:!0,isUseNoWrapTitle:!0}}}}},r=o,s=e("2877"),u=Object(s["a"])(r,n,i,!1,null,null,null);a["default"]=u.exports}}]);