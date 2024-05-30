<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
  >
    <div
      class="bg-white text-black flex flex-col rounded-2xl w-full lg:w-[35%] overflow-y-auto hide-scrollbar mx-8 md:mx-20 lg:mx-60 max-h-[calc(100vh-100px)] mt-10 px-6 py-6"
    >
      <div
        class="mb-4 p-2 w-10 h-10 bg-gray-100 rounded-full mx-auto flex items-center justify-center"
      >
        <p>📝</p>
      </div>
      <h2 class="text-xl text-center font-semibold mb-4">{{ title }}</h2>
      <p class="mb-6 text-center text-gray-500">{{ body }}</p>

      <div class="mb-6">
        <InputField
          label="National ID"
          class="mb-5"
          v-model="studentCopy.nationalId"
          placeholder="Enter your National ID"
          type="number"
          :error="nationalIdError"
          required
        />

        <InputField
          label="First Name"
          class="mb-5"
          v-model="studentCopy.name"
          placeholder="Enter your firstname"
          :error="nameError"
          required
        />

        <InputField
          label="Last Name"
          class="mb-5"
          v-model="studentCopy.surname"
          placeholder="Enter your lastname"
          :error="surnameError"
          required
        />

        <InputField
          label="DOB"
          class="mb-5"
          v-model="studentCopy.dob"
          placeholder="Enter your Date of Birth"
          type="date"
          :error="dobError"
          required
        />

        <InputField
          label="Contact"
          class="mb-5"
          v-model="studentCopy.studentNumber"
          placeholder="Enter your Phone Number"
          type="number"
          :error="studentNumberError"
          required
        />
      </div>

      <div class="flex justify-between space-x-4">
        <BasicButton
          @click="handleConfirm"
          :label="confirmLabel"
          class="w-[50%]"
        />
        <BasicButton
          @click="handleCancel"
          :label="cancelLabel"
          class="w-[50%]"
          kind="danger"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch } from "vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "../../stores/mainStore.js";
import BasicButton from "./BasicButton.vue";
import InputField from "./InputField.vue";

const store = useMainStore();
const { students } = storeToRefs(store);
const loading = ref(false);
const nationalIdError = ref("");
const nameError = ref("");
const surnameError = ref("");
const dobError = ref("");
const studentNumberError = ref("");

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  student: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  confirmLabel: {
    type: String,
    default: "Update",
  },
  cancelLabel: {
    type: String,
    default: "Cancel",
  },
});

const emits = defineEmits(["confirm", "cancel"]);

const studentCopy = ref({ ...props.student });

watch(
  () => props.student,
  (newVal) => {
    studentCopy.value = { ...newVal };
  },
  { deep: true }
);

// Form Validation
const validateForm = () => {
  nationalIdError.value = "";
  nameError.value = "";
  surnameError.value = "";
  dobError.value = "";
  studentNumberError.value = "";

  let isValid = true;

  if (!studentCopy.value.nationalId) {
    nationalIdError.value = "National ID is required";
    isValid = false;
  }
  if (!studentCopy.value.name) {
    nameError.value = "First name is required";
    isValid = false;
  }
  if (!studentCopy.value.surname) {
    surnameError.value = "Last name is required";
    isValid = false;
  }
  if (!studentCopy.value.dob) {
    dobError.value = "Date of birth is required";
    isValid = false;
  }
  if (!studentCopy.value.studentNumber) {
    studentNumberError.value = "Contact is required";
    isValid = false;
  }

  const age =
    new Date().getFullYear() - new Date(studentCopy.value.dob).getFullYear();
  if (age > 22) {
    dobError.value = "Student must be at most 22 years old";
    return;
  }

  return isValid;
};

const handleConfirm = () => {
  if (validateForm()) {
    emits("confirm", studentCopy.value);
  }
};

const handleCancel = () => {
  emits("cancel");
};
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
