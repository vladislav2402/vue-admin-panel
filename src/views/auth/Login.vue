<template>
  <div class="container is-centered">
    <div class="columns is-centered">
      <div class="column is-12">
        <img src="./../../assets/logo.svg">
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column" style="max-width: 400px">
        <b-notification type="is-success is-light" aria-close-label="Close notification" v-if="this.$route.query.c">
          На указанный при регистрации емейл было выслано письмо со ссылкой на подтверждение аккаунта
        </b-notification>
        <b-notification type="is-success is-light" aria-close-label="Close notification" v-if="this.$route.query.r">
          На указанный емейл было выслано письмо с инструкциями по сбросу пароля
        </b-notification>
        <b-notification type="is-success is-light" aria-close-label="Close notification" v-if="this.$route.query.np">
          Войдите, используя новый пароль
        </b-notification>
        <form @submit.prevent="login" novalidate>
          <b-loading :is-full-page="false" v-model="formLoading" :can-cancel="false"></b-loading>
          <b-field
              label="Email" label-position="on-border"
              :message="'login' in errors ? errors['login'] : ''"
              :type="'login' in errors ? 'is-danger' : ''">
            <b-input v-model="form.login" icon="email"></b-input>
          </b-field>
          <b-field label="Пароль" label-position="on-border">
            <b-input type="password" v-model="form.password" icon="lock"></b-input>
            <p class="control">
              <b-button :disabled="submitEnabled" type="is-info" native-type="submit">Войти</b-button>
            </p>
          </b-field>
          <div class="leftal">
            <router-link :to="{ path: `/signup` }" tag="span">
              <b-button type="is-success" size="is-small" outlined>Регистрация</b-button>
            </router-link>
            <router-link :to="{ path: `/reset` }" tag="span">
              <b-button type="is-warning" size="is-small" outlined>Забыл пароль :(</b-button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Auth",
  data() {
    return {
      form: {
        login: '',
        password: '',
      },
      errors: {},
      formLoading: false,
    }
  },
  computed: {
    submitEnabled() {
      return !this.form.login || !this.form.password
    }
  },
  methods: {
    login: function () {
      this.formLoading = true
      this.$store.dispatch('auth/login', this.form).then(() => {
        this.$store.dispatch('data/constants')
        router.push('/');
      }).catch(error => {
        this.errors = error.response.data.result
      }).finally(() => {
        this.formLoading = false
      })
    },
    confirmation: function (code) {
      this.formLoading = true
      this.$store.dispatch('auth/confirmation', {code: code}).then(() => {
        this.$store.dispatch('data/constants')
        router.push('/');
      }).catch(error => {
      }).finally(() => {
        this.formLoading = false
      })
    },
  },
  mounted() {
    if (this.$route.query.cnf) {
      this.confirmation(this.$route.query.cnf)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 300px;
}
</style>