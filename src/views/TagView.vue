<template>
  <section>
    <h1>Quản lý Tags</h1>
    <div class="input-search">
      <q-input class="input" outlined label="Tìm kiếm tags">
      </q-input>
      <q-btn class="add" color="primary">Thêm Tag</q-btn>
    </div>

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

  .input-search {
    display: flex;
    margin: 0 50px;
    justify-content: space-around;
  }
</style>