<template>
  <v-container class="py-8">
    <v-card class="pa-6 rounded-xl" elevation="6" color="blue-grey-lighten-5">
      <v-card-title class="text-h5 font-weight-bold text-blue">🏋️‍♂️ Create a Session</v-card-title>
      <v-divider class="my-4"></v-divider>

      <v-form @submit.prevent="addSession" class="d-flex flex-column gap-4">
        <v-text-field v-model="SessionName" label="Session Name" variant="outlined" color="blue" required />
        <v-text-field v-model="SessionDesc" label="Description" variant="outlined" color="blue" />

        <v-select
            v-model="sportChoice"
            :items="sportChoiceList"
            label="Sport Choice"
            variant="outlined"
            color="orange"
            solo
            chips
        />

        <div v-if="sportChoice === 'Fitness'" class="d-flex flex-column gap-4">
          <v-divider></v-divider>
          <h3 class="text-subtitle-1 font-weight-bold text-blue-darken-2">💪 Exercises</h3>

          <div v-for="(ex, index) in exercises" :key="index" class="d-flex flex-wrap gap-4">
            <v-select
                v-model="ex.name"
                :items="exercisesChoiceList"
                label="Exercise Choice"
                variant="outlined"
                color="orange"
                solo
                chips
            />
            <v-text-field v-model.number="ex.weight" label="Weight (kg)" type="number" color="blue" variant="outlined" class="w-32" />
            <v-text-field v-model.number="ex.reps" label="Repetitions" type="number" color="blue" variant="outlined" class="w-32" />
            <v-text-field v-model.number="ex.sets" label="Sets" type="number" color="blue" variant="outlined" class="w-32" />
          </div>

          <v-btn @click="addExercise" color="blue-darken-2" variant="text">+ Add an exercise</v-btn>
        </div>

        <!-- Autres sports : Ajout d'intervalles -->
        <div v-if="['Running', 'Biking', 'Swimming'].includes(sportChoice)" class="d-flex flex-column gap-4">
          <v-divider></v-divider>
          <h3 class="text-subtitle-1 font-weight-bold text-orange-darken-3">🏃‍♂️ Intervals</h3>

          <div v-for="(interval, index) in intervals" :key="index" class="d-flex flex-wrap gap-4">

            <v-text-field v-model="interval.duration" label="Duration (min)" type="number" color="orange" variant="outlined" class="w-32" />
            <v-text-field v-model="interval.pace" label="Pace" color="orange" variant="outlined" class="flex-1" />
          </div>

          <v-btn @click="addInterval" color="orange-darken-2" variant="text">+ Add an interval</v-btn>
        </div>

        <v-btn
            type="submit"
            color="orange-darken-2"
            class="mt-2"
            size="large"
            rounded
            elevation="2"
        >
          ➕ Add Session
        </v-btn>
      </v-form>
    </v-card>

    <!-- Liste des sessions -->
    <v-card
        v-if="SessionList.length"
        class="mt-10 pa-6 rounded-xl"
        elevation="4"
        color="indigo-lighten-5"
    >
      <v-card-title class="text-h6 font-weight-bold text-indigo-darken-2">
        📋 Session List to add
      </v-card-title>
      <v-divider class="my-3"></v-divider>
      <v-list density="comfortable">
        <v-list-item v-for="(ex, index) in SessionList" :key="index" class="rounded-lg my-2">
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold text-blue-darken-3">
              {{ ex.name }}
            </v-list-item-title>

            <div class="text-body-2 mb-2">
              {{ ex.description }}<br />
              <span class="text-orange-darken-2">({{ ex.sportChoice }})</span>
            </div>

            <div v-if="ex.sportChoice === 'Fitness'" class="text-body-2">
              <strong>Exercises:</strong>
              <ul class="pl-4">
                <li v-for="(e, i) in ex.exercises" :key="i">
                  {{ e.name }} – {{ e.weight }}kg × {{ e.reps }} reps × {{ e.sets }} sets
                </li>
              </ul>
            </div>

            <div v-if="['Running', 'Biking', 'Swimming'].includes(ex.sportChoice)" class="text-body-2">
              <strong>Intervals:</strong>
              <ul class="pl-4">
                <li v-for="(i, idx) in ex.intervals" :key="idx">
                  {{ i.duration }} min at {{ i.pace }}
                </li>
              </ul>
            </div>
          </v-list-item-content>

          <v-icon icon="mdi-delete" size="30" class="text-red-darken-2 cursor-pointer" @click="confirmDelete(index)" />
        </v-list-item>
      </v-list>
    </v-card>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm deleting</v-card-title>
        <v-card-text>Are you sure you want to delete this Session?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="red" text @click="deleteSession">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import getSessionToken from '@/utils/auth'
