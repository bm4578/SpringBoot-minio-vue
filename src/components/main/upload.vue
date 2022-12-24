<template>
  <div class="copy">
    <button type="button" @click="doCopy(test)">Copy</button>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "upload",
  data(){
    return{
     test:'dsfjdlskjfldskfjldks'
    }
  },
}
</script>

<style scoped>

</style>