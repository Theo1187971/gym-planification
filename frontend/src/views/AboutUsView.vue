<script setup>
import { ref, onMounted } from 'vue'

const imageUrl = ref('')

function getRandomImage() {
  const timestamp = new Date().getTime()
  imageUrl.value = `http://localhost:3000/api/about-us/random-image?t=${timestamp}`
}

onMounted(() => {
  getRandomImage()
})
</script>

<template>
  <v-container class="py-8">
    <v-card
      class="pa-6 rounded-xl"
      elevation="6"
      color="blue-grey-lighten-5"
    >
      <v-card-title class="text-h5 font-weight-bold text-blue">
        About Us
      </v-card-title>

      <v-divider class="my-4" />

      <v-sheet
        class="pa-4 mb-6 rounded-lg"
        elevation="2"

      >
        <p class="text-subtitle-1 ma-0 justify-text" style="color: #3c4043;">
          We are Theo, Matheo, Costin, and Nolan, French ESIEA students passionate about building modern web applications.<br /><br />
          As part of our Web Programming course, we developed a full-stack gym planning application. It allows users to create personalized workout sessions, manage exercises, and visualize their training plans through an intuitive and dynamic interface.
        </p>
      </v-sheet>

      <div
        class="pa-4 d-flex flex-column align-center rounded-lg"
      >
        <v-img
          v-if="imageUrl"
          :src="imageUrl"
          height="300"
          width="300"
          class="mb-4 rounded-lg elevation-4"
          cover
        />
        <v-btn
          class="mt-2"
          size="large"
          rounded
          elevation="2"
          @click="getRandomImage"
        >
          Change image
        </v-btn>
    </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.justify-text {
  text-align: justify;
}
</style>
