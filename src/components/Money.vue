<template>
  <MoneyFormat :value="amount" locale='ru' :currency-code="currency" />
</template>

<script>
import MoneyFormat from 'vue-money-format'

export default {
  name: "Money",
  props: ['amount', 'currency'],
  components: {MoneyFormat}
}
</script>

<style scoped>

</style>