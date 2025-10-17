import { computed, ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { Squares2X2Icon, BuildingOfficeIcon, TruckIcon, UsersIcon, ChartBarIcon, Cog6ToothIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
const route = useRoute();
const search = ref('');
const nav = [
    { to: '/dashboard', label: 'Dashboard', short: 'Dash', icon: Squares2X2Icon },
    { to: '/warehouses', label: 'Sklady a stavby', short: 'Sklady', icon: BuildingOfficeIcon },
    { to: '/vehicles', label: 'Firemní auta', short: 'Auta', icon: TruckIcon },
    { to: '/employees', label: 'Zaměstnanci', short: 'Lidé', icon: UsersIcon },
    { to: '/reports', label: 'Reporty', short: 'Report', icon: ChartBarIcon },
    { to: '/settings', label: 'Nastavení', short: 'Nastav', icon: Cog6ToothIcon },
];
const titles = {
    '/dashboard': { t: 'Dashboard', s: 'Přehled aktivit a statistik' },
    '/warehouses': { t: 'Sklady a stavby', s: 'Všechny lokace a stav položek', search: true },
    '/vehicles': { t: 'Firemní auta', s: 'Přehled vozidel a stavu', search: true },
    '/employees': { t: 'Zaměstnanci', s: 'Lidé a přiřazené položky', search: true },
    '/reports': { t: 'Reporty', s: 'Pohyby, výkazy, agregace' },
    '/settings': { t: 'Nastavení', s: 'Konfigurace aplikace' },
};
const meta = computed(() => titles[route.path] ?? titles['/dashboard']);
const pageTitle = computed(() => meta.value.t);
const pageSub = computed(() => meta.value.s);
const showSearch = computed(() => !!meta.value.search);
const isActive = (to) => route.path === to;
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "min-h-screen bg-gray-50" },
});
__VLS_asFunctionalElement(__VLS_elements.aside, __VLS_elements.aside)({
    ...{ class: "hidden md:flex fixed inset-y-0 left-0 w-64 bg-white border-r" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex h-full flex-col" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "h-16 px-4 flex items-center border-b bg-blue-600" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-white font-semibold" },
});
__VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
    ...{ class: "flex-1 p-4 space-y-1" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.nav))) {
    // @ts-ignore
    [nav,];
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        key: (item.to),
        to: (item.to),
        ...{ class: "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition" },
        ...{ class: (__VLS_ctx.isActive(item.to) ? 'bg-blue-50 text-blue-600' : '') },
    }));
    const __VLS_2 = __VLS_1({
        key: (item.to),
        to: (item.to),
        ...{ class: "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition" },
        ...{ class: (__VLS_ctx.isActive(item.to) ? 'bg-blue-50 text-blue-600' : '') },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_4 } = __VLS_3.slots;
    // @ts-ignore
    [isActive,];
    const __VLS_5 = ((item.icon));
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        ...{ class: "w-5 h-5" },
    }));
    const __VLS_7 = __VLS_6({
        ...{ class: "w-5 h-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-sm font-medium" },
    });
    (item.label);
    var __VLS_3;
}
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({
    ...{ class: "md:ml-64 pb-16 md:pb-0" },
});
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
    ...{ class: "sticky top-0 z-10 bg-white border-b" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mx-auto max-w-7xl px-4 py-4 flex items-center justify-between" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "text-xl md:text-2xl font-semibold text-gray-900" },
});
(__VLS_ctx.pageTitle);
// @ts-ignore
[pageTitle,];
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-xs md:text-sm text-gray-600 mt-1" },
});
(__VLS_ctx.pageSub);
// @ts-ignore
[pageSub,];
if (__VLS_ctx.showSearch) {
    // @ts-ignore
    [showSearch,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ class: "md:hidden p-2 text-gray-600 hover:text-blue-600" },
    });
    const __VLS_10 = {}.MagnifyingGlassIcon;
    /** @type {[typeof __VLS_components.MagnifyingGlassIcon, ]} */ ;
    // @ts-ignore
    MagnifyingGlassIcon;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        ...{ class: "w-6 h-6" },
    }));
    const __VLS_12 = __VLS_11({
        ...{ class: "w-6 h-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
}
if (__VLS_ctx.showSearch) {
    // @ts-ignore
    [showSearch,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "border-t bg-white" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mx-auto max-w-7xl px-4 py-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        value: (__VLS_ctx.search),
        type: "text",
        placeholder: "Vyhledat…",
        ...{ class: "w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" },
    });
    // @ts-ignore
    [search,];
}
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "mx-auto max-w-7xl px-4 py-6" },
});
const __VLS_15 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, ]} */ ;
// @ts-ignore
RouterView;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    search: (__VLS_ctx.search),
}));
const __VLS_17 = __VLS_16({
    search: (__VLS_ctx.search),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
// @ts-ignore
[search,];
__VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
    ...{ class: "md:hidden fixed bottom-0 left-0 right-0 bg-white border-t" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-around" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.nav))) {
    // @ts-ignore
    [nav,];
    const __VLS_20 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        key: (item.to),
        to: (item.to),
        ...{ class: "flex flex-col items-center py-2 text-gray-600" },
        ...{ class: (__VLS_ctx.isActive(item.to) ? 'text-blue-600' : '') },
    }));
    const __VLS_22 = __VLS_21({
        key: (item.to),
        to: (item.to),
        ...{ class: "flex flex-col items-center py-2 text-gray-600" },
        ...{ class: (__VLS_ctx.isActive(item.to) ? 'text-blue-600' : '') },
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const { default: __VLS_24 } = __VLS_23.slots;
    // @ts-ignore
    [isActive,];
    const __VLS_25 = ((item.icon));
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        ...{ class: "w-5 h-5 mb-1" },
    }));
    const __VLS_27 = __VLS_26({
        ...{ class: "w-5 h-5 mb-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-[11px]" },
    });
    (item.short);
    var __VLS_23;
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-64']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-r']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-50']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['md:ml-64']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-16']} */ ;
/** @type {__VLS_StyleScopedClasses['md:pb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-around']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
