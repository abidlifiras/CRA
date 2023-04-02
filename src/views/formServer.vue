<template>
  <div class="col-sm-12 col-lg-5 offset-lg-3">
    <p class="ll-sm h3 mb-4">
     Please fill the form 
    </p>
    <div class="col-12">
              <p class="fw-bold mb-4">
                <span class="text-primary me-1">*</span>indicates required
              </p>
    </div>
  <form @submit.prevent="submitForm">
    <fieldset>
      <div class="mb-3 ">
        <label for="serverNameInput" class="form-label is-required">Server name</label>
        <input type="text" id="serverNameInput" class="form-control" placeholder="Server name" v-model="serverName" required>
      </div>
      <div class="mb-3">
        <label for="applicationSelect" class="form-label is-required">Application</label>
        <select id="applicationSelect" class="form-select" v-model="application" required>
          <option value="">Select an application</option>
          <option value="1">Application 1</option>
          <option value="2">Application 2</option>
          <!-- Add more options as needed -->
        </select>
      </div>
      <div class="mb-3">
        <label for="dataSourceInput" class="form-label is-required">Data source</label>
        <input type="text" id="dataSourceInput" class="form-control" placeholder="Data source" v-model="dataSource" required>
      </div>
      <div class="mb-3">
        <label for="operatingSystemInput" class="form-label is-required">Operating system</label>
        <select id="applicationSelect" class="form-select" v-model="operatingSystem" required>
          <option value="">Select an OS</option>
          <option value="RedHat">RedHat</option>
          <option value="linux">linux</option>
          <!-- Add more options as needed -->
        </select>      </div>
      <div class="mb-3">
        <label for="typeSelect" class="form-label is-required">Type</label>
        <select id="typeSelect" class="form-select" v-model="type" required>
          <option value="">Select a type</option>
          <option value="Type 1">Type 1</option>
          <option value="Type 2">Type 2</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="roleInput" class="form-label is-required">Role</label>
        <input type="text" id="roleInput" class="form-control" placeholder="Role" v-model="role" required>
      </div>
      <div class="mb-3">
        <label for="currentCoresInput" class="form-label is-required">Current number of cores</label>
        <input type="number" id="currentCoresInput" class="form-control" placeholder="Current number of cores" v-model.number="currentNumberOfCores" required>
      </div>
      <div class="mb-3">
        <label for="currentRAMInput" class="form-label is-required">Current RAM (GB)</label>
        <input type="number" id="currentRAMInput" class="form-control" placeholder="Current RAM (GB)" v-model.number="currentRAMGB" required>
      </div>
      <div class="mb-3">
        <label for="currentDiskInput" class="form-label is-required">Current disk space (GB)</label>
        <input type="number" id="currentDiskInput" class="form-control" placeholder="Current disk space (GB)" v-model.number="currentDiskGB" required>
      </div>
      <div class="mb-3">
      <label for="powerStatusSelect" class="form-label is-required">Power status</label>
      <select id="powerStatusSelect" class="form-select" v-model="powerStatus" required>
        <option value="">Select power status</option>
        <option value="On">On</option>
        <option value="Off">Off</option>
        <option value="Standby">Standby</option>
      </select>
    </div>
    <div class="mb-3">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
    <br>
  </fieldset>
</form>
</div>
</template>
<script>
import axios from 'axios';

export default {
name: 'formServer',
data() {
  return {
    serverName: '',
    application: '',
    dataSource: '',
    operatingSystem: '',
    type: '',
    role: '',
    currentNumberOfCores: 0,
    currentRAMGB: 0,
    currentDiskGB: 0,
    powerStatus: '',
    serverNotes :'',
    ipAddress :'' ,
    timestamp : ''
  };
},
methods: {
  async submitForm() {
    const formData = {
      serverName: this.serverName,
      application: this.application,
      dataSource: this.dataSource,
      operatingSystem: this.operatingSystem,
      type: this.type,
      role: this.role,
      currentNumberOfCores: this.currentNumberOfCores,
      currentRAMGB: this.currentRAMGB,
      currentDiskGB: this.currentDiskGB,
      powerStatus: this.powerStatus,
      serverNotes : "test" ,
      ipAddress : "test ip",
      timestamp : "2023-03-27T14:30:00.000+00:00"
    };
    
    try {
      const response = await axios.post('http://localhost:8088/servers', formData);
      console.log(response.data); 
      this.$router.push({ name: 'tableServer' });
    } catch (error) {
      console.error(error);
    }
  },
},
};
</script>

