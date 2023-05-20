<template>
  图片列表
  <img :src="cat" class="cat" />
</template>

<script setup lang="ts">
import cat from "@/assets/cat1.jpg";
</script>

<style scoped>
.cat {
  width: 200px;
}
</style>
