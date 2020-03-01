<template>
  <div>
    <SlideMenu no-overlay class="side-menu">
      <div>
        <nuxt-link to="/">
          TOP
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/party">
          パーティ設定
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/battle/log">
          対戦ログ
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/database">
          データベース
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/contact">要望・問い合わせ</nuxt-link>
      </div>
      <div>
        <nuxt-link to="/logout">ログアウト</nuxt-link>
      </div>
    </SlideMenu>
  </div>
</template>

<script>
import SlideMenu from '@/components/layouts/Slide.vue'
export default {
  name: 'SideMenu',
  components: {
    SlideMenu
  }
}
</script>

<style scoped>
.side-menu {
  white-space: nowrap;
}

.side-menu a {
  cursor: pointer;
  @apply text-base;
}
</style>
