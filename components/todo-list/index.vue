<template>
  <ul>
    <li class="list" v-for="todo in todos" :key="todo.id">
      <p class="text">{{ todo?.text }}</p>
      <input type="checkbox" :checked="todo.completed" :disabled="!isDetail" @change="onCompleted(todo.id)">
      <div class="buttons" v-if="isDetail">
        <button class="primary-button" @click="onEditText(todo.id)">Edit</button>
        <button class="delete-button" @click="onRemoveItem(todo.id)">Delete</button>
      </div>
    </li>
  </ul>

</template>

<script setup lang="ts">
    defineProps(['todos', 'isDetail', 'onRemoveItem', 'onEditText', 'onCompleted'])
</script>


<style lang="scss" scoped>
  $grey-primary:#646464;
  ul {
    min-width: 250px;
  }
  .list {
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 0 10px;
     border-bottom: 1px solid $grey-primary;
     column-gap: 10px;
     min-height: 50px;

     &:last-child{
       border:none
     }
     &:hover{
        background: $grey-primary;
        cursor: pointer;
        color:white;
     }
    .text{
      width: 220px;
      word-break: break-all;
    }
    .buttons {
       display: flex;
       column-gap: 10px;
    }
  }
</style>