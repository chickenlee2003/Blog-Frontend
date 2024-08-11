<template>
  <div class="container">
    <h1>Tạo bài đăng</h1>
    <q-input class="title" v-model="post.title" label="Tiêu đề bài đăng" outlined></q-input>
    <div>
      <q-select label="Danh mục bài viết"></q-select>
      <q-select filled v-model="modelMultiple" multiple :options="options" use-chips stack-label label="Tags" />
    </div>
    <QuillEditor theme="snow" />
  </div>
</template>

<script setup>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import { reactive } from 'vue';
  import categoryService from "../services/category.service";
  import tagService from "../services/tag.service";
  import { ref, onBeforeMount } from 'vue';

  const post = reactive({
    title: '',
    content: '',
    category_id: '',
  })

  const category = ref([])
  const tags = ref([]);

  onBeforeMount(async () => {
    try {
      category.value = await categoryService.getCategories();
      tags.value = await tagService.getAllTag()
    } catch (error) {
      console.log(error);
    }
  })
</script>

<style scoped>
  h1 {
    font-size: 2rem;
    margin: 10px;
  }

  .container {
    width: 95%;
    margin: 0 auto;
  }

  .title {
    margin-bottom: 20px;
    font-size: 18px;
  }
</style>