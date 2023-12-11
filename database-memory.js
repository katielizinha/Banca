import { randomUUID } from "crypto"

export class DatabaseMemory{
#revistas = new Map()

list(search){
    return Array.from(this.#revistas.entries()).map((revistasArray) =>{
    // acessando primeira posição
        const id = revistasArray[0]
        const data = revistasArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(revista => {
        if (search){
            return revista.titulo.includes(search)
        }
        return true
    })
}
create(revista){
    const revistaId = randomUUID()
    this.#revistas.set(revistaId, revista)
}
update(id, revista){
    this.#revistas.set(id, revista) 
}
delete(id, revista){
    this.#revistas.delete(id, revista)
}
}