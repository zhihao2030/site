<template>
  <div class="zzh-time-clock">
      <time-clock :terminalTime="terminalTime"></time-clock>
  </div>
</template>

<script>
import timeClock from '@views/projectMethods/animate-clock/components/time-clock';
export default {
    name: 'animate-clock',
    data: () => ({
        time: new Date()
    }),
    components: {timeClock},
    computed: {
        terminalTime() {
            if (!this.time) return  new Date()
            return new Date(this.time.setDate(this.time.getDate()+1))
        }
    },
    props: {},
    methods: {}
}
</script>

<style scoped lang='less'>
.zzh-time-clock {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
