<h1 align="center">Documentação da API - ezBracket 🏆</h1>

<br/>

## ✅ Links da aplicação
- URL de teste: http://localhost:3333
- URL de produção: https://ezbracket2.onrender.com/

<br/>

# 🦾 **Tecnologias utilizadas**
- **TypeScript**
- **NodeJS**
- **Express**
- **Express-async-errors**
- **Jest**
- **PostgreSQL**
- **Bcrypt**
- **Json Web Token**
- **Class-transformer**
- **Dotenv**
- **TypeORM**

<br/>

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

# 🔨 **Sobre os testes**

Essa aplicação possui testes, que serão utilizados para validar, se todas as regras de negócio foram aplicadas de maneira correta.

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

Já na subpasta `mocks` estão os dados que serão utilizados para os testes.

No arquivo `jest.config.json` estão algumas configurações necessárias para os testes rodarem.

**`De modo algum altere qualquer um desses arquivos.`** Isso poderá comprometer a integridade dos testes.

E também não altere o script de `test` localizado no `package.json`. Isso será utilizado para rodar os testes.

<br>

# **Rodando os testes** 

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
#

### Rodar os testes de uma pasta específica
`detalhe: repare que tests está envolvido por 2 underlines. Isso se chama dunder.`
````
yarn test ./scr/__tests__/integration/<subpasta>
````
#
### Rodar os testes de um arquivo específico
````
yarn test ./scr/__tests__/integration/<subpasta>/<arquivo>
````
#
### Rodar um teste específico
````
yarn test -t <describe ou test específico envolto em aspas>
````
````
\\ ex: yarn test -t "/categories"
\\ rodaria os testes do describe "/categorias" no caminho
\\ ./scr/__tests__/integration/categories/categoriesRoutes.test.ts
````

<br>

**Caso você queira verificar todas as opções de execução de testes, visite a [Documentação oficial do Jest](https://jestjs.io/docs/cli)**

Após rodar um dos comandos aparecerá um log no seu terminal, contendo as informações da execução do teste.

**Observação:** O teste pode demorar alguns segundos para ser finalizado. Quanto maior for o teste, mais tempo será consumido para a execução.

<br>

# ➡️ **Rotas da aplicação**
### Rotas do usuário

#### 1) Criação do usuário - POST /users

``
Exemplo de body
``

```
{
    "name": "Matheus",
    "email": "devmatheus@email.com",
    "password": "Teste123@"
}
```

``
Exemplo de response - 201
`` 

```
{
	"name": "Matheus",
	"email": "devmatheus@email.com",
	"photo": null,
	"id": "d355d8cf-db7a-49db-9e8c-be6098e901d8",
	"isActive": true,
	"createdAt": "2023-01-16T18:03:53.434Z",
	"updatedAt": "2023-01-16T18:03:53.434Z"
}
```

``
Exemplo de response com e-mail já existente - 409
``

```
{
	"message": "E-mail já cadastrado!"
}
```

<br>

#### 2) Listar todos os usuários - GET /users
Essa rota só pode ser acessada por usuários autenticados.

``
Exemplo de response - 200
`` 

```
[
	{
		"id": "21b55338-cf2e-4267-9a9b-6d9c75199893",
		"name": "Enrico",
		"email": "enrico123@email.com",
		"photo": null,
		"isActive": true,
		"createdAt": "2023-01-11T13:12:53.946Z",
		"updatedAt": "2023-01-11T13:12:53.946Z"
	},
	{
		"id": "9360465e-59a1-4226-868e-e5ac83873302",
		"name": "Matheus Felipe",
		"email": "matheus@email.com",
		"photo": null,
		"isActive": true,
		"createdAt": "2023-01-10T18:38:49.853Z",
		"updatedAt": "2023-01-11T16:46:51.845Z"
	},
	{
		"id": "a96d9e9f-6b40-4611-b6dd-d064ded7ac9b",
		"name": "gustavo",
		"email": "gustavo@email.com",
		"photo": null,
		"isActive": true,
		"createdAt": "2023-01-12T16:08:21.774Z",
		"updatedAt": "2023-01-12T16:08:21.774Z"
	}
]
```

``
Exemplo de response caso o usuário não esteja autenticado - 401
`` 
```
{
	"message": "Token inválido"
}
```

#### 3) Listar um usuário pelo ID - GET /users/:id
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
