<template>
  <section>
    <h1>Quản lý Tags</h1>
    <div class="input-search">
      <q-input class="input" outlined label="Tìm kiếm tags" v-model="search">
      </q-input>
      <q-btn class="add" color="primary" @click="handleOpenDialog('create')">Thêm Tag</q-btn>
    </div>


    <table class="table">
      <tr>
        <th class="stt">STT</th>
        <th class="name">Tag</th>
        <th class="function-h">Chức năng</th>
      </tr>
      <tr v-for="(tag, index) in filteredItem" :key="index">
        <td class="stt">{{ index + 1 }}</td>
        <td class="name">{{ tag.name }}</td>
        <td class="function"><q-icon class="icons" @click="handleOpenUpdate('update', tag.id)"
            name="update"></q-icon><q-icon class="icons" name="delete"></q-icon>
        </td>
      </tr>

    </table>


    <q-dialog v-model="openDialog">
      <q-card class="modal">
        <q-card-section>
          <p v-if="dialogState === 'create'">Thêm Tag mới</p>
          <p v-if="dialogState === 'update'">Cập nhật Tag</p>
        </q-card-section>
        <q-card-section>
          <q-input label="Tên Tag" v-model="inputTag" outlined></q-input>
          <q-btn class="submit-btn" @click="handleSubmit" color="primary">Xác nhận</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </section>
</template>

<style scoped>
  h1 {
    font-size: 2rem;
    margin: 10px;
  }

  .input {
    width: 70%;
    font-size: 18px;
  }

  .add {
    width: 20%;
  }

  .table {
    width: 70%;
    margin-top: 20px;
    margin-left: 20px;
  }

  .input-search {
    display: flex;
    margin: 0 50px;
    justify-content: space-around;
  }

  tr:nth-child(even) {
    background-color: aliceblue;
  }

  .modal {
    min-width: 700px;
  }

  .icons {
    margin: 0 20px;
    cursor: pointer;
  }

  th {
    font-size: 20px;
    padding: 10px 0px;
  }

  td {
    padding: 10px;
    font-size: 17px;
  }

  .submit-btn {
    display: flex;
    margin: 0 auto;
    padding: 10px 60px;
    margin-top: 20px;
  }

  .function {
    display: flex;
    justify-content: center;
    margin: 0 50px;
    font-size: 25px;
  }

  .function-h {
    width: 200px;
  }

  .stt {
    width: 20%;
    text-align: center;
  }

  .name {
    width: 30%;
    text-align: center;
  }
</style>

<script setup>
  import { computed, onBeforeMount, ref } from 'vue';
  import tagService from '../services/tag.service'

  const openDialog = ref(false);
  const dialogState = ref();
  const inputTag = ref();
  const updatedId = ref();
  const tags = ref([]);
  const search = ref()

  const handleOpenDialog = (state) => {
    inputTag.value = ''
    openDialog.value = true
    dialogState.value = state
  }

  onBeforeMount(async () => {
    tags.value = await tagService.getAllTag();
  })

  const handleOpenUpdate = (state, id) => {
    inputTag.value = ''
    openDialog.value = true
    dialogState.value = state
    const index = tags.value.findIndex((tag) => tag.id === id);
    inputTag.value = tags.value[index].name;
    updatedId.value = tags.value[index].id
  }

  const handleAddTag = async () => {
    try {
      const res = await tagService.createTag({ name: inputTag.value })
      tags.value.push(res);
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async () => {
    if (dialogState.value === 'create') {
      await handleAddTag();
    } else if (dialogState.value === 'update') {
      await handleUpdateTag(updatedId.value)
    }
  }

  const handleUpdateTag = async (id) => {
    try {
      const res = await tagService.updateTag(id, { name: inputTag.value });
      const index = tags.value.findIndex((tag) => tag.id === id);
      tags.value[index].name = inputTag.value;
    } catch (error) {
      console.log(error)
    }
  }

  const filteredItem = computed(() => {
    if (!search.value) {
      return tags.value;
    }
    const searchTag = search.value.toLowerCase();
    return tags.value.filter(tag => tag.name.includes(searchTag))

  })
</script>