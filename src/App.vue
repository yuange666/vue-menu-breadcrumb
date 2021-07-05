<template>
        <a-config-provider :autoInsertSpaceInButton="false" :locale="locale">
            <div id="app">
                <router-view/>
            </div>
        </a-config-provider>
</template>
<script>
    import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

    export default {
        data() {
            return {
                locale: zhCN,
            }
        },
    }
</script>
<style lang="scss">
    @import "assets/styles.scss";
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 100%;
        height: 100%;
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
        padding: 12px 10px !important;
    }
    .ant-input[disabled]{
        color: rgb(16 15 15 / 48%) !important;
    }
</style>
