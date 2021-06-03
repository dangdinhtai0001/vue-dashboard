<template>
  <v-app dark>
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
              class="text-uppercase font-weight-regular headline text-center white--text"
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
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
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
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  },
  computed: {
    ...mapState(["auth"]),

    profile() {
      return {
        avatar: true,
        title: "vue dashboard"
      };
    },

    profileItems() {
      return [
        {
          icon: "mdi-account",
          title: "Profile",
          to: "/user/profile"
        },
        {
          icon: "mdi-cog",
          title: "Settings",
          to: "/user/settings"
        }
      ];
    }
  }
};
</script>
