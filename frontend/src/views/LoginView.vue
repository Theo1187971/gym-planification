<template>
  <v-container class="login-container" max-width="600px">
    <v-card class="pa-4">
      <v-card-title class="justify-center">
        <h2 id="loginTitle">Open your locker</h2>
      </v-card-title>

      <v-form @submit.prevent="handleLogin" ref="form">
        <v-text-field
            label="Email Address"
            v-model="email"
            :rules="[v => !!v || 'Email is required']"
            ref="emailInput"
            required
        />

        <v-text-field
            label="Password"
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            ref="passwordInput"
            required
        />

        <v-list dense class="mt-3">
          <v-list-item>
            <v-list-item-content>
              <strong>Password must contain:</strong>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              v-for="(check, label) in passwordChecks"
              :key="label"
          >
            <v-list-item-content>
              <v-icon :color="check ? 'green' : 'red'" small>
                {{ check ? 'mdi-check-circle' : 'mdi-close-circle' }}
              </v-icon>
              <span class="ml-2">
                {{
                  label === 'length'
                      ? 'At least 8 characters'
                      : label === 'hasUppercase'
                          ? 'At least one uppercase letter'
                          : label === 'hasLowercase'
                              ? 'At least one lowercase letter'
                              : label === 'hasDigit'
                                  ? 'At least one number'
                                  : 'At least one special character'
                }}
              </span>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-btn
            type="submit"
            color="primary"
            :disabled="!isPasswordValid"
            class="mt-4"
            block
        >
          Login
        </v-btn>

        <v-alert
            v-if="errorMessage"
            type="error"
            dense
            class="mt-3"
        >
          {{ errorMessage }}
        </v-alert>

        <div class="text-center mt-4" id="createAccountLink">
          Not registered yet?
          <router-link to="/signup">Create your locker by clicking here</router-link>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      errorMessage: ''
    };
  },
  computed: {
    passwordChecks() {
      return {
        length: this.password.length >= 8,
        hasUppercase: /[A-Z]/.test(this.password),
        hasLowercase: /[a-z]/.test(this.password),
        hasDigit: /\d/.test(this.password),
        hasSpecialChar: /[\W_]/.test(this.password)
      };
    },
    isPasswordValid() {
      const checks = this.passwordChecks;
      return (
          checks.length &&
          checks.hasUppercase &&
          checks.hasLowercase &&
          checks.hasDigit &&
          checks.hasSpecialChar
      );
    }
  },
  methods: {
    async handleLogin() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        alert('Please enter a valid email address');
        this.$refs.emailInput.focus();
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          this.errorMessage = data.message;
        } else {
          this.errorMessage = '';
          this.$router.push('/dashboard');
        }
      } catch (error) {
        this.errorMessage = 'Server error. Please try again later.';
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
#loginTitle {
  text-align: center;
}

#createAccountLink {
  font-size: 90%;
  margin-top: 2%;
}

.login-container {
  margin-top: 50px;
}

#createAccountLink a {
  text-decoration: none;
  color: #1976d2;
}
</style>
