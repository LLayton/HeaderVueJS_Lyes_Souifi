<template>
  <div class="container-fluid">
    <h1>Details users</h1>
  </div>
</template>
<script>
import axios from "axios";
import Listview from "../components/Listview.vue";
export default {
  components: {
    Listview,
  },
  data() {
    return {

    };
  },  
  props: {
      id:Number,
  },
  methods: {

    },
    fetchUsers() {
      this.loading=true;
      
      axios("https://ynov-front.herokuapp.com/api/users").then(
        ({ data: { data } }) => {

          });
        


    },
  
};
</script>
