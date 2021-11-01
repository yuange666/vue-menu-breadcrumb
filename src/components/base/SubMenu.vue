<template functional>
    <a-sub-menu
        :key="props.data.id"
    >
        <span slot="title">
           <a-icon :type="props.data.type" v-if="props.data.type"/>
            <span>{{ props.data.name }}</span>
        </span>
        <template v-for="item in props.data.children">
            <template v-if="item.children &&item.children.length>0">
                <SubMenu :data="item"></SubMenu>
            </template>
            <template v-else>
                <a-menu-item :key="item.id" :data-item="item">
                    <a-icon :type="item.type" v-if="item.type"/>
                    <span>{{ item.name }}</span>
                </a-menu-item>
            </template>
        </template>
    </a-sub-menu>
</template>

<script>
export default {
    name: "SubMenu",
    props: {
        data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {}
    },
    methods: {},
    mounted() {

    }
}
</script>

<style scoped>

</style>