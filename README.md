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

**OBS: Configure as variáveis de ambiente no seu *.env*, passando as credenciais corretas para conectar em seu banco local.**

<br>

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

**Observações:** 

- Ao criar o cadastro, o campo de foto é opcional. Caso o usuário opte por não enviar, o valor retornado será null.
- A senha deve conter 8 digítos, um caractere maiúsculo, um caractere minúsculo, um número e um caractere especial. 

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

<br>

``
Exemplo de response com e-mail já existente - status 409
``

```javascript
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

```javascript
{
	"message": "Token inválido"
}
```

#

### 3) Listar um usuário pelo ID - GET /users/:id
Essa rota só pode ser acessada por usuários autenticados (token).

``
Exemplo de response - status 200
`` 

```javascript
{
	"id": "80daa530-6b30-48f4-8fec-a8c31dc07c27",
	"name": "Matheus",
	"email": "matheus123@email.com",
	"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673978447/ar7coempzfsm4ah6rgzf.jpg",
	"isActive": true,
	"createdAt": "2023-01-17T17:56:49.075Z",
	"updatedAt": "2023-01-17T18:00:48.050Z"
}
```

<br>

``
Exemplo de response caso o usuário não esteja autenticado - status 401
`` 

```javascript
{
	"message": "Token inválido"
}
```

<br>

``
Exemplo de response caso o usuário não seja encontrado ou não exista - status 404
`` 

```javascript
{
	"message": "Usuário não encontrado."
}
```

#

### 4) Listar o usuário logado - GET /profile
Essa rota só pode ser acessada por usuários autenticados (token).

``
Exemplo de response - status 200
`` 

```javascript
{
	"id": "144183e5-7e7c-467c-87e9-837a1871380c",
	"name": "Matheus",
	"email": "matheus@email.com",
	"photo": null,
	"isActive": true,
	"createdAt": "2023-01-17T17:51:54.495Z",
	"updatedAt": "2023-01-17T17:51:54.495Z"
}
```

<br>

``
Exemplo de response caso o usuário não esteja autenticado - status 401
`` 

```javascript
{
	"message": "Token inválido"
}
```

#

### 5) Editar as informações do usuário - PATCH /users/:id
Essa rota só pode ser acessada por usuários autenticados (token).

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
	name: Gustavo Ferreira
	email: gustavoferreira@email.com
	image: perfil.png
```

``
Exemplo de response - status 200
`` 

```javascript
{
	"id": "144183e5-7e7c-467c-87e9-837a1871380c",
	"name": "Gustavo Ferreira",
	"email": "gustavoferreira@email.com",
	"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673982104/xnjz65laze21axzbldhb.jpg",
	"isActive": true,
	"createdAt": "2023-01-17T17:51:54.495Z",
	"updatedAt": "2023-01-17T19:01:45.068Z"
}
```

<br>

``
Exemplo de response caso o usuário não esteja autenticado - status 401
`` 

```javascript
{
	"message": "Token inválido"
}
```

#

### 6) Deletar um usuário - DELETE /users/:id
Essa rota só pode ser acessada por usuários autenticados (token).

Caso esteja tudo certo, essa rota irá retornar um status 204 (sem conteúdo).

``
Exemplo de response caso o usuário não esteja autenticado - status 401
`` 

```javascript
{
	"message": "Token inválido"
}
```

<br>

``
Exemplo de response caso o usuário não seja encontrado ou não exista - status 404
`` 

```javascript
{
	"message": "Usuário não encontrado."
}
```

<br>

``
Exemplo de response em tentativa de deletar outro usuário - status 401
`` 

```javascript
{
	"message": "Não é possível alterar outro usuário."
}
```

<br>

#

### Rota de login

#

### Logar o usuário na plataforma - POST /login

``
Exemplo de body
``

```javascript
{
	"email":"pedro@email.com",
	"password":"Teste123@"
}
```

``
Exemplo de response - status 200
``

```javascript
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY3OTU3MGI1LTg0MDktNDIxNC05NzY3LTc1ZWFjYWQ0ZDJmYyIsImlhdCI6MTY3Mzk4NTg4MywiZXhwIjoxNjc0MDcyMjgzLCJzdWIiOiJkZXZtYXRoZXVzQGVtYWlsLmNvbSJ9.M078jIl7NpsZI9tag4X_dCj7CKdoSobCD8toWkGgycY"
}
```

<br>

``
Exemplo de response na tentativa de logar com um usuário inativo - status 400
``

```javascript
{
	"message": "Usuário inativo!"
}
```

<br>

``
Exemplo de response na tentativa de logar com o usuário/senha inválido - status 401
``

```javascript
{
	"message": "Usuário ou senha inválido!"
}
```

<br>

#

### Rotas de Campeonato

#

### 1) Criação do campeonato - POST /competitions
Essa rota só pode ser acessada por usuários autenticados (token).

``
Exemplo de body
``

```javascript
{
	"name":"Campeonato de Teste",
	"number_players": 4,
	"description":"Aqui vem a descrição!"
}
```

``
Exemplo de response - status 201
``

```javascript
{
	"name": "Campeonato de Teste",
	"number_players": 4,
	"description": "Aqui vem a descrição!",
	"user": {
		"id": "36d57704-69e0-4fe7-89ee-0f46f8f0fefc",
		"name": "Matheus",
		"email": "matheusteste@email.com",
		"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979000/iq3iyw2znpvuro1fn7kr.jpg",
		"isActive": true,
		"createdAt": "2023-01-17T18:10:01.181Z",
		"updatedAt": "2023-01-17T18:10:01.181Z"
	},
	"winner": null,
	"id": "a3896bed-7b24-401c-95bf-669898b2059c",
	"status": true,
	"createdAt": "2023-01-17T18:11:22.909Z",
	"updatedAt": "2023-01-17T18:11:22.909Z",
	"isActive": true
}
```

<br>

``
Exemplo de response caso o usuário não esteja autenticado - status 401
`` 

```javascript
{
	"message": "Token inválido"
}
```
