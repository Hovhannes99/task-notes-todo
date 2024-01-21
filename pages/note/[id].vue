<template>
  <div>
    <div class="button-wrapper">
      <button class="primary-button" @click="navigateTo('/')">Back</button>
      <button class="primary-button" @click="openModal">Add ToDo</button>
      <div class="changed-buttons">
        <button class="secondary-button" @click="onOpenCancelModal" :disabled="isChanged">Cancel Changes</button>
        <button class="primary-button" @click="onSaveData" :disabled="isChanged">Save Changes</button>
      </div>
    </div>
    <div class="container-lists">
      <div v-if="currentTodo?.length" >
        <TodoList
            :todos="currentTodo"
            :is-detail="true"
            :on-remove-item="onRemoveId"
            :on-edit-text="onEditId"
            :on-completed="onCompleted"
        />
      </div>
      <div v-else>
        <p>No Todo yet</p>
      </div>
    </div>
    <Modal :showModal="isModalVisible" title="Add Todo" @update:showModal="updateModalVisibility">
      <div class="container">
        <input
            type="text"
            class="primary-input"
            placeholder="Name of todo"
            v-model="todoName"
            @change="handleName"
        />
        <div class="container-buttons">
          <button class="secondary-button" @click="onCancel">Cancel</button>
          <button class="primary-button"  :disabled="!todoName" @click="onAddTodo">Add</button>
        </div>
      </div>
    </Modal>
    <Modal :showModal="isOpenModalRemove" title="Do you want remove this item?" @update:showModal="updateIsOpenModalRemove">
      <div class="button-wrapper">
        <button class="secondary-button" @click="onCancel">Cancel</button>
        <button class="delete-button" @click="removeToDoItem">Yes</button>
      </div>
    </Modal>
    <Modal :showModal="isOpenModalCancel" title="Do you want Cancel Changes?" @update:showModal="updateIsOpenModalCancel">
      <div class="button-wrapper">
        <button class="secondary-button" @click="onCancel">Cancel</button>
        <button class="delete-button" @click="onCancelChanges">Yes</button>
      </div>
    </Modal>
    <Modal :showModal="isOpenModalEdit" title="Edit Todo text" @update:showModal="updateIsOpenModalEdit">
      <div class="container">
        <input
            type="text"
            class="primary-input"
            placeholder="Edit Name of Todo"
            v-model="todoName"
            @change="handleName"
        />
        <div class="container-buttons">
          <button class="secondary-button" @click="onCancel">Cancel</button>
          <button class="primary-button"  :disabled="!todoName" @click="handleEditText">Edit</button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {getLocalStorage, hasChanges, setLocalStorage} from "~/utils";
  const route = useRoute();
  const notes = useNotes();
  const currentTodo = ref([]);
  const defaultTodo = ref([]);
  const isModalVisible = ref(false);
  const isOpenModalRemove = ref(false);
  const isOpenModalEdit = ref(false);
  const isOpenModalCancel = ref(false);
  const todoName = ref("");
  const noteId = ref(0);
  const todoId = ref(0);
  const isChanged  = ref(false)
  const data = getLocalStorage('dataNote')

  onMounted(()=>{
    if (!data){
      setLocalStorage("dataNote", [])
    }else {
      notes.value = data
    }
    noteId.value = Number(route.params.id);
    currentTodo.value = notes.value.find((item)=> item.id === noteId.value  ? item.todos : null)?.todos.map(i=>i)
    defaultTodo.value = notes.value.find((item)=> item.id === noteId.value ? item.todos : null)?.todos.map(i=>i)
  })
  onUpdated(() => {
    isChanged.value = hasChanges(currentTodo.value, defaultTodo.value)
    setLocalStorage("dataNote", notes.value)
  })
  onUnmounted(()=>{
    currentTodo.value = [];
    defaultTodo.value = [];
    setLocalStorage("dataNote", notes.value)
  })
  const openModal = () => {
    isModalVisible.value = true;
  };
  const onCancel = () => {
    isModalVisible.value = false;
    isOpenModalRemove.value = false;
    isOpenModalEdit.value = false;
    isOpenModalCancel.value = false;
    todoName.value = ""
  };
  const onRemoveId = (id:number) =>{
    todoId.value = id
    isOpenModalRemove.value = true;
  }
  const onEditId = (id:number) =>{
    todoId.value = id
    isOpenModalEdit.value = true;
    const result = currentTodo.value.find(i=>i.id === id);
    todoName.value = result?.text
  }
  const removeToDoItem = () =>{
    currentTodo.value =  currentTodo.value.filter(i => todoId.value !== i.id);
    isOpenModalRemove.value = false;
    todoId.value = 0
  }
  const onCancelChanges = () => {
    currentTodo.value = defaultTodo.value;
    defaultTodo.value = notes.value.find((item)=>  (item.id === noteId.value)?item.todos : null)?.todos
    isOpenModalCancel.value =  false;
  }
  const onAddTodo = () => {
    const id = Date.now();
    const checked = false;
    currentTodo.value.push({id, completed:checked, text:todoName.value})
    isModalVisible.value = false;
    todoName.value = "";
  };
  const onCompleted = (id:number) => {
    currentTodo.value = currentTodo.value.map((todo)=>todo.id === id? {...todo, completed: !todo.completed}: todo)
  };
  const handleEditText = () => {
    currentTodo.value = currentTodo.value.map((todo)=>todo.id === todoId.value? {...todo, text:todoName.value}: todo)
    isOpenModalEdit.value = false;
    todoName.value = "";
  };
  const handleName = (event) => {
    todoName.value = event.target.value;
  };
  const onSaveData = () => {
    notes.value = notes.value.map(note=> (note.id === noteId.value) ? {...note, todos:currentTodo.value }:note);
    defaultTodo.value =  currentTodo.value
    isChanged.value = hasChanges(currentTodo.value, defaultTodo.value)
  }
  const updateModalVisibility = (value) => {
    isModalVisible.value = value;
  };
  const updateIsOpenModalRemove = (value) => {
    isOpenModalRemove.value = value;
  };
  const updateIsOpenModalEdit = (value) => {
    isOpenModalEdit.value = value;
  };
  const updateIsOpenModalCancel = (value) => {
    isOpenModalCancel.value = value;
  };
  const onOpenCancelModal = () => {
    isOpenModalCancel.value = true;
  };

</script>

<style scoped lang="scss">
    .container-lists{
      display: flex;
      justify-content: center;
      padding: 0 30px;

       > div {
         border: 1px solid;
       }
    }
    .changed-buttons{
       display: flex;
       column-gap: 10px;
    }
</style>