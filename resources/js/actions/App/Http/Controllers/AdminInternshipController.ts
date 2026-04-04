import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminInternshipController::dashboard
 * @see app/Http/Controllers/AdminInternshipController.php:15
 * @route '/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminInternshipController::dashboard
 * @see app/Http/Controllers/AdminInternshipController.php:15
 * @route '/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminInternshipController::dashboard
 * @see app/Http/Controllers/AdminInternshipController.php:15
 * @route '/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminInternshipController::dashboard
 * @see app/Http/Controllers/AdminInternshipController.php:15
 * @route '/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminInternshipController::dashboard
 * @see app/Http/Controllers/AdminInternshipController.php:15
 * @route '/admin'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminInternshipController::dashboard
 * @see app/Http/Controllers/AdminInternshipController.php:15
 * @route '/admin'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminInternshipController::dashboard
 * @see app/Http/Controllers/AdminInternshipController.php:15
 * @route '/admin'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\AdminInternshipController::exportMethod
 * @see app/Http/Controllers/AdminInternshipController.php:89
 * @route '/api/admin/internships/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/api/admin/internships/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminInternshipController::exportMethod
 * @see app/Http/Controllers/AdminInternshipController.php:89
 * @route '/api/admin/internships/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminInternshipController::exportMethod
 * @see app/Http/Controllers/AdminInternshipController.php:89
 * @route '/api/admin/internships/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminInternshipController::exportMethod
 * @see app/Http/Controllers/AdminInternshipController.php:89
 * @route '/api/admin/internships/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminInternshipController::exportMethod
 * @see app/Http/Controllers/AdminInternshipController.php:89
 * @route '/api/admin/internships/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminInternshipController::exportMethod
 * @see app/Http/Controllers/AdminInternshipController.php:89
 * @route '/api/admin/internships/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminInternshipController::exportMethod
 * @see app/Http/Controllers/AdminInternshipController.php:89
 * @route '/api/admin/internships/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
/**
* @see \App\Http\Controllers\AdminInternshipController::index
 * @see app/Http/Controllers/AdminInternshipController.php:21
 * @route '/api/admin/internships'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/admin/internships',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminInternshipController::index
 * @see app/Http/Controllers/AdminInternshipController.php:21
 * @route '/api/admin/internships'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminInternshipController::index
 * @see app/Http/Controllers/AdminInternshipController.php:21
 * @route '/api/admin/internships'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminInternshipController::index
 * @see app/Http/Controllers/AdminInternshipController.php:21
 * @route '/api/admin/internships'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminInternshipController::index
 * @see app/Http/Controllers/AdminInternshipController.php:21
 * @route '/api/admin/internships'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminInternshipController::index
 * @see app/Http/Controllers/AdminInternshipController.php:21
 * @route '/api/admin/internships'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminInternshipController::index
 * @see app/Http/Controllers/AdminInternshipController.php:21
 * @route '/api/admin/internships'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\AdminInternshipController::destroy
 * @see app/Http/Controllers/AdminInternshipController.php:54
 * @route '/api/admin/internships/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/internships/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AdminInternshipController::destroy
 * @see app/Http/Controllers/AdminInternshipController.php:54
 * @route '/api/admin/internships/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminInternshipController::destroy
 * @see app/Http/Controllers/AdminInternshipController.php:54
 * @route '/api/admin/internships/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AdminInternshipController::destroy
 * @see app/Http/Controllers/AdminInternshipController.php:54
 * @route '/api/admin/internships/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminInternshipController::destroy
 * @see app/Http/Controllers/AdminInternshipController.php:54
 * @route '/api/admin/internships/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\AdminInternshipController::downloadResume
 * @see app/Http/Controllers/AdminInternshipController.php:74
 * @route '/api/admin/internships/{id}/resume'
 */
export const downloadResume = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadResume.url(args, options),
    method: 'get',
})

downloadResume.definition = {
    methods: ["get","head"],
    url: '/api/admin/internships/{id}/resume',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminInternshipController::downloadResume
 * @see app/Http/Controllers/AdminInternshipController.php:74
 * @route '/api/admin/internships/{id}/resume'
 */
downloadResume.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return downloadResume.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminInternshipController::downloadResume
 * @see app/Http/Controllers/AdminInternshipController.php:74
 * @route '/api/admin/internships/{id}/resume'
 */
downloadResume.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadResume.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminInternshipController::downloadResume
 * @see app/Http/Controllers/AdminInternshipController.php:74
 * @route '/api/admin/internships/{id}/resume'
 */
downloadResume.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadResume.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminInternshipController::downloadResume
 * @see app/Http/Controllers/AdminInternshipController.php:74
 * @route '/api/admin/internships/{id}/resume'
 */
    const downloadResumeForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadResume.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminInternshipController::downloadResume
 * @see app/Http/Controllers/AdminInternshipController.php:74
 * @route '/api/admin/internships/{id}/resume'
 */
        downloadResumeForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadResume.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminInternshipController::downloadResume
 * @see app/Http/Controllers/AdminInternshipController.php:74
 * @route '/api/admin/internships/{id}/resume'
 */
        downloadResumeForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadResume.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadResume.form = downloadResumeForm
const AdminInternshipController = { dashboard, exportMethod, index, destroy, downloadResume, export: exportMethod }

export default AdminInternshipController