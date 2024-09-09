<template>
  <b-navbar fixed-top shadow type="is-light" style="padding-left: 10px; padding-right: 10px;">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/logo.svg">
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/rooms' }">
        <b-icon icon="account-group" size="is-small"/>
        <span>Мои аккаунты</span>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/strategies' }">
        <b-icon icon="briefcase" size="is-small"/>
        <span>Мои стратегии</span>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/public-strategies' }">
        <b-icon icon="briefcase-outline" size="is-small"/>
        <span>Публичные стратегии</span>
      </b-navbar-item>
      <b-navbar-dropdown label="Ставки">
        <b-navbar-item tag="router-link" :to="{ path: '/bets/placed' }">
          <b-icon icon="star" size="is-small"/>
          <span>Открытые</span>
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/bets/settled' }">
          <b-icon icon="star" size="is-small"/>
          <span>Закрытые</span>
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item tag="router-link" :to="{ path: '/statistic/user' }">
        <b-icon icon="chart-bar" size="is-small"/>
        <span>Статистика</span>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="router-link" :to="{ path: '/payment' }">
        <Money v-bind:amount="this.$store.getters['auth/user'].balance" currency="EUR"></Money>
      </b-navbar-item>
      <b-navbar-item @click="logout">Выйти {{ this.$store.getters['auth/user'].email }}</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Money from "@/components/Money";

export default {
  name: "Navbar",
  components: {Money},
  methods: {
    logout: function () {
      this.$store.dispatch('auth/logout')
    },
  },
  mounted() {
    setInterval(() => {
      this.$store.dispatch('auth/refresh')
    }, 30000)
  },
}
</script>

<style scoped>
img {
  width: 30px;
  height: 30px;
}
</style>