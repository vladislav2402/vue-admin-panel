(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d314e"],{"5af2":function(t,e,l){"use strict";l.r(e);var a=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"container"},[l("div",{staticClass:"columns"},[l("div",{staticClass:"column is-12"},[l("h4",{staticClass:"page-header"},[l("b-icon",{attrs:{icon:"briefcase-outline"}}),l("span",[t._v("Публичные стратегии")])],1)])]),l("div",{staticClass:"columns"},[l("div",{staticClass:"column"},[l("b-table",{attrs:{data:t.items,paginated:!0,bordered:!0,striped:!0,loading:t.loading,"per-page":t.perPage}},[l("b-table-column",{attrs:{field:"name",label:"Название",sortable:"",searchable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.name)+" ")]}}])}),l("b-table-column",{attrs:{field:"info",label:"Описание",searchable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.info)+" ")]}}])}),l("b-table-column",{attrs:{field:"tax_percent",width:"50",label:"Комиссия",sortable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.tax_percent)+"% ")]}}])}),l("b-table-column",{attrs:{field:"rooms",label:"Подписчиков",width:"100",sortable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s((new Intl.NumberFormat).format(e.row.rooms))+" ")]}}])}),l("b-table-column",{attrs:{field:"bets_count",label:"Ставок",width:"100",sortable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s((new Intl.NumberFormat).format(e.row.bets_count))+" ")]}}])}),l("b-table-column",{attrs:{field:"turnover",label:"Оборот",width:"100",sortable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(t){return[l("Money",{attrs:{amount:t.row.turnover,currency:"EUR"}})]}}])}),l("b-table-column",{attrs:{field:"roi",label:"ROI",width:"50",sortable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.roi)+" ")]}}])}),l("b-table-column",{scopedSlots:t._u([{key:"default",fn:function(t){return[l("ul",{staticClass:"horizontal"},[l("li",[l("b-button",{attrs:{tag:"router-link",title:"Статистика",size:"is-small",type:"is-success",to:"/statistic/strategy?id="+t.row.id}},[l("b-icon",{attrs:{size:"is-small",icon:"chart-bar"}})],1)],1)])]}}])})],1)],1)])])},s=[],n=(l("d3b7"),l("2b0e")),o=l("f802"),r={name:"Index",data:function(){return{perPage:15,currentPage:1,loading:!1,items:[]}},components:{Money:o["a"]},methods:{retrieve:function(){var t=this;this.loading=!0,n["a"].prototype.$http.get("https://betexy.com/api/strategies/public_list").then((function(e){t.items=e.data.result.items})).catch((function(t){n["a"].prototype.flashMessage.show({status:"error",title:"Что-то пошло не так",message:"Не удалось получить данные"})})).finally((function(){t.loading=!1}))}},mounted:function(){this.retrieve()},metaInfo:function(){return{title:"Публичные стратегии"}}},i=r,c=l("2877"),u=Object(c["a"])(i,a,s,!1,null,"66b361ce",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0d314e.fce52a29.js.map