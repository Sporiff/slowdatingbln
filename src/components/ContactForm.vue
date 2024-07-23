<script setup>
import { ref } from "vue";

// Define props
const props = defineProps({
  endpoint: String,
});

// Initial form data
const initialForm = {
  email: "",
};

// Reactive references
const formData = ref({ ...initialForm });
const loading = ref(false);
const submissionResult = ref(null);

// Handle form submission
const handleSubmit = async () => {
  loading.value = true;
  submissionResult.value = null;

  try {
    const response = await fetch(props.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            sendEmail(
              input: {
                to: "slowdatingberlin@gmail.com"
                from: "noreply@slowdatingbln.com"
                subject: "New signup for Slow Dating Berlin"
                body: "${formData.value.email} wants to sign up for the Slow Dating Berlin newsletter"
                clientMutationId: "${formData.value.email}"
              }
            ) {
              sent
              message
            }
          }
        `,
      }),
    });

    const result = await response.json();
    const { message } = result.data.sendEmail;
    console.log(message);

    submissionResult.value = "success";
    console.log(`Form submitted successfully: ${message}`);
  } catch (error) {
    submissionResult.value = "error";
    console.error("Error submitting form:", error);
  } finally {
    formData.value = { ...initialForm };
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="border border-blue-300 shadow rounded-md p-4 w-full max-w-lg mx-auto"
    >
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-gray-200 h-10 w-10"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 bg-gray-200 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-gray-200 rounded col-span-2"></div>
              <div class="h-2 bg-gray-200 rounded col-span-1"></div>
            </div>
            <div class="h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
    <form
      v-if="!loading"
      class="w-10/12 md:w-full max-w-lg mx-auto"
      @submit.prevent="handleSubmit"
    >
      <div
        v-if="submissionResult === 'success'"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
      >
        Message successfully sent.
      </div>
      <div
        v-if="submissionResult === 'error'"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      >
        There was a problem sending this message.
      </div>

      <div class="flex flex-wrap w-full">
        <label
          for="email"
          class="block uppercase tracking-wide text-white mb-2"
        >
          Sign up for the newsletter
        </label>
        <input
          id="email"
          name="email"
          type="email"
          class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          placeholder="you@email.com"
          required
          v-model="formData.email"
        />
      </div>
      <div class="mx-auto w-fit">
        <input
          role="button"
          type="submit"
          value="Submit"
          class="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="loading"
        />
      </div>
    </form>
  </div>
</template>
