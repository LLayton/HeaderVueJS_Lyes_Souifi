<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
<template>
  <div class="container-fluid">
    <div>
      <div class="card mb-2 mt-2">
        <div class="card-header p-3">
          <h1>VueJS example</h1>

          <div class="row">
            <div class="col-md-4">
              <input
                type="button"
                class="btn btn-success"
                @click="openModal"
                value="Ajouter un utilisateur"
              />
            </div>
            <div class="col-md-4">
              <button class="btn btn-primary" @click="fetchUsers">
                Fetch all users
              </button>
            </div>
            <div class="col-md-4">
              <input v-model="search" placeholder="Ecrivez texte" />
            </div>
            <div class="col-md-4">
              <Listview :options="['All', 'male', 'female']" v-model="gender" />
            </div>

            <div class="col-md-4">
              <b-spinner v-show="loading"></b-spinner>
            </div>
            <div class="col-md-4">
              <span class="lead">{{ filteredList.length }} lignes</span>
            </div>
            <div class="col-md-4">
              <span class="lead">{{ filteredList.length }} lignes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <table id="tbl-users" class="table table-hover">
          <thead>
            <tr>
              <th>
                <button onpress="{}"></button>
              </th>
              <th
                :class="[sortBy === 'name' ? sortDirection : '']"
                @click="sort('name')"
              >
                Nom
              </th>
              <th
                :class="[sortBy === 'email' ? sortDirection : '']"
                @click="sort('email')"
              >
                Email
              </th>
              <th
                :class="[sortBy === 'phone' ? sortDirection : '']"
                @click="sort('phone')"
              >
                Tel
              </th>
              <th
                :class="[sortBy === 'age' ? sortDirection : '']"
                @click="sort('age')"
              >
                Naissance
              </th>
              <th>Gender</th>
              <th>Modifier</th>
              <th>Supptimer</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in filteredList"
              :key="user.email"
              class="align-middle"
            >
              <td class="w-25 p-3 mb-1">
                <img class="w-75 p-3 mb-1 rounded" :src="user.avatar" />
              </td>
              <td v-html="user.nameFormated" />
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.age }}</td>
              <td>{{ user.gender }}</td>
              <td>
                <router-link :to="{ path: '/users/update/' + user.id }">
                  <button class="btn btn-warning">Modifier</button></router-link
                >
              </td>
              <td>
                <button class="btn btn-danger" @click="DeleteUser(user.id)">
                  Suprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="MonModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header row">
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="MonModal = false"
                      value="X"
                    ></button>
                    <h6 class="modal-title">{{ Titre }}</h6>

                    <div class="modal-body">
                      <div class="form-group">
                        <label for="urlAvatar">Url Avatar</label>
                        <input
                          type="text"
                          class="form-control text-center"
                          placeholder="Saisir l'url"
                          v-model="urlAvatar"
                          id="urlAvatar"
                        />
                        <label for="nom">Noms</label>
                        <input
                          type="text"
                          class="form-control text-center"
                          placeholder="Saisir votre noms"
                          v-model="AddFirstName"
                          id="Firstnoms"
                        />
                        <label for="Lastname">Prénoms</label>
                        <input
                          type="text"
                          class="form-control text-center"
                          placeholder="Saisir le prénom"
                          v-model="AddLastName"
                          id="LastName"
                        />
                        <label for="tel">téléphone</label>
                        <input
                          type="text"
                          class="form-control text-center"
                          placeholder="Saisir le numéro de téléphone"
                          v-model="AddTel"
                          id="tel"
                        />
                        <label for="nom">naissance</label>
                        <input
                          type="date"
                          class="form-control text-center"
                          placeholder="Saisir la date"
                          v-model="AddNaissance"
                          id="tel"
                        />                      
                        <label for="mail">mail</label>
                        <input
                          type="text"
                          class="form-control text-center"
                          placeholder="Saisir le mail"
                          v-model="AddMail"
                          id="mail"
                        />
                        <label for="gender">Genre</label>
                        <Listview
                          :options="['male', 'female']"
                          v-model="AddGender"
                        />
                        <label for="details">Détails</label>
                        <textarea
                          class="form-control"
                          rows="5"
                          v-model="Adddetails"
                          name="details"
                          id="details"
                        ></textarea>
                        <div align="center" class="row">
                          <input type="hidden" />
                          <input
                            type="button"
                            class="btn-success"
                            @click="submitData"
                            value="Ajouter utilisateur"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
  data() {
    return {
      gender: "",
      age: "",
      nonFilteredUsers: [],
      sortBy: "",
      sortDirection: "asc",
      search: "",
      loading: false,
      name: "",
      MonModal: false,
      actionButton: "Insert",
      Titre: "Ajouter un utilisateur",
      AddFirstName: "",
      AddLastName: "",
      AddTel: "",
      AddMail: "",
      AddGender: "",
      AddNaissance: "",
      urlAvatar: "",
      Adddetails: "",
    };
  },
  computed: {
    searchWords() {
      if (!this.search.length) return [];
      return this.search.toLowerCase().split(" ");
    },
    filteredList() {
      return (
        this.nonFilteredUsers
          // Recherche
          .filter((user) =>
            this.searchWords.every((word) =>
              user.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(word)
            )
          )
          // Filtre par genres
          .filter((user) => {
            if (this.gender === "All" || this.gender === "") return true;
            return user.gender === this.gender;
          })
          // tri par ordre alphabétique
          .sort((p1, p2) => {
            const modifier = this.sortDirection === "asc" ? 1 : -1;
            if (!this.sortBy) return 0;
            if (typeof p1[this.sortBy] === "number")
              return modifier * (p1[this.sortBy] - p2[this.sortBy]);
            return modifier * p1[this.sortBy].localeCompare(p2[this.sortBy]);
          })
          // Met en gras les resultats recherché
          .map((user) => {
            const nameFormated = this.searchWords.length
              ? user.name.replace(
                  new RegExp(this.searchWords.join("|"), "gi"),
                  '<span class="highlight">$&</span>'
                )
              : user.name;
            return {
              ...user,
              nameFormated,
            };
          })
      );
    },
  },
  created() {
    setTimeout(this.fetchUsers(), 300);
  },

  methods: {
    async submitData() {
      try {
        // eslint-disable-next-line no-underscore-dangle
        if (this.urlAvatar==="") {
          this.urlAvatar="https://about.gitlab.com/images/press/logo/jpg/gitlab-logo-gray-stacked-rgb.jpg";
        }

        const data=await axios.post(
          `https://ynov-front.herokuapp.com/api/users`,
          {            
            "firstName":this.AddFirstName,
            "lastName":this.AddLastName,
            "email":this.AddMail,
            "phone": this.AddTel,
            "gender": this.AddGender,
            "avatarUrl": this.urlAvatar,
            "details": this.Adddetails,
            "birthDate": this.AddNaissance,
          }
        );
        console.log(data)
      } catch (e) {
        this.$emit("notification", { type: "danger", message: e.message });
      }
    },
    openModal() {
      this.noms = "";
      this.actionButton = "Insert";
      this.Titre = "Ajout utilisateur";
      this.MonModal = true;
    },
    GoDetails(Id) {
      this.$route.params.type.push({ name: "Details", params: { id: Id } });
    },
    DeleteUser(Id) {
      axios.delete(`https://ynov-front.herokuapp.com/api/users/${Id}`);
      this.fetchUsers();
    },
    sort(sortby) {
      if (sortby === this.sortBy) {
        if (this.sortDirection === "desc") {
          this.sortBy = "";
          this.sortDirection = "asc";
          return;
        }
        if (this.sortDirection === "asc") {
          this.sortDirection = "desc";
          return;
        }
      }
      this.sortDirection = "asc";
      this.sortBy = sortby;
    },
    fetchUsers() {
      this.loading = true;

      axios("https://ynov-front.herokuapp.com/api/users").then(
        ({ data: { data } }) => {
          this.nonFilteredUsers = data.map((user) => ({
            id: user._id,
            age:
              new Date(
                Date.now() - new Date(user.birthDate).getTime()
              ).getFullYear() - 1970,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            avatar: user.avatarUrl,
          }));
        }
      );
      this.loading = false;
    },
  },
};
</script>
