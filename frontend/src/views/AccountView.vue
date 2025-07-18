<template>
  <v-container class="account-container" max-width="600px">
    <v-card class="pa-4">
      <v-card-title class="justify-space-between align-center">
        <h2 id="accountTitle">My Locker</h2>
      </v-card-title>

      <v-card-text v-if="user">
        <div class="d-flex flex-column align-center">
          <label for="avatar-upload" class="cursor-pointer">
            <v-avatar size="100" color="info">
              <template v-if="preview">
                <v-img :src="preview" cover/>
              </template>
              <template v-else-if="user.avatar_url != null">
                <v-img :src="`http://localhost:3000/backend${user.avatar_url}`" cover/>
              </template>
              <template v-else>
                <v-icon icon="mdi-account-circle" size="90" class="text-white"/>
              </template>
            </v-avatar>
          </label>

          <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              class="d-none"
              @change="onFileChange"
          />
        </div>

        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <strong>Username:</strong> {{ user.username }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-for="field in editableFields" :key="field.key">
            <v-list-item-content style="display: flex">
              <v-text-field
                  v-if="editFields[field.key]"
                  v-model="user[field.key]"
                  :label="field.label"
              />
              <v-list-item-title v-else>
                <strong>{{ field.label }}:</strong> {{ user[field.key] }}
              </v-list-item-title>
              <v-list-item-action style="margin-left: 10px">
                <v-btn
                    variant="plain"
                    size="small"
                    @click="editFields[field.key] = !editFields[field.key]"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item-content>

          </v-list-item>
        </v-list>

        <v-btn
            type="submit"
            color="success"
            block
            class="mt-4"
            @click="updateAccount"
        >
          Save Changes
        </v-btn>

        <v-btn
            color="error"
            block
            class="mt-2"
            @click="resetChanges"
        >
          Cancel
        </v-btn>
      </v-card-text>

      <v-card-text v-else>
        <v-progress-circular indeterminate color="primary" class="mr-2"/>
        Loading account info...
      </v-card-text>

      <v-btn @click="logout" title="Logout"
             color="primary"
             class="mt-4"
             block>Logout
      </v-btn>

      <v-alert
          v-if="errorMessage"
          type="error"
          dense
          class="mt-3"
      >
        {{ errorMessage }}
      </v-alert>

      <div class="text-center mt-4" id="backLink">
        <router-link to="/dashboard">Back to Dashboard</router-link>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'MyAccountView',
  data() {
    return {
      user: null,
      originalUser: null,
      editFields: {
        first_name: false,
        last_name: false,
        mail: false
      },
      editableFields: [
        {key: 'first_name', label: 'First Name'},
        {key: 'last_name', label: 'Last Name'},
        {key: 'mail', label: 'Email'}
      ],
      errorMessage: '',
    };
  },
  async mounted() {
    await this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        const token = localStorage.getItem('session_token');
        const response = await fetch('http://localhost:3000/api/my-account', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        const data = await response.json();

        if (!response.ok) {
          this.errorMessage = data.message || 'Unable to fetch account information.';
        } else {
          this.user = {...data};
          this.originalUser = JSON.parse(JSON.stringify(data)); // deep clone
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        this.errorMessage = 'Server error. Please try again later.';
      }
    },
    resetChanges() {
      this.user = JSON.parse(JSON.stringify(this.originalUser));
      this.editFields = {
        first_name: false,
        last_name: false,
        mail: false
      };
      this.preview = null;
    },
    logout() {
      localStorage.removeItem('session_token');
      this.$router.push('/login');
    },
    async updateAccount() {
      try {
        const token = localStorage.getItem('session_token');
        const formData = new FormData();

        formData.append('first_name', this.user.first_name);
        formData.append('last_name', this.user.last_name);
        formData.append('mail', this.user.mail);

        const fileInput = document.getElementById('avatar-upload');
        const file = fileInput.files[0];
        if (file) {
          formData.append('avatar', file);
        }

        const response = await fetch('http://localhost:3000/api/my-account/update', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });

        const data = await response.json();

        if (!response.ok) {
          this.errorMessage = data.message || 'Update failed.';
        } else {
          this.errorMessage = '';
          this.editFields = {
            first_name: false,
            last_name: false,
            mail: false
          };
          await this.fetchUserInfo();
        }
      } catch (err) {
        console.error(err);
        this.errorMessage = 'Server error during update.';
      }
    }
  }
};
</script>

<script setup>
import {ref} from 'vue'

const preview = ref(null)

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      preview.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
#accountTitle {
  text-align: center;
}

.account-container {
  margin-top: 50px;
}

#backLink {
  font-size: 90%;
  margin-top: 2%;
}

#backLink a {
  text-decoration: none;
  color: #1976d2;
}

</style>
