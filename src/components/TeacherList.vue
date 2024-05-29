<template>
    <div>
        <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
        <ul>
            <li v-for="(person, index) in people" :key="index" class="mb-2">
                {{ person.name }} {{ person.surname }} - {{ person.nationalId }}
                <button @click="editPerson(index)" class="ml-2 text-blue-500">Edit</button>
                <button @click="deletePerson(index)" class="ml-2 text-red-500">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from '../stores/mainStore';

const props = defineProps({
    title: String,
    isTeacher: Boolean,
});

const store = useMainStore();
const people = computed(() => !props.isTeacher ? store.teachers : store.students);

const deletePerson = (index) => {
    if (props.isTeacher) {
        store.deleteTeacher(index);
    } else {
        store.deleteStudent(index);
    }
};

const editPerson = (index) => {
    // Implement edit functionality
    // This can be handled by emitting an event to the parent component or setting up a dedicated edit mode.
};
</script>
