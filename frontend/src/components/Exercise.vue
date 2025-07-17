<template>
    
    <h1>{{ exercise.exerciseDefinition.name }}</h1>
    <p>{{ exercise.note }}</p>

    <v-table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Note</th>
            <th>Reps</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
            <Set v-for="set in exercise.sets" :set="set"></Set>
        </tbody>
    </v-table>

    <br>
</template>

<script setup>
import Set from './Set.vue'
defineProps({
  exercise: {
    type: Object,
    required: true,
  }
})
</script>
