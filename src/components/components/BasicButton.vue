<template>
    <button v-bind="$attrs" class="shadow-sm" :class="[sizeClasses, typeClasses, props.className]" :type="type"
        :disabled="loading">
        <div v-if="loading" role="status" class="w-full flex justify-center gap-2">
            <svg aria-hidden="true" class="inline animate-spin" :class="[loaderClass]" viewBox="0 0 100 101" fill="none"
                xmlns="http://www.w3.org/2000/svg"></svg>
            <span>Loading...</span>
        </div>
        <span v-else class="flex items-center space-x-1">
            <!-- Render icon before or after label based on iconPosition prop -->
            <span v-if="icon && iconPosition === 'before'" class="icon-before">
                <img :src="icon" alt="Icon" class="icon-image" /></span>
            <span v-if="label">{{ label }}</span>
            <span v-if="icon && iconPosition === 'after'" class="icon-after">
                <img :src="icon" alt="Icon" class="icon-image" /></span>
        </span>
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

type SizeTypes = "xs" | "sm" | "md" | "lg" | "xl";
type KindTypes = "primary" | "border" | "grey" | "danger" | "dark" | "current";
type IconPosition = "before" | "after";
type ButtonTypes = "submit" | "button" | "reset";

const props = defineProps({
    size: {
        type: String as () => SizeTypes,
        required: false,
        default: "md",
    },
    label: {
        type: String,
        required: false,
    },
    loading: {
        type: Boolean,
        required: false,
        default: false,
    },
    type: {
        type: String as () => ButtonTypes,
        required: false,
        default: "submit",
    },
    kind: {
        type: String as () => KindTypes,
        required: false,
        default: "primary",
    },
    loaderClass: {
        type: String,
        required: false,
        default: "w-4 h-4 text-gray-200 fill-green-400",
    },
    className: {
        type: String,
        required: false,
    },
    icon: {
        type: String,
        required: false,
    },
    iconPosition: {
        type: String as () => IconPosition,
        required: false,
        default: "before",
    },
});

const sizeClasses = computed((): string => {
    let result: string = "";
    switch (props.size) {
        case "xs":
            result = "px-2 py-1.5 text-xs";
            break;
        case "sm":
            result = "px-2 py-1.5 text-sm";
            break;
        case "md":
            result = "text-sm px-5 py-2.5";
            break;
        case "lg":
            result = "px-5 py-3 text-base";
            break;
        case "xl":
            result = "text-base px-6 py-3.5";
            break;

        default:
            break;
    }

    return result;
});

const typeClasses = computed((): string => {
    let result: string = "";
    switch (props.kind) {
        case "primary":
            result = "bg-green-400 text-white rounded-lg flex justify-center hover:opacity-90";
            break;
        case "border":
            result =
                "border border-green-400 text-green-400 rounded-lg flex justify-center";
            break;
        case "grey":
            result =
                "border border-dimgrey text-header rounded-lg flex justify-center onfocus:border-green-400";
            break;
        case "danger":
            result = "text-error border border-error rounded-lg flex justify-center hover:opacity-90";
            break;
        case "current":
            result = "bg-[#02B15614] text-green-400 rounded-lg flex justify-center";
            break;

        default:
            break;
    }

    return result;
});
</script>
