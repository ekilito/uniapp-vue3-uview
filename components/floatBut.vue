<template>
	<uni-fab ref="fab" :pattern="pattern"  :horizontal="horizontal" :vertical="vertical" :direction="direction" @trigger="trigger" @fabClick="emit('touch')" />
</template>

<script setup>
import { defineEmits, ref } from 'vue';
const pattern = ref({
	color: '#7A7E83',
	backgroundColor: '#fff',
	selectedColor: '#007AFF',
	buttonColor: '#007AFF',
	iconColor: '#fff'
});

const vertical = ref('bottom');
const direction = ref('horizontal');
const horizontal = ref('right');
const emit = defineEmits(['touch']);
</script>

<style></style>
