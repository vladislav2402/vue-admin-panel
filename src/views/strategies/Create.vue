<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12">
        <h4 class="page-header">
          <b-icon icon="briefcase"></b-icon>
          <span v-if="form.id">{{ form.name }}</span>
          <span v-if="!form.id">Новая стратегия</span>
        </h4>
      </div>
    </div>
    <form @submit.prevent="submit" novalidate>
      <b-loading :is-full-page="false" v-model="loading" :can-cancel="false"></b-loading>
      <div class="columns">
        <div class="column is-8">
          <b-field
              label="Название *"
              :message="'name' in errors ? errors['name'] : ''"
              :type="'name' in errors ? 'is-danger' : ''">
            <b-input v-model="form.name" icon="tag"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field
              label="Комиссия"
              :message="'tax_percent' in errors ? errors['tax_percent'] : 'Ваш % с оборота (от 0.1 до 2)'"
              :type="'tax_percent' in errors ? 'is-danger' : ''">
            <b-input v-model="form.tax_percent" icon="percent"></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-checkbox size="is-small" style="padding-top: 35px" v-model="form.public" native-value="1" value="1">
            Публичная
          </b-checkbox>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <b-field
              label="Информация"
              :message="'info' in errors ? errors['info'] : ''"
              :type="'info' in errors ? 'is-danger' : ''">
            <b-input size="is-small" type="textarea" v-model="form.info"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">

          <table class="table is-bordered schedule-table">
            <thead>
            <tr>
              <th></th>
              <th class="text-center">MON</th>
              <th class="text-center">TUE</th>
              <th class="text-center">WED</th>
              <th class="text-center">THU</th>
              <th class="text-center">FRI</th>
              <th class="text-center">SAT</th>
              <th class="text-center">SUN</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="hour in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]">
              <td class="rightal">{{ hour - 1 }}:00 - {{ hour }}:00</td>
              <td v-for="day in [1,2,3,4,5,6,7]"
                  :class="'bot-schedule ' + (form.timetable[day][hour] ? 'enabled' : 'disabled')"
                  @click="switchSchedule(day, hour)"></td>
            </tr>
            </tbody>
          </table>

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

export default {
  name: "Create",
  data() {
    return {
      form: {
        id: null,
        name: '',
        info: '',
        tax_percent: '',
        public: false,
        timetable: {
          1: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            12: true,
            13: true,
            14: true,
            15: true,
            16: true,
            17: true,
            18: true,
            19: true,
            20: true,
            21: true,
            22: true,
            23: true,
            24: true,
          },
          2: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            12: true,
            13: true,
            14: true,
            15: true,
            16: true,
            17: true,
            18: true,
            19: true,
            20: true,
            21: true,
            22: true,
            23: true,
            24: true,
          },
          3: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            12: true,
            13: true,
            14: true,
            15: true,
            16: true,
            17: true,
            18: true,
            19: true,
            20: true,
            21: true,
            22: true,
            23: true,
            24: true,
          },
          4: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            12: true,
            13: true,
            14: true,
            15: true,
            16: true,
            17: true,
            18: true,
            19: true,
            20: true,
            21: true,
            22: true,
            23: true,
            24: true,
          },
          5: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            12: true,
            13: true,
            14: true,
            15: true,
            16: true,
            17: true,
            18: true,
            19: true,
            20: true,
            21: true,
            22: true,
            23: true,
            24: true,
          },
          6: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            12: true,
            13: true,
            14: true,
            15: true,
            16: true,
            17: true,
            18: true,
            19: true,
            20: true,
            21: true,
            22: true,
            23: true,
            24: true,
          },
          7: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            12: true,
            13: true,
            14: true,
            15: true,
            16: true,
            17: true,
            18: true,
            19: true,
            20: true,
            21: true,
            22: true,
            23: true,
            24: true,
          },
        },
      },
      loading: false,
      errors: [],
    }
  },
  computed: {
    isValid() {
      return this.form.name.length > 0
    },
  },
  methods: {
    switchSchedule: function (day, hour) {
      this.form.timetable[day][hour] = !this.form.timetable[day][hour]
    },
    submit: function () {
      this.loading = true
      this.errors = []
      Vue.prototype.$http.post(process.env.VUE_APP_API_HOST + 'strategies/index', {strategy: this.form}).then(resp => {
        if (this.form.id) {
          Vue.prototype.flashMessage.show({
            status: 'success',
            title: '',
            message: 'Данные стратегии обновлены'
          })
        } else {
          Vue.prototype.flashMessage.show({
            status: 'success',
            title: 'Стратегия создана',
            message: 'На вашу электронную почту отправлен секретный ключ стратегии. Не сообщайте его никому!'
          })
        }
        router.push('/strategies')
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
    let id = this.$route.query.id
    if (id) {
      this.loading = true
      Vue.prototype.$http.get(process.env.VUE_APP_API_HOST + `strategies/index?id=${id}`).then((resp) => {
        this.form = resp.data.result
        if (resp.data.result.public === 1) {
          this.form.public = true
        }
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
      title: 'Стратегии'
    }
  }
}
</script>

<style scoped>
table.schedule-table {
  table-layout: fixed;
  width: 100%;
}

table.schedule-table td, table.schedule-table th {
  padding: 3px;
}

table.schedule-table td.bot-schedule {
  cursor: pointer;
}

.bot-schedule.enabled {
  background-color: rgba(92, 184, 92, 0.7);
}

.bot-schedule.disabled {
  background-color: rgba(217, 83, 79, 0.7);
}
</style>