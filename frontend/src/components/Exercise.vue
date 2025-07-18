<template>
    <h2>{{ exercise.exerciseDefinition.name }}</h2>
    <p>{{ exercise.note }}</p>

    <v-table v-if="weightExercise">
        <thead>
            <tr>
                <th>Type</th>
                <th>Note</th>
                <th>Reps</th>
                <th>Weight (kg)</th>
            </tr>
        </thead>
        <tbody>
            <Set v-for="set in exercise.sets" :set="set" type="weight"></Set>
        </tbody>
    </v-table>

    <v-table v-else>
        <thead>
            <tr>
                <th>Type</th>
                <th>Note</th>
                <th>Minutes</th>
                <th>Value</th>
                <th>Unit</th>
            </tr>
        </thead>
        <tbody>
            <Set v-for="set in exercise.sets" :set="set" type="time"></Set>
        </tbody>
    </v-table>

    <br>
</template>

<script setup>
import { computed } from 'vue'
import Set from './Set.vue'

const props = defineProps({
  exercise: {
    type: Object,
    required: true,
  }
})

const weightExercise = computed(() =>
    props.exercise.exerciseDefinition.exerciseCategory.name === "Weight exercise"
)
</script>
