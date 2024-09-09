<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12">
        <h4 class="page-header">
          <b-icon icon="chart-bar"></b-icon>
          <span>Статистика</span>
        </h4>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12 is-vcentered">
        <nav class="level" style="width: 100%">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag w100">СТАВОК</p>
              <p class="title m3">
                {{ new Intl.NumberFormat().format(total.bets_count) }}
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag is-info w100">ОБОРОТ</p>
              <p class="title m3">
                <Money currency="EUR" v-bind:amount="total.turnover"/>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag is-success w100">ПРОФИТ</p>
              <p class="title m3">
                <Money currency="EUR" v-bind:amount="total.profit"/>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag is-warning w100">ROI</p>
              <p class="title m3">
                {{ total.roi }}
              </p>
            </div>
          </div>
        </nav>
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
          <b-table-column field="date" width="60" label="Дата" sortable v-slot="props">
            {{ props.row.date }}
          </b-table-column>
          <b-table-column field="bets" width="60" label="Ставок" sortable v-slot="props">
            {{ new Intl.NumberFormat().format(props.row.bets) }}
          </b-table-column>
          <b-table-column field="turnover" width="80" label="Оборот" sortable v-slot="props">
            <Money currency="EUR" v-bind:amount="props.row.turnover"/>
          </b-table-column>
          <b-table-column field="profit" width="80" label="Профит" sortable v-slot="props">
            <span :class="props.row.profit >= 0 ? 'text-success' : 'text-danger'">
              <Money currency="EUR" v-bind:amount="props.row.profit"/>
            </span>
          </b-table-column>
          <b-table-column field="roi" width="50" label="ROI" sortable v-slot="props">
            <span :class="props.row.roi >= 0 ? 'text-success' : 'text-danger'">
              {{ props.row.roi }}
            </span>
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
  name: "Room",
  data() {
    return {
      perPage: 15,
      currentPage: 1,
      loading: false,
      items: [],
      total: {},
    }
  },
  components: {Money},
  computed: {},
  methods: {
    retrieve() {
      this.loading = true
      Vue.prototype.$http.get(process.env.VUE_APP_API_HOST + `statistic/index`).then(resp => {
        this.total = resp.data.result.user
        this.items = resp.data.result.items
      }).catch(err => {
        Vue.prototype.flashMessage.show({
          status: 'error',
          title: 'Не удалось получить данные',
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
      title: 'Статистика'
    }
  }
}
</script>

<style scoped>
</style>