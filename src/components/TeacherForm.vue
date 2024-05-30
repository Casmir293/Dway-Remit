<template>
  <div class="mb-4">
    <h2 class="text-xl font-semibold mb-2">Teachers Section</h2>
    <form @submit.prevent="submitForm">
      <div class="grid grid-cols-2 items-start gap-4 mb-6">
        <InputField
          label="National ID"
          class=""
          v-model="formValues.nationalId"
          placeholder="Enter your National ID"
          type="number"
          maxlength="5"
          :error="nationalIdError"
          required
        />

        <div>
          <p class="mb-1 text-sm font-medium">
            Title <span class="text-red-500">*</span>
          </p>
          <select
            v-model="formValues.title"
            required
            class="border h-12 outline-green-400 text-gray-500 px-3 rounded-lg"
          >
            <option disabled value="">--Choose title--</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Miss</option>
            <option>Dr</option>
            <option>Prof</option>
          </select>
        </div>

        <InputField
          label="First Name"
          v-model="formValues.name"
          placeholder="Enter your firstname"
          :error="nameError"
          required
        />

        <InputField
          label="Last Name"
          v-model="formValues.surname"
          placeholder="Enter your lastname"
          :error="surnameError"
          required
        />

        <InputField
          label="DOB"
          v-model="formValues.dob"
          placeholder="Enter your Date of Birth"
          type="date"
          :error="dobError"
          required
        />

        <InputField
          label="Contact"
          v-model="formValues.teacherNumber"
          placeholder="Enter your Phone Number"
          type="number"
          :error="teacherNumberError"
          required
        />
      </div>

      <InputField
        label="Salary (optional)"
        v-model="formValues.salary"
        placeholder="Enter your Salary"
        type="number"
      />

      <div class="flex gap-3 justify-end mt-8">
        <BasicButton
          :label="isEditing ? 'Update Teacher' : 'Save Teacher'"
          type="submit"
          :loading="loading"
          class="w-full lg:w-[50%]"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useMainStore } from "../stores/mainStore";
import InputField from "./components/InputField.vue";
import BasicButton from "./components/BasicButton.vue";
//import { useToast } from 'vue-toastification'; //NB install later for toast notifications

const loading = ref(false);
const nationalIdError = ref("");
const nameError = ref("");
const surnameError = ref("");
const dobError = ref("");
const teacherNumberError = ref("");
const store = useMainStore();
const teacher = ref({
  nationalId: "",
  title: "",
  name: "",
  surname: "",
  dob: "",
  teacherNumber: "",
  salary: "",
});

//Editing logic
const props = defineProps({
  isTeacher: Boolean,
  initialValues: Object,
  isEditing: Boolean,
  index: Number,
});
const emit = defineEmits(["formSubmitted"]);
const formValues = ref({ ...props.initialValues });

watch(
  () => props.initialValues,
  (newValues) => {
    formValues.value = { ...newValues };
  }
);

// Form Validation
const validateForm = () => {
  nationalIdError.value = "";
  nameError.value = "";
  surnameError.value = "";
  dobError.value = "";
  teacherNumberError.value = "";

  let isValid = true;

  if (!formValues.value.nationalId) {
    nationalIdError.value = "National ID is required";
    isValid = false;
  } else if (!formValues.value.name) {
    nameError.value = "First name is required";
    isValid = false;
  } else if (!formValues.value.surname) {
    surnameError.value = "Last name is required";
    isValid = false;
  } else if (!formValues.value.dob) {
    dobError.value = "Date of birth is required";
    isValid = false;
  } else if (!formValues.value.teacherNumber) {
    teacherNumberError.value = "Contact is required";
    isValid = false;
  }

  const age =
    new Date().getFullYear() - new Date(teacher.value.dob).getFullYear();
  if (age < 21) {
    dobError.value = "Teacher must be at least 21 years old.";
    return;
  }

  return isValid;
};

// Form Submission
const submitForm = () => {
  if (!validateForm()) return false;

  try {
    loading.value = false;

    if (props.isEditing) {
      store.editTeacher(props.index, { ...formValues.value });
    } else {
      store.addTeacher({ ...formValues.value });
    }
    // store.addTeacher({ ...teacher.value });
    formValues.value = {
      nationalId: "",
      title: "",
      name: "",
      surname: "",
      dob: "",
      teacherNumber: "",
      salary: "",
    };
    emit("formSubmitted");
  } catch (error) {
    console.error("Error adding teacher:", error);
  } finally {
    loading.value = false;
  }
};
</script>
