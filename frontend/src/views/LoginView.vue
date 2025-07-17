<template>
  <div class="login-container">
    <h2 id="loginTitle">Open your locker</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email Address:</label>
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
        <ul class="password-checks">
          <p> You password must contains : </p>
          <li :class="{ valid: passwordChecks.length }">At least 8 characters</li>
          <li :class="{ valid: passwordChecks.hasUppercase }">At least one uppercase letter</li>
          <li :class="{ valid: passwordChecks.hasLowercase }">At least one lowercase letter</li>
          <li :class="{ valid: passwordChecks.hasDigit }">At least one number</li>
          <li :class="{ valid: passwordChecks.hasSpecialChar }">At least one special character</li>
        </ul>
      </div>
      <button type="submit" :disabled="!isPasswordValid" id="loginButton">Login</button>
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
      <h3 id="createAccountLink">
        Not registered yet ?
        <router-link to="/signup">Create your locker by clicking here</router-link>
      </h3>

    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
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
#loginTitle {
  text-align: center;
}

#createAccountLink {
  font-size: 90%;
  margin-top: 2%;
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

.login-container {
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

#loginButton {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

#loginButton:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>