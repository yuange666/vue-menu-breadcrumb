<template functional>
    <a-sub-menu
        :key="props.data.id"
    >
        <span slot="title">
           <a-icon :type="props.data.type" v-if="props.data.type"/>
            <span :title="props.ellipsis?props.data.name:false">{{ props.data.name }}</span>
        </span>
        <template v-for="item in props.data.children">
            <template v-if="item.children &&item.children.length>0">
                <SubMenu :data="item" :ellipsis="ellipsis"></SubMenu>
            </template>
            <template v-else>
                <a-menu-item :key="item.id" :data-item="item">
                    <a-icon :type="item.type" v-if="item.type"/>
                    <span :title="props.ellipsis?item.name:false">{{ item.name }}</span>
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
        },
        ellipsis:{
            type:Boolean,
            default:false
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