<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal" ref="target">
      <div class="modal-header">
        <h2 class="modal-header__title">{{ title }}</h2>
        <div class="modal-header__close" @click="closeModal">&times;</div>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onClickOutside} from "@vueuse/core";



const {title, showModal} = defineProps(['showModal', 'title']);
const emit = defineEmits(['change', 'update']);
const target = ref(null)

onClickOutside(target, event => {
   emit('update:showModal', false);
})
const closeModal = () => {
  emit('update:showModal', false);
};
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 30px;
    margin-bottom: 10px;
    &__title {
      margin: 0;
    }
    &__close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
        &:hover {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }
    }

  }
}






.modal-body {
  /* Add any additional styles for the modal body here */
}

</style>