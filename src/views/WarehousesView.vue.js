const warehouses = [
    { id: 1, name: 'Hlavní sklad Praha', location: 'Praha 4, Michle', type: 'sklad', itemCount: 247, lastActivity: '2025-01-15' },
    { id: 2, name: 'Stavba Karlín Residence', location: 'Praha 8, Karlín', type: 'stavba', itemCount: 89, lastActivity: '2025-01-14' },
    { id: 3, name: 'Sklad Brno', location: 'Brno, Černovice', type: 'sklad', itemCount: 156, lastActivity: '2025-01-13' },
    { id: 4, name: 'Stavba Nový Smíchov', location: 'Praha 5, Smíchov', type: 'stavba', itemCount: 203, lastActivity: '2025-01-12' },
];
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
for (const [w] of __VLS_getVForSourceType((__VLS_ctx.warehouses))) {
    // @ts-ignore
    [warehouses,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (w.id),
        ...{ class: "bg-white rounded-xl border p-6 card-hover" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex items-start justify-between mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-lg font-semibold" },
    });
    (w.name);
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "px-2 py-1 text-xs rounded-full" },
        ...{ class: (w.type === 'sklad' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800') },
    });
    (w.type === 'sklad' ? 'Sklad' : 'Stavba');
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "space-y-2 text-sm text-gray-600" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    (w.location);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    (w.itemCount);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
    (new Date(w.lastActivity).toLocaleDateString('cs-CZ'));
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
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
