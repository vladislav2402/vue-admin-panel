<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12">
        <h4 class="page-header">
          <b-icon icon="briefcase"></b-icon>
          <span>Стратегии</span>
        </h4>
        <b-button tag="router-link" type="is-primary" outlined :to="{ path: `/strategies/create` }">
          <span>Создать</span>
        </b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-table
            :data="items"
            :paginated="true"
            :bordered="true"
            :striped="true"
            :loading="loading"
            :per-page="perPage">
          <b-table-column field="name" label="Название" sortable searchable cell-class="leftal" v-slot="props">
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="public" width="50" label="Публичная" sortable cell-class="leftal" v-slot="props">
            <b-icon icon="checkbox-marked-circle" v-if="props.row.public"/>
          </b-table-column>
          <b-table-column field="tax_percent" width="50" label="Комиссия" sortable cell-class="leftal" v-slot="props">
            {{ props.row.tax_percent }}%
          </b-table-column>
          <b-table-column field="rooms" label="Подписчиков" width="100" sortable cell-class="leftal" v-slot="props">
            {{ props.row.rooms }}
          </b-table-column>
          <b-table-column field="bets_count" label="Ставок" width="100" sortable cell-class="leftal" v-slot="props">
            {{ new Intl.NumberFormat().format(props.row.bets_count) }}
          </b-table-column>
          <b-table-column field="turnover" label="Оборот" width="100" sortable cell-class="leftal" v-slot="props">
            <Money v-bind:amount="props.row.turnover" currency="EUR" v-if="props.row.turnover !== null"/>
          </b-table-column>
          <b-table-column field="roi" label="ROI" width="50" sortable cell-class="leftal" v-slot="props">
            {{ props.row.roi }}
          </b-table-column>
          <b-table-column v-slot="props">
            <ul class="horizontal">
              <li>
                <a title="Редактировать" :href="`/strategies/create?id=${props.row.id}`">
                  <b-button size="is-small" type="is-info" outlined>
                    <b-icon size="is-small" icon="pencil"></b-icon>
                  </b-button>
                </a>
              </li>
              <li>
                <b-button size="is-small" type="is-danger" outlined @click="delete_(props.row.id)" title="Удалить">
                  <b-icon icon="delete" size="is-small"></b-icon>
                </b-button>
              </li>
              <li>
                <b-button tag="router-link" title="Статистика" size="is-small" type="is-success" :to="`/statistic/strategy?id=${props.row.id}`">
                  <b-icon size="is-small" icon="chart-bar"></b-icon>
                </b-button>
              </li>
            </ul>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Money from "@/components/Money";

export default {
  name: "Index",
  data() {
    return {
      perPage: 15,
      currentPage: 1,
      loading: false,
      items: [],
    }
  },
  components: {
    Money
  },
  methods: {
    retrieve: function () {
      this.loading = true
      Vue.prototype.$http.get(process.env.VUE_APP_API_HOST + `strategies/index`).then(resp => {
        this.items = resp.data.result.items
      }).catch(err => {
        Vue.prototype.flashMessage.show({
          status: 'error',
          title: 'Что-то пошло не так',
          message: 'Не удалось получить данные'
        })
      }).finally(() => {
        this.loading = false
      })
    },
    delete_: function (id) {
      if (confirm('Удалить стратегию?')) {
        this.loading = true
        Vue.prototype.$http.delete(process.env.VUE_APP_API_HOST + `strategies/index?id=${id}`).then(resp => {
          this.retrieve()
          Vue.prototype.flashMessage.show({
            status: 'success',
            title: 'Запрос выполнен',
            message: 'Стратегия удалена'
          })
        }).catch(err => {
          Vue.prototype.flashMessage.show({
            status: 'error',
            title: 'Запрос не выполнен',
            message: 'Не удалось удалить стратегию'
          })
        }).finally(() => {
          this.loading = false
        })
      }
    },
  },
  mounted() {
    this.retrieve()
  },
  metaInfo() {
    return {
      title: 'Стратегии'
    }
  }
}
</script>

<style scoped>
</style>