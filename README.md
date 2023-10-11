# HeroesApp

Esta aplicación consiste en un listado de héroes. Cada uno de ellos se puede editar/actualizar, eliminar o ver su información. Además, se pueden crear nuevos héroes y buscarlos por su nombre. Se ha implementado un sencillo sistema de protección de rutas y autenticación como base para futuras aplicaciones que necesiten autenticación real.

El código de este proeycto se ha generado con la versión 16.0.3 de [Angular CLI](https://github.com/angular/angular-cli), con la versión 18.16.0 de NodeJS y con la versión 9.6.6 de npm.

## Iniciar aplicación y servidor de desarrollo (sólo en Dev)

* Ejecutar el comando `npm start` o `ng serve` y acceder a la URL `http://localhost:4200` para iniciar la aplicación.

* Para mantener abierta la **base de datos** de los héroes, hay que seguir estos pasos:
    - Instalar el paquete de NodeJS llamado [Json Server](https://www.npmjs.com/package/json-server) para crear una API REST falsa a partir de un archivo JSON y así poder trabajar con el backend.
    - Ejecutar el comando `npm run backend` para levantar el backend que contiene todos los héroes. Este comando SIEMPRE se ha de estar ejecutando.
    - Tener abierto el Postman para consultar las diferentes URLs a las cuáles acceder. Por ejemplo, para ver los héroes, la URL es `http://localhost:3000/heroes`.

* Para los **estilos y temas**, se ha utilizado [Angular Material](https://material.angular.io) y [PrimeFlex](https://www.primefaces.org/primeflex).
