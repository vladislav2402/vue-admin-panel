<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12">
        <h4 class="page-header">
          <b-icon icon="account-group"></b-icon>
          <span>Аккаунты</span>
        </h4>
        <b-button tag="router-link" type="is-primary" outlined :to="{ path: `/rooms/create` }">
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
          <b-table-column field="bookmaker" label="Контора" width="100" sortable searchable cell-class="leftal"
                          v-slot="props">
            {{ props.row.bookmaker }}
          </b-table-column>
          <b-table-column field="state" width="100" label="Статус" searchable sortable cell-class="leftal"
                          v-slot="props">
            <Status v-bind:state="props.row.state"/>
          </b-table-column>
          <b-table-column field="state" width="50" label="Стратегий" sortable cell-class="leftal"
                          v-slot="props">
            {{props.row.strategies}}
          </b-table-column>
          <b-table-column field="balance" label="Баланс" width="100" sortable cell-class="leftal" v-slot="props">
            <Money v-bind:amount="props.row.balance" v-bind:currency="props.row.currency"
                   v-if="props.row.balance !== null"/>
          </b-table-column>
          <b-table-column field="placed_balance" label="В ставках" width="100" sortable cell-class="leftal"
                          v-slot="props">
            <Money v-bind:amount="props.row.placed_balance" v-bind:currency="props.row.currency"
                   v-if="props.row.placed_balance !== null"/>
          </b-table-column>
          <b-table-column field="bets" label="Откр.Ставок" sortable cell-class="leftal" v-slot="props">
            {{ props.row.bets }}
          </b-table-column>
          <b-table-column field="last_bet_at" label="Посл.Ставка" sortable cell-class="leftal" v-slot="props">
            {{ props.row.last_bet_at_hr }}
          </b-table-column>
          <b-table-column v-slot="props">
            <ul class="horizontal">
              <li v-if="props.row.can_be_edited">
                <router-link :to="{ path: `/rooms/create?id=${props.row.id}` }" tag="span">
                  <b-button type="is-info" size="is-small" outlined>
                    <b-icon icon="pencil" size="is-small"></b-icon>
                  </b-button>
                </router-link>
              </li>
              <li v-if="props.row.can_be_started">
                <b-button size="is-small" type="is-success" outlined @click="start_(props.row.id)" title="Запуск">
                  <b-icon icon="play" size="is-small"></b-icon>
                </b-button>
              </li>
              <li v-if="props.row.can_be_stopped">
                <b-button size="is-small" type="is-warning" outlined @click="stop_(props.row.id)" title="Стоп">
                  <b-icon icon="stop" size="is-small"></b-icon>
                </b-button>
              </li>
              <li v-if="props.row.can_be_deleted">
                <b-button size="is-small" type="is-danger" outlined @click="delete_(props.row.id)" title="Удалить">
                  <b-icon icon="delete" size="is-small"></b-icon>
                </b-button>
              </li>
              <li>
                <b-button tag="router-link" title="Статистика" size="is-small" type="is-success" :to="`/statistic/room?id=${props.row.id}`">
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
import Status from "@/components/Status";

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
    Status,
    Money
  },
  methods: {
    start_: function (id) {
      if (confirm('Запустить аккаунт?')) {
        this.loading = true
        Vue.prototype.$http.post(process.env.VUE_APP_API_HOST + `rooms/start`, {room: {id: id}}).then(resp => {
          this.retrieve()
          Vue.prototype.flashMessage.show({
            status: 'success',
            title: 'Запрос выполнен',
            message: 'Аккаунт запущен'
          })
        }).catch(err => {
          Vue.prototype.flashMessage.show({
            status: 'error',
            title: 'Запрос не выполнен',
            message: 'Не удалось запустить аккаунт'
          })
        }).finally(() => {
          this.loading = false
        })
      }
    },
    stop_: function (id) {
      if (confirm('Остановить аккаунт?')) {
        this.loading = true
        Vue.prototype.$http.post(process.env.VUE_APP_API_HOST + `rooms/stop`, {room: {id: id}}).then(resp => {
          this.retrieve()
          Vue.prototype.flashMessage.show({
            status: 'success',
            title: 'Запрос выполнен',
            message: 'Аккаунт остановлен'
          })
        }).catch(err => {
          Vue.prototype.flashMessage.show({
            status: 'error',
            title: 'Запрос не выполнен',
            message: 'Не удалось остановить аккаунт'
          })
        }).finally(() => {
          this.loading = false
        })
      }
    },
    delete_: function (id) {
      if (confirm('Удалить аккаунт?')) {
        this.loading = true
        Vue.prototype.$http.delete(process.env.VUE_APP_API_HOST + `rooms/index?id=${id}`).then(resp => {
          this.retrieve()
          Vue.prototype.flashMessage.show({
            status: 'success',
            title: 'Запрос выполнен',
            message: 'Аккаунт удален'
          })
        }).catch(err => {
          Vue.prototype.flashMessage.show({
            status: 'error',
            title: 'Запрос не выполнен',
            message: 'Не удалось удалить аккаунт'
          })
        }).finally(() => {
          this.loading = false
        })
      }
    },
    retrieve: function () {
      this.loading = true
      Vue.prototype.$http.get(process.env.VUE_APP_API_HOST + `rooms/index`).then(resp => {
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
    }
  },
  mounted() {
    this.retrieve()
  },
  metaInfo() {
    return {
      title: 'Аккаунты'
    }
  }
}
</script>

<style scoped>
</style>