<template>
  <v-app dark >
    <!-- ================================== navigation-drawer ================================== -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      mini-variant-width="60"
    >
      <v-list nav>
        <!-- -------------------------- application name -------------------------- -->
        <v-list-item>
          <v-list-item-avatar tile size="30">
            <v-img src="/logo/logo.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              class="
                text-uppercase
                font-weight-regular
                headline
                text-center
                white--text
              "
              v-text="profile.title"
            />
          </v-list-item-content>
        </v-list-item>
        <!-- -------------------------- application name -------------------------- -->

        <v-divider color="white" class="mb-2" />

        <!-- -------------------------- User information -------------------------- -->
        <v-list-group color="white" two-line>
          <template v-slot:activator>
            <v-list-item-avatar class="align-self-center grey">
              <img :src="auth.user.avatar" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                class="headline font-weight-medium white--text"
                >{{ auth.user.username }}</v-list-item-title
              >
              <v-list-item-subtitle
                class="caption font-weight-regular white--text"
              >
                {{ auth.user.scope[0] }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
          <template v-slot:appendIcon>
            <v-icon small class="white--text">mdi-chevron-down</v-icon>
          </template>

          <v-list-item-group color="white">
            <v-list-item
              dense
              color="white"
              v-for="(item, i) in profileItems"
              :key="i"
              :to="item.to"
            >
              <v-list-item-icon>
                <v-icon
                  text
                  small
                  class="white--text"
                  v-text="item.icon"
                ></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title
                  class="white--text body-1 font-weight-regular"
                  v-text="item.title"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list-group>
        <!-- -------------------------- User information -------------------------- -->

        <v-divider color="white" class="my-2" />

        <!-- -------------------------- Item -------------------------- -->

        <div v-for="item in drawerItems" :key="item.title">
          <v-list-item v-if="!item.children" :to="item.to" color="white">
            <v-list-item-icon>
              <v-icon
                text
                small
                class="white--text"
                v-text="item.icon"
              ></v-icon>
            </v-list-item-icon>
            <v-list-item-content class="white--text body-2 font-weight-regular">
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group color="white" v-if="item.children" class="pa-0">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title
                  class="white--text body-1 font-weight-regular"
                  v-text="item.title"
                ></v-list-item-title>
              </v-list-item-content>
            </template>

            <template v-slot:appendIcon>
              <v-icon small class="white--text">mdi-chevron-down</v-icon>
            </template>

            <template v-slot:prependIcon>
              <v-icon v-if="item.icon" small class="white--text">{{
                item.icon
              }}</v-icon>
            </template>

            <v-list-item
              v-for="child in item.children"
              :key="child.title"
              :to="child.to"
              color="white"
            >
              <v-list-item-icon>
                <v-icon
                  text
                  small
                  class="white--text"
                  v-text="child.icon"
                ></v-icon>
              </v-list-item-icon>
              <v-list-item-content
                class="white--text body-2 font-weight-regular"
              >
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>

        <!-- -------------------------- Item -------------------------- -->
      </v-list>
    </v-navigation-drawer>
    <!-- ================================== navigation-drawer ================================== -->

    <!-- ================================== app-bar ================================== -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-btn icon @click.stop="updateMiniVariant">
        <!-- <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon> -->
        <v-icon v-if="miniVariant">mdi-menu</v-icon>
        <v-icon v-if="!miniVariant">mdi-menu-open</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <!-- <v-toolbar-title v-text="title" dense /> -->

      <!-- <v-app-bar-title > -->
      <div>
        <!-- <v-scroll-x-transition> -->
        <v-expand-transition>
          <v-breadcrumbs
            :items="getBreadcrumbsItems"
            divider="/"
            small
          ></v-breadcrumbs>
        </v-expand-transition>
        <!-- </v-scroll-x-transition> -->
      </div>
      <!-- </v-app-bar-title> -->

      <v-spacer />

      <!-- ---------------------------- menu ---------------------------- -->
      <v-menu
        bottom
        left
        min-width="200px"
        rounded
        offset-y
        dense
        transition="slide-x-reverse-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar size="39">
              <img :src="auth.user.avatar" />
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="pa-0 ma-0">
          <v-list dense>
            <div v-for="(item, index) in getUserItems" :key="index">
              <v-list-item v-if="!item.divider" :to="item.to" link>
                <v-list-item-title class="caption font-weight-regular">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
              <v-divider v-if="item.divider"></v-divider>
            </div>
            <v-list-item link>
              <v-list-item-title
                class="caption font-weight-regular"
                v-on:click="logout"
              >
                Log Out
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <!-- ---------------------------- menu ---------------------------- -->

      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- ================================== app-bar ================================== -->

    <!-- ================================== content ================================== -->
    <v-main>
      <v-container fluid class="pa-0 ma-0">
        <nuxt  />
      </v-container>
    </v-main>
    <!-- ================================== content ================================== -->

    <!-- ================================== right-drawer ================================== -->
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- ================================== right-drawer ================================== -->

    <!-- ================================== footer ================================== -->
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
    <!-- ================================== footer ================================== -->
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import items from "~/config/layout/default/drawer-item.js";

export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      // miniVariant: false,
      right: true,
      rightDrawer: false,
    };
  },
  computed: {
    ...mapState(["auth", "application"]),

    miniVariant() {
      return this.application.drawer.miniVariant;
    },

    profile() {
      return {
        avatar: true,
        title: "vue dashboard",
      };
    },

    profileItems() {
      return [
        {
          icon: "mdi-account",
          title: "Profile",
          to: "/user/profile",
        },
        {
          icon: "mdi-cog",
          title: "Settings",
          to: "/user/settings",
        },
      ];
    },

    drawerItems() {
      return items;
    },

    getBreadcrumbsItems() {
      // console.log(this.$route.path);
      let path = this.$nuxt.$route.path;
      let arr = path.split("/");
      let breadcrumbs = [];
      let href = "";

      //console.log(this.$nuxt.$route.name);

      // default
      breadcrumbs.push({
        text: "Dasboard",
        href: "/",
        disabled: false,
      });

      if (arr.length <= 2) {
        href = "/" + arr[0];
        breadcrumbs.push({
          text: arr[0].charAt(0).toUpperCase() + arr[0].slice(1),
          href: href,
          disabled: false,
        });
      } else {
        for (let i = 1; i < arr.length; i++) {
          href = "";
          for (let j = 1; j <= i; j++) {
            href += "/" + arr[j];
          }
          breadcrumbs.push({
            text: arr[i].charAt(0).toUpperCase() + arr[i].slice(1),
            href: href,
            disabled: false,
          });
        }
      }

      breadcrumbs[breadcrumbs.length - 1].disabled = true;

      return breadcrumbs;
    },

    getUserItems() {
      return [
        {
          title: "Profile",
          to: "/user/profile",
        },
        {
          title: "Setting",
          to: "/user/setting",
        },
        {
          divider: true,
        },
      ];
    },
  },

  methods: {
    updateMiniVariant() {
      this.$store.commit(
        "application/SET_DRAWER_MINI_VARIANT",
        !this.miniVariant
      );
    },

    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>

<style scoped>
.user-menu {
  margin-top: 20px;
  contain: initial;
  overflow: visible;
}
.user-menu::before {
  position: absolute;
  content: "";
  top: 0;
  right: 10px;
  transform: translateY(-100%);
  width: 10px;
  height: 13px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 13px solid #fff;
}
</style>
