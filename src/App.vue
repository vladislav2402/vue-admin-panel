<template>
  <div id="app">
    <div class="container is-fluid" style="margin-bottom: 20px">
      <Navbar v-if="this.$store.getters['auth/user']"/>
    </div>
    <FlashMessage :position="'right top'"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
@font-face {
  font-family: 'Jura';
  font-style: normal;
  font-weight: 400;
  src: url(../public/Jura-cyr.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

@font-face {
  font-family: 'Jura';
  font-style: normal;
  font-weight: 400;
  src: url(../public/Jura-lat.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

#app {
  height: 100% !important;
  font-family: 'Jura', sans-serif !important;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.label {
  font-size: 14px !important;
  font-weight: normal !important;
}

.tag.is-success, .button.is-success {
  background-color: rgba(72, 199, 116, 0.5) !important;
  color: inherit !important;
}

.tag.is-warning, .button.is-warning {
  background-color: rgba(255, 221, 87, 0.5) !important;
  color: inherit !important;
}

.tag.is-danger, .button.is-danger {
  background-color: rgba(241, 70, 104, 0.5) !important;
  color: inherit !important;
}

.tag.is-info, .button.is-info {
  background-color: rgba(22, 125, 240, 0.5) !important;
  color: inherit !important;
}

.tag.is-primary, .button.is-primary {
  background-color: rgba(121, 87, 213, 0.5) !important;
  color: inherit !important;
}

.fixed-field .field{
  width: 200px;
  text-align: left;
}

.tab-content80 section.tab-content{
  width: 80% !important;
}

.flexed {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.flexed-right {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: right;
}

.flexed-left {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: left;
}

span.select {
  width: 100%;
}
.control select {
  width: 100%;
}

.text-success {
  color: rgba(72, 199, 116, 0.7) !important;
}

.text-warning {
  color: rgba(255, 221, 87, 0.7) !important;
}

.text-danger {
  color: rgba(241, 70, 104, 0.7) !important;
}

.text-default {
  color: rgba(0, 0, 0, 0.5) !important;
}

.is-clickable.is-active {
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
}

.leftal {
  text-align: left !important;
}

.rightal {
  text-align: right !important;
}

.w100 {
  width: 100%;
}

.m3 {
  margin: 3px;
}

.is-vcentered {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
}

h4.page-header {
  font-size: 30px !important;
  text-decoration: underline;
  padding-bottom: 10px;
}

h4.sub-header {
  font-size: 22px !important;
  text-decoration: underline;
  padding-bottom: 10px;
}

table td {
  vertical-align: middle !important;
}

._vue-flash-msg-_right-top {
  top: 60px !important;
  z-index: 999;
}

ul.horizontal {
  margin: 0 !important;
  padding: 0 !important;
  list-style: none !important;
}

ul.horizontal li {
  float: left;
  margin: 0 5px 0 0 !important;
}

table.noborder td {
  border-width: 0 !important;
}

textarea {
  min-height: 10em !important;
}
</style>
