<template>
  <div class="wrapper">
    <div class="wrapper-header">
      <div>{{title}}</div>
      <div class="buttons">
         <button class="primary-button" @click="$emit('onOpenDetails', id)">TODO List</button>
        <button class="delete-button remove" @click="$emit('onRemove', id)">Delete</button>
      </div>
    </div>
      <div>
        <div v-if="todos?.length" >
                <TodoList :todos="todos.slice(0, 2)" :is-detail="false"/>
        </div>
        <div v-else>
          <p>No Todo yet</p>
        </div>
      </div>
  </div>

</template>

<script setup lang="ts">
   defineProps(['title', "todos", "id"]);
</script>

<style scoped lang="scss">
   .wrapper {
       position: relative;
       display: flex;
       flex-direction: column;
       justify-content: space-between;
       row-gap: 30px;
     &-header{
       display: flex;
       justify-content: space-between;
       .buttons{
         display: flex;
         align-items: center;
         column-gap: 10px;
       }
     }
   }
</style>