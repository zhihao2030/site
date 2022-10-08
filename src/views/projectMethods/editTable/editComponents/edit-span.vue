<template>
  <span class="cell">{{ cellValue }}</span>
</template>

<script>
export default {
    // name: 'edit-span',
    props: {
        cellValue: {
            type: [String, Number],
            default: '',
        },
    },
};
</script>
