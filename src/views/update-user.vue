<template>
  <div class="container">
    <div>
      <div class="card mb-2 mt-2">
        <div class="card-header p-3">
          <h1>Détail de l'utilisateur</h1>
        </div>
        <div class="card-body">
          <div class="row text-center">
            <div class="col-md-12 mt-2 mb-2">
              <img :src="avatar" class="mx-auto d-block" width="20%" />
            </div>
            <div class="col-md-12 mt-2 mb-2">
              <label for="avatarUrl">Lien de la photo</label>
              <input
                type="text"
                class="form-control text-center"
                name="avatar"
                id="avatar"
                v-model="avatar"
              />
            </div>
            <div class="col-md-4 mt-2 mb-2">
              <div class="form-group">
                <label for="lastName">Nom</label>
                <input
                  type="text"
                  class="form-control text-center"
                  placeholder="Votre nom"
                  v-model="lastName"
                  id="lastName"
                />
              </div>
            </div>

            <div class="col-md-4 mt-2 mb-2">
              <div class="form-group">
                <label for="firstName">Prénom</label>
                <input
                  type="text"
                  class="form-control text-center"
                  placeholder="Votre nom"
                  v-model="firstName"
                  id="firstName"
                />
              </div>
            </div>
            <div class="col-md-2 mt-2 mb-2">
              <div class="form-group">
                <label for="age">Age</label>
                <input
                  type="text"
                  class="form-control text-center"
                  placeholder="Votre age"
                  v-model="age"
                  id="age"
                />
              </div>
            </div>
            <div class="col-md-4 mt-2 mb-2">
              <div class="form-group">
                <label for="email">Mail</label>
                <input
                  type="text"
                  class="form-control text-center"
                  placeholder="Votre mail"
                  v-model="email"
                  id="email"
                />
              </div>
            </div>
            <div class="col-md-4 mt-2 mb-2">
              <div class="form-group">
                <label for="phone">Phone</label>
                <input
                  type="text"
                  class="form-control text-center"
                  placeholder="Votre numéro"
                  v-model="phone"
                  id="phone"
                />
              </div>
            </div>
            <div class="col-md-4 mt-2 mb-2">
              <div class="form-group">
                <label for="gender">Gender</label>
                <Listview
                  v-if="gender === 'female'"
                  :options="['female', 'male']"
                  v-model="gender"
                />
                <Listview
                  v-else
                  :options="['male', 'female']"
                  v-model="gender"
                />
              </div>
            </div>
            <div class="col-md-12 mt-2 mb-2">
              <div class="form-group">
                <label for="details">Détails</label>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="details"
                  name="details"
                  id="details"
                ></textarea>
              </div>
            </div>

            <button
              class="text-center btn btn-success mt-3"
              @click="updateUser()"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Listview from "../components/Listview.vue";
export default {
  components: {
    Listview,
  },
  created() {
    this.fetchUsers(this.$route.params.id);
  },
  data() {
    return {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      avatar: "",
      details: "",
      age: "",
    };
  },
  computed: {},
  methods: {
    async fetchUsers(id) {
      await axios("https://ynov-front.herokuapp.com/api/users/" + id).then(
        ({ data: { data } }) => {
          (this.age = new Date(data.birthDate).toLocaleDateString("fr-FR")),
            (this.firstName = `${data.firstName}`),
            (this.lastName = `${data.lastName.toUpperCase()}`),
            (this.email = data.email),
            (this.phone = data.phone),
            (this.gender = data.gender),
            (this.avatar = data.avatarUrl),
            (this.details = data.details),
            (this.id = data._id);
        }
      );
    },
    async updateUser() {
      try {
        // eslint-disable-next-line no-underscore-dangle
        const userUpdated = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          gender: this.gender,
          avatarUrl: this.avatarUrl,
          details: this.details,
          age: this.age,
        };
        await axios.put(
          `https://ynov-front.herokuapp.com/api/users/${this.$route.params.id}`,
          userUpdated
        );
        this.$emit("notification", {
          type: "success",
          message: "L'utilisateur a bien ete modifie",
        });
        await this.$router.push({ name: "About" });
      } catch (e) {
        this.$emit("notification", { type: "danger", message: e.message });
      }
    },
  },
};
</script>


