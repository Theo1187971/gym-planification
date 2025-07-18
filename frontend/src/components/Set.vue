<template>
    <tr v-if="weight" :key="set.set_id">
        <td>{{ set.setType.name }}</td>
        <td>{{ set.note || '-' }}</td>
        <td>{{ set.weightSet.repetitions }}</td>
        <td>{{ set.weightSet.weight }}</td>
    </tr>
    <tr v-else>
        <td>{{ set.setType.name }}</td>
        <td>{{ set.note || '-' }}</td>
        <td>{{ set.timeSet.minutes }}</td>
        <td>{{ set.timeSet.value }}</td>
        <td>{{ set.timeSet.unit }}</td>
    </tr>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  set: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true
  }
})

const weight = computed(() => props.type === "weight")
</script>