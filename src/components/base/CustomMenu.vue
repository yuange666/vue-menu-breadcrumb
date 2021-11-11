<!--API说明:
参数：
data 菜单数据，必填
collapsed 菜单是否处于收起状态，默认值:false,选填
onlyExpandCurrent 同级菜单只展开当前，默认值：false，选填-->
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
                    <span>{{ item.name }}</span>
                  </span>
                    <template v-for="(subMenuItem,subMenuKey) in item.children">
                        <SubMenu :data="subMenuItem" :key="subMenuItem.id" v-if="subMenuItem.children && subMenuItem.children.length>0"></SubMenu>
                        <a-menu-item v-else :key="subMenuItem.id" :data-item="subMenuItem">
                            <a-icon :type="subMenuItem.type" v-if="subMenuItem.type"/>
                            <span>{{ subMenuItem.name }}</span>
                        </a-menu-item>
                    </template>
                </a-sub-menu>
                <a-menu-item :key="item.id" v-else :data-item="item">
                    <a-icon :type="item.type" v-if="item.type"/>
                    <span>{{ item.name }}</span>
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
                    //     id: "3",
                    //     name: "首页",
                    //     type: "appstore",
                    //     path:'/index',
                    //     children:[
                    //         {
                    //             id: "2",
                    //             name: "首页2",
                    //             type: "appstore",
                    //             path:'/index/chart',
                    //         }
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
            if (currentItem && currentItem.path) {
                this.$router.push(currentItem.path);
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