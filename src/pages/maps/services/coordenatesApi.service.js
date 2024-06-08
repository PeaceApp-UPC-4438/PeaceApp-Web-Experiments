// coordinatesApi.service.js
export async function obtenerCoordenadas(ubication) {
    const baseUrl = 'https://nominatim.openstreetmap.org/search';
    const params = new URLSearchParams({
        q: ubication,
        format: 'json'
    });

    const url = `${baseUrl}?${params}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo obtener la respuesta del servidor');
        }

        const data = await response.json();

        if (data.length === 0) {
            throw new Error('No se encontraron resultados para la ubicación proporcionada');
        }

        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } catch (error) {
        console.error('Error al obtener coordenadas:', error);
        throw new Error('Error al obtener coordenadas: ' + error.message);
    }
}
