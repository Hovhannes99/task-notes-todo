<template>
  <div class="card-container" v-if="notes?.length">
      <div v-for="note in notes" :key="note.id">
          <CardNote
              :title="note.title"
              :todos="note.todos"
              :id="note.id"
              class="card"
              @on-open-details="onOpenDetails"
              @on-remove="onRemove"
          />
      </div>
  </div>
  <div v-else class="no-data">
      <p>No data yet</p>
  </div>
  <Modal title="Do you want to delete a note?" :showModal="isModalVisible" @update:showModal="updateModalVisibility" >
   <div class="button-wrapper">
      <button @click="onCancel">Cancel</button>
      <button class="delete-button" @click="onDelete">Yes</button>
   </div>
  </Modal>
</template>


<script setup lang="ts">
import {getLocalStorage, setLocalStorage} from "~/utils"
    const notes = useNotes()
    const isModalVisible = ref(false);
    const cardId = ref(0)
    const data = getLocalStorage('dataNote')

    onMounted(()=>{
      if (!data){
        setLocalStorage("dataNote", [])
      }else {
        notes.value = data
      }
    })

    onUpdated(()=>{
          setLocalStorage("dataNote", notes.value)
    })
    const onDelete = () => {
       notes.value = notes.value.filter((item)=>item.id !== cardId.value);
       isModalVisible.value = false;
       cardId.value = 0
    }
    const onCancel = () => {
       isModalVisible.value = false;
       cardId.value = 0
    }

    const onOpenDetails = async (id:number) => {
      await navigateTo({
        path: `/note/${id}`,
      })
    }
    const onRemove = (id:number) => {
      isModalVisible.value = true;
      cardId.value = id
    }
    const updateModalVisibility = (value) => {
      isModalVisible.value = value;
    };
</script>

<style scoped lang="scss">
 @import "assets/variables";
   .card-container{
     display: grid;
     row-gap: 50px;
     column-gap: 20px;
     grid-template-columns: auto auto auto;
     background-color: $bg-primary;
     padding: 10px;
     .card{
       background-color: $bg-card;
       border: 1px solid black;
       padding: 20px;
       font-size: 30px;
       text-align: center;
     }
     @media screen and (max-width: $md) {
       grid-template-columns: auto auto;
     }
     @media screen and (max-width: $sm) {
       grid-template-columns: auto;
     }
   }
 .no-data{
   width: 100%;
   text-align: center;
   font-size: 20px;
 }
</style>

