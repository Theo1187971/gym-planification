<template>
  <div class="signup-container">
    <h2 id="signUpTitle">Create your locker</h2>
    <form @submit.prevent="handleSignUp">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="usernameInput" ref="usernameInput" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="firstname">FirstName:</label>
        <input type="text" id="firstnameInput" ref="firstnameInput" v-model="firstname" required>
        <label for="lastname">Lastname:</label>
        <input type="text" id="lastnameInput" ref="lastnameInput" v-model="lastname" required>
      </div>
      <div class="form-group">
        <label for="mailAddress">Email address:</label>
        <input type="text" id="emailInput" ref="emailInput" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
            type="password"
            id="passwordInput"
            v-model="password"
            required
            ref="passwordInput"
        />
      </div>
      <div class="form-group">
        <label for="password">Confirm password:</label>
        <input
            type="password"
            id="confirmPasswordInput"
            v-model="confirmPassword"
            required
            ref="confirmPasswordInput"
        />
      </div>
      <ul class="password-checks">
        <p> You password must contains : </p>
        <li :class="{ valid: passwordChecks.length }">At least 8 characters</li>
        <li :class="{ valid: passwordChecks.hasUppercase }">At least one uppercase letter</li>
        <li :class="{ valid: passwordChecks.hasLowercase }">At least one lowercase letter</li>
        <li :class="{ valid: passwordChecks.hasDigit }">At least one number</li>
        <li :class="{ valid: passwordChecks.hasSpecialChar }">At least one special character</li>
      </ul>
      <button type="submit" :disabled="!isPasswordValid" id="signUpButton">Sign Up</button>
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
      <h3 id="backToLoginLink">
        <router-link to="/login">← Back to login</router-link>
      </h3>
    </form>
  </div>
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
        alert('Please enter a valid email address');
        this.$refs.emailInput.focus();
        return;
      }
      if (this.password !== this.confirmPassword) {
        alert('The passwords you entered do not match. Please try again.');
        this.$refs.passwordInput.focus();
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
          // this.$router.push('/dashboard'); Redirection
        }
      } catch (error) {
        this.errorMessage = 'Server error. Please try again later.';
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
#signUpTitle {
  text-align: center;
}

.password-checks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
  list-style: none;
  padding: 0;
  margin-top: 10px;
  font-size: 0.8em;
}

.password-checks li {
  color: #d11010;
  margin-bottom: 4px;
  font-weight: bold;
  padding: 5px;
}

.password-checks p {
  grid-column: 1 / -1;
  margin-bottom: 5px;
  font-weight: bold;
}

.password-checks li.valid {
  color: #15c615;
  font-weight: bold;
}

#backToLoginLink {
  font-size: 90%;
  margin-top: 2%;
}

.signup-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

#signUpButton {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

#signUpButton:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>

