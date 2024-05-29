<template>
    <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Teachers Portal</h2>
        <form @submit.prevent="submitForm">
            <div class="grid grid-cols-2 gap-4">
                <input v-model="teacher.nationalId" placeholder="National ID" required>
                <select v-model="teacher.title" required>
                    <option disabled value="">Title</option>
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Miss</option>
                    <option>Dr</option>
                    <option>Prof</option>
                </select>
                <input v-model="teacher.name" placeholder="Name" required>
                <input v-model="teacher.surname" placeholder="Surname" required>
                <input v-model="teacher.dob" type="date" required>
                <input v-model="teacher.teacherNumber" placeholder="Teacher Number" required>
                <input v-model="teacher.salary" placeholder="Salary" type="number">
            </div>
            <button type="submit" class="mt-2 p-2 bg-blue-500 text-white">Save Teacher</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMainStore } from '../stores/mainStore';
//import { useToast } from 'vue-toastification'; // Optional for toast notifications

const store = useMainStore();
const teacher = ref({ nationalId: '', title: '', name: '', surname: '', dob: '', teacherNumber: '', salary: '' });

const submitForm = () => {
    const age = new Date().getFullYear() - new Date(teacher.value.dob).getFullYear();
    if (age < 21) {
        alert('Teacher must be at least 21 years old.');
        return;
    }
    store.addTeacher({ ...teacher.value });
    // Clear the form
    teacher.value = { nationalId: '', title: '', name: '', surname: '', dob: '', teacherNumber: '', salary: '' };
};
</script>
