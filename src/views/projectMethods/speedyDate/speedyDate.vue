<template>
  <div>
    <encapsulation-date :format='time'></encapsulation-date>
  </div>
</template>

<script>
import encapsulationDate from './components/encapsulationDate'
export default {
    name: 'index',
    components:{encapsulationDate},
    data (){
        return {
            time: 'yyyy-MM-dd',
        }
    }
}
</script>

<style scoped>

</style>