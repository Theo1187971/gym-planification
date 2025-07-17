<template>
    <div v-if="workout">
        <h1>{{ workout.name }}</h1>
        <p>{{ workout.note || '-' }}</p>

        <br>

        <Exercise v-for="exercise in workout.exercises" :exercise="exercise" />
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script setup>
import Exercise from './Exercise.vue'
defineProps({
    workout: {
        type: Object,
        required: true,
    }
})
</script>