const fs = require('fs')

// Con ayuda del conmando "file system" de node JS guardan los archivos en la base da datos.
// Un directorio general y como es la función con "Sync", no necesita callback para manejar errores

const directory = './database/db.json'
const saveFile = (tasks) => {
    fs.writeFileSync(directory, JSON.stringify(tasks))
}

const readFile = () => {
    const file = fs.readFileSync(directory)
    return JSON.parse(file)
}

module.exports = {
    saveFile,
    readFile
}