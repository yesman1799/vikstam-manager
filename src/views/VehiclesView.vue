<script setup lang="ts">
import { computed } from 'vue'
import { useVehiclesStore } from '@/stores/vehicles'

const props = defineProps<{ search?: string }>()
const store = useVehiclesStore()

const filteredVehicles = computed(() => store.filterBySearch(props.search || ''))

function statusClass(s: 'OK' | 'Servis' | 'Nedostupné') {
  if (s === 'OK') return 'bg-emerald-600'
  if (s === 'Servis') return 'bg-amber-600'
  return 'bg-rose-600'
}
function statusText(s: 'OK' | 'Servis' | 'Nedostupné') {
  if (s === 'OK') return 'V pořádku'
  if (s === 'Servis') return 'V servisu'
  return 'Nedostupné'
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-if="store.isLoading" class="col-span-full text-center py-8 text-gray-500">
      Loading...
    </div>
    <div v-else-if="store.error" class="col-span-full text-center py-8 text-red-500">
      Error: {{ store.error }}
    </div>
    <div
      v-else-if="!filteredVehicles || filteredVehicles.length === 0"
      class="col-span-full text-center py-8 text-gray-500"
    >
      No vehicles found
    </div>
    <div
      v-else
      v-for="v in filteredVehicles"
      :key="v.id"
      class="bg-white rounded-xl border p-6 card-hover"
    >
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-semibold">{{ v.name }}</h3>
          <p class="text-sm text-gray-600">{{ v.license }}</p>
        </div>
        <div class="text-right">
          <span
            class="inline-block px-3 py-1 text-xs font-medium text-white rounded-full"
            :class="statusClass(v.status)"
          >
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
        <div v-if="v.syncStatus === 'pending'" class="text-xs text-amber-600">⏱️ Pending sync</div>
      </div>
    </div>
  </div>
</template>
