<template>
  <el-row class="container">
    <el-col :span="24"
            class="header">
      <el-col :span="10"
              class="logo"
              :class="collapsed?'logo-collapse-width':'logo-width'">
        <img :src="logoSrc"
             alt="">
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="10">
        <!-- <div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div> -->
      </el-col>
      <el-col :span="4"
              class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown"
                            class="custom">
            <el-dropdown-item @click.native="toPersonalCenter">
              我的消息
            </el-dropdown-item>
            <!-- <el-dropdown-item>设置</el-dropdown-item> -->
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24"
            class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 @open="handleopen"
                 @close="handleclose"
                 @select="handleselect"
                 unique-opened
                 router
                 v-show="!collapsed">
          <template v-for="(item,index) in $router.options.routes"
                    v-show="!item.hidden">
            <el-submenu :key="index" :index="index+''"
                        v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
              <div v-for="(child,index) in item.children"
                   :index="child.path"
                   :key="child.path"
                   v-show="!child.hidden">
                <template v-if="child.children">
                  <el-submenu :index="index+''">
                    <template slot="title">{{child.name}}</template>
                    <el-menu-item v-for="grandson in child.children"
                                  :index="grandson.path"
                                  :key="grandson.path"
                                  v-show="!grandson.hidden"
                                  router=true
                                  :route="grandson.path">{{grandson.name}}</el-menu-item>
                  </el-submenu>
                </template>
                <el-menu-item :index="child.path"
                              :key="child.path"
                              v-show="!child.children">{{child.name}}</el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0"
                          :key="index" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed"
            v-show="collapsed"
            ref="menuCollapsed">
          <li :key="index" v-for="(item,index) in $router.options.routes"
              v-show="!item.hidden"
              class="el-submenu item">
            <template v-if="!item.leaf">
              <div class="el-submenu__title"
                   style="padding-left: 20px;"
                   @mouseover="showMenu(index,true)"
                   @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
              <ul class="el-menu submenu"
                  :class="'submenu-hook-'+index"
                  @mouseover="showMenu(index,true)"
                  @mouseout="showMenu(index,false)">
                <li v-for="child in item.children"
                    v-show="!child.hidden"
                    :key="child.path"
                    class="el-menu-item"
                    style="padding-left: 40px;"
                    :class="$route.path==child.path?'is-active':''"
                    @click="$router.push(child.path)">{{child.name}}</li>
              </ul>
            </template>
            <template v-else>
          <li class="el-submenu">
            <div class="el-submenu__title el-menu-item"
                 style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                 :class="$route.path==item.children[0].path?'is-active':''"
                 @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
          </li>
</template>
</li>
</ul>
</aside>
<section class="content-container">
  <div class="grid-content bg-purple-light">
    <el-col :span="24"
            class="breadcrumb-container">
      <!-- <strong class="title">{{$route.name}}</strong> -->
      <el-breadcrumb separator="/"
                     class="breadcrumb-inner">
        <el-breadcrumb-item v-for="item in $route.matched"
                            :key="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24"
            class="content-wrapper">
      <transition name="fade"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </el-col>
  </div>
</section>
</el-col>
</el-row>

</template>

<script>
import { mapActions, mapMutations } from "vuex"
export default {
  data () {
    return {
      sysName: "业财一体化",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      logoSrc: require("@/assets/images/common/logo.png"),
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    }
  },
  methods: {
    ...mapActions([
      "FETCH_USER_INFO",
      "USER_INFO"
    ]),
    ...mapMutations([
      "USER_INFO"
    ]),
    toPersonalCenter () {
      this.$router.push({ path: "/main/personalCenter" })
    },
    onSubmit () {
      console.log("submit!")
    },
    handleopen () {
      // console.log('handleopen');
    },
    handleclose () {
      // console.log('handleclose');
    },
    handleselect: function () {
    },
    // 退出登录
    logout: function () {
      let _this = this
      this.$confirm("确认退出吗?", "提示", {
        // type: 'warning'
      }).then(() => {
        sessionStorage.removeItem("user")
        this.$Utils.setCookie("phSessionToken", "")
        _this.$router.push("/login")
      }).catch(() => {

      })
    },
    // 折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
    },
    showMenu (i, status) {
      this.$refs.menuCollapsed.getElementsByClassName("submenu-hook-" + i)[0].style.display = status ? "block" : "none"
    }
  },
  mounted () {
    let user = sessionStorage.getItem("user")
    // let user = this.$sotre.state.userInfo
    if (user) {
      user = JSON.parse(user)
      this.sysUserName = user.userName || ""
      this.sysUserAvatar = user.headImg || require("../assets/images/common/user.png")
    }
    this.FETCH_USER_INFO()
    this.USER_INFO(user)
  }
}


</script>
<style scoped lang="less">

</style>