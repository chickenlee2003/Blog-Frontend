<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Bờ Lốc
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-scroll-area class="fit">
        <q-list>

          <template v-for="(menuItem, index) in menuList" :key="index">
            <router-link :to="menuItem.path">
              <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </router-link>
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
  import { ref } from 'vue'

  export default {
    setup() {
      const leftDrawerOpen = ref(false)
      const menuList = [
        {
          icon: 'post_add',
          label: 'Quản lý bài đăng',
          separator: false,
          path: '/admin/posts'
        },
        {
          icon: 'style',
          label: 'Quản lý tags',
          separator: false,
          path: '/admin/tags'
        },
        {
          icon: 'category',
          label: 'Quản lý danh mục',
          separator: true,
          path: '/admin/category'
        },
        {
          icon: 'groups',
          label: 'Quản lý thành viên',
          separator: false,
          path: '/admin/members'
        },
      ]
      return {
        leftDrawerOpen,
        toggleLeftDrawer() {
          leftDrawerOpen.value = !leftDrawerOpen.value
        },
        menuList
      }
    }
  }
</script>

<style scoped>
  a {
    color: black;
    font-size: 17px;
    text-decoration: none;

  }

</style>