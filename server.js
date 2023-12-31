import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/revista', (request, reply) => {
// Acessando dados do corpo da requisição
    const {titulo, editora, categoria} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        titulo: titulo,
        editora: editora,
        categoria: categoria,
    })

    return reply.status(201).send
})

server.get('/revista', (request) => {
    const search = request.query.search
    console.log(search)
    const revistas = database.list(search)
    console.log(revistas)
    return revistas
})

server.put('/revistas/:id', (request, reply) => {
    const revistaId = request.params.id
    const {titulo, editora, categoria} = request.body
    const revista = database.update(revistaId, {
        titulo: titulo,
        editora: editora,
        categoria: categoria,
    })
    return reply.status(204).send()
})

server.delete('/revistas/:id', (request, reply) => {
    const revistaId = request.params.id

    database.delete(revistaId)

    return reply.status(204).send()
}) 

server.listen({
    port:3333,
})