import { ref, onMounted } from 'vue'

const SessionName = ref('')
const SessionDesc = ref('')
const SessionList = ref([])

const sportChoiceList = ['Fitness', 'Biking', 'Running', 'Swimming']
const sportChoice = ref('')
const exercisesChoiceList = ref([])
const exerciseChoice = ref('')

const exercises = ref([])
const intervals = ref([])

const dialog = ref(false)
const SessionToDeleteIndex = ref(null)
const dialogAddSession = ref(false)

function addExercise() {
  exercises.value.push({ name: '', weight: 0, reps: 10, sets: 3 })
}

function addInterval() {
  intervals.value.push({ duration: 5, pace: '' })
}

async function addSession() {
  const sessionData = {
    name: SessionName.value,
    description: SessionDesc.value,
    sportChoice: sportChoice.value,
    exercises: [],
    intervals: []
  }

  if (sportChoice.value === 'Fitness') {
    sessionData.exercises = [...exercises.value]
    await sendSessionToDatabase(sessionData)
  } else if (['Running', 'Biking', 'Swimming'].includes(sportChoice.value)) {
    sessionData.intervals = [...intervals.value]
  }

  SessionList.value.push(sessionData)

  SessionName.value = ''
  SessionDesc.value = ''
  sportChoice.value = ''
  exercises.value = []
  intervals.value = []
}

function confirmDelete(index) {
  SessionToDeleteIndex.value = index
  dialog.value = true
}

function deleteSession() {
  if (SessionToDeleteIndex.value !== null) {
    SessionList.value.splice(SessionToDeleteIndex.value, 1)
    SessionToDeleteIndex.value = null
    dialog.value = false
  }
}

function cancelDelete() {
  SessionToDeleteIndex.value = null
  dialog.value = false
}

async function fetchExercises() {
  try {
    const response = await fetch('http://localhost:3000/api/exercises')
    const data = await response.json()
    exercisesChoiceList.value = data
  } catch (error) {
    console.error('Error while loading exercises :', error)
  }
}

onMounted(() => {
  fetchExercises()
})

async function sendSessionToDatabase(sessionData) {
  const userToken = getSessionToken()

  if (userToken !== null) {
    if (sessionData && sessionData.exercises && sessionData.exercises.length > 0) {
      const payload = {
        sessionId: userToken,
        name: sessionData.name,
        note: sessionData.description,
        sportChoice: sessionData.sportChoice,
        exercises: sessionData.exercises.map(ex => ({
          name: ex.name,
          sets: [
            {
              set_type: 'standard',
              repetitions: ex.reps,
              duration: null,
              rest_time: null,
              weight: ex.weight
            }
          ]
        }))
      }

      console.log('Sending session payload:', payload)

      try {
        const response = await fetch('http://localhost:3000/api/addFitnessSession', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        console.log('Session saved successfully:', result)
      } catch (error) {
        console.error('Error while saving session:', error)
      }
    } else {
      console.warn('No exercises to save in session')
    }
  } else {
    alert('Session expired. Please reconnect')
  }

  dialogAddSession.value = false
}

defineExpose({
  SessionList
})
</script>

