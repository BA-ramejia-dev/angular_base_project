# Base Angular project

## Objetivo General

Este repositorio es la base para la creación de nuevos proyectos basados en `Angular v17.3.2`, este proyecto provee un
mecanismo básico de enrutamiento, manejo de JWT para el inicio de sesión y uso de componentes [PrimeNg](https://primeng.org/)

Las tecnologías involucradas en este proyecto son:

-   [PrimeNg Components](https://primeng.org/autocomplete): este es un paquete que provee una lista de componentes
    reutilizables como ser: radio botones, tablas, calendarios, etc.
-   [Prime Flex](https://primeflex.org/display): provee un sistema utilitario de clases que nos permite crear diseños
    responsive de forma sencilla, algo muy parecido a `Tailwind`.
    Además, sirve como un complemento perfecto para los componentes `PrimeNg` porque podemos
    reutilizar los [Prime Blocks](https://blocks.primeng.org/#/free) sin cambiar ni una tan sola línea de código.
-   [Prime Icons](https://primeng.org/icons): provee una lista de iconos que podemos reutilizar haciendo uso de las
    clases CSS, usando `Prime Flex` podemos cambiar el tamaño y color de esos iconos.

## ¿Como ejecutar este proyecto?

1. Instalar las dependencias del proyecto `npm install`
2. Ejecutar el comando `npm start`
3. Abrir el navegador en la URL: <localhost:4200>
4. Iniciar sesión con el usuario de pruebas: `Usuario: master y Password: master`

## Dependencias externas

N/A

## Punto de contacto

Equipo XYZ, Gerencia ABC

-   Juan Perez (test@yahoo.com)
-   Maria Torres (test2@yahoo.com)

## Despliegue a producción

1. Paso #1
2. Paso #2
3. Paso #3

## Puntos de referencia en el código

-   Este [archivo](./src/app/app.routes.ts) maneja las rutas de la aplicación y el componente que se debe mostrar al visitar dicha ruta.
-   Aparte de la documentación oficial de `Primeflex` podemos ver la lista completa de clases dentro del archivo [primeflex.css](./node_modules/primeflex/primeflex.css)
