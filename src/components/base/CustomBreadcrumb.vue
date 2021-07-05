<!--API:
参数:
separator 定义分隔符，默认值：'>'
使用时在router中配置meta:{name:'xx',path:''}，当前层级不需要跳转就不写path属性。-->
<template>
    <div class="breadcrumb-box" v-if="$route.meta.breadcrumb">
        <a-breadcrumb :routes="$route.meta.breadcrumb" :separator="separator">
            <template
                slot="itemRender"
                slot-scope="{ route, params, routes, paths }"
            >
                <a v-if="route.path" @click="navigatePath(route.path)">
                    {{ route.name }}
                </a>
                <span
                    v-else
                >
                  {{ route.name }}
                </span>
            </template>
        </a-breadcrumb>
    </div>
</template>

<script>
export default {
    name: "CustomBreadcrumb",
    props:{
        separator:{
            type:String,
            default:'>'
        }
    },
    data() {
        return {
            routes:{

            }
        }
    },
    watch: {
        $route(to,from){
            this.updateRoutes();
        }
    },
    methods: {
        navigatePath(path){
            this.$router.push({
                path:path,
                query:this.routes[path].query
            });
        },
        updateRoutes(){
            this.routes[this.$route.path]={
                query:this.$route.query
            }
        }
    },
    mounted() {
        this.updateRoutes();
    }
}
</script>

<style scoped>

</style>