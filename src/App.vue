<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Teacher and Student Management</h1>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Add or Edit Teacher</h2>
      <TeacherForm @save="handleSaveTeacher" :teacherData="selectedTeacher" />
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Teachers List</h2>
      <TeacherList :teachers="teachers" @edit="handleEditTeacher" @delete="handleDeleteTeacher" />
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Add or Edit Student</h2>
      <StudentForm @save="handleSaveStudent" :studentData="selectedStudent" />
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-2">Students List</h2>
      <StudentList :students="students" @edit="handleEditStudent" @delete="handleDeleteStudent" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTeacherStore } from './stores/teacherStore'
import { useStudentStore } from './stores/studentStore'
import TeacherForm from './components/TeacherForm.vue'
import TeacherList from './components/TeacherList.vue'
import StudentForm from './components/StudentForm.vue'
import StudentList from './components/StudentList.vue'


const teacherStore = useTeacherStore()
const studentStore = useStudentStore()

const selectedTeacher = ref(null)
const selectedStudent = ref(null)

const handleSaveTeacher = (teacher) => {
  if (selectedTeacher.value) {
    teacherStore.updateTeacher(teacher)
  } else {
    teacherStore.addTeacher(teacher)
  }
  selectedTeacher.value = null
}

const handleEditTeacher = (teacher) => {
  selectedTeacher.value = { ...teacher }
}

const handleDeleteTeacher = (nationalId) => {
  teacherStore.deleteTeacher(nationalId)
}

const handleSaveStudent = (student) => {
  if (selectedStudent.value) {
    studentStore.updateStudent(student)
  } else {
    studentStore.addStudent(student)
  }
  selectedStudent.value = null
}

const handleEditStudent = (student) => {
  selectedStudent.value = { ...student }
}

const handleDeleteStudent = (nationalId) => {
  studentStore.deleteStudent(nationalId)
}
</script>

<style></style>
