(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c1413"],{"44eb":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-12"},[s("h4",{staticClass:"page-header"},[s("b-icon",{attrs:{icon:"chart-bar"}}),s("span",[t._v('Статистика стратегии "'+t._s(t.strategy.name)+'"')])],1)])]),s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-12 is-vcentered"},[s("nav",{staticClass:"level",staticStyle:{width:"100%"}},[s("div",{staticClass:"level-item has-text-centered"},[s("div",[s("p",{staticClass:"heading tag w100"},[t._v("СТАВОК")]),s("p",{staticClass:"title m3"},[t._v(" "+t._s((new Intl.NumberFormat).format(t.strategy.bets_count))+" ")])])]),s("div",{staticClass:"level-item has-text-centered"},[s("div",[s("p",{staticClass:"heading tag is-info w100"},[t._v("ОБОРОТ")]),s("p",{staticClass:"title m3"},[s("Money",{attrs:{currency:"EUR",amount:t.strategy.turnover}})],1)])]),s("div",{staticClass:"level-item has-text-centered"},[s("div",[s("p",{staticClass:"heading tag is-warning w100"},[t._v("ROI")]),s("p",{staticClass:"title m3"},[t._v(" "+t._s(t.strategy.roi)+" ")])])])])])]),s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("b-table",{attrs:{data:t.items,paginated:!0,bordered:!0,striped:!0,loading:t.loading,"per-page":t.perPage}},[s("b-table-column",{attrs:{field:"date",width:"60",label:"Дата",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.date)+" ")]}}])}),s("b-table-column",{attrs:{field:"bets",width:"60",label:"Ставок",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s((new Intl.NumberFormat).format(e.row.bets))+" ")]}}])}),s("b-table-column",{attrs:{field:"turnover",width:"80",label:"Оборот",sortable:""},scopedSlots:t._u([{key:"default",fn:function(t){return[s("Money",{attrs:{currency:"EUR",amount:t.row.turnover}})]}}])}),s("b-table-column",{attrs:{field:"profit",width:"80",label:"Профит",sortable:""},scopedSlots:t._u([{key:"default",fn:function(t){return[s("span",{class:t.row.profit>=0?"text-success":"text-danger"},[s("Money",{attrs:{currency:"EUR",amount:t.row.profit}})],1)]}}])}),s("b-table-column",{attrs:{field:"roi",width:"50",label:"ROI",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{class:e.row.roi>=0?"text-success":"text-danger"},[t._v(" "+t._s(e.row.roi)+" ")])]}}])})],1)],1)])])},i=[],n=(s("d3b7"),s("2b0e")),r=s("f802"),l={name:"Strategy",data:function(){return{perPage:15,currentPage:1,loading:!1,items:[],strategy:{}}},components:{Money:r["a"]},computed:{},methods:{retrieve:function(){var t=this;this.loading=!0,n["a"].prototype.$http.get("https://betexy.com/api/"+"statistic/strategy?id=".concat(this.strategy.id)).then((function(e){t.strategy=e.data.result.strategy,t.items=e.data.result.items})).catch((function(t){n["a"].prototype.flashMessage.show({status:"error",title:"Не удалось получить данные"})})).finally((function(){t.loading=!1}))}},mounted:function(){this.strategy.id=this.$route.query.id,this.retrieve()},metaInfo:function(){return{title:"Статистика"}}},o=l,c=s("2877"),d=Object(c["a"])(o,a,i,!1,null,"2bceafb2",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d0c1413.b26f09a8.js.map