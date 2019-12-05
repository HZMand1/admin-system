<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <img :src="logoSrc" alt />
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="10">
        <!-- <div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
        </div>-->
        <!-- <div style="text-align: right;cursor: pointer;" @click.stop="$router.push('/northwest/NorthwestIndex')">门户首页</div> -->
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <img :src="this.sysUserAvatar" />
            {{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown" class="custom">
            <el-dropdown-item @click.native="editPassVisible = true">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push({path:'/backstage/sysManage/userManage/components/UserDetail',query:{id:userId}})">个人信息</el-dropdown-item>
            <!-- <el-dropdown-item>设置</el-dropdown-item> -->
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" :unique-opened="false" router v-show="!collapsed">
          <template v-for="(item,index) in menuTree">
            <template>
              <el-submenu v-if="item.children" :key="index" :index="index+''">
                <template slot="title">
                  {{item.name}}
                </template>
                <div v-for="(child,index) in item.children" :index="child.path" :key="child.path">
                  <template v-if="child.children">
                    <el-submenu :index="index+''">
                      <template slot="title">{{child.name}}</template>
                      <el-menu-item v-for="grandson in child.children" :index="grandson.path" :key="grandson.path" router="true" :route="grandson.path">{{grandson.name}}</el-menu-item>
                    </el-submenu>
                  </template>
                  <el-menu-item @click="clickMenu(child)" :index="child.path" :key="child.path" v-if="!child.children">{{child.name}}</el-menu-item>
                </div>
              </el-submenu>
              <el-menu-item v-if="!item.children" :key="index" @click="clickMenu(item)" :index="item.path">
                {{item.name}}
              </el-menu-item>
            </template>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <!-- <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li :key="index" v-for="(item,index) in $router.options.routes" v-show="!item.hidden" class="el-submenu item">
            <template v-if="!item.leaf">
              <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <i :class="item.iconCls"></i>
              </div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <li v-for="child in item.children" v-show="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
              </ul>
            </template>
            <template v-else>
          <li class="el-submenu">
            <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].name)">
              <i :class="item.iconCls"></i>
            </div>
          </li>
</template>
</li>
</ul> -->
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <!-- <strong class="title">{{$route.name}}</strong> -->
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
            <!-- <taps></taps> -->
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
    <edit-pass :dialogVisible="editPassVisible" @cancelEmit="cancelEmit"></edit-pass>
  </el-row>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Taps from "../../components/Taps";
import Storage from "../../assets/utils/Storage";
import EditPass from "../../components/editPass";
export default {
  components: {
    EditPass
  },
  data() {
    return {
      editPassVisible: false,
      sysName: "西北地区中药材供应保障服务平台",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: require("../../assets/images/user.png"),
      logoSrc: require("../../assets/images/logo.png"),
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      openedTab: [],
      nameList: [],
      menuTree: null,
      userId: null
    };
  },
  created() {},
  mounted() {
    // let user = sessionStorage.getItem("user")
    // // let user = this.$sotre.state.userInfo
    // if (user) {
    //   user = JSON.parse(user)
    //   this.sysUserName = user.userName || ""
    //   this.sysUserAvatar = user.headImg || require("../../assets/images/user.png")
    // }
    // this.FETCH_USER_INFO()
    // this.USER_INFO(user)
    let userId = Storage.localGet("userInfo").id;
    this.userId = userId;
    let params = {
      userId: userId
    };
    this.$api.api
      .findAuthTree(params)
      .then(result => {
        let datas = result.data.data;
        if (result.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
          // this.menuTree = datas;
          this.menuTree = this.filterTree(datas);
        } else {
          this.$message.error(result.data.retmsg);
        }
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        console.log(err);
      });
  },
  methods: {
    ...mapActions(["FETCH_USER_INFO", "USER_INFO"]),
    ...mapMutations(["USER_INFO"]),
    toPersonalCenter() {
      this.$router.push({ path: "/main/personalCenter" });
    },
    onSubmit() {
      console.log("submit!");
    },
    //过滤树菜单
    filterTree(data) {
      data.forEach(v => {
        v.children = v.children && v.children.filter(c => c.type !== 1);
        if (v.children && v.children.length) {
          this.filterTree(v.children);
        } else {
          delete v.children;
        }
      });
      return data;
    },
    handleopen() {
      // console.log('handleopen');
    },
    handleclose() {
      // console.log('handleclose');
    },
    clickMenu(m) {
      this.openedTab = this.$store.state.openedTab;
      this.openedTab.map(v => {
        if (!this.nameList.includes(v.name)) {
          this.nameList.push(v.name);
        }
      });
      let index = this.nameList.indexOf(m.name);
      if (index < 0) {
        this.$store.commit("addTab", m);
        return;
      }
      this.$store.commit("changeTab", m);
    },
    //  菜单回调
    handleselect(index, indexPath) {
      // console.log(index);
      // console.log(indexPath);
    },
    // 退出登录
    logout: function() {
      let _this = this;
      this.$confirm("确认退出吗?", "提示", {
        // type: 'warning'
      })
        .then(() => {
          Storage.localRemove("token");
          Storage.localRemove("userInfo");
          _this.$router.push("/backstage/login");
        })
        .catch(() => {});
    },
    // 折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    // 取消修改密码弹框
    cancelEmit(b) {
      this.editPassVisible = b;
    }
  }
};
</script>
<style scoped lang="less">
.el-menu-item,
.el-submenu__title {
  height: auto !important;
}

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    @background: color-primary;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 12px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      // border-color: rgba(238, 241, 146, 0.3);
      // border-right-width: 1px;
      // border-right-style: solid;
      img {
        float: left;
        /* margin: 5px 10px 10px 0px; */
        width: auto;
        height: 50px;
        /* padding: 10px; */
        object-fit: contain;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      // width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
        overflow: auto;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          /* float: right; */
          font-size: 16px;
          margin-bottom: 10px;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
.el-dropdown-menu {
  background: rgb(48, 65, 86);
  li {
    color: rgb(191, 203, 217);
    &:hover {
      background: #263445 !important;
    }
  }
}
</style>