<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="nationalId">National ID</label>
            <input v-model="teacher.nationalId" type="text" required />
        </div>
        <div>
            <label for="title">Title</label>
            <select v-model="teacher.title" required>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
                <option value="Prof">Prof</option>
            </select>
        </div>
        <div>
            <label for="name">Name</label>
            <input v-model="teacher.name" type="text" required />
        </div>
        <div>
            <label for="surname">Surname</label>
            <input v-model="teacher.surname" type="text" required />
        </div>
        <div>
            <label for="dob">Date of Birth</label>
            <input v-model="teacher.dob" type="date" required />
        </div>
        <div>
            <label for="teacherNumber">Teacher Number</label>
            <input v-model="teacher.teacherNumber" type="text" required />
        </div>
        <div>
            <label for="salary">Salary</label>
            <input v-model="teacher.salary" type="number" />
        </div>
        <button type="submit">Save Teacher</button>
    </form>
</template>

<script setup>
import { useTeacherStore } from '../stores/teacherStore';
import { computed, ref } from 'vue';

// props: {
//     teacherData: Object,
//     },
const teacherStore = useTeacherStore()
const teacher = ref({ ...props.teacherData })

const handleSubmit = () => {
    if (props.teacherData) {
        teacherStore.updateTeacher(teacher.value)
    } else {
        teacherStore.addTeacher(teacher.value)
    }
}
</script>
