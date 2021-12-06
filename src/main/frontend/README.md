# Ejemplo REACT (SI-2021, semana 5)

Ejemplo de IU para el API pedidos-rest-21 usando REACT.

Versión simplificada del ejemplo `cra-crud`de PrimeReact (ver https://github.com/primefaces/primereact-examples)

## Requisitos

* Instalación reciente de node.js (https://nodejs.org/es/) [versión > 16.8]
* Usa API REST del proyecto [pedidos-rest-21](https://github.com/esei-si-dagss/pedidos-rest-21)

## Librerias usadas

* [PrimeReact](https://www.primefaces.org/primereact/): componentes de interfaz
* [react-router-dom](https://reactrouter.com/): rutas y navegación de la aplicación
* [axios](https://axios-http.com/): acceso al API REST

## Creación del proyecto (ya hecho)

```sh
npx create-react-app ejemplo-react

cd ejemplo-react
npm install react-router-dom
npm install axios
npm install primereact
npm install primeicons
npm install primeflex
npm install react-transition-group
```


## Ejecución del proyecto descargado

```
git clone https://github.com/esei-si-dagss/pedidos-react-21.git
cd pedidos-react-21
npm install
npm start
```

Arranca servidor de desarrollo en (http:localhost:3000)

## Estructura y elementos del proyecto

* `src/App.js`: punto de entrada a la aplicaicón, contiene las _rutas_ hacia los componentes que implementan las diferentes vistas
* `src/components`: código de los componentes
  * una carpeta por cada entidad
  * _[entidad]_`Listado.js`: vista del listado de entidades 
  * _[entidad]_`Detalle.js`: vista de detalle de cada entidad
* `src/services`: clases que encapsulan las operaciones de acceso a los _endpoint_ REST mediante la libreria _axios_ 
  * `clienteREST.js` encapsula el objeto _axios_ 
  *  _[entidad]_`Service.js` encapsula las operaciones sobre cada entidad

## Añadidos

