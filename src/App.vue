<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import {
  Squares2X2Icon, BuildingOfficeIcon, TruckIcon,
  UsersIcon, ChartBarIcon, Cog6ToothIcon, MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const search = ref('')

const nav = [
  { to: '/dashboard',  label: 'Dashboard',         short: 'Dash',   icon: Squares2X2Icon },
  { to: '/warehouses', label: 'Sklady a stavby',   short: 'Sklady', icon: BuildingOfficeIcon },
  { to: '/vehicles',   label: 'Firemní auta',      short: 'Auta',   icon: TruckIcon },
  { to: '/employees',  label: 'Zaměstnanci',       short: 'Lidé',   icon: UsersIcon },
  { to: '/reports',    label: 'Reporty',           short: 'Report', icon: ChartBarIcon },
  { to: '/settings',   label: 'Nastavení',         short: 'Nastav', icon: Cog6ToothIcon },
]

const titles: Record<string, { t:string; s:string; search?:boolean }> = {
  '/dashboard':  { t: 'Dashboard',        s: 'Přehled aktivit a statistik' },
  '/warehouses': { t: 'Sklady a stavby',  s: 'Všechny lokace a stav položek', search: true },
  '/vehicles':   { t: 'Firemní auta',     s: 'Přehled vozidel a stavu',       search: true },
  '/employees':  { t: 'Zaměstnanci',      s: 'Lidé a přiřazené položky',      search: true },
  '/reports':    { t: 'Reporty',          s: 'Pohyby, výkazy, agregace' },
  '/settings':   { t: 'Nastavení',        s: 'Konfigurace aplikace' },
}
const meta        = computed(() => titles[route.path] ?? titles['/dashboard'])
const pageTitle   = computed(() => meta.value.t)
const pageSub     = computed(() => meta.value.s)
const showSearch  = computed(() => !!meta.value.search)
const isActive    = (to: string) => route.path === to
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar (desktop) -->
    <aside class="hidden md:flex fixed inset-y-0 left-0 w-64 bg-white border-r">
      <div class="flex h-full flex-col">
        <div class="h-16 px-4 flex items-center border-b bg-blue-600">
          <h1 class="text-white font-semibold">Vikstam Manager</h1>
        </div>

        <nav class="flex-1 p-4 space-y-1">
          <RouterLink
            v-for="item in nav" :key="item.to" :to="item.to"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
            :class="isActive(item.to) ? 'bg-blue-50 text-blue-600' : ''"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="text-sm font-medium">{{ item.label }}</span>
          </RouterLink>
        </nav>
      </div>
    </aside>

    <!-- Main -->
    <main class="md:ml-64 pb-16 md:pb-0">
      <!-- Header -->
      <header class="sticky top-0 z-10 bg-white border-b">
        <div class="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div>
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900">{{ pageTitle }}</h2>
            <p class="text-xs md:text-sm text-gray-600 mt-1">{{ pageSub }}</p>
          </div>
          <button v-if="showSearch" class="md:hidden p-2 text-gray-600 hover:text-blue-600">
            <MagnifyingGlassIcon class="w-6 h-6" />
          </button>
        </div>
        <div v-if="showSearch" class="border-t bg-white">
          <div class="mx-auto max-w-7xl px-4 py-3">
            <input
              v-model="search" type="text" placeholder="Vyhledat…"
              class="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>

      <!-- Obsah -->
      <section class="mx-auto max-w-7xl px-4 py-6">
        <RouterView :search="search" />
      </section>
    </main>

    <!-- Mobile bottom nav -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
      <div class="flex justify-around">
        <RouterLink
          v-for="item in nav" :key="item.to" :to="item.to"
          class="flex flex-col items-center py-2 text-gray-600"
          :class="isActive(item.to) ? 'text-blue-600' : ''"
        >
          <component :is="item.icon" class="w-5 h-5 mb-1" />
          <span class="text-[11px]">{{ item.short }}</span>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
