<template>
  <div class="border rounded p-5">
    <h2 class="font-bold">使い方</h2>
    <div class="help-text mt-3">
      <p>このサイトはポケモンの対戦をサポートします。</p> 
      <p>
        まず自分が使うパーティを設定しましょう。設定はかんたんです。<br/>
        `対戦を開始する` -> `チーム登録` -> ポケモンをクリックするだけです。
      </p> 
      <a class="cursor-pointer" href="https://storage.googleapis.com/pokebattletool.appspot.com/how/play_image5.png" target="_blank">
        <img class="mt-5 w-full lg:w-3/4 xl:w-3/4" src="https://storage.googleapis.com/pokebattletool.appspot.com/how/play_image5.png" />
      </a>
      <p>その後登録したチームを選択し、シングルorダブルを選びます。</p>
      <p>対戦の準備ができました。あとはいつも通りポケモンで対戦相手のマッチングを待ちましょう</p>
      <p>マッチングしたら相手のポケモンを選びましょう</p>
      <a class="cursor-pointer" href="https://storage.googleapis.com/pokebattletool.appspot.com/how/play_image.png" target="_blank">
        <img class="mt-5 w-full lg:w-3/4 xl:w-3/4" src="https://storage.googleapis.com/pokebattletool.appspot.com/how/play_image.png" />
      </a>
      <p>自分のチーム、相手のチームの弱点、すばやさが表示されるので自分が選んだ3匹をクリックしてください</p>
      <a class="cursor-pointer" href="https://storage.googleapis.com/pokebattletool.appspot.com/how/play_image2.png" target="_blank">
        <img class="mt-5 w-full lg:w-3/4 xl:w-3/4" src="https://storage.googleapis.com/pokebattletool.appspot.com/how/play_image2.png" />
      </a>
      <p>画面中央下にbattle startのボタンがあるので対戦を開始します</p>
      <p>対戦が開始したら自分が選んだ3匹、あいてのポケモンが出てきたら出てきたポケモンをクリックしてください</p>
      <a class="cursor-pointer" href="https://storage.googleapis.com/pokebattletool.appspot.com/how/play_image3.png" target="_blank">
        <img class="mt-5 w-full lg:w-3/4 xl:w-3/4" src="https://storage.googleapis.com/pokebattletool.appspot.com/how/play_image3.png" />
      </a>
      <a class="cursor-pointer" href="https://storage.googleapis.com/pokebattletool.appspot.com/how/play_image4.png" target="_blank">
        <img class="mt-5 w-full lg:w-3/4 xl:w-3/4" src="https://storage.googleapis.com/pokebattletool.appspot.com/how/play_image4.png" />
      </a>
      <p>
        対戦が終わったら勝ち負けボタンを押してください。<br/>
        対戦結果、お互いの選出が記録されます。<br/>
        相手が出してくるポケモンの傾向や対策に使えるかもしれません
      </p>
      <p>
        今後、対戦中にダメージ計算の機能を追加する予定です。
      </p>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component({})
export default class VHelp extends Vue {}
</script>
