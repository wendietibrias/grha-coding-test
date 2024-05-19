LIBRARY MANAGEMENT (BOOKS) Documentation

<h2>Client Setup</h2>
<hr>
<br>
<p>Pastikan Bapak/Ibu memiliki versi node.js 20.13.1. Bapak/Ibu dapat menginstallnya dengan mengunakan nvm (node version manager)</p>
<p>Saya pada project kali ini mengunakan vite sebagai frontend tools</p>
<p>langkah pertama seelah anda melakukan clone pada repository ini adalah pada client,anda dapat membuka terminal dan mengetikan command berikut : npm i --save</p>
<p>Langkah selanjutnya adalah Bapak/Ibu dapat mengcopy enviroment variabel dengan file .env.example mengunakan command cp .env.example .env</p>
<p>run project dengan command npm run dev</p>

<h4>Daftar packages yang saya gunakan : </h4>

<ul>
  <li>Sass --> npm i --save sass</li>
  <li>react-router-dom --> npm i --save react-router-dom</p>
  <li>axios --> npm i --save axios</li>
  <li>react-query --> npm i --save react-query</li>
  <li>react-loading --> npm i --save react-loading</li>
  <li>react-hook-form --> npm i --save react-hook-form</li>
  <li>zustand --> npm i --save zustand</li>
  <li>react-select --> npm i --save react-select</li>
  <li>remixicon --> npm i --save remixicon</li>
</ul>
<br>

<h4> Daftar Halaman yang ada</h4>
<ul>
 <li>login --> /auth/</li>
 <li>register --> auth/register</li>
 <li>home (book) --> /</li>
 <li>category --> /category</li>
 <li>create book --> /book/create</li>
 <li>update book --> /book/update/:id</li>
 <li>detail book --> /book/:id</li>
</ul>

<br>
<br>


<h2>Server Setup</h2>
<hr>
<br>

<p>Pada backend project ini saya mengunakan framework Nest.js</p>
<p>Pastikan Bapak/Ibu telah menginstall Nest.js pada komputer Bapak/Ibu dengan command berikut ini :  npm i -g @nestjs/cli</p>
<p>Langkah selanjutnya copy .env.example ke .env : cp .env.example .env</p>
<p>Ketikan command npm install --save</p>

<p> <strong>note:</strong> pastikan anda membuat terlebih dahulu database pada phpmyadmin atau laragon,hal ini dikarenakan saya mengunakan typeorm sebagai ORM dan typeorm akan selalu meminta untuk membuat database terlebih dahulu</p>

<p>Untuk upload gambar saya mengunakan layanan cloud yaitu <strong> Cloudinary </strong></p>
<p>Bapak/Ibu dapat mengunakan api_key dan api_secret yang telah saya sediakan pada .env.example</p>

<p>run project dengan command : npm run start:dev</p>

<h4>Daftar packages yang saya gunakan : </h4>
<ul>
  <li>@nestjs/jwt --> npm i --save @nestjs/jwt</li>
  <li>@nestjs/config --> npm i --save @nestjs/config</li>
  <li>@nestjs/swagger --> npm i --save @nestjs/swagger</li>
  <li>@nestjs/typeorm --> npm i --save @nestjs/typeorm</li>
  <li>bcrypt --> npm i --save bcrypt</li>
  <li>class-transformer class-validator --> npm i --save class-transformer class-validator</li>
  <li> npm i --save mysql2 typeorm</li>
  <li>cloudinary --> npm i --save cloudinary</li>
</li>
<br>

<h4>Daftar routing yang dapat diaccess : </h4>
<ul>
  <li> /v1/api/auth/login --> POST</li>
  <li> /v1/api/auth/register --> POST</li>

  <li> /v1/api/book/all --> GET</li>
  <li> /v1/api/book/create --> POST</li>
  <li> /v1/api/book/delete/:id --> DELETE</li>
  <li> /v1/api/book/update/:id --> PATCH</li>

  <li> /v1/api/category/all --> GET</li>
  <li> /v1/api/category/select-option --> GET</li>
  <li> /v1/api/category/create --> POST</li>
  <li> /v1/api/category/delete/:id --> DELETE</li>
<ul>


<p>base api URL : http://localhost:8080/v1/api</p>
<p> access documantasi swagger pada url berikut : http://localhost:8080/docs</p>
