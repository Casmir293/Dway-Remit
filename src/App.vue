<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Teacher and Student Management</h1>
    <TeacherForm />
    <TeacherList />
    <hr class="my-8">
    <StudentForm />
    <StudentList />
  </div>
</template>

<script setup>
import TeacherForm from './components/TeacherForm.vue';
import TeacherList from './components/TeacherList.vue';
import StudentForm from './components/StudentForm.vue';
import StudentList from './components/StudentList.vue';
</script>

<style></style>
