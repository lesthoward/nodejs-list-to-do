const { v4: uuidv4 } = require('uuid')

// Generador de objetos con id únicos
class Task {
    constructor(desc) {
        this. id = uuidv4()
        this.completed = null
        this.desc = desc
    }
}

module.exports = Task