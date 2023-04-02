<template>
  <div class=" container-fluid">
  <caption class="wide-column">List of Servers
    <router-link class="menuItem-active-link" to="/">
      <a class="btn btn-sm btn-secondary ml-3">Add servers</a>
    </router-link>
  </caption>
  <div class="dropdown-container">
      <div class="dropdown">
        <button class="btn btn-sm btn-secondary mt-3" @click="toggleDropdown">...</button>
        <div class="dropdown-menu" :class="{ show: showDropdown }" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" v-for="(column, index) in columns" :key="index">
            <label>
              <input type="checkbox" v-model="selectedColumns" :value="column" />
              {{ column }}
            </label>
          </a>
        </div>
      </div>
    </div>
    <div class="table-responsive text-center ">
      <table class="table table-hover">
        <thead class="cf">
          <tr>
            <th scope="col" class="header wide-column" v-for="column in selectedColumns" v-bind:key="column">{{ column }}</th>
            <th scope="col" class="header wide-column">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="server in servers" :key="server.id">
            <td  v-if="selectedColumns.includes('id')" class="align-middle">{{ server.id }}</td>
            <td v-if="selectedColumns.includes('serverName')" class="align-middle">{{ server.serverName }}</td>
            <td  v-if="selectedColumns.includes('application')" class="align-middle">{{ server.application }}</td>
            <td v-if="selectedColumns.includes('dataSource')" class="align-middle">{{ server.dataSource }}</td>
            <td v-if="selectedColumns.includes('operatingSystem')" class="align-middle">{{ server.operatingSystem }}</td>
            <td v-if="selectedColumns.includes('type')" class="align-middle wide-column">{{ server.type }}</td>
            <td v-if="selectedColumns.includes('role')" class="align-middle">{{ server.role }}</td>
            <td v-if="selectedColumns.includes('currentNumberOfCores')" class="align-middle">{{ server.currentNumberOfCores }}</td>
            <td v-if="selectedColumns.includes('currentRAMGB')" class="align-middle">{{ server.currentRAMGB }}</td>
            <td v-if="selectedColumns.includes('currentDiskGB')" class="align-middle">{{ server.currentDiskGB }}</td>
            <td v-if="selectedColumns.includes('powerStatus')" class="align-middle">{{ server.powerStatus }}</td>
            <td v-if="selectedColumns.includes('serverNotes')" class="align-middle">{{ server.serverNotes }}</td>
            <td v-if="selectedColumns.includes('ipAddress')" class="align-middle">{{ server.ipAddress }}</td>
            <td v-if="selectedColumns.includes('timestamp')" class="align-middle">{{ server.timestamp }}</td>
            <td class="align-middle header wide-column">
            <button @click="() => TogglePopup('buttonTrigger')" type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#confirm-dialog">Edit</button>
            <button @click="deleteServer(server.id)" type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#confirm-dialog">Delete</button>
          </td>
          </tr>
        </tbody>
      </table>
     </div>
     <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end">
           <li class="page-item disabled">
            <a class="page-link">Previous</a>
           </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
        <div>
  <Popup v-if="popupTriggers.buttonTrigger" 
         :TogglePopup="() => TogglePopup('buttonTrigger')">
    <div class="popup">
      <div class="popup-inner">
        <br>
        <br>
        <br>
        <br>
        <formServer></formServer>
      </div>
    </div>
  </Popup>
</div>
        <ul class="nav nav-tabs nav-tabs-light">
      <li class="nav-item">
        <router-link class="menuItem-active-link" to="/table">
        <a class="nav-link active"  data-toggle="tab">Help</a>
        </router-link>
      </li>
    </ul>
    <div class="tab-content border-left-0 border-right-0 border-bottom-0">
      <div class="tab-pane active" id="help">
        <p>From this view, you can edit or delete entry of your web site. You can also add an entry by clicking on "Add news" button.</p>
        <p>You can reorder column by clicking on them.</p>
        <p>Finally, you can search an item by typing his title or his ID in the search field, at the top of the page.</p>
      </div>
    </div>
    <br>
    <br>
    <br>
    </div>
</template>

<script>
import axios from "axios";
import { ref } from 'vue';
import editPopup from '../components/editPopup.vue';
import formServer from "../views/formServer.vue"

export default {
  name: "App",
  components: {
    formServer

  },
  data() {
    return {
      servers: [],
      editMode: false,
      serverToEdit: null,
      columns: [],
      selectedColumns: [],
      showDropdown: false,
      showModal : false,
    };
  },
  setup () {
		const popupTriggers = ref({
			buttonTrigger: false,
		});
		const TogglePopup = (trigger) => {
			popupTriggers.value[trigger] = !popupTriggers.value[trigger]
		}
		return {
			editPopup,
			popupTriggers,
			TogglePopup
		}
	},
  mounted() {
    axios
      .get("http://localhost:8088/servers")
      .then((response) => {
        this.servers = response.data;
        this.columns = Object.keys(this.servers[0]);
        this.selectedColumns = [...this.columns];
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteServer(serverId) {
      if (confirm("Are you sure you want to delete this server?")) {
        axios
          .delete(`http://localhost:8088/servers/${serverId}`)
          .then(() => {
            this.servers = this.servers.filter(
              (server) => server.id !== serverId
            );
            console.log(this.selectedColumns);
          })
          .catch((error) => {
            console.log(error);
          });
      }},
      toggleDropdown() {
        this.showDropdown = !this.showDropdown
      }

    }
};
</script>


<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
.btn-orange {
background-color: orange;
color: white;
}
.wide-column {
  white-space: nowrap; /* Empêche le texte de se retourner à la ligne */
  overflow: hidden; /* Cache tout contenu qui dépasse la largeur de la colonne */
  text-overflow: ellipsis; /* Ajoute des points de suspension à la fin du texte qui dépasse la largeur de la colonne */
}
.dropdown {
    position: relative;
    display: inline-block;
    margin-left: 900px;
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  }
  
  .dropdown-item {
    display: block;
    width: 100%;
    padding: 3px 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
  }
  
  .dropdown-item:hover,
  .dropdown-item:focus {
    color: #16181b;
    text-decoration: none;
    background-color: #f8f9fa;
  }
  

</style>
