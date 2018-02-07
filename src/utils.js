export function obj_get(collection, value, def = null) {
    const v = value.split('.').reduce((a, b) => {
        if (a) {
            return a[b]
        }
    }, collection)

    if (v !== undefined) {
        return v
    }

    return def
}
