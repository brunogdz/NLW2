import express from 'express';
import routes from './routes';
import cors from 'cors';




// http://localhost:3333/users
// http://localhost:3333/contacts

// Todos os links tem porta, a padrão é a 80 


// GET: Buscar ou listar uma informação
// POST: Criar alguma nova informação dentro do backend
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente

// Corpo ( Request Body ): Dados para criação ou atualização de um registro
// Router Params: Identificar qual o recurso quero atualizar ou deletar na rota
//  Query Params: Paginação, filtros e ordenação

// app.get('/users', (request, response) => {
//     console.log(request.body)

//     const users = [
//         {name: "Diego", age: 25},
//         {name: "Bruno", age: 22},
//     ];


//     return response.json(users)
// })
const app = express();

app.use(cors())
app.use(express.json());

app.use(routes);
//localhost:3333

app.listen(3333); //ouvir uma requisição HTTP