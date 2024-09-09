<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12">
        <h4 class="page-header">
          <b-icon icon="account-group"></b-icon>
          <span v-if="form.id">{{ form.name }}</span>
          <span v-if="!form.id">Новый аккаунт</span>
        </h4>
      </div>
    </div>
    <form @submit.prevent="submit" novalidate>
      <b-loading :is-full-page="false" v-model="loading" :can-cancel="false"></b-loading>
      <div class="columns">
        <div class="column is-12">
          <b-field
              label="Имя *"
              :message="'name' in errors ? errors['name'] : ''"
              :type="'name' in errors ? 'is-danger' : ''">
            <b-input v-model="form.name" placeholder="Например: Иван-Петров-OLIMP" icon="account"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <b-field
              label="Контора *"
              :message="'bookmaker' in errors ? errors['bookmaker'] : ''"
              :type="'bookmaker' in errors ? 'is-danger' : ''">
            <b-select v-model="form.bookmaker" icon="tag" expanded>
              <option v-for="option in bookmakers" :value="option" :key="option">
                {{ option }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field
              label="Валюта *"
              :message="'currency' in errors ? errors['currency'] : ''"
              :type="'currency' in errors ? 'is-danger' : ''">
            <b-select v-model="form.currency" icon="currency-usd-circle" expanded>
              <option v-for="option in currencies" :value="option" :key="option">
                {{ option }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column is-3">
          <b-field
              label="Логин *"
              :message="'login' in errors ? errors['login'] : ''"
              :type="'login' in errors ? 'is-danger' : ''">
            <b-input v-model="form.login" icon="account"></b-input>
          </b-field>
        </div>
        <div class="column is-3">
          <b-field
              label="Пароль *"
              :message="'password' in errors ? errors['password'] : ''"
              :type="'password' in errors ? 'is-danger' : ''">
            <b-input v-model="form.password" icon="lock"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-2">
          <b-field
              label="Прокси *"
              :message="'proxy_proto' in errors ? errors['proxy_proto'] : ''"
              :type="'proxy_proto' in errors ? 'is-danger' : ''">
            <b-select v-model="form.proxy_proto" icon="server-security" expanded>
              <option v-for="option in ['HTTP', 'SOCKS']" :value="option" :key="option">
                {{ option }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column is-4">
          <b-field
              label="Хост *"
              :message="'proxy_host' in errors ? errors['proxy_host'] : ''"
              :type="'proxy_host' in errors ? 'is-danger' : ''">
            <b-input v-model="form.proxy_host" icon="server-security"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field
              label="Порт *"
              :message="'proxy_port' in errors ? errors['proxy_port'] : ''"
              :type="'proxy_port' in errors ? 'is-danger' : ''">
            <b-input v-model="form.proxy_port" icon="cog"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field
              label="Логин"
              :message="'proxy_username' in errors ? errors['proxy_username'] : ''"
              :type="'proxy_username' in errors ? 'is-danger' : ''">
            <b-input v-model="form.proxy_username" icon="cog"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field
              label="Пароль"
              :message="'proxy_password' in errors ? errors['proxy_password'] : ''"
              :type="'proxy_password' in errors ? 'is-danger' : ''">
            <b-input v-model="form.proxy_password" icon="cog"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6">
          <b-field
              label="Баланс депозита"
              :message="'balance_deposit_notification' in errors ? errors['balance_deposit_notification'] : 'Баланс аккаунта, по достижении которого, будет отправлена нотификация о необходимости пополнения'"
              :type="'balance_deposit_notification' in errors ? 'is-danger' : ''">
            <b-input v-model="form.balance_deposit_notification" icon="wallet"></b-input>
          </b-field>
        </div>
        <div class="column is-6">
          <b-field
              label="Баланс вывода"
              :message="'balance_withdraw_notification' in errors ? errors['balance_withdraw_notification'] : 'Баланс аккаунта, по достижении которого, будет отправлена нотификация о необходимости вывода средств'"
              :type="'balance_withdraw_notification' in errors ? 'is-danger' : ''">
            <b-input v-model="form.balance_withdraw_notification" icon="wallet"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <b-field
              label="Информация"
              :message="'comment' in errors ? errors['comment'] : ''"
              :type="'comment' in errors ? 'is-danger' : ''">
            <b-input size="is-small" type="textarea" v-model="form.comment"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-2">
          <b-field
              label="Кэф от"
              :message="'coef_from' in errors ? errors['coef_from'] : ''"
              :type="'coef_from' in errors ? 'is-danger' : ''">
            <b-input v-model="form.coef_from" icon="cog"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field
              label="Кэф до"
              :message="'coef_to' in errors ? errors['coef_to'] : ''"
              :type="'coef_to' in errors ? 'is-danger' : ''">
            <b-input v-model="form.coef_to" icon="cog"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field
              label="Макс. ставок на событие"
              :message="'bets_per_event' in errors ? errors['bets_per_event'] : ''"
              :type="'bets_per_event' in errors ? 'is-danger' : ''">
            <b-input v-model="form.bets_per_event" icon="cog"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field
              label="Интервал ставок (сек)"
              :message="'bets_interval' in errors ? errors['bets_interval'] : 'Не меньше 60'"
              :type="'bets_interval' in errors ? 'is-danger' : ''">
            <b-input v-model="form.bets_interval" icon="cog"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-checkbox size="is-small" style="padding-top: 35px" v-model="form.full_time_only" native-value="1" value="1">
            Ставить только фулл-тайм
          </b-checkbox>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <hr>
          <h4 class="page-header">
            <b-icon icon="briefcase"></b-icon>
            <span>Стратегии</span>
          </h4>
        </div>
      </div>
      <div class="columns" v-for="(strategy, ix) in form.strategies">
        <div class="column is-5">
          <b-field label="Стратегия">
            <b-select v-model="strategy.strategy_id" icon="briefcase" expanded>
              <option v-for="option in strategies" :value="option.id" :key="option.id">
                {{ option.name }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Сумма ставки 1 *">
            <b-input v-model="strategy.stake1" icon="currency-usd-circle"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Сумма ставки 2">
            <b-input v-model="strategy.stake2" icon="currency-usd-circle"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Сумма ставки 3">
            <b-input v-model="strategy.stake3" icon="currency-usd-circle"></b-input>
          </b-field>
        </div>
        <div class="column is-1">
          <b-button style="margin-top: 32px" size="is-small" type="is-danger" outlined @click="form.strategies.splice(ix, 1)" title="Удалить">
            <b-icon icon="delete" size="is-small"></b-icon>
          </b-button>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <b-button :disabled="form.strategies.length >= 5" @click="form.strategies.push({strategy_id: '', stake1: '', stake2: '', stake3: ''})" type="is-success">Добавить</b-button>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <b-button :disabled="!isValid" type="is-info" native-type="submit">Сохранить</b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import router from "@/router";
import {mapGetters} from 'vuex'

export default {
  name: "Create",
  data() {
    return {
      form: {
        id: null,
        name: '',
        currency: '',
        login: '',
        bookmaker: '',
        password: '',
        proxy_proto: '',
        proxy_host: '',
        proxy_port: '',
        proxy_username: '',
        proxy_password: '',
        comment: '',
        balance_deposit_notification: null,
        balance_withdraw_notification: null,
        bets_per_event: 1,
        bets_interval: 120,
        coef_from: 1,
        coef_to: 3,
        full_time_only: 0,
        strategies: [],
      },
      loading: false,
      errors: [],
    }
  },
  computed: {
    ...mapGetters('data', ['strategies', 'bookmakers', 'currencies']),
    isValid() {
      let valid = (this.form.name.length > 0 && this.form.login.length > 0 && this.form.password.length > 0 &&
          this.form.bookmaker.length > 0 && this.form.proxy_proto.length > 0 && this.form.currency.length > 0 &&
          this.form.proxy_host.length > 0 && this.form.strategies.length > 0)
      this.form.strategies.forEach((item, i, arr) => {
        if (item.stake1.length === 0) {
          valid = false
        }
      })

      return valid
    },
  },
  methods: {
    submit: function () {
      this.loading = true
      this.errors = []
      Vue.prototype.$http.post(process.env.VUE_APP_API_HOST + 'rooms/index', {room: this.form}).then(resp => {
        Vue.prototype.flashMessage.show({
          status: 'success',
          title: '',
          message: 'Данные сохранены'
        })
        router.push('/rooms')
      }).catch(err => {
        if (err.response.status === 400) {
          this.errors = err.response.data.result
        } else {
          Vue.prototype.flashMessage.show({
            status: 'error',
            title: 'Что-то пошло не так',
            message: 'Не удалось сохранить данные'
          })
        }
      }).finally(() => {
        this.loading = false
      })
    },
  },
  mounted() {
    this.$store.dispatch('data/strategies')
    let id = this.$route.query.id
    if (id) {
      this.loading = true
      Vue.prototype.$http.get(process.env.VUE_APP_API_HOST + `rooms/index?id=${id}`).then((resp) => {
        this.form = resp.data.result
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
  metaInfo() {
    return {
      title: 'Аккаунты'
    }
  }
}
</script>

<style scoped>

</style>