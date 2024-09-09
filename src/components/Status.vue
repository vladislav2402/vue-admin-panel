<template>
  <span :class="cdlass" :title="state">
    {{ label !== undefined ? label : state }}
  </span>
</template>

<script>
export default {
  name: "Status",
  props: ['state', 'label'],
  computed: {
    cdlass() {
      switch (this.state) {
        case 'LIMITED':
        case 'DEAD':
        case 'INVALID_CREDENTIALS':
        case 'BETS_LIMITED':
        case 'WITHDRAW_LIMITED':
        case 'DEPOSIT_LIMITED':
        case 'FAILED':
        case 'PROXY_ERROR':
        case 'MAXIMUM_0':
        case 'NO_FUNDS':
        case 'LOSE':
          return 'tag is-danger';
        case 'OFFLINE':
        case 'MAINTENANCE':
        case 'INACTIVE':
        case 'STARTING':
          return 'tag is-warning';
        case 'BUSY':
        case 'PENDING':
          return 'tag is-info';
        case 'ONLINE':
        case 'SCHEDULED':
        case 'SUCCESS':
        case 'IDLE':
        case 'ACCEPTED':
        case 'WON':
          return 'tag is-success';
        default:
          return 'tag is-light'
      }
    }
  }
}
</script>

<style scoped>

</style>