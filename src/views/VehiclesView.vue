<script setup lang="ts">
type Status = 'OK'|'Servis'|'Nedostupné'
type Vehicle = { id:number; name:string; license:string; driver:string; location:string; status:Status; available:boolean; fuel:number; mileage:number }

const vehicles: Vehicle[] = [
  { id:1, name:'Ford Transit', license:'1A2 3456', driver:'Jan Novák', location:'Praha 4', status:'OK', available:true, fuel:75, mileage:145230 },
  { id:2, name:'Mercedes Sprinter', license:'2B3 7890', driver:'Petr Svoboda', location:'Brno', status:'OK', available:false, fuel:45, mileage:89450 },
  { id:3, name:'Iveco Daily', license:'3C4 1234', driver:'Marie Nováková', location:'Praha 5', status:'Servis', available:false, fuel:20, mileage:203670 },
]
function statusClass(s: Status) {
  if (s === 'OK') return 'bg-emerald-600'
  if (s === 'Servis') return 'bg-amber-600'
  return 'bg-rose-600'
}
function statusText(s: Status) {
  if (s === 'OK') return 'V pořádku'
  if (s === 'Servis') return 'V servisu'
  return 'Nedostupné'
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="v in vehicles" :key="v.id" class="bg-white rounded-xl border p-6 card-hover">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-semibold">{{ v.name }}</h3>
          <p class="text-sm text-gray-600">{{ v.license }}</p>
        </div>
        <div class="text-right">
          <span class="inline-block px-3 py-1 text-xs font-medium text-white rounded-full" :class="statusClass(v.status)">
            {{ statusText(v.status) }}
          </span>
          <p class="text-xs mt-1" :class="v.available ? 'text-green-600' : 'text-red-600'">
            {{ v.available ? 'Dostupné' : 'Obsazené' }}
          </p>
        </div>
      </div>
      <div class="space-y-2 text-sm text-gray-600">
        <div>👤 {{ v.driver }}</div>
        <div>📍 {{ v.location }}</div>
        <div class="flex items-center justify-between">
          <div>⚡ {{ v.fuel }}% paliva</div>
          <div class="text-xs text-gray-500">{{ v.mileage.toLocaleString() }} km</div>
        </div>
      </div>
    </div>
  </div>
</template>
