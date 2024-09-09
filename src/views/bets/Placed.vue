<template>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-12 is-vcentered">
        <nav class="level" style="width: 100%">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag w100">СТАВОК</p>
              <p class="title m3">
                {{ new Intl.NumberFormat().format(items.length) }}
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag is-success w100">НА СУММУ</p>
              <p class="title m3">
                <Money currency="EUR" v-bind:amount="totalStake"/>
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
          <b-table-column field="mode" width="50" label="Режим" sortable searchable v-slot="props">
            {{ props.row.mode }}
          </b-table-column>
          <b-table-column field="room" label="Рум" sortable searchable v-slot="props">
            {{ props.row.room }}
          </b-table-column>
          <b-table-column field="strategy" label="Стратегия" sortable searchable v-slot="props">
            {{ props.row.strategy }}
          </b-table-column>
          <b-table-column field="status" width="80" label="Статус" sortable searchable v-slot="props">
            <State v-bind:state="props.row.status"/>
          </b-table-column>
          <b-table-column width="100" field="placedCoef" label="Кэф" sortable searchable v-slot="props">
            {{ props.row.placedCoef }}
          </b-table-column>
          <b-table-column width="50" field="stake" label="Сумма" sortable searchable v-slot="props">
            <Money v-bind:currency="props.row.currency" v-bind:amount="props.row.stake"/>
          </b-table-column>
          <b-table-column field="bookmaker" width="150" label="Контора" sortable searchable v-slot="props">
            {{ props.row.bookmaker }}
          </b-table-column>
          <b-table-column field="timeValue" width="100" label="Тайм" sortable searchable v-slot="props">
            {{ props.row.timeValue }}
          </b-table-column>
          <b-table-column field="event" label="Событие и линия" sortable searchable v-slot="props">
            <div class="columns">
              <div class="column is-7 rightal">
                {{ props.row.homeTeam }} - {{ props.row.awayTeam }} [{{ props.row.score }}]
              </div>
              <div class="column is-1 has-text-centered">
                <Sport v-bind:sport="props.row.sport"/>
              </div>
              <div class="column is-4 leftal">
                {{ props.row.market }} / {{ props.row.target }} <span v-if="props.row.pivot">/ {{
                  props.row.pivot
                }}</span>
              </div>
            </div>
          </b-table-column>
          <b-table-column field="placedTime" width="60" label="Поставлена" sortable v-slot="props">
            {{ props.row.placedTime_hr }}
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import State from "@/components/Status";
import Money from "@/components/Money";
import Vue from "vue";
import Sport from "@/components/Sport";

export default {
  name: "Placed",
  data() {
    return {
      perPage: 15,
      currentPage: 1,
      loading: false,
      items: [],
    }
  },
  components: {
    Sport,
    State, Money
  },
  computed: {
    totalStake() {
      let stake = 0
      this.items.forEach((item) => {
        stake += item.euroStake
      });
      return stake
    },
  },
  methods: {
    retrieve() {
      this.loading = true
      Vue.prototype.$http.get(process.env.VUE_APP_API_HOST + `bets/placed`).then(resp => {
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
      title: 'Ставки'
    }
  }
}
</script>

<style scoped>
</style>