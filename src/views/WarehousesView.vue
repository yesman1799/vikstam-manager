<script setup lang="ts">
type WH = { id:number; name:string; location:string; type:'sklad'|'stavba'; itemCount:number; lastActivity:string }
const warehouses: WH[] = [
  { id:1, name:'Hlavní sklad Praha', location:'Praha 4, Michle', type:'sklad', itemCount:247, lastActivity:'2025-01-15' },
  { id:2, name:'Stavba Karlín Residence', location:'Praha 8, Karlín', type:'stavba', itemCount:89, lastActivity:'2025-01-14' },
  { id:3, name:'Sklad Brno', location:'Brno, Černovice', type:'sklad', itemCount:156, lastActivity:'2025-01-13' },
  { id:4, name:'Stavba Nový Smíchov', location:'Praha 5, Smíchov', type:'stavba', itemCount:203, lastActivity:'2025-01-12' },
]
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="w in warehouses" :key="w.id" class="bg-white rounded-xl border p-6 card-hover">
      <div class="flex items-start justify-between mb-4">
        <h3 class="text-lg font-semibold">{{ w.name }}</h3>
        <span class="px-2 py-1 text-xs rounded-full"
          :class="w.type === 'sklad' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'">
          {{ w.type === 'sklad' ? 'Sklad' : 'Stavba' }}
        </span>
      </div>
      <div class="space-y-2 text-sm text-gray-600">
        <div>📍 {{ w.location }}</div>
        <div>📦 {{ w.itemCount }} položek</div>
        <div>🕒 {{ new Date(w.lastActivity).toLocaleDateString('cs-CZ') }}</div>
      </div>
    </div>
  </div>
</template>
