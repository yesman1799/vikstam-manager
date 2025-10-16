<script setup lang="ts">
type Movement = { id:number; item:string; from:string; to:string; who:string; when:string }
const movements: Movement[] = [
  { id:1, item:'Vrtačka Bosch GSR', from:'Sklad Praha', to:'Stavba Karlín', who:'Jan Novák',  when:'2025-10-12 09:40' },
  { id:2, item:'Helmy (5 ks)',      from:'Sklad Brno',  to:'Stavba Smíchov', who:'P. Svoboda', when:'2025-10-11 14:25' },
]
const stats = [
  { name:'Přesuny za 7 dní', value:32 },
  { name:'Nezpracované požadavky', value:3 },
  { name:'Servisy vozidel', value:2 },
  { name:'Počet lokací', value:8 },
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <div v-for="s in stats" :key="s.name" class="bg-white rounded-xl border p-6">
      <p class="text-sm text-gray-600">{{ s.name }}</p>
      <p class="mt-1 text-3xl font-bold">{{ s.value }}</p>
    </div>
  </div>

  <div class="bg-white rounded-xl border overflow-x-auto">
    <table class="min-w-full text-sm">
      <thead class="bg-gray-50 text-gray-600">
        <tr>
          <th class="px-4 py-3 text-left">Položka</th>
          <th class="px-4 py-3 text-left">Odkud</th>
          <th class="px-4 py-3 text-left">Kam</th>
          <th class="px-4 py-3 text-left">Kdo</th>
          <th class="px-4 py-3 text-left">Kdy</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in movements" :key="m.id" class="border-t">
          <td class="px-4 py-3 font-medium text-gray-900">{{ m.item }}</td>
          <td class="px-4 py-3">{{ m.from }}</td>
          <td class="px-4 py-3">{{ m.to }}</td>
          <td class="px-4 py-3">{{ m.who }}</td>
          <td class="px-4 py-3">{{ m.when }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
