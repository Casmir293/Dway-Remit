<template>
  <hr class="my-8" />
  <div v-if="store.students.length < 1" class="text-center">
    <h2 class="text-xl font-semibold mb-2">No registered student yet</h2>
    <p>Start by registering a student</p>
  </div>

  <div v-else>
    <h2 class="text-xl font-semibold text-center mb-6 underline">
      Registered Students
    </h2>
    <ul>
      <section class="lg:grid-cols-2 gap-3 grid">
        <li v-for="(person, index) in people" :key="index" class="mb-2">
          <div class="border p-4 shadow-lg rounded-lg">
            <p class="mb-2">
              <span class="font-medium">Name</span>: {{ person.name }}
              {{ person.surname }}
            </p>
            <p class="mb-2">
              <span class="font-medium">Contact</span>:
              {{ person.studentNumber }}
            </p>
            <p class="mb-2">
              <span class="font-medium">National ID</span>
              {{ person.nationalId }}
            </p>
            <p class="mb-2">
              <span class="font-medium">DOB:</span>
              {{ person.dob }}
            </p>

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
    v-if="selectedStudent"
    :visible="isEditModalVisible"
    title="Edit Student"
    body="Update the studet details below."
    :student="selectedStudent"
    @confirm="updateStudent"
    @cancel="closeEditModal"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { useMainStore } from "../stores/mainStore";
import BasicButton from "./components/BasicButton.vue";
import EditModal from "./components/StudentModal.vue";

const props = defineProps({
  isStudent: Boolean,
});

const toast = useToast();
const store = useMainStore();
const people = computed(() =>
  props.isStudent ? store.students : store.students
);

// Delete Student
const deletePerson = (index) => {
  try {
    if (props.isStudent) {
      store.deleteStudent(index);
    } else {
      store.deleteStudent(index);
    }
    toast.success("Student deleted successfully", {
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
const selectedStudent = ref(null);

const openEditModal = (student) => {
  selectedStudent.value = student;
  isEditModalVisible.value = true;
};

const closeEditModal = () => {
  isEditModalVisible.value = false;
  selectedStudent.value = null;
};

// Submit Edit
const updateStudent = (updatedStudent) => {
  try {
    const index = store.students.findIndex(
      (t) => t.nationalId === updatedStudent.nationalId
    );
    if (index !== -1) {
      store.students[index] = updatedStudent;
    }
    closeEditModal();
    toast.success("Student edited successfully", {
      timeout: 2000,
    });
  } catch (error) {
    toast.error("Error:", error, {
      timeout: 4000,
    });
  }
};
</script>
