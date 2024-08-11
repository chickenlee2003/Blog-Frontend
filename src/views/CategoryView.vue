<template>
  <div>
    <h2 class="header">Quản lý Category</h2>
    <div class="input-search">
      <q-input
        outlined
        label="Tìm kiếm theo tên"
        class="input"
        v-model="search"
      >
      </q-input>
      <q-btn class="btn btn-add" @click="open = true">Thêm Category</q-btn>
    </div>
    <table class="table">
      <tr>
        <th class="stt">STT</th>
        <th class="name">Tên Category</th>
        <th class="function-h">Thao tác</th>
      </tr>
      <tr v-for="(category, index) in filterCategory" :key="category.id">
        <td>{{ index + 1 }}</td>
        <td>{{ category.name }}</td>
        <td class="function">
          <q-icon class="icons" name="update" @click="handleOpenUpdate(category.id)"
            ></q-icon
          >
          <q-icon class="icons" name="delete" @click="handleDelete(category.id)"></q-icon>
        </td>
      </tr>
    </table>
    <q-dialog v-model="open">
      <q-card class="card">
        <q-card-section>
          <q-card-title>Thêm Category</q-card-title>
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            label="Tên Category"
            class="input"
            v-model="newname"
          ></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click="open = false">Cancel</q-btn>
          <q-btn class="icons" @click="handleCreateCategory">Add</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="edit">
      <q-card class="card">
        <q-card-section>
          <q-card-title>Sửa Category</q-card-title>
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            label="Tên Category"
            class="input"
            v-model="name"
          ></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click="edit = false">Cancel</q-btn>
          <q-btn @click="handleSubmitUpdateCategory()" color="primary"
            >update</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from "vue";
import categoryService from "../services/category.service";

const open = ref(false);
const edit = ref(false);
const newname = ref("");
const name = ref("");
const updateId = ref("");
const categories = ref([]);
const state = ref("");
const search = ref();
onBeforeMount(async () => {
  categories.value = await categoryService.getCategories();
});
const handleOpen = () => {
  if (state === "create") {
    open.value = true;
    state = "create";
  } else state = "edit";
};
const handleCreateCategory = async () => {
  try {
    // check name
    if (!newname.value) {
      alert("Tên category không được để trống");
      return;
    }
    // check exist
    const exist = categories.value.find(
      (category) => category.name === newname.value
    );
    if (exist) {
      alert("Category đã tồn tại");
      return;
    }
    // create category
    const newCategory = await categoryService.createCategory({
      name: newname.value,
    });

    categories.value.push(newCategory);
    newname.value = "";
    open.value = false;
    return newCategory;
  } catch (error) {
    console.log(error);
  }
};
const handleDelete = async (id) => {
  try {
    await categoryService.deleteCategory(id);
    const index = categories.value.findIndex((category) => category.id === id);
    categories.value.splice(index, 1);
  } catch (error) {
    console.log(error);
  }
};
const handleOpenUpdate = async (id) => {
  try {
    edit.value = true;
    const index = categories.value.findIndex((category) => category.id === id);
    name.value = categories.value[index].name;
    updateId.value = categories.value[index].id;
  } catch (error) {
    console.log(error);
  }
};
const handleSubmitUpdateCategory = async () => {
  try {
    // if (!name.value) {
    //   alert("Tên category không được để trống");
    //   return;
    // }
    // const exist = categories.value.find(
    //   (category) => category.name === name.value
    // );
    // if (exist) {
    //   alert("Category đã tồn tại");
    //   return;
    // }
    const updatedCategory = await categoryService.updateCategory(
      updateId.value,
      { name: name.value }
    );
    const index = categories.value.findIndex(
      (category) => category.id === updateId.value
    );
    categories.value[index].name = name.value;
    name.value = "";
    edit.value = false;
    return updatedCategory;
  } catch (error) {
    console.log(error);
  }
};
const filterCategory = computed(() => {
  if (!search.value) {
    return categories.value;
  }
  const searchValue = search.value.toLowerCase();
  return categories.value.filter((category) =>
    category.name.includes(searchValue)
  );
});
</script>

<style>
.header {
  padding: 20px;
  color: #1976d2;
}
.icons {
  cursor: pointer;
  margin-right: 20px;
}

.input {
  width: 70%;
  font-size: 18px;
}
.input-search {
  display: flex;
  padding: 20px;
}
.btn-add {
  background-color: #1976d2;
  color: white;
  margin-left: 50px;
}
.card {
  width: 700px;
}
.table {
  width: 70%;
  margin-left: 20px;
  margin-top: 20px;
}
tr:nth-child(even) {
  background-color: aliceblue;
}
th{
  font-size: 20px;
  padding: 10px 0px;
}
td{
  padding: 10px;
  font-size: 20px;
  text-align: center;
}
stt {
  width: 20%;
  text-align: center;
}
.name {
  width: 60%;
  text-align: center;
}
.function{
  display: flex;
  justify-content: center;
  margin: 0 50px;
  font-size: 25px;
}
.function-h {
  width: 40%;
  text-align: center;
}
.function-h:hover {
  cursor: pointer;
}
</style>
