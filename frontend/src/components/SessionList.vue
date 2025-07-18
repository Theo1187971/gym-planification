<template>
  <v-card
      v-if="sessions.length"
      class="mt-10 pa-6 rounded-xl"
      elevation="4"
      color="indigo-lighten-5"
  >
    <v-card-title class="text-h6 font-weight-bold text-indigo-darken-2">
      📋 Session List
    </v-card-title>
    <v-divider class="my-3"></v-divider>

    <v-list density="comfortable">
      <v-list-item
          v-for="(session, index) in sessions"
          :key="index"
          class="rounded-lg my-2"
      >
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold text-blue-darken-3">
            {{ session.name }}
          </v-list-item-title>

          <div class="text-body-2 mb-2">
            {{ session.description }}<br />
            <span class="text-orange-darken-2">({{ session.sportChoice }})</span>
          </div>

          <div v-if="session.sportChoice === 'Fitness'" class="text-body-2">
            <strong>Exercises:</strong>
            <ul class="pl-4">
              <li
                  v-for="(e, i) in session.exercises"
                  :key="i"
              >
                {{ e.name }} – {{ e.weight }}kg × {{ e.reps }} reps × {{ e.sets }} sets
              </li>
            </ul>
          </div>

          <div v-if="['Running', 'Biking', 'Swimming'].includes(session.sportChoice)" class="text-body-2">
            <strong>Intervals:</strong>
            <ul class="pl-4">
              <li
                  v-for="(i, idx) in session.intervals"
                  :key="idx"
              >
                {{ i.duration }} min at {{ i.pace }}
              </li>
            </ul>
          </div>
        </v-list-item-content>

        <v-icon
            icon="mdi-delete"
            size="30"
            class="text-red-darken-2 cursor-pointer"
            @click="$emit('delete-session', index)"
        />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
defineProps({
  sessions: {
    type: Array,
    required: true
  }
})

defineEmits(['delete-session'])
</script>
