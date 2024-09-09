<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12">
        <h4 class="page-header">
          <b-icon icon="wallet-plus"></b-icon>
          <span>Пополнить баланс</span>
        </h4>
      </div>
    </div>
    <form @submit.prevent="submit" novalidate>
      <b-loading :is-full-page="false" v-model="loading" :can-cancel="false"></b-loading>
      <div class="columns is-centered">
        <div class="column is-4">
          <b-field
              label="Сумма в евро *"
              :message="'amount' in errors ? errors['amount'] : 'От 1 до 10000'"
              :type="'amount' in errors ? 'is-danger' : ''">
            <b-input v-model="form.amount" icon="cash"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <b-button :disabled="form.amount === '' || form.amount < 1" type="is-info" native-type="submit">Пополнить
          </b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Payment",
  data() {
    return {
      loading: false,
      errors: [],
      form: {
        amount: ''
      }
    }
  },
  computed: {},
  methods: {
    submit: function () {
      this.loading = true
      this.errors = []
      Vue.prototype.$http.post(process.env.VUE_APP_API_HOST + 'payment/index', {payment: this.form}).then(resp => {
        console.log(resp.data)
        window.location = resp.data.result
      }).catch(err => {
        if (err.response.status === 400) {
          this.errors = err.response.data.result
        } else {
          Vue.prototype.flashMessage.show({
            status: 'error',
            title: 'Что-то пошло не так',
            message: 'Пополнение не удалось. Пожалуйста, свяжитесь с администрацией или попробуйте позже'
          })
        }
      }).finally(() => {
        this.loading = false
      })
    },
  },
  mounted() {
  },
  metaInfo() {
    return {
      title: 'Пополнить баланс'
    }
  }
}
</script>

<style scoped>
</style>