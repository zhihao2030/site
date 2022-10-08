
const mixin ={
    data: ()=> ({
        commonLoading: true,
        html: '',
        json: ''
    }),
    computed: {

    },
    mounted() {

    }
}

export default {
    install (Vue) {
        Vue.mixin(mixin);
    }
}
