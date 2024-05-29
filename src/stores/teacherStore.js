import { defineStore } from "pinia";
import { ref } from "vue";

export const useTeacherStore = defineStore("teacher", () => {
  const teachers = ref([]);

  const addTeacher = (teacher) => {
    teachers.value.push(teacher);
  };

  const updateTeacher = (teacher) => {
    const index = teachers.value.findIndex(
      (t) => t.nationalId === teacher.nationalId
    );
    if (index !== -1) {
      teachers.value[index] = teacher;
    }
  };

  const deleteTeacher = (nationalId) => {
    teachers.value = teachers.value.filter((t) => t.nationalId !== nationalId);
  };

  return {
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
  };
});
