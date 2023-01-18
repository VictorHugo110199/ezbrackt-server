<h1 align="center">Documentação da API - ezBracket 🏆</h1>

<h3 align="center">Plataforma de gerenciamento de torneios entre amigos de forma rápida e gratuita!</h3>

<br/>

## 📝 Sumário

1) Links da aplicação
2) Tecnologias utilizadas
3) Sobre os testes
	- Rodando os testes
4) Rotas da aplicação
	- Rotas do usuário
	- Rota de login
	- Rotas do campeonato
	- Rotas do player
	- Rotas do chaveamento
5) Desenvolvedores responsáveis


<br>

## ✅ Links da aplicação
- URL de teste: http://localhost:3333
- URL de produção: https://ezbracket2.onrender.com

<br>

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

**Observações:** 

- Caso o usuário decida alterar a senha, deve conter 8 digítos, um caractere maiúsculo, um caractere minúsculo, um número e um caractere especial. 

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

Essa rota irá alterar a propriedade *isActive* do usuário para falso, realizando um soft delete e tornando inativa a conta. 

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

### 1) Logar o usuário na plataforma - POST /login

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

#

### 2) Listar todos os campeonatos da plataforma - GET /competitions
Essa rota só pode ser acessada por usuários autenticados (token).

``
Exemplo de response - status 200
``

