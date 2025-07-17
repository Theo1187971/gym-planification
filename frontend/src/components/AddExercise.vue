<template>
  <v-container class="py-8">
    <v-card class="pa-6 rounded-xl" elevation="6" color="blue-grey-lighten-5">
      <v-card-title class="text-h5 font-weight-bold text-blue">🏋️‍♂️ Create an Exercise</v-card-title>

      <v-divider class="my-4"></v-divider>

      <v-form @submit.prevent="addExercise" class="d-flex flex-column gap-4">
        <v-text-field
          v-model="exerciseName"
          label="Exercise Name"
          variant="outlined"
          color="blue"
          required
        />

        <v-text-field
          v-model="exerciseDesc"
          label="Description"
          variant="outlined"
          color="blue"
        />

        <v-select
          v-model="category"
          :items="categoryList"
          label="Category"
          variant="outlined"
          color="orange"
          chips
        />

        <v-select
          v-model="bodyParts"
          :items="bodyPartsList"
          label="Body Parts"
          variant="outlined"
          color="orange"
          multiple
          chips
        />

        <v-btn
          type="submit"
          color="orange-darken-2"
          class="mt-2"
          size="large"
          rounded
          elevation="2"
        >
          ➕ Add Exercise
        </v-btn>
      </v-form>
    </v-card>

    <v-card
      v-if="exerciseList.length"
      class="mt-10 pa-6 rounded-xl"
      elevation="4"
      color="indigo-lighten-5"
    >
      <v-card-title class="text-h6 font-weight-bold text-indigo-darken-2">
        📋 Exercise List to add
      </v-card-title>
      <v-divider class="my-3"></v-divider>
      <v-list density="comfortable">
        <v-list-item
          v-for="(ex, index) in exerciseList"
          :key="index"
          class="rounded-lg my-2"
        >
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold text-blue-darken-3">
            {{ ex.name }}
          </v-list-item-title>

          <div class="d-flex justify-space-between align-center">
            <div class="text-body-2">
              {{ ex.description }} <br />
              {{ ex.category }} <br />
              <span class="text-orange-darken-2">
                ({{ ex.bodyParts.join(', ') }})
              </span>
            </div>

            <v-icon icon="mdi-delete" size="30" class="text-red-darken-2 cursor-pointer" @click="confirmDelete(index)"></v-icon>
          </div>
        </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">
          Confirm deleting
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete this exercise?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="red" text @click="deleteExercise">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, shallowRef } from 'vue'

const exerciseName = ref('')
const exerciseDesc = ref('')
const exerciseList = ref([])

const bodyPartsList = ["Back", "Chest", "Legs", "Arms", "Shoulders"]
const bodyParts = shallowRef([])

const categoryList = ["Timed exercise", "Weight exercise"]
const category = ref('')

const dialog = ref(false);
const exerciseToDeleteIndex = ref(null);

function addExercise() {
  exerciseList.value.push({
    name: exerciseName.value,
    description: exerciseDesc.value,
    category: category.value,
    bodyParts: [...bodyParts.value]
  })

  exerciseName.value = ''
  exerciseDesc.value = ''
  category.value = ''
  bodyParts.value = []
}

function confirmDelete (index) {
  exerciseToDeleteIndex.value = index;
  dialog.value = true;
}

function deleteExercise(){
  if (exerciseToDeleteIndex.value !== null) {
    exerciseList.value.splice(exerciseToDeleteIndex.value, 1);
    exerciseToDeleteIndex.value = null;
    dialog.value = false;
  }
}

function cancelDelete(){
  exerciseToDeleteIndex.value = null;
  dialog.value = false;
}

defineExpose({
  exerciseList
})
</script>
