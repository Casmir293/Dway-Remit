<template>
  <hr class="my-8" />
  <div v-if="store.teachers.length < 1" class="text-center">
    <h2 class="text-xl font-semibold mb-2">No registered teacher yet</h2>
    <p>Start by registering a teacher</p>
  </div>

  <div v-else>
    <h2 class="text-xl font-semibold text-center mb-6 underline">
      Registered Teachers
    </h2>
    <ul>
      <section class="lg:grid-cols-2 gap-3 grid">
        <li v-for="(person, index) in people" :key="index" class="mb-2">
          <div class="border p-4 shadow-lg rounded-lg">
            <p class="mb-2">
              <span class="font-medium">Name</span>: {{ person.title }}
              {{ person.name }} {{ person.surname }}
            </p>
            <p class="mb-2">
              <span class="font-medium">Contact</span>:
              {{ person.teacherNumber }}
            </p>
            <p class="mb-2">
              <span class="font-medium">National ID</span>
              {{ person.nationalId }}
            </p>
            <div class="flex justify-between">
              <p><span class="font-medium">DOB:</span> {{ person.dob }}</p>
              <p v-if="person.salary">
                <span class="font-medium">Salary:</span> &#8358;{{
                  person.salary
                }}
              </p>
            </div>
            <div class="flex gap-3 mt-3 justify-end">
              <BasicButton
                kind="grey"
                label="Edit"
                @click="openEditModal(person)"
              />
              <BasicButton
                kind="danger"
                label="Delete"
                @click="deletePerson(index)"
              />
            </div>
          </div>
        </li>
      </section>
    </ul>
  </div>

  <EditModal
    v-if="selectedTeacher"
    :visible="isEditModalVisible"
    title="Edit Teacher"
    body="Update the teacher details below."
    :teacher="selectedTeacher"
    @confirm="updateTeacher"
    @cancel="closeEditModal"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { useMainStore } from "../stores/mainStore";
import BasicButton from "./components/BasicButton.vue";
import EditModal from "./components/TeacherModal.vue";

const props = defineProps({
  isTeacher: Boolean,
});

const toast = useToast();
const store = useMainStore();
const people = computed(() =>
  !props.isTeacher ? store.teachers : store.students
);

// Delete Teacher
const deletePerson = (index) => {
  try {
    if (!props.isTeacher) {
      store.deleteTeacher(index);
    } else {
      store.deleteStudent(index);
    }
    toast.success("Teacher deleted successfully", {
      timeout: 2000,
    });
  } catch (error) {
    toast.error("Error:", error, {
      timeout: 4000,
    });
  }
};

const emit = defineEmits(["editPerson"]);

// Edit Modal
const isEditModalVisible = ref(false);
const selectedTeacher = ref(null);

const openEditModal = (teacher) => {
  selectedTeacher.value = teacher;
  isEditModalVisible.value = true;
};

const closeEditModal = () => {
  isEditModalVisible.value = false;
  selectedTeacher.value = null;
};

//Submit Edit
const updateTeacher = (updatedTeacher) => {
  try {
    const index = store.teachers.findIndex(
      (t) => t.nationalId === updatedTeacher.nationalId
    );
    if (index !== -1) {
      store.teachers[index] = updatedTeacher;
    }
    closeEditModal();
    toast.success("Teacher edited successfully", {
      timeout: 2000,
    });
  } catch (error) {
    toast.error("Error:", error, {
      timeout: 4000,
    });
  }
};
</script>
