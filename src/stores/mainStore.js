import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("main", () => {
  const teachers = ref([]);
  const students = ref([]);

  const addTeacher = (teacher) => {
    teachers.value.push(teacher);
  };

  const addStudent = (student) => {
    students.value.push(student);
  };

  const editTeacher = (index, updatedTeacher) => {
    teachers.value[index] = updatedTeacher;
  };

  const editStudent = (index, updatedStudent) => {
    students.value[index] = updatedStudent;
  };

  const deleteTeacher = (index) => {
    teachers.value.splice(index, 1);
  };

  const deleteStudent = (index) => {
    students.value.splice(index, 1);
  };

  return {
    teachers,
    students,
    addTeacher,
    addStudent,
    editTeacher,
    editStudent,
    deleteTeacher,
    deleteStudent,
  };
});
