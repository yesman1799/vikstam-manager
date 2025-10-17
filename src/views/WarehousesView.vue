<script setup lang="ts">
import { computed } from 'vue'
import { useWarehousesStore } from '@/stores/warehouses'

const props = defineProps<{ search?: string }>()
const store = useWarehousesStore()

const filteredWarehouses = computed(() => store.filterBySearch(props.search || ''))
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-if="store.isLoading"
      class="col-span-full text-center py-8 text-gray-500"
    >
      Loading...
    </div>
    <div
      v-else-if="store.error"
      class="col-span-full text-center py-8 text-red-500"
    >
      Error: {{ store.error }}
    </div>
    <div
      v-else-if="!filteredWarehouses || filteredWarehouses.length === 0"
      class="col-span-full text-center py-8 text-gray-500"
    >
      No warehouses found
    </div>
    <div
      v-else
      v-for="w in filteredWarehouses"
      :key="w.id"
      class="bg-white rounded-xl border p-6 card-hover"
    >
      <div class="flex items-start justify-between mb-4">
        <h3 class="text-lg font-semibold">{{ w.name }}</h3>
        <span
          class="px-2 py-1 text-xs rounded-full"
          :class="
            w.type === 'sklad' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
          "
        >
          {{ w.type === 'sklad' ? 'Sklad' : 'Stavba' }}
        </span>
      </div>
      <div class="space-y-2 text-sm text-gray-600">
        <div>📍 {{ w.location }}</div>
        <div>📦 {{ w.itemCount }} položek</div>
        <div>🕒 {{ new Date(w.lastActivity).toLocaleDateString('cs-CZ') }}</div>
        <div v-if="w.syncStatus === 'pending'" class="text-xs text-amber-600">⏱️ Pending sync</div>
      </div>
    </div>
  </div>
</template>