```javascript
[
	{
		"id": "95247976-fb72-41b7-8f6f-217a924d1b4d",
		"name": "Campeonato de Teste",
		"status": true,
		"winner": null,
		"number_players": 4,
		"description": "Aqui vem a descrição!",
		"createdAt": "2023-01-18T00:13:58.444Z",
		"updatedAt": "2023-01-18T00:13:58.444Z",
		"isActive": true,
		"user": {
			"id": "f79570b5-8409-4214-9767-75eacad4d2fc",
			"name": "Matheus",
			"email": "devmatheus@email.com",
			"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673980950/fzexxndzvioavmpqexxp.jpg",
			"isActive": true,
			"createdAt": "2023-01-17T18:42:31.469Z",
			"updatedAt": "2023-01-17T18:42:31.469Z"
		},
		"players": [],
		"bracket": []
	},
	{
		"id": "b096be51-caca-47ae-9e54-2445f0a4afe8",
		"name": "Campeonato de Teste 2",
		"status": true,
		"winner": null,
		"number_players": 8,
		"description": "Aqui vem a descrição!",
		"createdAt": "2023-01-18T00:14:13.194Z",
		"updatedAt": "2023-01-18T00:14:13.194Z",
		"isActive": true,
		"user": {
			"id": "f79570b5-8409-4214-9767-75eacad4d2fc",
			"name": "Matheus",
			"email": "devmatheus@email.com",
			"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673980950/fzexxndzvioavmpqexxp.jpg",
			"isActive": true,
			"createdAt": "2023-01-17T18:42:31.469Z",
			"updatedAt": "2023-01-17T18:42:31.469Z"
		},
		"players": [],
		"bracket": []
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

### 3) Listar todos os campeonatos de um usuário - GET /users/:idUser/competitions
Essa rota só pode ser acessada por usuários autenticados (token).

``
Exemplo de response - status 200
``

```javascript
[
	{
		"id": "95247976-fb72-41b7-8f6f-217a924d1b4d",
		"name": "Campeonato de Teste",
		"status": true,
		"winner": null,
		"number_players": 4,
		"description": "Aqui vem a descrição!",
		"createdAt": "2023-01-18T00:13:58.444Z",
		"updatedAt": "2023-01-18T00:13:58.444Z",
		"isActive": true
	},
	{
		"id": "b096be51-caca-47ae-9e54-2445f0a4afe8",
		"name": "Campeonato de Teste 2",
		"status": true,
		"winner": null,
		"number_players": 8,
		"description": "Aqui vem a descrição!",
		"createdAt": "2023-01-18T00:14:13.194Z",
		"updatedAt": "2023-01-18T00:14:13.194Z",
		"isActive": true
	},
	{
		"id": "7886c810-38db-44f0-8ac1-d0c95ca65342",
		"name": "Campeonato de Teste 2",
		"status": true,
		"winner": null,
		"number_players": 8,
		"description": "Aqui vem a descrição!",
		"createdAt": "2023-01-18T00:16:55.732Z",
		"updatedAt": "2023-01-18T00:16:55.732Z",
		"isActive": true
	},
	{
		"id": "d3a8aa3c-ea8f-4a03-af78-b45c243303a0",
		"name": "Campeonato de Teste 2",
		"status": true,
		"winner": null,
		"number_players": 8,
		"description": "Aqui vem a descrição!",
		"createdAt": "2023-01-18T00:17:03.506Z",
		"updatedAt": "2023-01-18T00:17:03.506Z",
		"isActive": true
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

### 4) Editar um campeonato - PATCH /competitions/:id
Essa rota só pode ser acessada por usuários autenticados (token).

``
Exemplo de body
``

```javascript
{
	
	"description": "Testando uma nova descrição!"
}
```

``
Exemplo de response - status 200
``

```javascript
{
	"id": "5c230b92-6adf-475e-aecd-0e4873f0599a",
	"name": "Campeonato de Teste",
	"status": true,
	"winner": null,
	"number_players": 4,
	"description": "Testando uma nova descrição!",
	"createdAt": "2023-01-17T18:10:13.754Z",
	"updatedAt": "2023-01-17T18:10:39.502Z",
	"isActive": true,
	"user": {
		"id": "36d57704-69e0-4fe7-89ee-0f46f8f0fefc",
		"name": "Matheus",
		"email": "matheusteste@email.com",
		"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979000/iq3iyw2znpvuro1fn7kr.jpg",
		"isActive": true,
		"createdAt": "2023-01-17T18:10:01.181Z",
		"updatedAt": "2023-01-17T18:10:01.181Z"
	}
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
Exemplo de response caso o campeonato não seja encontrado ou não exista - status 404
`` 

```javascript
{
	"message": "Competição não encontrada."
}
```

<br>

``
Exemplo de response caso o campeonato não tenha sido criado pelo usuário logado - status 401
`` 

```javascript
{
	"message": "Campeonato inválido."
}
```

#

### 5) Deletar um campeonato - DELETE /competitions/:id
Essa rota só pode ser acessada por usuários autenticados (token).

Essa rota irá alterar a propriedade *isActive* do campeonato para falso, realizando um soft delete e tornando-o inativo.

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
Exemplo de response caso o campeonato não seja encontrado ou não exista - status 404
`` 

```javascript
{
	"message": "Competição não encontrada."
}
```

<br>

``
Exemplo de response caso o campeonato não tenha sido criado pelo usuário logado - status 401
`` 

```javascript
{
	"message": "Campeonato inválido."
}
```

<br>

#

### Rotas de player

#

### 1) Adicionar um player ao campeonato - POST /competitions/:id/players
Essa rota só pode ser acessada por usuários autenticados (token).

Essa rota receberá uma foto em formato de arquivo jpg, jpeg ou png, armazenando a mesma em um banco de dados e convertendo o arquivo para uma URL.

É necessário acrescentar as seguintes configurações no *headers* da requisição:

```javascript
Content-Type: "application/json",
image: "multipart/form-data"
```

<br>

**Observações:** 

- Ao adicionar o player, o campo de foto é opcional. Caso o usuário opte por não enviar, o valor retornado será null.

``
Exemplo de body
``

```
    name: Player
```

``
Exemplo de response - status 201
`` 

```javascript
{
	"name": "Player",
	"photo": null,
	"id": "1a54933a-47e7-426d-9c9f-138e8f6c675e",
	"competition": {
		"id": "31cde0cb-e276-42e0-b7ca-44e519df0109",
		"name": "Campeonato de Teste 2",
		"status": true,
		"winner": null,
		"number_players": 8,
		"description": "Aqui vem a descrição!",
		"createdAt": "2023-01-18T04:29:16.504Z",
		"updatedAt": "2023-01-18T04:29:16.504Z",
		"isActive": true
	}
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
Exemplo de response caso o campeonato não seja encontrado ou não exista - status 404
`` 

```javascript
{
	"message": "Competição não encontrada."
}
```

<br>

``
Exemplo de response caso o campeonato não tenha sido criado pelo usuário logado - status 401
`` 

```javascript
{
	"message": "Campeonato inválido."
}
```

<br>

``
Exemplo de response caso o campeonato já tenha atingido o número máximo de usuários - status 409
`` 

```javascript
{
	"message": "Esse campeonato já atingiu o número máximo de players"
}
```

#

### 2) Listar os players de um campeonato - GET /competitions/:id/players
Essa rota só pode ser acessada por usuários autenticados (token).

``
Exemplo de response - status 200
``

```javascript
[
	{
		"id": "1a54933a-47e7-426d-9c9f-138e8f6c675e",
		"name": "Matheus",
		"photo": null
	},
	{
		"id": "ffeb57ca-e4f0-4377-8839-81f4d682be92",
		"name": "Victor",
		"photo": null
	},
	{
		"id": "a0889fee-2b62-4f12-b49a-250fd3ea94dd",
		"name": "Ayrton",
		"photo": null
	},
	{
		"id": "28400533-44d1-470d-b6b3-31fe7dcaaaf8",
		"name": "Fred",
		"photo": null
	},
	{
		"id": "ae8c1697-6e49-4181-8909-e8c2bc71a7d9",
		"name": "Gustavo",
		"photo": null
	},
	{
		"id": "1868d14e-9376-4918-a358-935f81d0c3f2",
		"name": "Pedro",
		"photo": null
	},
	{
		"id": "a2fc8fca-264c-45bb-977f-a5cdf8d40df7",
		"name": "Enrico",
		"photo": null
	},
	{
		"id": "9e149084-ab4b-427d-8045-c401e0d532a8",
		"name": "Jardel",
		"photo": null
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

<br>

``
Exemplo de response caso o campeonato não seja encontrado ou não exista - status 404
`` 

```javascript
{
	"message": "Competição não encontrada."
}
```

#

### 3) Editar um player - PATCH /players/:id
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
    name: Gustavo
```

``
Exemplo de response - status 200
`` 

```javascript
{
	"id": "a1d12cc0-ba5a-4841-8378-55387e5315e7",
	"name": "Gustavo",
	"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979117/koea44w0oj1h8jrottyo.jpg"
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
Exemplo de response caso o player não seja encontrado ou não exista - status 404
`` 

```javascript
{
	"message": "Jogador não encontrado."
}
```

<br>

#

### Rotas de chaveamento (Brackets)

#

### 1) Iniciar o chaveamento de uma competição - POST /brackets/:idCampeonato
Essa rota só pode ser acessada por usuários autenticados (token).

**Observações:** 

- Não é necessário enviar nenhuma informação no body.

``
Exemplo de response - status 201
``

```javascript
{
	"id": "a3896bed-7b24-401c-95bf-669898b2059c",
	"name": "Campeonato de Teste",
	"status": true,
	"winner": null,
	"number_players": 4,
	"description": "Aqui vem a descrição!",
	"createdAt": "2023-01-17T18:11:22.909Z",
	"updatedAt": "2023-01-17T18:11:22.909Z",
	"isActive": true,
	"players": [
		{
			"id": "1ad7b1f1-f431-4182-ab0b-ee00a883276a",
			"name": "Gustavo",
			"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979085/fy8ca8ckjka9ro9iv2fk.jpg"
		},
		{
			"id": "9c464d5b-6d68-4d92-8ccb-a7b3a36bae2e",
			"name": "Enrico",
			"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979087/vtlgaurg5abnfwf8odaq.jpg"
		},
		{
			"id": "b6e6c5c4-ec76-4d74-9e45-1ffb5a5bfd06",
			"name": "Fred",
			"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979087/vvvwbzdhugwhzkke97i6.jpg"
		},
		{
			"id": "a1d12cc0-ba5a-4841-8378-55387e5315e7",
			"name": "Ayrton",
			"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979117/koea44w0oj1h8jrottyo.jpg"
		}
	],
	"bracket": [
		{
			"id": "e8634a7d-e3e8-4435-98d1-8187257ade8b",
			"currentRound": 2,
			"status": true,
			"player1": {
				"id": "1ad7b1f1-f431-4182-ab0b-ee00a883276a",
				"name": "Gustavo",
				"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979085/fy8ca8ckjka9ro9iv2fk.jpg"
			},
			"player2": {
				"id": "9c464d5b-6d68-4d92-8ccb-a7b3a36bae2e",
				"name": "Enrico",
				"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979087/vtlgaurg5abnfwf8odaq.jpg"
			},
			"winner": null,
			"loser": null
		},
		{
			"id": "0477cab5-61a0-4840-8a4a-71fbc3c5d5b2",
			"currentRound": 2,
			"status": true,
			"player1": {
				"id": "b6e6c5c4-ec76-4d74-9e45-1ffb5a5bfd06",
				"name": "Fred",
				"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979087/vvvwbzdhugwhzkke97i6.jpg"
			},
			"player2": {
				"id": "a1d12cc0-ba5a-4841-8378-55387e5315e7",
				"name": "Ayrton",
				"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979117/koea44w0oj1h8jrottyo.jpg"
			},
			"winner": null,
			"loser": null
		}
	]
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
Exemplo de response caso o campeonato não seja encontrado ou não exista - status 404
`` 

```javascript
{
	"message": "Competição não encontrada."
}
```

<br>

``
Exemplo de response caso o campeonato não tenha sido criado pelo usuário logado - status 401
`` 

```javascript
{
	"message": "Campeonato inválido."
}
```

#

### 2) Definir o vencedor de um chaveamento - POST /brackets/winner/:idBracket
Essa rota só pode ser acessada por usuários autenticados (token).

``
Exemplo de body
``

```javascript
{
	"winner": "1ad7b1f1-f431-4182-ab0b-ee00a883276a"
}
```

``
Exemplo de response - status 201
``

```javascript
{
	"id": "e8634a7d-e3e8-4435-98d1-8187257ade8b",
	"currentRound": 2,
	"status": true,
	"player1": {
		"id": "1ad7b1f1-f431-4182-ab0b-ee00a883276a",
		"name": "Victor",
		"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979085/fy8ca8ckjka9ro9iv2fk.jpg"
	},
	"player2": {
		"id": "9c464d5b-6d68-4d92-8ccb-a7b3a36bae2e",
		"name": "Gustavo",
		"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979087/vtlgaurg5abnfwf8odaq.jpg"
	},
	"winner": {
		"id": "1ad7b1f1-f431-4182-ab0b-ee00a883276a",
		"name": "Victor",
		"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979085/fy8ca8ckjka9ro9iv2fk.jpg"
	},
	"loser": {
		"id": "9c464d5b-6d68-4d92-8ccb-a7b3a36bae2e",
		"name": "Gustavo",
		"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979087/vtlgaurg5abnfwf8odaq.jpg"
	},
	"competition": {
		"id": "a3896bed-7b24-401c-95bf-669898b2059c",
		"name": "Campeonato de Teste",
		"status": true,
		"winner": null,
		"number_players": 4,
		"description": "Aqui vem a descrição!",
		"createdAt": "2023-01-17T18:11:22.909Z",
		"updatedAt": "2023-01-17T18:11:22.909Z",
		"isActive": true
	}
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
Exemplo de response caso o chaveamento não seja encontrado ou não exista - status 404
`` 

```javascript
{
	"message": "Chaveamento não encontrado."
}
```

#

### 3) Criação de uma nova rodada de jogos - POST /brackets/games/:idCampeonato
Essa rota só pode ser acessada por usuários autenticados (token).

**Observações:** 

- Não é necessário enviar nenhuma informação no body.

``
Exemplo de response - status 201
``

```javascript
{
	"id": "a3896bed-7b24-401c-95bf-669898b2059c",
	"name": "Campeonato de Teste",
	"status": true,
	"winner": null,
	"number_players": 4,
	"description": "Aqui vem a descrição!",
	"createdAt": "2023-01-17T18:11:22.909Z",
	"updatedAt": "2023-01-17T18:11:22.909Z",
	"isActive": true,
	"players": [
		{
			"id": "1ad7b1f1-f431-4182-ab0b-ee00a883276a",
			"name": "Matheus",
			"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979085/fy8ca8ckjka9ro9iv2fk.jpg"
		},
		{
			"id": "9c464d5b-6d68-4d92-8ccb-a7b3a36bae2e",
			"name": "Victor",
			"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979087/vtlgaurg5abnfwf8odaq.jpg"
		},
		{
			"id": "b6e6c5c4-ec76-4d74-9e45-1ffb5a5bfd06",
			"name": "Fred",
			"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979087/vvvwbzdhugwhzkke97i6.jpg"
		},
		{
			"id": "a1d12cc0-ba5a-4841-8378-55387e5315e7",
			"name": "Enrico",
			"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979117/koea44w0oj1h8jrottyo.jpg"
		}
	],
	"bracket": [
		{
			"id": "0477cab5-61a0-4840-8a4a-71fbc3c5d5b2",
			"currentRound": 2,
			"status": true,
			"player1": {
				"id": "b6e6c5c4-ec76-4d74-9e45-1ffb5a5bfd06",
				"name": "Fred",
				"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979087/vvvwbzdhugwhzkke97i6.jpg"
			},
			"player2": {
				"id": "a1d12cc0-ba5a-4841-8378-55387e5315e7",
				"name": "Enrico",
				"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979117/koea44w0oj1h8jrottyo.jpg"
			},
			"winner": null,
			"loser": null
		},
		{
			"id": "e8634a7d-e3e8-4435-98d1-8187257ade8b",
			"currentRound": 2,
			"status": true,
			"player1": {
				"id": "1ad7b1f1-f431-4182-ab0b-ee00a883276a",
				"name": "Matheus",
				"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979085/fy8ca8ckjka9ro9iv2fk.jpg"
			},
			"player2": {
				"id": "9c464d5b-6d68-4d92-8ccb-a7b3a36bae2e",
				"name": "Victor",
				"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979087/vtlgaurg5abnfwf8odaq.jpg"
			},
			"winner": {
				"id": "1ad7b1f1-f431-4182-ab0b-ee00a883276a",
				"name": "Matheus",
				"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979085/fy8ca8ckjka9ro9iv2fk.jpg"
			},
			"loser": {
				"id": "9c464d5b-6d68-4d92-8ccb-a7b3a36bae2e",
				"name": "Victor",
				"photo": "http://res.cloudinary.com/dx5jdvqp6/image/upload/v1673979087/vtlgaurg5abnfwf8odaq.jpg"
			}
		}
	]
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
Exemplo de response caso o chaveamento inicial ainda não tenha sido criado - status 400
`` 

```javascript
{
	"message": "O chaveamento ainda não foi criado!"
}
```

<br/>

<h1 align="center">👥 Desenvolvedores responsáveis</h1> 

<table align="center">
  <tr>
        <td align="center">
        <img src="https://media.licdn.com/dms/image/C4D03AQFebRQHqQaWxw/profile-displayphoto-shrink_800_800/0/1578356668381?e=1679529600&v=beta&t=BkqeyKBrnPZ26qGVCIK3weHMwFgdAXee8qiwKYnvHUw" width="100px;" alt="Foto do Fred"/><br>          
        <sub>
          <b>Frederico Almeida</b>  <br/>
          <b>Scrum Master</b> <br/>
           <div align="center">
            <a href="https://github.com/almeidafrederico" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
           </div>
            <div align="center">
                <a href="https://www.linkedin.com/in/almeidaafrederico/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
            </div>
        </sub>
    </td> 
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/102761014?v=4" width="100px;" alt="Foto do Matheus"/><br>        
        <sub>
          <b>Matheus Felipe</b> <br/>
          <b>Tech Lead</b> <br/>
          <div align="center">
            <a href="https://github.com/matheusfelipetp" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
          </div>
           <div align="center">
            <a href="https://www.linkedin.com/in/matheusfelipetp/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
           </div>
        </sub>
    </td>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/106685596?v=4" width="100px;" alt="Foto do Pedro"/><br>        
        <sub>
          <b>Pedro Silva</b> <br/>
          <b>Product Owner</b> <br/>
           <div align="center">
            <a href="https://github.com/Pedrosilvacwb" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
           </div>
            <div align="center">
              <a href="https://www.linkedin.com/in/pedrosilvacwb/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
             </div>
        </sub>
    </td>
     <td align="center">
        <img src="https://pps.whatsapp.net/v/t61.24694-24/118824223_173753290990422_8774592077882010571_n.jpg?ccb=11-4&oh=01_AdSB8ciuqkI8u20vp4uT1MIozcx3idV-UlRnYl2EhTuuZw&oe=63D4A61A" width="100px;" alt="Foto do Gustavo"/><br>        
        <sub>
            <b>Gustavo Ferreira</b> <br/>
            <b>Dev</b> <br/>
             <div align="center">
            <a href="https://github.com/guferreira1" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
            </div>
            <div align="center">
                <a href="https://www.linkedin.com/in/gus-ferreira/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
            </div>
        </sub>
    </td>   
  </tr>
</table>
<table align="center">
  <tr>
  <td align="center">
        <img src="https://media.licdn.com/dms/image/C5603AQEuHFmQVdW6dA/profile-displayphoto-shrink_800_800/0/1653584673425?e=1679529600&v=beta&t=pQNg-wQuNhfovUPGwH7WlADUp1BQls_l9kArPtw_QDQ" width="100px;" alt="Foto do Ayrton"/><br>          
        <sub>
          <b>Ayrton Hideo</b>  <br/>
          <b>Dev</b> <br/>
           <div align="center">
            <a href="https://github.com/hideo651" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
            </div>
             <div align="center">
                <a href="https://www.linkedin.com/in/ayrton-hideo-hirata-29aa4367/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
             </div>
        </sub>
    </td> 
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/106822915?v=4" width="100px;" alt="Foto do Enrico"/><br>          
        <sub>
          <b>Enrico Vieira</b>  <br/>
            <b>Dev</b> <br/>
             <div align="center">
            <a href="https://github.com/enricovieira" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
            </div>
             <div align="center">
                <a href="https://www.linkedin.com/in/enricovieira/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
             </div>
        </sub>
    </td>    
    <td align="center">
        <img src="https://pps.whatsapp.net/v/t61.24694-24/306644115_1172256033388510_7570431730471049903_n.jpg?ccb=11-4&oh=01_AdTaozxJ1cX3GslH3rwaFvn-rLbftEmfDQujF9-Jm5UjDQ&oe=63D48E4D" width="100px;" alt="Foto do Victor"/><br>          
        <sub>
          <b>Victor Silva</b>  <br/>
          <b>Dev</b> <br/>
          <div align="center">
            <a href="https://github.com/VictorHugo110199" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
          </div>
          <div align="center">
            <a href="https://www.linkedin.com/in/victor-hugo-santos-silva-b5ab7a144/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
           </div> 
        </sub>
    </td> 
  </tr>
</table>
