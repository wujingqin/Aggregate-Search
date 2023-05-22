<template>
  <a-list item-layout="horizontal" :data-source="props.postList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.content">
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar :src="cat" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import cat from "../assets/cat1.jpg";
interface Props {
  postList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  postList: () => [],
});
</script>

<style scoped>
.cat {
  width: 200px;
}
</style>
