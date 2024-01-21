<template>
  <div>
    <div class="button-wrapper">
      <button class="primary-button"  @click="openModal">Add note</button>
    </div>
    <NotesCards/>
    <Modal :showModal="isModalVisible" title="Add Note" @update:showModal="updateModalVisibility">
      <div class="container">
        <input
            type="text"
            class="primary-input"
            placeholder="Name of Note"
            v-model="noteName"
            @change="handleName"
        />
        <div class="container-buttons">
          <button class="secondary-button" @click="onCancel">Cancel</button>
          <button class="primary-button"  :disabled="!noteName" @click="onAddNote">Add</button>
        </div>
      </div>
    </Modal>
  </div>

</template>

<script setup lang="ts">
import { ref } from "vue";
import {setLocalStorage, getLocalStorage} from  "~/utils"

const notes = useNotes();
const data = getLocalStorage('dataNote')

onUpdated(()=>{
  if (!data){
    setLocalStorage("dataNote", [])
  }else {
    setLocalStorage("dataNote", notes.value)
  }
})

const isModalVisible = ref(false);
const noteName = ref("");

const openModal = () => {
  isModalVisible.value = true;
};
const onCancel = () => {
  isModalVisible.value = false;
  noteName.value = ""
};
const onAddNote = () => {
    const id = Date.now();
    const todos = [];
    notes.value.push({id, todos, title: `${noteName.value}`});
    isModalVisible.value = false;
    noteName.value = ""
};
const handleName = (event) => {
    noteName.value = event.target.value;
};
const updateModalVisibility = (value) => {
  isModalVisible.value = value;
};



</script>


<style scoped lang="scss">

</style>