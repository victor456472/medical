<script lang="ts">

import { defineComponent, computed } from 'vue';
export default defineComponent({
    name: 'Welcome',
    props: {
        message:{ type:String, required:true }
    },
    setup (props){
        const welcomeMessage = computed(() => props.message)
        return {
            welcomeMessage: welcomeMessage
        }
    }
})

</script>

<template>

        <div class="notification title is-size-5 is-primary">{{ welcomeMessage }}</div>

</template>