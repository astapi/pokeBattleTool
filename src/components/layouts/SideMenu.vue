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
      <div>ダメージ計算</div>
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
}
</style>
