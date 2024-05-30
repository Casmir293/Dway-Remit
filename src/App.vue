<template>
  <div class="container mx-auto">
    <h1
      class="text-lg font-bold mb-4 text-center bg-green-100 p-4 lg:py-8 lg:text-2xl"
    >
      📚 My School Portal
    </h1>
    <section class="flex justify-center gap-5 mb-5 font-medium">
      <div
        @click="selectSection('teacher')"
        :class="[
          portal === 'teacher'
            ? 'bg-gray-500 rounded-lg text-white shadow-lg'
            : 'opacity-40',
          'p-2 hover:cursor-pointer',
        ]"
      >
        TEACHERS
      </div>
      <div
        @click="selectSection('student')"
        :class="[
          portal === 'student'
            ? 'bg-gray-500 rounded-lg text-white shadow-lg'
            : 'opacity-40',
          'p-2 hover:cursor-pointer',
        ]"
      >
        STUDENTS
      </div>
    </section>

    <section
      class="sm:mx-32 lg:mx-80 px-4 shadow-2xl pb-5 sm:p-6 sm:rounded-lg"
    >
      <section v-if="portal === 'teacher'">
        <TeacherForm />
        <TeacherList />
      </section>

      <section v-if="portal === 'student'">
        <StudentForm />
        <StudentList />
      </section>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TeacherForm from "./components/TeacherForm.vue";
import TeacherList from "./components/TeacherList.vue";
import StudentForm from "./components/StudentForm.vue";
import StudentList from "./components/StudentList.vue";

const isTeacher = ref(true);
const portal = ref("teacher");

const selectSection = (section) => {
  portal.value = section;
};
</script>

<style></style>
