<template>
    <div class="layout">
        <div class="page-header">
            <div
                class="left-logo"
                :style="{ width: collapsed ? '79px' : '203px' }"
            >
                <img
                    class="company-logo"
                    src="../assets/LOGO.svg"
                    alt
                    v-if="!collapsed"
                />
                <img class="company-logo" src="../assets/LOGO-mini.svg" alt v-else/>
            </div>
            <div class="page-top">
                <div class="app-header">物联网采集监控平台</div>
                <div class="logout">
                    账号设置
                </div>
            </div>
        </div>
        <div class="main">
            <CustomMenu
                :data="menuData"
                :collapsed="collapsed"
            >
            </CustomMenu>
            <div class="right-content">
                <CustomBreadcrumb></CustomBreadcrumb>
                <div
                    :class="['router-main', $route.path == '/index' ? 'index-main' : '']"
                >
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from "../api/api_user.js";

export default {
    name: "layout",
    data() {
        return {
            userName: "",
            menuData: [
                {
                    id:'1',
                    name:'菜单1',
                    type:'appstore',
                    children:[
                        {
                            id:'1-1',
                            name:'菜单1-1',
                            type:'appstore',
                            children:[]
                        }
                    ]
                },
                {
                    id:'2',
                    name:'菜单2',
                    children:[]
                }
            ],
            collapsed: false
        };
    },
    computed: {},
    watch: {},
    mounted() {

    },
    methods: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
        },
    },
};
</script>

<style scoped lang="scss">
$color: #477ce4; //主题色
.menu-items {
    display: inline-block;
    cursor: pointer;
}

.page-header {
    display: flex;
    align-items: center;

    .left-logo {
        height: 60px;
        background-color: $color;
        opacity: 0.8;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
    }

    .page-top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .logout {
            padding-right: 20px;

            .logout-btn {
                padding-left: 10px;
                cursor: pointer;
            }

            .logout-btn:hover {
                color: #4069c4;
            }
        }
    }
}

.main {
    display: flex;
    height: calc(100% - 60px);
    width: 100%;
    background: #f2f2f2;
}

.app-header {
    height: 60px;
    line-height: 60px;
    font-size: 22px;
    color: $color;
    padding-left: 20px;
    font-weight: bold;
}

.right-content {
    flex: 1;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;

    .router-main {
        min-width: 1000px;
        height: calc(100% - 30px);
        overflow-x: auto;
        overflow-y: auto;
    }

    .index-main {
        height: calc(100%);
    }
}

.layout {
    height: 100%;
}

</style>