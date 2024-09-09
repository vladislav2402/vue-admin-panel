<template>
  <span style="padding: 0 3px 0 3px">{{ txt }}</span>
</template>

<script>
export default {
  name: "Sport",
  props: ['sport'],
  computed: {
    txt() {
      switch (this.sport) {
        case 'FOOTBALL':
          return '⚽'
        case 'BASEBALL':
          return '⚾'
        case 'BASKETBALL':
          return '🏀'
        case 'VOLLEYBALL':
          return '🏐'
        case 'TENNIS':
          return '🎾'
        case 'HOCKEY':
          return '🏒'
        case 'HANDBALL':
          return '🤾'
        case 'TABLETENNIS':
          return '🏓'
        case 'CYBERSPORT':
          return '🖱️'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>

</style>