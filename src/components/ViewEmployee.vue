<template>
  <div id="view-employee">
    <h3 class="center-align">View Employee</h3>
    <ul class="collection with-header">
      <li class="collection-header"><h4 class="center-align"><i class="fa fa-user"></i> {{name}}</h4></li>
      <li class="collection-item">Employee ID#: {{employee_id}}</li>
      <li class="collection-item">Department: {{department}}</li>
      <li class="collection-item">Position: {{position}}</li>
    </ul>
    <router-link v-bind:to="{name: 'dashboard'}" class="btn ">Back</router-link>
    <button @click="deleteEmployee" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{name: 'edit-employee', params: {employee_id: employee_id}}" class="btn-floating btn-large blue">
        <i class="fa fa-edit"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: 'view-employee',
  data () {
    return {
      employee_id: null,
      name: null,
      department: null,
      position: null,
    }
  },
  beforeRouteEnter (to, from, next) {
    db.collection('employees').where('employee_id', '==', to.params.employee_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.employee_id = doc.data().employee_id
            vm.name = doc.data().name
            vm.department = doc.data().department
            vm.position = doc.data().position
          })
        })
      })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.employee_id = doc.data().employee_id
            this.name = doc.data().name
            this.department = doc.data().department
            this.position = doc.data().position
          })
        })
    },
    deleteEmployee () {
      if(confirm('Are You sure ?')) {
        db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get()
          .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
            this.$router.push({name: 'dashboard'})
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
