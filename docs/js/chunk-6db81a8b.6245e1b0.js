(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6db81a8b"],{"129f":function(t,a){t.exports=Object.is||function(t,a){return t===a?0!==t||1/t===1/a:t!=t&&a!=a}},"156f":function(t,a,e){"use strict";e("6d7c")},"68bc":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"layout_content"},[e("div",{staticClass:"layout_left"},[e("div",{staticClass:"header"}),e("div",{staticClass:"menu"},[e("ul",t._l(t.menus,(function(a){return e("li",{key:a.value},[e("router-link",{attrs:{to:{name:a.value}}},[t._v(t._s(a.label))])],1)})),0)])]),e("div",{staticClass:"layout_right"},[e("div",[e("h2",[t._v(t._s(t.menuName))])]),t._t("default")],2)])},o=[],c=(e("b0c0"),e("159b"),{name:"Layout",data:function(){return{menus:[{value:"Index",label:"基本用法"},{value:"Page",label:"分页"},{value:"FixHead",label:"固定表头"},{value:"FixColumn",label:"固定列"},{value:"Filter",label:"表头筛选"},{value:"Search",label:"表头搜索"},{value:"ExpandSearch",label:"展开行加入搜索"},{value:"OutSearch",label:"外部搜索"},{value:"Rank",label:"表头排序"},{value:"Span",label:"行列合并"},{value:"Pivot",label:"透视表"},{value:"Resize",label:"拖动列"},{value:"Exchange",label:"交换列"},{value:"Expand",label:"展开收起"},{value:"Custom",label:"自定义列"},{value:"Foot",label:"表格底部"},{value:"Checkbox",label:"多选框"},{value:"Waterfall",label:"滚动加载"},{value:"Compo",label:"组件单元格"}],menuName:""}},beforeMount:function(){var t=this,a=this.$route.name;this.menus.forEach((function(e){return e.value!==a||(t.menuName=e.label,!1)}))}}),l=c,r=(e("156f"),e("2877")),i=Object(r["a"])(l,n,o,!1,null,"9b64e6b6",null);a["a"]=i.exports},"6d7c":function(t,a,e){},"841c":function(t,a,e){"use strict";var n=e("d784"),o=e("825a"),c=e("1d80"),l=e("129f"),r=e("14c3");n("search",1,(function(t,a,e){return[function(a){var e=c(this),n=void 0==a?void 0:a[t];return void 0!==n?n.call(a,e):new RegExp(a)[t](String(e))},function(t){var n=e(a,t,this);if(n.done)return n.value;var c=o(t),i=String(this),u=c.lastIndex;l(u,0)||(c.lastIndex=0);var d=r(c,i);return l(c.lastIndex,u)||(c.lastIndex=u),null===d?-1:d.index}]}))},"99af":function(t,a,e){"use strict";var n=e("23e7"),o=e("d039"),c=e("e8b5"),l=e("861d"),r=e("7b0b"),i=e("50c4"),u=e("8418"),d=e("65f0"),s=e("1dde"),f=e("b622"),p=e("2d00"),v=f("isConcatSpreadable"),h=9007199254740991,b="Maximum allowed index exceeded",m=p>=51||!o((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),x=s("concat"),g=function(t){if(!l(t))return!1;var a=t[v];return void 0!==a?!!a:c(t)},S=!m||!x;n({target:"Array",proto:!0,forced:S},{concat:function(t){var a,e,n,o,c,l=r(this),s=d(l,0),f=0;for(a=-1,n=arguments.length;a<n;a++)if(c=-1===a?l:arguments[a],g(c)){if(o=i(c.length),f+o>h)throw TypeError(b);for(e=0;e<o;e++,f++)e in c&&u(s,f,c[e])}else{if(f>=h)throw TypeError(b);u(s,f++,c)}return s.length=f,s}})},d894:function(t,a,e){"use strict";e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return o})),e.d(a,"d",(function(){return c})),e.d(a,"e",(function(){return l})),e.d(a,"a",(function(){return r}));e("99af"),e("159b"),e("b64b"),e("ac1f"),e("841c"),e("4e82"),e("4de4");function n(t,a){for(var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3?arguments[3]:void 0,o=[],c=1;c<=t;c+=1){for(var l={id:e?"".concat(e).concat(c):c},r=1;r<=a;r+=1)n&&n.isTestSpan?l["c".concat(r)]=3===r?1===c?{colSpan:1,rowSpan:1,value:"".concat(c," * ").concat(r," = ").concat(c*r)}:2===c?{colSpan:1,rowSpan:25,value:"".concat(c," * ").concat(r," = ").concat(c*r)}:c<26?{colSpan:1,rowSpan:0,value:"".concat(c," * ").concat(r," = ").concat(c*r)}:{colSpan:1,rowSpan:1,value:"".concat(c," * ").concat(r," = ").concat(c*r)}:{colSpan:1,rowSpan:1,value:"".concat(c," * ").concat(r," = ").concat(c*r)}:n&&n.isTestPivot?l["c".concat(r)]=1===r?c<50?"1":"".concat(c," * ").concat(r," = ").concat(c*r):2===r?c<5?"2":c<20?"3":"".concat(c," * ").concat(r," = ").concat(c*r):"".concat(c," * ").concat(r," = ").concat(c*r):l["c".concat(r)]={colSpan:1,rowSpan:1,value:"".concat(c," * ").concat(r," = ").concat(c*r)};o.push(l)}return o}function o(t,a){for(var e={},o=3,c=function(t){var c={isOpen:!1,type:"",data:[]},l=1;if(t<o?(c.type="span",l=1):(c.type="data",l=Math.ceil(5*Math.random())),6===t&&(c.isOpen=!0),c.data=n(l,a,"ex-".concat(t,"-")),t<o){var r=0;Object.keys(c.data[0]).forEach((function(t){"id"!==t&&(0===r&&(c.data[0].span="span"),r+=1)}))}e[t]=c},l=5;l<=t;l+=1)c(l);return e}function c(t,a){for(var e=[],n=1;n<=t;n+=1){for(var o={id:"f-".concat(n)},c=1;c<=a;c+=1)o["c".concat(c)]=1===c?2===n?{colSpan:2,rowSpan:0,value:"f-".concat(n,"-").concat(c)}:{colSpan:2,rowSpan:2,value:"f-".concat(n,"-").concat(c)}:c<3?{colSpan:0,rowSpan:1}:{colSpan:1,rowSpan:1,value:"f-".concat(n,"-").concat(c)};e.push(o)}return e}function l(t){for(var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=[],n={},o=1;o<=t;o+=1)n["c".concat(o)]={colSpan:1,rowSpan:1,value:"T".concat(o)};return a&&(n.operator={colSpan:1,rowSpan:1,value:"operator"}),e.push(n),e}function r(t){for(var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=arguments.length>2?arguments[2]:void 0,n=[],o=1;o<=t;o+=1){var c={dataIndex:"c".concat(o),dragGroup:"",align:{title:"",header:"",content:"",footer:""}};e&&e.isResize&&(c.resizeable=!0),o<3?(e&&(e.isStickyLeft&&(c.sticky="left"),e.isSearch&&(c.search=!0),e.isDrag&&(c.dragGroup="a1"),e.isRank&&(c.sort="init"),e.isFilter&&(c.filter=!0)),c.width="220px"):o>=t?(e&&e.isStickyRight&&(c.sticky="right"),c.width="220px",c.dragGroup=""):(e&&e.isDrag&&(c.dragGroup="b1"),e&&e.contentAlign&&(c.align.content=e.contentAlign)),n.push(c)}return a&&n.push({dataIndex:"operator",sticky:"right",width:"100px",dragGroup:"",resizeable:!1,align:{title:"",header:"",content:"",footer:""}}),n}},fff2:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("Layout",[e("x-table",{attrs:{"is-fix-header":t.isFixHeader,columns:t.tableColumns,config:t.tableConfig,data:t.tableData,title:t.tableHeaderTitle,"page-data":t.pageData},scopedSlots:t._u([t._l(this.tableColumns,(function(a){return{key:"th-"+a.dataIndex,fn:function(n){n.text;var o=n.record;return[e(t.component.th,{key:"th-"+a.dataIndex,tag:"component",attrs:{record:o,column:a}})]}}})),t._l(this.tableColumns,(function(a){return{key:"td-"+a.dataIndex,fn:function(n){var o=n.record;return[e(t.component.td,{key:"td-"+a.dataIndex,tag:"component",attrs:{record:o,column:a},on:{change:t.handleTdChange}})]}}}))],null,!0)}),e("a-modal",{attrs:{title:"Basic Modal"},on:{ok:t.handleModalOk},model:{value:t.modalData.visible,callback:function(a){t.$set(t.modalData,"visible",a)},expression:"modalData.visible"}},[t._v(" "+t._s(t.modalData.data)+" ")])],1)},o=[],c=e("68bc"),l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[t._v(" 表头-"+t._s(t.text)+" ")])},r=[],i={name:"ThComponent",props:{column:Object,record:Object},computed:{dataIndex:function(){return this.column.dataIndex},text:function(){return this.record[this.dataIndex].value}}},u=i,d=e("2877"),s=Object(d["a"])(u,l,r,!1,null,"551890ed",null),f=s.exports,p=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",["c2"===t.dataIndex?e("span",[e("a-button",{attrs:{size:"small",type:"primary"},on:{click:t.handleModalClick}},[t._v("打开弹窗")])],1):e("span",[t._v(t._s(t.text))])])},v=[],h={name:"TdComponent",props:{column:Object,record:Object},computed:{dataIndex:function(){return this.column.dataIndex},text:function(){return this.record[this.dataIndex].value}},methods:{handleModalClick:function(){this.$emit("change",{type:"modal",data:this.text})}}},b=h,m=Object(d["a"])(b,p,v,!1,null,"22925d08",null),x=m.exports,g=e("d894"),S={name:"Compo",components:{Layout:c["a"],TdComponent:x,ThComponent:f},created:function(){this.tableColumns=Object(g["a"])(30),this.tableData=Object(g["b"])(100,30),this.tableHeaderTitle=Object(g["e"])(30)},data:function(){return{component:{td:x,th:f},isFixHeader:!0,tableColumns:[],tableHeaderTitle:[],tableData:[],tableConfig:{key:"table-components",scrollHeight:"100%",scrollWidth:"100%",scrollBarWidth:15,scrollBarHeight:15,miniWidth:"160px",resizeMin:160,resizeMax:500,border:1,rowKey:"id",noWrap:!0,isUseNoWrapTitle:!0},pageData:{page:1,size:10},modalData:{visible:!1,data:""}}},methods:{handleModalOk:function(){this.modalData.visible=!1},handleTdChange:function(t){var a=t.type,e=t.data;"modal"===a&&(this.modalData.visible=!0,this.modalData.data=e)}}},y=S,_=Object(d["a"])(y,n,o,!1,null,null,null);a["default"]=_.exports}}]);