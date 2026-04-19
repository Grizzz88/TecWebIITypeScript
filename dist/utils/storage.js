export function guardar(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
export function obtener(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}
