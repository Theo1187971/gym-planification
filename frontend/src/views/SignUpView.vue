<template>
  <v-container class="signup-container" max-width="600px">
    <v-card class="pa-4">
      <v-card-title class="justify-center">
        <h2 id="signUpTitle">Create your locker</h2>
      </v-card-title>

      <v-form @submit.prevent="handleSignUp" ref="form">
        <v-text-field
            label="Username"
            v-model="username"
            :rules="[v => !!v || 'Username is required']"
            ref="usernameInput"
            required
        />

        <v-text-field
            label="First name"
            v-model="firstname"
            :rules="[v => !!v || 'First name is required']"
            ref="firstnameInput"
            required
        />

        <v-text-field
            label="Last name"
            v-model="lastname"
            :rules="[v => !!v || 'Last name is required']"
            ref="lastnameInput"
            required
        />

        <v-text-field
            label="Email address"
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

        <v-text-field
            label="Confirm password"
            v-model="confirmPassword"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfirmPassword ? 'text' : 'password'"
            @click:append="showConfirmPassword = !showConfirmPassword"
            ref="confirmPasswordInput"
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
          Sign Up
        </v-btn>

        <v-alert
            v-if="errorMessage"
            type="error"
            dense
            class="mt-3"
        >
          {{ errorMessage }}
        </v-alert>

        <div class="text-center mt-4" id="backToLoginLink">
          <router-link to="/login">← Back to login</router-link>
        </div>
        <div class="text-center mt-4 link">
          More about us?
          <router-link to="/about-us" class="link-a">About us</router-link>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
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
    async handleSignUp() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.$refs.emailInput.focus();
        alert('Please enter a valid email address');
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.$refs.passwordInput.focus();
        alert('The passwords you entered do not match. Please try again.');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          this.errorMessage = data.message;
        } else {
          this.errorMessage = '';
          console.log(data.session_token)
          localStorage.setItem('session_token', data.session_token);
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
.signup-container {
  margin-top: 50px;
}

#backToLoginLink a {
  text-decoration: none;
  color: #1976d2;
}

.createAccountLink {
  font-size: 90%;
  margin-top: 2%;
}

.link-a {
  text-decoration: none;
  color: #1976d2;
}
</style>
