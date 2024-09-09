<template>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-6">
        <nav class="level" style="width: 100%">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag w100">СТАВОК</p>
              <p class="title m3">
                {{ new Intl.NumberFormat().format(summary.bets) }}
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag is-info w100">ОБОРОТ</p>
              <p class="title m3">
                <Money currency="EUR" v-bind:amount="summary.turnover"/>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag is-success w100">ПРОФИТ</p>
              <p class="title m3">
                <Money currency="EUR" v-bind:amount="summary.profit"/>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading tag is-warning w100">ROI</p>
              <p class="title m3">
                {{ summary.roi }}
              </p>
            </div>
          </div>
        </nav>
      </div>
      <div class="column is-6">
        <b-table
            :data="notifications"
            :paginated="true"
            :bordered="true"
            :striped="true"
            :loading="loading"
            :per-page="10">
          <b-table-column field="text" v-slot="props">
            {{ props.row.text }}
          </b-table-column>
          <b-table-column field="created_at" width="100" v-slot="props">
            {{ props.row.created_at_hr }}
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import Money from "@/components/Money";
import Vue from "vue";

export default {
  name: "Home",
  data() {
    return {
      loading: false,
      summary: {},
      notifications: [],
    }
  },
  components: {Money},
  methods: {
    dashboard() {
      this.loading = true
      Vue.prototype.$http.get(process.env.VUE_APP_API_HOST + `profile/dashboard`).then(resp => {
        this.notifications = resp.data.result.notifications
        this.summary = resp.data.result.dashboard
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
    this.dashboard()
    setInterval(() => {
      this.dashboard()
    }, 60000)
  },
}
</script>

<style scoped>

</style>