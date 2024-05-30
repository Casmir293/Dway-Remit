<template>
  <div class="mb-4">
    <h2 class="text-xl font-semibold mb-2">Students Section</h2>
    <form @submit.prevent="submitForm">
      <div class="grid grid-cols-2 gap-4">
        <input
          v-model="student.nationalId"
          placeholder="National ID"
          required
        />
        <input v-model="student.name" placeholder="Name" required />
        <input v-model="student.surname" placeholder="Surname" required />
        <input v-model="student.dob" type="date" required />
        <input
          v-model="student.studentNumber"
          placeholder="Student Number"
          required
        />
      </div>
      <button type="submit" class="mt-2 p-2 bg-green-500 text-white">
        Save Student
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMainStore } from "../stores/mainStore";

const store = useMainStore();
const student = ref({
  nationalId: "",
  name: "",
  surname: "",
  dob: "",
  studentNumber: "",
});

const submitForm = () => {
  const age =
    new Date().getFullYear() - new Date(student.value.dob).getFullYear();
  if (age > 22) {
    alert("Student must be at most 22 years old.");
    return;
  }
  store.addStudent({ ...student.value });
  // Clear the form
  student.value = {
    nationalId: "",
    name: "",
    surname: "",
    dob: "",
    studentNumber: "",
  };
};
</script>
