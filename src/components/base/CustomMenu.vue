<!--
API说明:
参数：
data 菜单数据，必填
collapsed 菜单是否处于收起状态，默认值:false,选填
onlyExpandCurrent 同级菜单只展开当前，默认值：false，选填
ellipsis 菜单名称太长，显示省略号，鼠标悬浮显示全称，默认值：false，选填
-->
<template>
    <div class="box" :style="{ width: collapsed ? '79px' : '204px' }">
        <a-menu
            mode="inline"
            :inline-collapsed="collapsed"
            :openKeys="openKeys"
            v-model="selectedKeys"
            @click="menuSelect"
            @openChange="onOpenChange"
        >
            <template v-for="item in data">
                <a-sub-menu
                    v-if="item.children &&item.children.length>0"
                    :key="item.id"
                >
                  <span slot="title">
                    <a-icon :type="item.type" v-if="item.type"/>
                    <span :title="ellipsis?item.name:false">{{ item.name }}</span>
                  </span>
                    <template v-for="(subMenuItem,subMenuKey) in item.children">
                        <SubMenu :data="subMenuItem" :key="subMenuItem.id" :ellipsis="ellipsis" v-if="subMenuItem.children && subMenuItem.children.length>0"></SubMenu>
                        <a-menu-item v-else :key="subMenuItem.id" :data-item="subMenuItem">
                            <a-icon :type="subMenuItem.type" v-if="subMenuItem.type"/>
                            <span :title="ellipsis?subMenuItem.name:false">{{ subMenuItem.name }}</span>
                        </a-menu-item>
                    </template>
                </a-sub-menu>
                <a-menu-item :key="item.id" v-else :data-item="item">
                    <a-icon :type="item.type" v-if="item.type"/>
                    <span :title="ellipsis?item.name:false">{{ item.name }}</span>
                </a-menu-item>
            </template>
        </a-menu>
    </div>
</template>

<script>

export default {
    name: "CustomMenu",
    props: {
        //菜单数据
        data: {
            type: Array,
            default() {
                return [
                    // {
                    //     id: "1",
                    //     name: "菜单1",
                    //     type: "appstore",
                    //     path:'/index',
                    //     children:[
                    //         {
                    //             id: "1-1",//保证唯一性
                    //             name: "菜单2",//菜单名称
                    //             type: "appstore",//菜单图标
                    //             path:'/index/chart',//要写完整路由
                    //             url:'https://www.baidu.com/',//新开标签页，打开对应的url,与path属性只能二选一
                    //         },
                    //     ]
                    // },
                ]
            }
        },
        collapsed: {
            type: Boolean,
            default: false
        },
        onlyExpandCurrent: {
            type: Boolean,
            default: false
        },
        ellipsis:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            openKeys: [],
            selectedKeys: [],
        }
    },
    computed: {},
    watch: {
        $route(to, from) {
            this.assignDefaultKeys(to.path);
        },
        data(){
            this.assignDefaultKeys(this.$route.path);
        }
    },
    methods: {
        menuSelect({key}) {
            let currentItem = this.findKey(key, this.data, (e) => e.id === key);
            if (currentItem) {
                if(currentItem.path){
                    this.$router.push(currentItem.path);
                    return;
                }
                if(currentItem.url){
                    window.open(currentItem.url);
                    this.$nextTick(()=>{
                        this.assignDefaultKeys(this.$route.path);
                    })
                }
            }
        },
        findKey(key, menuData, callback) {
            let res;
            const _findKey = (data) => {
                data.forEach(item => {
                    if (callback(item)) {
                        res = item;
                    }
                    if (item.children) {
                        _findKey(item.children);
                    }
                });
            };
            _findKey(menuData);
            return res;
        },
        onOpenChange(openKeys) {
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
            if (latestOpenKey) {
                let latestOpenArr = latestOpenKey.split('-');
                if (this.onlyExpandCurrent) {
                    let tempOpenKeys = [...openKeys];
                    latestOpenArr.pop();
                    let currentParent = latestOpenArr.join('-');
                    for (let i = tempOpenKeys.length - 1; i >= 0; i--) {
                        if (tempOpenKeys[i].includes(currentParent)
                            && tempOpenKeys[i].length === latestOpenKey.length
                            && tempOpenKeys[i] !== latestOpenKey) {
                            tempOpenKeys.splice(i, 1);
                        }
                    }
                    this.openKeys = tempOpenKeys;
                    return;
                }
            }
            this.openKeys = openKeys;
        },
        assignDefaultKeys(path) {
            let currentItem = this.findKey(path, this.data, (e) => path.includes(e.path));
            if (currentItem) {
                this.selectedKeys = [currentItem.id];
                let currentMenuArr = currentItem.id.split('-');
                let tempOpenKeys = [];
                for (let i = 0; i < currentMenuArr.length - 1; i++) {
                    let currentOpenKey = currentMenuArr.slice(0, i + 1).join('-');
                    tempOpenKeys.push(currentOpenKey);
                    if (!this.openKeys.includes(currentOpenKey)) {
                        if (!this.onlyExpandCurrent) {
                            this.openKeys.push(currentOpenKey);
                        }
                    }
                }
                if (this.onlyExpandCurrent) {
                    this.openKeys = tempOpenKeys;
                }
            }
        }
    },
    mounted() {
        this.assignDefaultKeys(this.$route.path);
    }
}
</script>

<style scoped>

</style>