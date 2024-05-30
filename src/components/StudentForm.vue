<template>
  <div class="mb-4">
    <h2 class="text-xl font-semibold mb-2">Students Section</h2>
    <form @submit.prevent="submitForm">
      <div class="grid grid-cols-2 items-start gap-4 mb-6">
        <InputField
          label="National ID"
          class=""
          v-model="student.nationalId"
          placeholder="Enter your National ID"
          type="number"
          maxlength="5"
          :error="nationalIdError"
          required
        />

        <InputField
          label="First Name"
          v-model="student.name"
          placeholder="Enter your firstname"
          :error="nameError"
          required
        />

        <InputField
          label="Last Name"
          v-model="student.surname"
          placeholder="Enter your lastname"
          :error="surnameError"
          required
        />

        <InputField
          label="DOB"
          v-model="student.dob"
          placeholder="Enter your Date of Birth"
          type="date"
          :error="dobError"
          required
        />

        <InputField
          label="Contact"
          v-model="student.studentNumber"
          placeholder="Enter your Phone Number"
          type="number"
          :error="studentNumberError"
          required
        />
      </div>

      <div class="flex gap-3 justify-end mt-8">
        <BasicButton
          label="Save Student"
          type="submit"
          :loading="loading"
          class="w-full lg:w-[50%]"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMainStore } from "../stores/mainStore";
import InputField from "./components/InputField.vue";
import BasicButton from "./components/BasicButton.vue";
import { useToast } from "vue-toastification";

const loading = ref(false);
const nationalIdError = ref("");
const nameError = ref("");
const surnameError = ref("");
const dobError = ref("");
const studentNumberError = ref("");
const store = useMainStore();
const toast = useToast();
const student = ref({
  nationalId: "",
  name: "",
  surname: "",
  dob: "",
  studentNumber: "",
});

// Form Validation
const validateForm = () => {
  nationalIdError.value = "";
  nameError.value = "";
  surnameError.value = "";
  dobError.value = "";
  studentNumberError.value = "";

  let isValid = true;

  if (!student.value.nationalId) {
    nationalIdError.value = "National ID is required";
    isValid = false;
  } else if (!student.value.name) {
    nameError.value = "First name is required";
    isValid = false;
  } else if (!student.value.surname) {
    surnameError.value = "Last name is required";
    isValid = false;
  } else if (!student.value.dob) {
    dobError.value = "Date of birth is required";
    isValid = false;
  } else if (!student.value.studentNumber) {
    studentNumberError.value = "Contact is required";
    isValid = false;
  }

  const age =
    new Date().getFullYear() - new Date(student.value.dob).getFullYear();
  if (age > 22) {
    dobError.value = "Student must be at most 22 years old";
    return;
  }

  return isValid;
};

// Form Submission
const submitForm = () => {
  if (!validateForm()) return false;

  try {
    loading.value = true;
    store.addStudent({ ...student.value });
    toast.success("Student added successfully", {
      timeout: 2000,
    });
  } catch (error) {
    toast.error("Error:", error, {
      timeout: 4000,
    });
  } finally {
    loading.value = false;
    student.value = {
      nationalId: "",
      name: "",
      surname: "",
      dob: "",
      studentNumber: "",
    };
  }
};
</script>
