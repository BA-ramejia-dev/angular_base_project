export interface IdValuePair<T = string> {
    id: number;
    value: T;
}

export interface EnvironmentProps {
    /**
     * Indica si el ambiente actual es producción, esto es util para los casos donde queremos asegurarnos que los
     * console.log() solo se muestran en desarrollo.
     */
    isProduction: boolean;

    /**
     * Indica la URL de la API de backend, se asume que solo se está utilizando una sola API.
     * En caso de que la aplicación tenga interacción con multiples API, se recomienda convertir esto en un enum.
     */
    backendURL: string;
}
