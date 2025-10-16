<script setup lang="ts">
// Mock data pro dashboard (zatím statická)
const stats = [
  { label: 'Celkem skladů', value: 8, color: 'bg-blue-500/10 text-blue-600', icon: '📦' },
  { label: 'Aktivní vozidla', value: 12, color: 'bg-green-500/10 text-green-600', icon: '🚚' },
  { label: 'Zaměstnanci', value: 45, color: 'bg-amber-500/10 text-amber-600', icon: '👷' },
  { label: 'Aktivní projekty', value: 6, color: 'bg-purple-500/10 text-purple-600', icon: '🏗️' },
]

const usage = [
  { name: 'Ford Transit', p: 85 },
  { name: 'Mercedes Sprinter', p: 72 },
  { name: 'Iveco Daily', p: 45 },
  { name: 'VW Crafter', p: 91 },
]

const activities = [
  { title: 'Přesun vrtačky na stavbu Karlín', time: 'před 2 hodinami', color: 'bg-blue-500' },
  { title: 'Nový zaměstnanec přidán', time: 'před 4 hodinami', color: 'bg-green-500' },
  { title: 'Vozidlo odesláno na servis', time: 'včera', color: 'bg-yellow-500' },
  { title: 'Dokončen projekt Smíchov', time: 'před 2 dny', color: 'bg-purple-500' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Horní přehledové karty -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(s, i) in stats"
        :key="i"
        class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="text-3xl">{{ s.icon }}</div>
          <div :class="['px-2 py-1 text-xs font-semibold rounded-lg', s.color]">
            {{ s.label }}
          </div>
        </div>
        <p class="text-4xl font-bold text-gray-900">{{ s.value }}</p>
      </div>
    </div>

    <!-- Spodní grid: využití + aktivity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Využití vozidel -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Využití vozidel tento měsíc</h3>
        <div class="space-y-5">
          <div v-for="r in usage" :key="r.name" class="space-y-1">
            <div class="flex justify-between items-center text-sm">
              <span class="font-medium text-gray-700">{{ r.name }}</span>
              <span class="font-semibold text-gray-900">{{ r.p }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="h-2 rounded-full bg-blue-600 transition-all duration-500"
                :style="{ width: r.p + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Poslední aktivity -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Poslední aktivity</h3>
        <div class="space-y-5">
          <div
            v-for="a in activities"
            :key="a.title"
            class="flex items-start space-x-3 border-l-2 pl-4"
            :class="a.color"
          >
            <div class="flex flex-col">
              <p class="text-gray-900 font-medium">{{ a.title }}</p>
              <p class="text-xs text-gray-500">{{ a.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Trochu jemnější stínování podle preview */
div[class*="shadow-"] {
  transition: box-shadow 0.2s ease;
}
</style>
