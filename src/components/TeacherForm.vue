<template>
    <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Teachers Portal</h2>
        <form @submit.prevent="submitForm">
            <div class="grid grid-cols-2 items-end gap-4 mb-6">
                <InputField label="National ID" v-model="teacher.nationalId" placeholder="Enter your National ID"
                    type="number" maxlength="5" :error="nationalIdError" required />

                <div>
                    <p class="mb-1 text-sm font-medium">Title <span class="text-red-500">*</span></p>
                    <select v-model="teacher.title" required
                        class="border h-11 outline-green-400 text-gray-500  px-3 rounded-lg  ">
                        <option disabled value="" class="">--Choose title--</option>
                        <option>Mr</option>
                        <option>Mrs</option>
                        <option>Miss</option>
                        <option>Dr</option>
                        <option>Prof</option>
                    </select>
                </div>

                <InputField label="First Name" v-model="teacher.name" placeholder="Enter your firstname"
                    :error="nameError" required />

                <InputField label="Last Name" v-model="teacher.surname" placeholder="Enter your lastname"
                    :error="surnameError" required />

                <InputField label="DOB" v-model="teacher.dob" placeholder="Enter your Date of Birth" type="date"
                    :error="dobError" required />

                <InputField label="Contact" v-model="teacher.teacherNumber" placeholder="Enter your Phone Number"
                    type="number" :error="teacherNumberError" required />

                <InputField label="Salary" v-model="teacher.salary" placeholder="Enter your Salary" type="number"
                    :error="salaryError" required />
            </div>

            <BasicButton label="Save Teacher" type="submit" />
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMainStore } from '../stores/mainStore';
import InputField from './components/InputField.vue'
import BasicButton from './components/BasicButton.vue'
//import { useToast } from 'vue-toastification'; // Optional for toast notifications

const nationalIdError = ref('');
const nameError = ref('');
const surnameError = ref('');
const dobError = ref('');
const teacherNumberError = ref('');
const salaryError = ref('');

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
