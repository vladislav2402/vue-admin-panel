<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12">
        <h4 class="page-header" v-if="this.info.id">
          <b-icon icon="account"/>
          <span>{{ this.info.second_name_ru + ' ' + this.info.first_name_ru }}</span>
        </h4>
        <h4 class="page-header" v-if="!this.info.id">
          <b-icon icon="account"/>
          <span>Новый аккаунт</span>
        </h4>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <b-tabs v-model="tab" type="is-boxed">
          <b-tab-item value="info" label="Инфо" icon="file-document">
            <Info/>
          </b-tab-item>
          <b-tab-item value="wallets" label="Кошельки" icon="wallet">
            <Wallets/>
          </b-tab-item>
          <b-tab-item value="rooms" label="Румы" icon="monitor-eye">
            <Rooms/>
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Payments from "@/views/profile/Payments";

export default {
  name: "Index",
  components: {Payments},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style scoped>

</style>