<template>
    <tr :key="set.set_id">
        <td>{{ set.set_type }}</td>
        <td>{{ set.note || '-' }}</td>
        <td>{{ set.repetitions }}</td>
        <td>{{ set.weight }}</td>
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