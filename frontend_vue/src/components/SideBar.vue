<template>
    <div class="menu">
        <SideBarItem

        v-for="(item, index) in menuTree"
        :key="index"
        :label="item.label"
        :icon="item.icon"
        :depth="0"
        :data="item.children"
        />        
    </div>

</template>

<script>

import SideBarItem from './SideBarItem.vue';

export default {
    name : "side-bar",
    data: () => ({
        menuTree: [
            {
                label: "Home",
                icon: "home",
                children: [
                    {
                        label: "level 1.1",                        
                    }
                ]
            },
            {
                label: "Setings",                
            }

        ]



    }),
    components: {
        SideBarItem
    }
}

</script>