<template>
    <div>
        <header>
      <h1>TODO List Application(Add)</h1>
    </header>
    <section>
        <div class="form-control md-2">
        <label class="input-group">
        <span class="title">Task </span>
        <input type="text" placeholder="Design UI/UX" class="input input-bordered" v-model="add.task_name"/>
       </label>
    </div>
    
    <div class="form-control md-2">
        <label class="input-group">
        <span class="title">Status</span>
        <input type="text" placeholder="Todo" class="input input-bordered"  v-model="add.status"/>
       </label>
    </div>

    <button class="button-add" @click="check()">Add</button>
    </section>
</div>
</template>

<script setup>
   import {ref} from 'vue'
   import axios from 'axios'
   import router from '../router';

   const add = ref({
    task_name:'',
    status:''
   })

  const insert_user = async () =>{
    await axios.post('${import.meta.env.VITE_API}/user',{
        "task_name" : add.value.task_name,
        "status" : add.value.status
    })
    .then((response) =>{
        console.log(response)
    }).catch((err) =>{
        console.log(err)
    })
  } 
  const check = async () =>{
    if(add.value.task_name !="" && add.value.status!=""){
        await insert_user()
        await alert("Successfully added information")
        await router.push('/')
    }else if(add.value.task_name =="" && add.value.status!=""){
        alert("Please fill in task_name")
    }else if(add.value.task_name !="" && add.value.status==""){
    alert("Please fill in status")
  }else if(add.value.task_name =="" && add.value.status==""){
    alert("Please fill in task_name and status")
  }else{
    alert("Failed to add information")
  }
}
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
  padding: 3rem 0 2rem 0;
  text-align: center;
}
span{
  font-size: 24px;
  margin-right: 20px ;
  font-size: 24px;
}
input[type=text] {
  font-size: 22px;
  width: 50%;
  padding: 7px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #868686;
  border-radius: 4px;
}

.button-add{
  margin: 45px 0 20px 0 ;
  padding: 7px;
  background-color: #a82043;
  color: #ffffff;
  border: 1.5px solid #a82043;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  width: 30%;
}
</style>