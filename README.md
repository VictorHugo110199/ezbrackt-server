<h1 align="center">Documentação da API - ezBracket 🏆</h1>

<br/>

## ✅ Links da aplicação
- URL de teste: http://localhost:3333
- URL de produção: https://ezbracket2.onrender.com

<br/>

## 🦾 **Tecnologias utilizadas**
- **TypeScript**
- **NodeJS**
- **Express**
- **Express-async-errors**
- **Jest**
- **Supertest**
- **PostgreSQL**
- **Bcrypt**
- **Json Web Token**
- **Class-transformer**
- **Dotenv**
- **TypeORM**
- **Multer**
- **Mime-types**
- **Cloudinary**
- **Husky**

#

Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

````
yarn install
````
<br>

**Configure as variáveis de ambiente no seu .env**, passando as credenciais corretas para conectar em seu banco local


Com isso feito, para rodar sua aplicação, basta utilizar o comando
````
yarn dev
````

<br>

## 🔨 **Sobre os testes**

Essa aplicação possui testes, que serão utilizados para validar, se todas as regras de negócio foram aplicadas de maneira correta.

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

Já na subpasta `mocks` estão os dados que serão utilizados para os testes.

No arquivo `jest.config.json` estão algumas configurações necessárias para os testes rodarem.

**`De modo algum altere qualquer um desses arquivos.`** Isso poderá comprometer a integridade dos testes.

E também não altere o script de `test` localizado no `package.json`. Isso será utilizado para rodar os testes.

<br>

## **Rodando os testes** 

Para rodar os testes é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar os comandos a seguir:

### Rodar todos os testes
````
yarn test
````
#
### Rodar todos os testes e ter um log ainda mais completo
````
yarn test --all
````

<br>

**Caso você queira verificar todas as opções de execução de testes, visite a [Documentação oficial do Jest](https://jestjs.io/docs/cli)**

Após rodar um dos comandos aparecerá um log no seu terminal, contendo as informações da execução do teste.

**Observação:** O teste pode demorar alguns segundos para ser finalizado. Quanto maior for o teste, mais tempo será consumido para a execução.

<br>

## ➡️ **Rotas da aplicação**
### Rotas do usuário

#

### 1) Criação do usuário - POST /users
Essa rota receberá uma foto em formato de arquivo jpg, jpeg ou png, armazenando a mesma em um banco de dados e convertendo o arquivo para uma URL.

É necessário acrescentar as seguintes configurações no *headers* da requisição:

```javascript
Content-Type: "application/json",
image: "multipart/form-data"
```

<br>

``
Exemplo de body
``

```
    name: Matheus
    email: devmatheus@email.com
    password: Teste123@
    image: perfil.jpg
```

``
Exemplo de response - status 201
`` 

```javascript
{
	"name": "Matheus",
	"email": "devmatheus@email.com",
	"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673980950/fzexxndzvioavmpqexxp.jpg",
	"id": "f79570b5-8409-4214-9767-75eacad4d2fc",
	"isActive": true,
	"createdAt": "2023-01-17T18:42:31.469Z",
	"updatedAt": "2023-01-17T18:42:31.469Z"
}
```

**OBS: Ao criar o cadastro, o campo de foto é opcional. Caso o usuário opte por não enviar, o valor retornado será null.** 

<br>

``
Exemplo de response com e-mail já existente - status 409
``

```
{
	"message": "E-mail já cadastrado!"
}
```

#

### 2) Listar todos os usuários - GET /users
Essa rota só pode ser acessada por usuários autenticados (token).

``
Exemplo de response - status 200
`` 

```javascript
[
	{
		"id": "8b4684eb-51ef-4784-a10f-4c933816d46e",
		"name": "Enrico",
		"email": "enrico@email.com",
		"photo": null,
		"isActive": true,
		"createdAt": "2023-01-17T17:48:36.490Z",
		"updatedAt": "2023-01-17T17:48:36.490Z"
	},
	{
		"id": "622492f7-fe9b-4361-ba47-18e344904245",
		"name": "Ayrton",
		"email": "ayrton@email.com",
		"photo": null,
		"isActive": true,
		"createdAt": "2023-01-17T17:58:23.003Z",
		"updatedAt": "2023-01-17T17:58:23.003Z"
	},
	{
		"id": "f79570b5-8409-4214-9767-75eacad4d2fc",
		"name": "Matheus",
		"email": "devmatheus@email.com",
		"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673980950/fzexxndzvioavmpqexxp.jpg",
		"isActive": true,
		"createdAt": "2023-01-17T18:42:31.469Z",
		"updatedAt": "2023-01-17T18:42:31.469Z"
	}
]
```
<br>

``
Exemplo de response caso o usuário não esteja autenticado - status 401
`` 
```
{
	"message": "Token inválido"
}
```

<br>

### 3) Listar um usuário pelo ID - GET /users/:id
Essa rota só pode ser acessada por usuários autenticados.

``
Exemplo de response - 200
`` 

```
{
	"id": "d355d8cf-db7a-49db-9e8c-be6098e901d8",
	"name": "Matheus",
	"email": "devmatheus@email.com",
	"photo": null,
	"isActive": true,
	"createdAt": "2023-01-16T18:03:53.434Z",
	"updatedAt": "2023-01-16T18:03:53.434Z"
}
```

``
Exemplo de response caso o usuário não esteja autenticado - 401
`` 
```
{
	"message": "Token inválido"
}
```

``
Exemplo de response caso o usuário não seja encontrado ou não exista - 404
`` 
```
{
	"message": "Usuário não encontrado."
}
```

<br>

### 4) Listar o usuário logado - GET /profile
Essa rota só pode ser acessada por usuários autenticados.

``
Exemplo de response - 200
`` 

```
{
	"id": "a96d9e9f-6b40-4611-b6dd-d064ded7ac9b",
	"name": "gustavo",
	"email": "gustavo@email.com",
	"photo": null,
	"isActive": true,
	"createdAt": "2023-01-12T16:08:21.774Z",
	"updatedAt": "2023-01-12T16:08:21.774Z"
}
```

``
Exemplo de response caso o usuário não esteja autenticado - 401
`` 
```
{
	"message": "Token inválido"
}
```

<br>

### 5) Editar as informações do usuário - PATCH /users/:id
Essa rota só pode ser acessada por usuários autenticados.

``
Exemplo de body
``

```
{
	"name": "Gustavo Ferreira",
	"email": "gustavoferreira@email.com",
}
```

``
Exemplo de response - 200
`` 

```
{
	"id": "a96d9e9f-6b40-4611-b6dd-d064ded7ac9b",
	"name": "Gustavo Ferreira",
	"email": "gustavoferreira@email.com",
	"photo": null,
	"isActive": true,
	"createdAt": "2023-01-12T16:08:21.774Z",
	"updatedAt": "2023-01-16T16:08:21.774Z"
}
```

``
Exemplo de response caso o usuário não esteja autenticado - 401
`` 
```
{
	"message": "Token inválido"
}
```
