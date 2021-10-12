<template>
  <div class="container mx-auto p-4 flex items-center">
    <div class="flex items-center cursor-pointer">
      <img class="w-8" src="/movie-icon.svg" alt="Movie Icon" />
      <span class="text-4xl font-bold">Movie Browser</span>
    </div>
    <div class="flex-1" />
    <input
      v-model="value"
      class="border-2 px-2 py-1 text-2xl rounded-md focus:outline-none focus:border-blue-500"
      placeholder="Search by movie title"
    />
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({ value: '' })
}
</script>

<style scoped></style>
