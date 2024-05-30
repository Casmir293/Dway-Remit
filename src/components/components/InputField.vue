<template>
  <div class="flex flex-col space-y-2">
    <label
      v-if="props.label"
      :for="props.name"
      :class="[labelClass, props.labelClass]"
    >
      {{ props.label }}
      <span v-if="props.required" class="ml-1 text-red-500">*</span>
    </label>

    <input
      v-bind="$attrs"
      :type="props.type"
      :value="props.modelValue"
      @input="handleInput"
      :class="['border block w-full', inputClass, props.inputClass]"
    />

    <p
      v-show="computedError || success"
      :class="['text-sm', errorClass, props.errorClass]"
    >
      {{ computedError ?? success }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef, defineProps, defineEmits } from "vue";

type sizeType = "sm" | "md" | "lg";
type inputType = "text" | "password" | "email" | "submit" | "number" | "date";

const props = defineProps({
  size: {
    type: String as () => sizeType,
    default: "md",
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  name: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  success: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    required: false,
  },
  inputClass: {
    type: String,
    required: false,
  },
  labelClass: {
    type: String,
    required: false,
  },
  errorClass: {
    type: String,
    required: false,
  },
  type: {
    type: String as () => inputType,
    default: "text",
  },
});

const name = toRef(props, "name");
const inputValue = toRef(props, "modelValue");

const emit = defineEmits(["update:modelValue", "clearError"]);

const computedError = computed((): string => {
  return props.error || "";
});

const inputClass = computed((): string => {
  let output: string = "";

  if (props.size === "sm") {
    output += " p-2 rounded-sm ";
  }
  if (props.size === "md") {
    output += " p-2.5 rounded-lg ";
  }
  if (props.size === "lg") {
    output += " p-2.5 pb-12 rounded-lg ";
  }
  if (computedError.value) {
    output += " border outline-none border-red-500 ";
  }
  if (props.success) {
    output += " border outline-none border-gray-300 focus:border-green-400 ";
  }
  if (!computedError.value && !props.success) {
    output += " border outline-none border-gray-300 focus:border-green-400 ";
  }
  output +=
    " text-sm font-light lg:font-normal placeholder-[#BCBCBF] w-full text-[#333] border  focus:border-green-400 ";
  return output;
});

const errorClass = computed((): string => {
  let output: string = "";

  if (computedError.value !== null) {
    output += " text-red-600 dark:text-red-500 ";
  }
  if (props.success) {
    output += " text-green-600 dark:text-green-500 ";
  }

  return output;
});

const labelClass = computed((): string => {
  let output: string = " text-header text-sm font-medium ";

  if (computedError.value) {
    output += " text-red-700 dark:text-red-500 ";
  }

  if (props.success) {
    output += " text-green-700 dark:text-green-500 ";
  }

  return output;
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
