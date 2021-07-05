<template>
    <span @click="goBack" style="cursor: pointer">
        <img src="@/assets/icon-back.png"
             alt="" style="margin-right: 10px">
        <span style="font-size: 14px;color: #999999;">返回</span>
    </span>
</template>
<script>
    export default {
        name:'GoBack',
        methods:{
            goBack(){
                this.$emit('goBack');
            }
        }
    }
</script>