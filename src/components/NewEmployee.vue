<template>
  <div id="new-employee">
    <h3 class="center-align">Add New Employee</h3>
    <div class="row">
      <form @submit.prevent="newEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="employee_id" required>
            <label>Employee ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="department" required>
            <label>Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required>
            <label>Position</label>
          </div>
        </div>
        <button type="submit" class="btn blue">Add New Employee</button>
        <router-link v-bind:to="{name: 'dashboard'}" class="btn">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: 'new-employee',
  data () {
    return {
      employee_id: null,
      name: null,
      department: null,
      position: null
    }
  },
  methods: {
    newEmployee () {
      db.collection('employees').add({
        employee_id: this.employee_id,
        name: this.name,
        department: this.department,
        position: this.position
      })
        .then(docRef => this.$router.push({name: 'dashboard'}))
        .catch(error => alert(error))
    }
  }
}
</script>

<style scoped>
input:focus{
  border-bottom: 1px solid #2196F3!important;
  -webkit-box-shadow: 0 1px 0 0 #2196F3!important;
  box-shadow: 0 1px 0 0 #2196F3!important;
}

label.active{
  color: #2196F3!important;
}
</style>
