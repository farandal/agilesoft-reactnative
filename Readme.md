#AgileSoft react Native Test

![Screenshot](/../master/Screenshots/AgileSoft_ReactNative_Test_1.png?raw=true)
![Screenshot](/../master/Screenshots/AgileSoft_ReactNative_Test_2.png?raw=true)
![Screenshot](/../master/Screenshots/AgileSoft_ReactNative_Test_3.png?raw=true)
![Screenshot](/../master/Screenshots/AgileSoft_ReactNative_Test_4.png?raw=true)
![Screenshot](/../master/Screenshots/AgileSoft_ReactNative_Test_5.png?raw=true)
![Screenshot](/../master/Screenshots/AgileSoft_ReactNative_Test_6.png?raw=true)
![Screenshot](/../master/Screenshots/AgileSoft_ReactNative_Test_7.png?raw=true)
![Screenshot](/../master/Screenshots/AgileSoft_ReactNative_Test_8.png?raw=true)

# AgileSoft ReactNative - Base

## Configuración de Ambiente

### Construir una aplicación React Native

Para comenzar el proyecto, he decidido construir el proyecto con la mínima cantidad de dependencias o boilerplates, para ello he elegido el template de la comunidad de React Native, 
https://github.com/react-native-community/react-native-template-typescript

He decidido utilizar yarn sobre npm, por preferencia personal, pero principalmente por hacer uso de la mejorada capa de caché sobre la gestión de módulos, y por algunas mejoras que tienen que ver con la ejecución de comandos cli desde su configuración en el package.json.

He decidido utilizar Typescript, por preferencia personal, pero también por las ventajas que provee la declaración de tipos lo que hace sentir a Javascript un lenguaje más orientado a objetos de lo que es por su naturaleza flexible de tipos.

Pude haber utilizado Expo, para ayudarme con la compilación del proyecto y el release para android y ios, entre otras ventajas; sin embargo, he decido utilizar el template typescript como mi punto de partida, sin Expo, por lo cuál no dispondré de Expo para el preview de la app, y utilizaré directamente Android Studio y XCode para compilar para cada plataforma. 

### Template
```​​​​
npx react-native init AgileSoftReactNative --template react-native-template-typescript
```

### Dependencias
Typescript
yarn add typescript @types/react @types/react-native @types/react-dom @types/prop-types -D
Helpers

```
yarn add concurrently rimraf -D
```

Se sugiere instalar Jest, para unit testing, sin embargo, este proyecto no contendrá pruebas unitarias.

```
yarn add ts-jest @types/jest @types/react-test-renderer -D
```

### Configuración

El comando a continuación creará el archivo de configuración de typescript tsconfig.json

```
tsc --init
```

El template ha creado varios archivos, tanto para la transpiración de archivos con babel.js, y la configuración de typescript por omisión, además de las carpetas con los proyectos por default para la compilación para android y ios, además de prettier para el linter, y el .watchmanconfig para el hot reload. 
Para la estructura del proyecto, tendré que hacerlo manualmente, por lo que creare la carpeta src, y build, donde se ubicará mi código fuente y build para la distribución. 

```
mkdir src
mkdir src/App
mkdir build
touch src/typings.d.ts -> para los typing por omision, a veces typescript alega por algunos tipos que no encuentra como "global".
mv App.js ./src/App/App.tsx
```

### Sintaxis de componentes funcionales.

Modifiqué el App.tsx del template para utilizar esta forma de sintaxis:
Utilizaré la sintaxis de Componentes Funcionales en React, por lo tanto la mayoría de mis declaraciones se verán de la siguiente forma, está sintaxis alivia principalmente el declarar el tipo de las props pasadas al componente, y así también omitir en el tipo de las props, el tipo children. 

```
const ComponenteFuncional: FC<{title: string}> = ({children, title}): ReactElement => { … }
```

Package.json

Agregué los siguientes comandos en el package.json, y varios más que se pueden ver en el commit:

```
"scripts": {
   "postversion": "react-native-version",
   "tsc": "tsc",
   "clean": "rimraf build",
   "build": "yarn run clean && yarn run tsc --",
   "watch": "yarn run build -- -w",
   "watchAndRunAndroid": "concurrently \"yarn run watch\" \"yarn run android\"",
   "buildRunAndroid": "yarn run build && yarn run watchAndRunAndroid ",
   "watchAndRunIOS": "concurrently \"yarn run watch\" \"yarn run ios\"",
   "buildRunIOS": "yarn run build && yarn run watchAndRunIOS ",
   "watchAndStart": "concurrently \"yarn run watch\" \"yarn run start\"",
   "buildAndStart": "yarn run build && yarn run watchAndStart"
 ...
}
```

### comandos

lint - busca defectos en el código, en base a las reglas que se especifiquen en tslint.json
tsc - corre el transpilador de typescript con las reglas definidas en tsconfig.json
clean - limpia la carpeta build
build - transpila el codigo en la carpeta build
watch - ejecuta el build en cuanto se detectan cambios en la fuente
watchAndStart - corre watch en forma concurrente usando concurrently y ejecuta el comando start en package.json
buildAndStart - ejecuta el comando build y luego watchAndStart


## Correr el ‘boilerplate’ de la aplicación en el emulador 


### IOS

Por primera vez, es necesario actualizar cocoapods, y las dependencias del template

```
cd ios
sudo gem install cocoapods
pod deintegrate
pod install --repo-update
cd ..
yarn run buildRunIOS
```

* Asegurate de abrir en Xcode el proyecto terminado en /ios/*.xcworkspace
* Verifica que deployment info en XCODE coincida con la del Podfile
* Si existen problemas durante el build:
* * Agregar estas líneas en el podfile, y luego reinstalar los pods.

```
pod install
```

* * Revisar que la arquitectura arm64 esté dentro de las arquitecturas excluidas del build en XCode.

```
use_flipper!()
  post_install do |installer|
    react_native_post_install(installer)
        installer.pods_project.build_configurations.each do |config| config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] =  "arm64"
        end
  end

 ...
 use_flipper!()

  post_install do |installer|
    react_native_post_install(installer)
      installer.pods_project.targets.each do |target|
          target.build_configurations.each do |config|
            config.build_settings["ONLY_ACTIVE_ARCH"] = "NO"
          end
      end
  end
```


## Android

yarn run buildRunAndroid

## Iconos

Genere los iconos de la App con appicon.ico, y los reemplace en los destinos indicados.

### iOS
src > ios > *nombre_de_app* > Images.xcassets > AppIcon.appiconset

### Android
src > android > app > src > res

# AgileSoft ReactNative - Boilerplate

## Dependencias
Estas son las dependencias que utilizare para este proyecto, contiene lo escencial para manejar el estado de la app, la navegacion y la comunicacion con la API.

### Navegacion
   
    "react-native-flipper": "^0.94.1",
    "react-native-gesture-handler": "^1.10.3",
    "react-native-reanimated": "^2.2.0",
    "react-native-safe-area-context": "^3.2.0",
    "react-native-screens": "^3.4.0",
    "@react-native-community/masked-view"
    "@react-navigation/bottom-tabs"
    "@react-navigation/native"
    "@react-navigation/stack"
   
    "@react-native-async-storage/async-storage"
    "axios": "^0.21.1"

#### Redux

    "react-redux": "^7.2.4",
    "redux": "^4.1.0",
    "redux-flipper": "^1.4.2",
    "redux-persist": "^6.0.0",
    "@reduxjs/toolkit"
    "@thecodingmachine/redux-toolkit-wrapper"

### Helpers

    "react-i18next": "^11.11.0"
