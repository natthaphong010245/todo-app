<template>
  <div>
    <header>
      <h1>TODO List Application</h1>
    </header>
    <section>
      <router-link to ="/add">
      <b-button class="add-task" variant="outline-primary">Add Task</b-button>
    </router-link>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="col-id no-bottom-border">#</th>
            <th scope="col" class="col-task-name">Task Name</th>
            <th scope="col" class="col-status">Status</th>
            <th scope="col" class="col-edit">Edit</th>
            <th scope="col" class="col-remove">Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in users" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ user.task_name }}</td>
            <td class="center-text">
              <p class="status">{{ user.status }}</p>
            </td>
            <td class="center-align">
              <router-link to="'/edit/${user.id}'">
              <b-button class="edit" variant="outline-primary">
                <img :src="picture_edit" width="30" height="30" />
              </b-button>
            </router-link>
            </td>
            <td>
              <b-button class="remove" variant="outline-primary" @click="delete_users(user.id)">
                <img :src="picture_remove" width="30" height="30" />
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const fetch_users = async () => {
  await axios.get(`${import.meta.env.VITE_API}/users`)
    .then((response) => {
      users.value = response.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

const delete_users = async() =>{
  await axios.delete('${import.meta.env.VITE_API}/users/${id}')
  .then((response) =>{
     console.log(response)
     fetch_users()
  }).catch((err) =>{
    console.log(err)
  })
}

onMounted(() => fetch_users());
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
body {
  margin: 0;
  padding: 5rem 17rem 5rem 17rem;
}
header {
  border-radius: 10px;
  margin-left: 1rem;
  background-color: white;
  color: rgb(0, 0, 0);
  text-align: left;
  margin-bottom: 10px;
}
section {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}
.add-task {
  margin: 5px;
  padding: 7px;
  background-color: #a82043;
  color: #ffffff;
  border: 1.5px solid #a82043;
  border-radius: 5px;
  float: right;
  font-size: 14px;
}
.edit {
  display: flex;
  justify-content: center; 
  align-items: center; 
  width: 100%; 
  height: 100%; 
  padding: 0; 
  background-color: transparent; 
  border: none; 
}
.edit img {
  padding: 3px;
  background-color: white;
  border: 1.5px solid #00bcf7;
  border-radius: 5px;
  max-width: 100%; 
  max-height: 100%; 
}
.remove {
  display: flex;
  justify-content: center; 
  align-items: center; 
  width: 100%; 
  height: 100%; 
  padding: 0; 
  background-color: transparent; 
  border: none; 
}
.remove img {
  padding: 3px;
  background-color: white;
  border: 1.5px solid #5E5E5E;
  border-radius: 5px;
  max-width: 100%; 
  max-height: 100%; 
}
.status {
  padding: 7px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #a82043;
  color: #a82043;
  border-radius: 30px; 
  display: inline-block;
  width: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
}
.table th {
  background-color: #ffffff;
  text-align: center;
}
.col-id {
  width: 10%;
}
.col-task-name {
  width: 50%;
}
.col-status {
  width: 15%;
}
.col-edit,
.col-remove {
  width: 5%;
}
.no-bottom-border {
  border-bottom: none;
}
.center-align {
  text-align: center;
  vertical-align: middle;
}
.center-text {
  text-align: center;
}

.checkbox-wrapper-45 {
    position: relative;
  }

  .checkbox-wrapper-45 input[type="checkbox"] {
    display: none;
    visibility: hidden;
  }
  .checkbox-wrapper-45 .cbx {
    -webkit-perspective: 20;
    perspective: 20;
    display: inline-block;
    border: 2px solid #e8e8eb;
    background: #e8e8eb;
    border-radius: 4px;
    transform: translate3d(0, 0, 0);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .checkbox-wrapper-45 .cbx:hover {
    border-color: #a82043;
  }
  .checkbox-wrapper-45 .flip {
    display: block;
    transition: all 0.4s ease;
    transform-style: preserve-3d;
    position: relative;
    width: 20px;
    height: 20px;
  }
  .checkbox-wrapper-45 input[type="checkbox"]:checked + .cbx {
    border-color: #a82043;
  }
  .checkbox-wrapper-45 input[type="checkbox"]:checked + .cbx .flip {
    transform: rotateY(180deg);
  }
  .checkbox-wrapper-45 .front,
  .checkbox-wrapper-45 .back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 2px;
  }
  .checkbox-wrapper-45 .front {
    background: #fff;
    z-index: 1;
  }
  .checkbox-wrapper-45 .back {
    transform: rotateY(180deg);
    background: #a82043;
    text-align: center;
    color: #fff;
    line-height: 20px;
    box-shadow: 0 0 0 1px #a82043;
  }
  .checkbox-wrapper-45 .back svg {
    margin-top: 3px;
    fill: none;
  }
  .checkbox-wrapper-45 .back svg path {
    stroke: #fff;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
