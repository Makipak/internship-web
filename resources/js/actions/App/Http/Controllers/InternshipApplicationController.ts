import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\InternshipApplicationController::store
 * @see app/Http/Controllers/InternshipApplicationController.php:13
 * @route '/apply'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/apply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InternshipApplicationController::store
 * @see app/Http/Controllers/InternshipApplicationController.php:13
 * @route '/apply'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InternshipApplicationController::store
 * @see app/Http/Controllers/InternshipApplicationController.php:13
 * @route '/apply'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InternshipApplicationController::store
 * @see app/Http/Controllers/InternshipApplicationController.php:13
 * @route '/apply'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InternshipApplicationController::store
 * @see app/Http/Controllers/InternshipApplicationController.php:13
 * @route '/apply'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const InternshipApplicationController = { store }

export default InternshipApplicationController