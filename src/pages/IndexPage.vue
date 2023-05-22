<template>
  <div class="index-page">
    <a-input-search
      v-model:value="searchParams.text"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey" @change="onTabchange">
      <a-tab-pane key="post" tab="文章">
        <PostList :post-list="postList" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片">
        <PictureList :picture-list="pictureList" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList :user-list="userList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PostList from "@/components/PostList.vue";
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "@/plugins/MyAxios";

const activeKey = ref("1");
const router = useRouter();
const route = useRoute();
const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]);
const initSearchParams = {
  text: "",
  pageSize: 10,
  pageNum: 1,
};
const searchParams = ref(initSearchParams);

/**
 * 加载数据
 * @param params
 */
const loadData = (params: any) => {
  const query = {
    ...params,
    searchText: params.text,
  };
  console.log("query", query);
  //请求文章列表
  myAxios.post("/post/list/page/vo", query).then((res: any) => {
    postList.value = res.records;
  });

  //请求用户列表
  myAxios.post("/user/list/page/vo", query).then((res: any) => {
    userList.value = res.records;
  });

  //请求图片列表
  // myAxios.post("/picture/list/page/vo", query).then((res: any) => {
  //   console.log("res.records", res.records);
  //   pictureList.value = res.records;
  // });
};

// 首次请求
loadData(initSearchParams);

//监听route.query.text，initSearchParams执行
watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
  } as any;
});

const onSearch = (value: string) => {
  console.log(value);
  router.push({
    query: searchParams.value,
  });
  // 根据条件查询
  loadData(searchParams.value);
};

const onTabchange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParams.value,
  });
};
</script>
