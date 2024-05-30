<template>
  <div class="container mx-auto">
    <h1
      class="text-lg font-bold mb-4 text-center bg-green-100 p-4 lg:py-8 lg:text-2xl"
    >
      📚 My School Portal
    </h1>
    <section
      class="sm:mx-32 lg:mx-80 px-4 shadow-2xl pb-5 sm:p-6 sm:rounded-lg"
    >
      <TeacherForm
        :isTeacher="true"
        formTitle="Teacher"
        :initialValues="currentTeacher"
        :isEditing="isEditingTeacher"
        :index="editTeacherIndex"
        @formSubmitted="resetFormState"
      />

      <TeacherList :isTeacher="true" @editPerson="handleEditTeacher" />
      <!-- <hr class="my-8">
      <StudentForm />
      <StudentList /> -->
    </section>
  </div>
</template>

<script setup>
import TeacherForm from "./components/TeacherForm.vue";
import TeacherList from "./components/TeacherList.vue";
import StudentForm from "./components/StudentForm.vue";
import StudentList from "./components/StudentList.vue";
import { ref } from "vue";
import { useMainStore } from "./stores/mainStore.js";

const store = useMainStore();

const currentTeacher = ref({
  nationalId: "",
  title: "",
  name: "",
  surname: "",
  dob: "",
  teacherNumber: "",
  salary: "",
});
const currentStudent = ref({
  nationalId: "",
  name: "",
  surname: "",
  dob: "",
  studentNumber: "",
});
const isEditingTeacher = ref(false);
const isEditingStudent = ref(false);
const editTeacherIndex = ref(null);
const editStudentIndex = ref(null);

const resetFormState = () => {
  isEditingTeacher.value = false;
  isEditingStudent.value = false;
  currentTeacher.value = {
    nationalId: "",
    title: "",
    name: "",
    surname: "",
    dob: "",
    teacherNumber: "",
    salary: "",
  };
  currentStudent.value = {
    nationalId: "",
    name: "",
    surname: "",
    dob: "",
    studentNumber: "",
  };
  editTeacherIndex.value = null;
  editStudentIndex.value = null;
};

const handleEditTeacher = (index) => {
  currentTeacher.value = { ...store.teachers[index] };
  isEditingTeacher.value = true;
  editTeacherIndex.value = index;
};
</script>
