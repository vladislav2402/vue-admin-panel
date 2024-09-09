<template>
  <div class="container">
    <form @submit.prevent="submit" novalidate>
      <b-loading :is-full-page="false" v-model="loading" :can-cancel="false"></b-loading>
      <div class="columns">
        <div class="column is-3">
          <b-field label="Текущий пароль" label-position="on-border"
                   :message="'password' in errors ? errors['password'] : ''"
                   :type="'password' in errors ? 'is-danger' : ''">
            <b-input autocomplete="nope" type="password" v-model="form.password" icon="lock"></b-input>
            <p class="control">
              <b-button :disabled="!submitEnabled" type="is-info" native-type="submit">Регистрация</b-button>
            </p>
          </b-field>
          <b-field label="Текущий пароль" label-position="on-border"
                   :message="'password' in errors ? errors['password'] : 'Спецсимволы, буквы и цифры латинского алфавита. Минимум 6 знаков'"
                   :type="'password' in errors ? 'is-danger' : ''">
            <b-input autocomplete="nope" type="password" v-model="form.password" icon="lock"></b-input>
            <p class="control">
              <b-button :disabled="!submitEnabled" type="is-info" native-type="submit">Регистрация</b-button>
            </p>
          </b-field>

          <b-field
              label="Имя (RU) *"
              :message="'first_name_ru' in errors ? errors['first_name_ru'] : ''"
              :type="'first_name_ru' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.first_name_ru" icon="account"></b-input>
          </b-field>
        </div>
        <div class="column is-3">
          <b-field
              label="Имя (EN)"
              :message="'first_name_en' in errors ? errors['first_name_en'] : ''"
              :type="'first_name_en' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.first_name_en" icon="account"></b-input>
          </b-field>
        </div>
        <div class="column is-3">
          <b-field
              label="Фамилия (RU) *"
              :message="'second_name_ru' in errors ? errors['second_name_ru'] : ''"
              :type="'second_name_ru' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.second_name_ru" icon="account"></b-input>
          </b-field>
        </div>
        <div class="column is-3">
          <b-field
              label="Фамилия (EN)"
              :message="'second_name_en' in errors ? errors['second_name_en'] : ''"
              :type="'second_name_en' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.second_name_en" icon="account"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-3">
          <b-field
              label="Отчество (RU)"
              :message="'third_name_ru' in errors ? errors['third_name_ru'] : ''"
              :type="'third_name_ru' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.third_name_ru" icon="account"></b-input>
          </b-field>
        </div>
        <div class="column is-3">
          <b-field
              label="Отчество (EN)"
              :message="'third_name_en' in errors ? errors['third_name_en'] : ''"
              :type="'third_name_en' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.third_name_en" icon="account"></b-input>
          </b-field>
        </div>
        <div class="column is-3">
          <b-field
              label="Емейл *"
              :message="'email' in errors ? errors['email'] : ''"
              :type="'email' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.email" icon="email"></b-input>
          </b-field>
        </div>
        <div class="column is-3">
          <b-field
              label="Пароль от емейла"
              :message="'email_password' in errors ? errors['email_password'] : ''"
              :type="'third_name_en' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.email_password" icon="lock"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-5">
          <b-field
              label="Адрес (RU)"
              :message="'address_ru' in errors ? errors['address_ru'] : ''"
              :type="'address_ru' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.address_ru" icon="map-marker" @input="transliterateAddress"></b-input>
          </b-field>
        </div>
        <div class="column is-5">
          <b-field
              label="Адрес (EN)"
              :message="'address_en' in errors ? errors['address_en'] : ''"
              :type="'address_en' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.address_en" icon="map-marker"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field
              label="Индекс"
              :message="'postal_code' in errors ? errors['postal_code'] : ''"
              :type="'postal_code' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.postal_code" icon="map-marker"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <b-field
              label="Телефон *"
              :message="'phone_number' in errors ? errors['phone_number'] : ''"
              :type="'phone_number' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.phone_number" icon="phone"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field
              label="Дата рождения"
              :message="'birth_date' in errors ? errors['birth_date'] : ''"
              :type="'birth_date' in errors ? 'is-danger' : ''">
            <b-datepicker
                size="is-small"
                v-model="info.birth_date"
                :show-week-number="false"
                locale="ru-RU"
                icon="calendar-today"
                placeholder="Дата"
                editable
                trap-focus>
            </b-datepicker>
          </b-field>
        </div>
        <div class="column is-4">
          <b-field
              label="Номер паспорта"
              :message="'passport_number' in errors ? errors['passport_number'] : ''"
              :type="'passport_number' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.passport_number" icon="text-box"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field
              label="Когда выдан"
              :message="'passport_date' in errors ? errors['passport_date'] : ''"
              :type="'passport_date' in errors ? 'is-danger' : ''">
            <b-datepicker
                size="is-small"
                v-model="info.passport_date"
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
        <div class="column is-12">
          <b-field
              label="Кем выдан"
              :message="'passport_given' in errors ? errors['passport_given'] : ''"
              :type="'passport_given' in errors ? 'is-danger' : ''">
            <b-input size="is-small" v-model="info.passport_given" icon="text-box"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <b-field
              label="Информация"
              :message="'comment' in errors ? errors['comment'] : ''"
              :type="'comment' in errors ? 'is-danger' : ''">
            <b-input size="is-small" type="textarea" v-model="info.comment"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-2">
          <b-checkbox size="is-small" v-model="info.verified" native-value="1" value="1">Верифицирован</b-checkbox>
        </div>
        <div class="column is-10 rightal">
          <b-button :disabled="!isValid" size="is-small" type="is-info" native-type="submit" outlined>Сохранить</b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import router from "@/router";

export default {
  name: "NewPass",
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    isValid() {
      return this.form.password.length > 0 && this.form.new_password.length >= 6
    },
  },
  methods: {
    submit: function () {
      this.loading = true
      Vue.prototype.$http.post(process.env.VUE_APP_API_HOST + 'profile/new_pass', {user: this.form}).then(resp => {
        router.push('/logout');
      }).catch(error => {
        this.errors = error.response.data.result
      }).finally(() => {
        this.loading = false
      })


      let create = this.info.id === null
      this.$store.dispatch('account/save').then(() => {
        this.loading = false
        if (create) {
          this.$loading(true)
          this.$store.dispatch('account/get', this.info.id).then(() => {
            this.$router.push('/account/create?id=' + this.info.id)
            this.$loading(false)
          })
        }
      })
    },
    transliterateAddress: function () {
      const cyrillicToTranslit = new CyrillicToTranslit();
      this.info.address_en = cyrillicToTranslit.transform(this.info.address_ru)
    }
  },
}
</script>

<style scoped>

</style>