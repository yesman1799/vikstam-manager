const vehicles = [
    { id: 1, name: 'Ford Transit', license: '1A2 3456', driver: 'Jan Novák', location: 'Praha 4', status: 'OK', available: true, fuel: 75, mileage: 145230 },
    { id: 2, name: 'Mercedes Sprinter', license: '2B3 7890', driver: 'Petr Svoboda', location: 'Brno', status: 'OK', available: false, fuel: 45, mileage: 89450 },
    { id: 3, name: 'Iveco Daily', license: '3C4 1234', driver: 'Marie Nováková', location: 'Praha 5', status: 'Servis', available: false, fuel: 20, mileage: 203670 },
];
function statusClass(s) {
    if (s === 'OK')
        return 'bg-emerald-600';
    if (s === 'Servis')
        return 'bg-amber-600';
    return 'bg-rose-600';
}
function statusText(s) {
    if (s === 'OK')
        return 'V pořádku';
    if (s === 'Servis')
        return 'V servisu';
    return 'Nedostupné';
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" },
});
for (const [v] of __VLS_getVForSourceType((__VLS_ctx.vehicles))) {
    // @ts-ignore
    [vehicles,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (v.id),
        ...{ class: "bg-white rounded-xl border p-6 card-hover" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-between items-start mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-lg font-semibold" },
    });
    (v.name);
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm text-gray-600" },
    });
    (v.license);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-right" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "inline-block px-3 py-1 text-xs font-medium text-white rounded-full" },
        ...{ class: (__VLS_ctx.statusClass(v.status)) },
    });
    // @ts-ignore
    [statusClass,];
    (__VLS_ctx.statusText(v.status));
    // @ts-ignore
    [statusText,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-xs mt-1" },
        ...{ class: (v.available ? 'text-green-600' : 'text-red-600') },
    });
    (v.available ? 'Dostupné' : 'Obsazené');
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "space-y-2 text-sm text-gray-600" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    (v.driver);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    (v.location);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex items-center justify-between" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    (v.fuel);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-xs text-gray-500" },
    });
    (v.mileage.toLocaleString());
}
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
