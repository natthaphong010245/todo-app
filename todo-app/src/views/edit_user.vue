<template>
    <div>
        <header>
      <h1>TODO List Application(Edit)</h1>
    </header>
    <section>
        <div class="form-control md-2">
        <label class="input-group">
        <span class="title">Task </span>
        <input type="text" placeholder="Design UI/UX" class="input input-bordered" v-model="user.task_name"/>
       </label>
    </div>
    
    <div class="form-control md-2">
        <label class="input-group">
        <span class="title">Status</span>
        <input type="text" placeholder="Todo" class="input input-bordered"  v-model="user.status"/>
       </label>
    </div>

    <button class="button-add" @click="check()">Edit</button>
    </section>
</div>
</template>

<script setup>
  import{ref,onMounted} from 'vue'
  import axios from 'axios'
  import {useRoute} from 'vue-router'

  const route = useRoute()

  constuser = ref({
    task_name:'',
    status:''
  })

  const fetch_single_uer = async () => {
    await axios.get('${import.meta.env.VITE_API}/users//${route.params.id}')
    .then((response) =>{
        user.value.task_name = response.data.data[0].task_name
        user.value.status = response.data.data[0].status
    }).catch((err) =>{
        console.log(err)
    })
  }
  onMounted(() => fetch-single_user())

  const edit_user = async() =>{
    await axios.put('${import.meta.env.VITE_API}/users/${route.params.id}',{
        "task_name":user.value.task_name,
        "status":user.value.status
    }).then((response)=>{
        console.log(response)
    }).catch((err) =>{
        console.log(err)
    })
  }

  const check = async() =>{
    if(add.value.task_name !="" && add.value.status!=""){
        await edit_user()
        await alert("Successfully edited information")
        await router.push('/')
    }else if(add.value.task_name =="" && add.value.status!=""){
        alert("Please fill in task_name")
    }else if(add.value.task_name !="" && add.value.status==""){
    alert("Please fill in status")
  }else if(add.value.task_name =="" && add.value.status==""){
    alert("Please fill in task_name and status")
  }else{
    alert("Failed to edit information")
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