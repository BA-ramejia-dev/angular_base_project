import { DynamicDialogConfig } from 'primeng/dynamicdialog/dynamicdialog-config';

// Tiempo máximo que se muestra un mensaje en pantalla
export const MESSAGE_MAX_LIFE: number = 3000;

/*
 * Esta es una lista de propiedades que se reutilizan comúnmente para configurar diálogos/modales, la idea es no tener
 * que especificar cada una de ellas al utilizar un modal.
 */
export const DIALOG_COMMON_CONFIG: DynamicDialogConfig = {
    /**
     * Muestra el diálogo actual como un modal, es decir se sobrepone al contenido en pantalla
     */
    modal: true,

    /**
     * Cierra el modal al presionar la tecla `escape`
     */
    closeOnEscape: true,

    /**
     * Cierra el modal cuando el usuario hace clic fuera del elemento
     */
    dismissableMask: true,

    /**
     * Tamaños responsive para el Modal, ajustar según las necesidades del proyecto.
     */
    styleClass: 'w-11 sm:w-9 md:w-6 lg:w-5 xl:w-4'
};
