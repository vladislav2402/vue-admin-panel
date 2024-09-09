<template>
  <div class="container is-fluid">
    <form @submit.prevent="submit" novalidate>
      <b-loading :is-full-page="false" v-model="loading" :can-cancel="false"></b-loading>
      <div class="columns">
        <div class="column is-2">
          <b-field label="Режимы">
            <multiselect
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                v-model="form.modes"
                :options="bet_modes"/>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Статусы">
            <multiselect
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                v-model="form.statuses"
                :options="['WON', 'LOSE', 'REFUNDED', 'CANCELED']"/>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Спорты">
            <multiselect
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                v-model="form.sports"
                :options="sports"/>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Конторы">
            <multiselect
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                v-model="form.bks"
                :options="bookmakers"/>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Рынки">
            <multiselect
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                v-model="form.markets"
                :options="markets"/>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Таргеты">
            <multiselect
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                v-model="form.targets"
                :options="targets"/>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-2">
          <b-field label="Кэф с">
            <b-input size="is-small" v-model="form.coef_from"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Кэф по">
            <b-input size="is-small" v-model="form.coef_to"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Дата с">
            <b-datepicker
                size="is-small"
                v-model="form.date_from"
                :show-week-number="false"
                locale="ru-RU"
                icon="calendar-today"
                placeholder="Дата"
                editable
                trap-focus>
            </b-datepicker>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Дата по">
            <b-datepicker
                size="is-small"
                v-model="form.date_to"
                :show-week-number="false"
                locale="ru-RU"
                icon="calendar-today"
                placeholder="Дата"
                editable
                trap-focus>
            </b-datepicker>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <b-field label="Рум">
            <b-input size="is-small" v-model="form.room"></b-input>
          </b-field>
        </div>
        <div class="column is-4">
          <b-field label="Стратегия">
            <b-input size="is-small" v-model="form.strategy"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-button size="is-small" type="is-info" native-type="submit" outlined style="margin-top:28px">Показать
          </b-button>
        </div>
      </div>
    </form>
    <div class="columns">
      <div class="column is-12 is-vcentered">
        <nav class="level" style="width: 100%">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag w100">СТАВОК</p>
              <p class="title m3">
                {{ new Intl.NumberFormat().format(counters.count) }}
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag is-success w100">ОБОРОТ</p>
              <p class="title m3">
                <Money currency="EUR" v-bind:amount="parseFloat(counters.turnover)"/>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag is-success w100">ПРОФИТ</p>
              <p class="title m3">
                <Money currency="EUR" v-bind:amount="parseFloat(counters.profit)"/>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag is-success w100">ROI</p>
              <p class="title m3">
                <Money currency="EUR" v-bind:amount="parseFloat(counters.roi)"/>
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
            :per-page="perPage"
            :total="counters.count"
            :default-sort="[sortField, sortOrder]"
            @page-change="switchPage"
            @sort="onSort"
            backend-pagination
            backend-sorting>
          <b-table-column field="mode" width="80" label="Режим" sortable v-slot="props">
            {{ props.row.mode }}
          </b-table-column>
          <b-table-column field="type" width="80" label="Тип" sortable v-slot="props">
            {{ props.row.type }}
          </b-table-column>
          <b-table-column field="bk" width="100" label="Контора" sortable v-slot="props">
            {{ props.row.bk }}
          </b-table-column>
          <b-table-column field="room_id" width="200" label="Рум" v-slot="props">
            {{ props.row.room_name }}
          </b-table-column>
          <b-table-column field="strategy_id" width="200" label="Стратегия" v-slot="props">
            {{ props.row.strategy_name }}
          </b-table-column>
          <b-table-column field="status" width="80" label="Статус" sortable v-slot="props">
            <State v-bind:state="props.row.status"/>
          </b-table-column>
          <b-table-column field="placed_coef" width="100" label="Кеф" sortable v-slot="props">
            {{ props.row.r_coef }} / {{ props.row.p_coef }}
          </b-table-column>
          <b-table-column field="coef_diff" width="80" label="Дифф" sortable v-slot="props">
            {{ props.row.coef_diff }}
          </b-table-column>
          <b-table-column field="euro_stake" width="80" label="Сумма" sortable v-slot="props">
            <div class="flexed">
              <Money v-bind:amount="props.row.stake" v-bind:currency="props.row.currency"/>
              /
              <Money v-bind:amount="props.row.euro_stake" currency="EUR"/>
            </div>
          </b-table-column>
          <b-table-column field="euro_result" width="80" label="Профит" sortable v-slot="props">
            <div class="flexed">
              <Money v-bind:amount="props.row.result" v-bind:currency="props.row.currency"
                     v-if="props.row.result !== null"/>
              /
              <Money v-bind:amount="props.row.euro_result" currency="EUR" v-if="props.row.euro_result !== null"/>
            </div>
          </b-table-column>
          <b-table-column field="event" label="Событие и линия" v-slot="props">
            <div class="columns">
              <div class="column is-7 rightal">
                {{ props.row.t1 }} - {{ props.row.t2 }} [{{ props.row.score }}]
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
          <b-table-column field="placed_time" width="100" sortable label="Поставлена" v-slot="props">
            {{ new Date(props.row.placed_time * 1000).toLocaleString() }}
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
import Multiselect from "vue-multiselect";
import {mapGetters} from "vuex";

export default {
  name: "Settled",
  data() {
    return {
      perPage: 15,
      currentPage: 1,
      loading: false,
      items: [],
      sortField: 'placed_time',
      sortOrder: 'desc',
      counters: {
        count: 0,
        turnover: 0,
        profit: 0,
        roi: 0,
      },
      form: {
        modes: [],
        types: [],
        sports: [],
        statuses: [],
        bks: [],
        pair_bks: [],
        coef_states: [],
        markets: [],
        targets: [],
        sources: [],
        groups: [],
        times: [],
        coef_from: '',
        coef_to: '',
        arb_from: '',
        arb_to: '',
        diff_from: '',
        diff_to: '',
        date_from: null,
        date_to: null,
        room: '',
      },
    }
  },
  components: {
    Sport, State, Money, Multiselect
  },
  computed: {
    ...mapGetters('data', ['sports', 'bet_types', 'bet_modes', 'bookmakers', 'markets', 'targets']),
  },
  methods: {
    submit() {
      this.retrieve()
    },
    retrieve() {
      this.loading = true
      let params = [
        `sort=${this.sortField}`,
        `order=${this.sortOrder}`,
        `page=${this.currentPage}`,
        `per-page=${this.perPage}`,
      ].join('&')

      let data = Object.assign({}, this.form)
      let df = data.date_from
      let dt = data.date_to
      if (df) {
        data.date_from = df.getFullYear() + '-' + (1 + df.getMonth()).toString().padStart(2, '0') + '-' + df.getDate().toString().padStart(2, '0')
      }
      if (dt) {
        data.date_to = dt.getFullYear() + '-' + (1 + dt.getMonth()).toString().padStart(2, '0') + '-' + dt.getDate().toString().padStart(2, '0')
      }

      Vue.prototype.$http.post(process.env.VUE_APP_API_HOST + `bets/settled?${params}`, {search: data}).then(resp => {
        this.items = resp.data.result.items
        this.counters = resp.data.result.counters
      }).catch(err => {
        Vue.prototype.flashMessage.show({
          status: 'error',
          title: 'Это провал',
          message: 'Не удалось получить данные'
        })
      }).finally(() => {
        this.loading = false
      })
    },

    switchPage(page) {
      this.currentPage = page
      this.retrieve()
    },

    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order
      this.retrieve()
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
</style>