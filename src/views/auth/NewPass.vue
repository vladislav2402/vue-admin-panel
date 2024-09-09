<template>
  <div class="container is-centered">
    <div class="columns is-centered">
      <div class="column is-12">
        <img src="./../../assets/logo.svg">
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column" style="max-width: 400px">
        <form autocomplete="off" @submit.prevent="login" novalidate>
          <b-loading :is-full-page="false" v-model="formLoading" :can-cancel="false"></b-loading>
          <b-field label="Новый пароль" label-position="on-border"
                   :message="'password' in errors ? errors['password'] : 'Спецсимволы, буквы и цифры латинского алфавита. Минимум 6 знаков'"
                   :type="'password' in errors ? 'is-danger' : ''">
            <b-input autocomplete="nope" type="password" v-model="form.password" icon="lock"></b-input>
          </b-field>
          <b-field label="И еще раз" label-position="on-border"
                   :message="'confirm_password' in errors ? errors['password'] : ''"
                   :type="'confirm_password' in errors ? 'is-danger' : ''">
            <b-input autocomplete="nope" type="password" v-model="form.confirm_password" icon="lock"></b-input>
            <p class="control">
              <b-button :disabled="!submitEnabled" type="is-info" native-type="submit">Готово</b-button>
            </p>
          </b-field>
          <div class="leftal">
            <router-link :to="{ path: `/login` }" tag="span">
              <b-button type="is-success" size="is-small" outlined>Вход</b-button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Vue from "vue";

export default {
  data() {
    return {
      form: {
        password: '',
        confirm_password: '',
        code: '',
      },
      errors: {},
      formLoading: false,
    }
  },
  computed: {
    submitEnabled() {
      return this.form.password.length >= 6 && this.form.confirm_password === this.form.password
    }
  },
  methods: {
    login: function () {
      this.formLoading = true
      Vue.prototype.$http.post(process.env.VUE_APP_API_HOST + 'auth/newpass', {user: this.form}).then(resp => {
        router.push('/login?np=t');
      }).catch(error => {
        this.errors = error.response.data.result
      }).finally(() => {
        this.formLoading = false
      })
    },
  },
  mounted() {
    if (this.$route.query.cnf) {
      this.form.code = this.$route.query.cnf
    }
  }
}
</script>

<style scoped>
img {
  max-width: 300px;
}
</style>