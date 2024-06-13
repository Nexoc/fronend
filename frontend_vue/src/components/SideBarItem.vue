<template>
<div class="sidebar-item">
    <div class="label">
        <i v-if="icon" class="material-icon">{{ icon }}</i>
        <span>{{ label }}</span>
        
    </div>

    <div class="item-container"></div>

</div>

</template>


<script>
export default {
    name: "sidebar-item",
    data: () => ({

    }),
    props: {
        label: {
            type: String,
            required: true
        },
        icon: {
            type: String
        },
        depth: {
            type: Number,
            required: true
        },
        data: {
            type: Array
        }
    }

}

</script>