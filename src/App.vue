<template>
  <div class="container mx-auto">
    <h1 class="text-lg font-bold mb-4 text-center bg-green-100 p-4 lg:py-8 lg:text-2xl">📚 My School Portal</h1>
    <section class="sm:mx-32 lg:mx-80 px-4 shadow-2xl pb-5 sm:p-6 sm:rounded-lg">
      <TeacherForm />
      <TeacherList />
      <!-- <hr class="my-8">
      <StudentForm />
      <StudentList /> -->
    </section>
  </div>
</template>

<script setup>
import TeacherForm from './components/TeacherForm.vue';
import TeacherList from './components/TeacherList.vue';
import StudentForm from './components/StudentForm.vue';
import StudentList from './components/StudentList.vue';
</script>

<style></style>
