<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12">
        <h4 class="page-header">
          <b-icon icon="briefcase-outline"></b-icon>
          <span>Публичные стратегии</span>
        </h4>
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
          <b-table-column field="info" label="Описание" searchable cell-class="leftal" v-slot="props">
            {{ props.row.info }}
          </b-table-column>
          <b-table-column field="tax_percent" width="50" label="Комиссия" sortable cell-class="leftal" v-slot="props">
            {{ props.row.tax_percent }}%
          </b-table-column>
          <b-table-column field="rooms" label="Подписчиков" width="100" sortable cell-class="leftal" v-slot="props">
            {{ new Intl.NumberFormat().format(props.row.rooms) }}
          </b-table-column>
          <b-table-column field="bets_count" label="Ставок" width="100" sortable cell-class="leftal" v-slot="props">
            {{ new Intl.NumberFormat().format(props.row.bets_count) }}
          </b-table-column>
          <b-table-column field="turnover" label="Оборот" width="100" sortable cell-class="leftal" v-slot="props">
            <Money v-bind:amount="props.row.turnover" currency="EUR" />
          </b-table-column>
          <b-table-column field="roi" label="ROI" width="50" sortable cell-class="leftal" v-slot="props">
            {{ props.row.roi }}
          </b-table-column>
          <b-table-column v-slot="props">
            <ul class="horizontal">
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
      Vue.prototype.$http.get(process.env.VUE_APP_API_HOST + `strategies/public_list`).then(resp => {
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
  },
  mounted() {
    this.retrieve()
  },
  metaInfo() {
    return {
      title: 'Публичные стратегии'
    }
  }
}
</script>

<style scoped>
</style>