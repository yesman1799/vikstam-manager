<script setup lang="ts">
const company = { name:'Vikstam Grow Prague s.r.o.', ico:'12345678', timezone:'Europe/Prague' }
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="bg-white rounded-xl border p-6">
      <h3 class="text-lg font-semibold mb-4">Společnost</h3>
      <div class="space-y-3 text-sm">
        <div class="flex items-center justify-between"><span class="text-gray-600">Název</span><span class="font-medium">{{ company.name }}</span></div>
        <div class="flex items-center justify-between"><span class="text-gray-600">IČO</span><span class="font-medium">{{ company.ico }}</span></div>
        <div class="flex items-center justify-between"><span class="text-gray-600">Časová zóna</span><span class="font-medium">{{ company.timezone }}</span></div>
      </div>
    </div>

    <div class="bg-white rounded-xl border p-6">
      <h3 class="text-lg font-semibold mb-4">Aplikace</h3>
      <div class="space-y-4">
        <button class="px-4 py-2 rounded-lg border hover:bg-gray-50">Vymazat cache</button>
        <button class="px-4 py-2 rounded-lg border hover:bg-gray-50">Rebuild lokální indexy</button>
      </div>
    </div>
  </div>
</template>
