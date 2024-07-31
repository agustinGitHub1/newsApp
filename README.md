# newsApp

Esta app fue creada para un challenge técnico de FUDO:

Los requerimientos fundamentales son los siguientes:
1. El diseño básicamente debería ser un Header, Body y un Footer.
2. En el header se debería contar con un buscador de noticias.
3. La página principal debería mostrar todos los artículos devueltos en la primera página
del request en formato de cards, incluyendo título, autor, descripción e imagen.
4. El diseño de la página y de las cards queda totalmente libre de definición. La única
restricción es que tendría que ser responsive y no utilizar ningún framework CSS.
5. Al clickear una card, debería redirigir a una nueva página mostrando únicamente el
contenido de la noticia seleccionada.
6. El proyecto debería subirse a un repositorio en cualquier plataforma.
7. Que en el repositorio, se encuentre el Dockerfile correspondiente para builder la imagen
que sirva la aplicación, utilizando Nginx.
Sugerencias: Contemplar buenas prácticas y tener en cuenta la escalabilidad de la aplicación.
Opcional:
- Hostear la aplicación en gh-pages o cualquier otro hosting.
- Agregar tests.

Aplicacion Hosteada en Vercel (No funciona ya que NewsApi es solo para desarrollo, pero sirve para ver los casos de error cuando no se retorna info de la api): https://news-app-git-main-agustingithub1s-projects.vercel.app/

Screenshots test unitarios:
[![unit-Testcomplete1.png](https://i.postimg.cc/PJ2HQQ7Q/unit-Testcomplete1.png)](https://postimg.cc/n9jNHBpX)
[![unit-Testcomplete2.png](https://i.postimg.cc/T29TxTP5/unit-Testcomplete2.png)](https://postimg.cc/xqcwyDM9)

Para construir la imagen en Docker y despues ejecutar el contenedor usar los siguientes comandos de ejemplo:
docker build -t news-app .

docker run -p 80:80 --name news-app-container news-app


# newsApp
challenge - news app

This app was developed to address a challenge from the company FUDO.

The app was created following these instructions:

1.The design should basically consist of a Header, Body, and Footer.
2.The header should include a news search bar.
3.The main page should display all articles returned on the first page of the request in card format, including title, author, description, and image.
4.The design of the page and cards is completely open-ended. The only restriction is that it should be responsive and should not use any CSS frameworks.
5.Clicking on a card should redirect to a new page displaying only the content of the selected news article.
6.The project should be uploaded to a repository on any platform.
7.The corresponding Dockerfile for building the application image using Nginx should be included in the repository.

Suggestions: 
Consider best practices and keep scalability of the application in mind.

Optional:
Host the application on gh-pages or any other hosting platform.
Add tests.

Application Hosted on Vercel (Not functional as NewsApi is for development only, but useful for seeing error cases when no information is returned from the API): https://news-app-git-main-agustingithub1s-projects.vercel.app/

Screenshots unit tests:
[![unit-Testcomplete1.png](https://i.postimg.cc/PJ2HQQ7Q/unit-Testcomplete1.png)](https://postimg.cc/n9jNHBpX)
[![unit-Testcomplete2.png](https://i.postimg.cc/T29TxTP5/unit-Testcomplete2.png)](https://postimg.cc/xqcwyDM9)


To build a docker image and execute it use the following example commands:
docker build -t news-app .

docker run -p 80:80 --name news-app-container news-app

