export function esCorreoValido(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(correo.trim());
}

export function esNumeroPositivo(valor: number): boolean {
    return Number.isFinite(valor) && valor > 0;
}
