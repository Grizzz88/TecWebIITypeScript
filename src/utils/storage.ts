export function guardar(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function obtener(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}