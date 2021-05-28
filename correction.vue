<template>
  <div id="app">
   <p>moyenne : {{(count1 + count2) / 2}}</p>
    <Counter v-model="count1" />
    <Counter :value="count2" @input="val => count2 = val" />
  </div>
</template>

<script>
import Counter from "./components/Counter";

export default {
  name: "App",
  components: {
    Counter,
  },
  data() {
    return {
      count1: 10,
      count2: 15
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
















<template>
  <div>
    <button @click="increment">Inc</button>
    valeur : {{ value }}
    <button @click="decrement">Dec</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    value: Number,
  },
  data() {
    return {
      initial: this.value,
    };
  },
  methods: {
    increment() {
      this.$emit("input", this.value + 1);
    },
    decrement() {
      this.$emit("input", this.value - 1);
    },
    reset() {
      this.$emit("input", this.initial);
    },
  },
};
</script>










