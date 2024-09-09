# medicalClient
Repositorio de cliente para administrador de citas médicas.

## Instalación

Antes de ejecutar el programa, puede tener [NGINX](https://nginx.org/en/download.html) instalado y configurado, o ejecutar localmente.

## Uso con NGINX

Instalar y configurar NGINX segun este video de referencia, creado por TechWebDocs: https://www.youtube.com/watch?v=DKXdkXCgtCQ&t=106s

Una vez instalado NGINX, en la carpeta htdocs guardar el proyecto.

Luego, en el archvivo nginx.conf, agregar la ruta del proyecto en la sección de location
```
        location / {
            #root   html;
            root   "/nginx/htdocs/medicalClient";
            index  index.html index.htm;
        }
```

Finalmente, ya puede iniciar el servidor y ejecutar el programa.

## Colaboradores

Proyecto creado por:

### - Esteban Coronado
[![Github](https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white)](https://github.com/Esteban-Coronado)
### - William Cely
[![Github](https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white)](https://github.com/WilliamC111)
### - Andrés Maldonado
[![Github](https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white)](https://github.com/AndresMaldonado200338)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/amaldonados/)
