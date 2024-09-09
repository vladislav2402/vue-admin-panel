(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21eb4b"],{d768:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-12"},[s("h4",{staticClass:"page-header"},[s("b-icon",{attrs:{icon:"briefcase"}}),s("span",[t._v("Стратегии")])],1),s("b-button",{attrs:{tag:"router-link",type:"is-primary",outlined:"",to:{path:"/strategies/create"}}},[s("span",[t._v("Создать")])])],1)]),s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("b-table",{attrs:{data:t.items,paginated:!0,bordered:!0,striped:!0,loading:t.loading,"per-page":t.perPage}},[s("b-table-column",{attrs:{field:"name",label:"Название",sortable:"",searchable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.name)+" ")]}}])}),s("b-table-column",{attrs:{field:"public",width:"50",label:"Публичная",sortable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.public?s("b-icon",{attrs:{icon:"checkbox-marked-circle"}}):t._e()]}}])}),s("b-table-column",{attrs:{field:"tax_percent",width:"50",label:"Комиссия",sortable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.tax_percent)+"% ")]}}])}),s("b-table-column",{attrs:{field:"rooms",label:"Подписчиков",width:"100",sortable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.rooms)+" ")]}}])}),s("b-table-column",{attrs:{field:"bets_count",label:"Ставок",width:"100",sortable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s((new Intl.NumberFormat).format(e.row.bets_count))+" ")]}}])}),s("b-table-column",{attrs:{field:"turnover",label:"Оборот",width:"100",sortable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[null!==e.row.turnover?s("Money",{attrs:{amount:e.row.turnover,currency:"EUR"}}):t._e()]}}])}),s("b-table-column",{attrs:{field:"roi",label:"ROI",width:"50",sortable:"","cell-class":"leftal"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.roi)+" ")]}}])}),s("b-table-column",{scopedSlots:t._u([{key:"default",fn:function(e){return[s("ul",{staticClass:"horizontal"},[s("li",[s("a",{attrs:{title:"Редактировать",href:"/strategies/create?id="+e.row.id}},[s("b-button",{attrs:{size:"is-small",type:"is-info",outlined:""}},[s("b-icon",{attrs:{size:"is-small",icon:"pencil"}})],1)],1)]),s("li",[s("b-button",{attrs:{size:"is-small",type:"is-danger",outlined:"",title:"Удалить"},on:{click:function(s){return t.delete_(e.row.id)}}},[s("b-icon",{attrs:{icon:"delete",size:"is-small"}})],1)],1),s("li",[s("b-button",{attrs:{tag:"router-link",title:"Статистика",size:"is-small",type:"is-success",to:"/statistic/strategy?id="+e.row.id}},[s("b-icon",{attrs:{size:"is-small",icon:"chart-bar"}})],1)],1)])]}}])})],1)],1)])])},l=[],n=(s("d3b7"),s("2b0e")),o=s("f802"),i={name:"Index",data:function(){return{perPage:15,currentPage:1,loading:!1,items:[]}},components:{Money:o["a"]},methods:{retrieve:function(){var t=this;this.loading=!0,n["a"].prototype.$http.get("https://betexy.com/api/strategies/index").then((function(e){t.items=e.data.result.items})).catch((function(t){n["a"].prototype.flashMessage.show({status:"error",title:"Что-то пошло не так",message:"Не удалось получить данные"})})).finally((function(){t.loading=!1}))},delete_:function(t){var e=this;confirm("Удалить стратегию?")&&(this.loading=!0,n["a"].prototype.$http.delete("https://betexy.com/api/"+"strategies/index?id=".concat(t)).then((function(t){e.retrieve(),n["a"].prototype.flashMessage.show({status:"success",title:"Запрос выполнен",message:"Стратегия удалена"})})).catch((function(t){n["a"].prototype.flashMessage.show({status:"error",title:"Запрос не выполнен",message:"Не удалось удалить стратегию"})})).finally((function(){e.loading=!1})))}},mounted:function(){this.retrieve()},metaInfo:function(){return{title:"Стратегии"}}},r=i,c=s("2877"),u=Object(c["a"])(r,a,l,!1,null,"873211a4",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d21eb4b.127ec1f7.js.map