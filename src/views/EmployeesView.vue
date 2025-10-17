<script setup lang="ts">
import { computed } from 'vue'
import { useEmployeesStore } from '@/stores/employees'
import type { Employee } from '@/db'

const props = defineProps<{ search?: string }>()
const store = useEmployeesStore()

const filteredEmployees = computed(() => store.filterBySearch(props.search || ''))

const roleBadge = (r: Employee['role']) =>
  r === 'Manažer'
    ? 'bg-purple-100 text-purple-800'
    : r === 'Mistr'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-emerald-100 text-emerald-800'
</script>

<template>
  <div class="bg-white rounded-xl border overflow-x-auto">
    <div v-if="store.isLoading" class="text-center py-8 text-gray-500">Loading...</div>
    <div v-else-if="store.error" class="text-center py-8 text-red-500">
      Error: {{ store.error }}
    </div>
    <div
      v-else-if="!filteredEmployees || filteredEmployees.length === 0"
      class="text-center py-8 text-gray-500"
    >
      No employees found
    </div>
    <table v-else class="min-w-full text-sm">
      <thead class="bg-gray-50 text-gray-600">
        <tr>
          <th class="px-4 py-3 text-left">Jméno</th>
          <th class="px-4 py-3 text-left">Role</th>
          <th class="px-4 py-3 text-left">Projekt</th>
          <th class="px-4 py-3 text-left">Telefon</th>
          <th class="px-4 py-3 text-right">Položky</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in filteredEmployees" :key="e.id" class="border-t">
          <td class="px-4 py-3 font-medium text-gray-900">
            {{ e.name }}
            <span v-if="e.syncStatus === 'pending'" class="ml-2 text-xs text-amber-600"
              >⏱️</span
            >
          </td>
          <td class="px-4 py-3">
            <span class="px-2 py-1 rounded-full text-xs font-medium" :class="roleBadge(e.role)">
              {{ e.role }}
            </span>
          </td>
          <td class="px-4 py-3">{{ e.project }}</td>
          <td class="px-4 py-3">{{ e.phone }}</td>
          <td class="px-4 py-3 text-right font-medium">{{ e.items }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
