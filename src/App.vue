<template>
  <div class="todo-container">
    <div class="title has-text-centered">Todo</div>
    <form @submit.prevent="addTaskToTodo">
      <div class="field has-addons">
        <div class="control">
          <input
            class="input mb-5"
            type="text"
            placeholder="Todo"
            v-model="contentText"
          />
        </div>
        <div class="control">
          <button class="button is-info" :disabled="!contentText">Add</button>
        </div>
      </div>
    </form>
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="card mb-3"
      :class="{ 'has-background-success-light': todo.done }"
    >
      <div class="width-400">
        <div
          class="content is-flex is-align-items-center is-justify-content-space-between"
        >
          <div>
            <p
              class="width-300"
              :class="{ 'has-text-success line-throught': todo.done }"
            >
              {{ todo.content }}
            </p>
          </div>
          <div>
            <buttton
              @click="toggleDone(todo.id, todo.done)"
              class="button my-4"
              :class="todo.done ? 'is-success' : 'is-dark'"
              >&check;</buttton
            >
            <buttton
              class="button is-danger ml-2 mr-2 my-4"
              @click="deleteTodo(todo.id)"
              >&cross;</buttton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const todoCollectionRef = collection(db, "todos");
const todoCollectionQuery = query(
  todoCollectionRef,
  orderBy("date", "desc"),
  limit(6)
);

const todos = ref([]);
const contentText = ref("");

onMounted(() => {
  onSnapshot(todoCollectionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

function addTaskToTodo() {
  if (contentText.value) {
    addDoc(todoCollectionRef, {
      content: contentText.value,
      done: false,
      date: Date.now(),
    });
    contentText.value = "";
  }
}
function deleteTodo(id) {
  deleteDoc(doc(db, "todos", id));
}
function toggleDone(id, isDone) {
  const washingtonRef = doc(db, "todos", id);
  updateDoc(washingtonRef, {
    done: !isDone,
  });
}
</script>

<style>
.todo-container {
  max-width: 400px;
  margin: 50px auto;
}
input.input {
  width: 300px;
}
button {
  width: 100px;
}
.width-400 {
  width: 400px;
}
.width-300 {
  width: 290px;
  padding: 10px;
}
.line-throught {
  text-decoration: line-through;
}
</style>
