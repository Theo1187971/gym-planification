<template>
    <tr :key="set.set_id">
        <td>{{ set.setType.name }}</td>
        <td>{{ set.note || '-' }}</td>
        <td>{{ set.weightSet.repetitions }}</td>
        <td>{{ set.weightSet.weight }}</td>
    </tr>
</template>

<script setup>
defineProps({
  set: {
    type: Object,
    required: true,
  }
})
</script>