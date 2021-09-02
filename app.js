// 1. Para colocar un código asincrono, utilizar una función principal
// 2. Un helper para organizar el código. Dentro del mismo un messages.js 
// 3. El menú debe repetirse infinitamente mientras la opción sea diferente de 0

const { saveFile, readFile } = require("./helpers/databaseInteractive")
const {inquirerMenu, pause, typeOnce, deleteTaskInquirer, confirm, markTasks} = require("./helpers/inquirer")
const Tasks = require("./models/tasks")
// Manual Example
// const { showMessage, pause } = require("./helpers/messages")



// Es necesario colocar el "async" para detener el código, de lo contrario javaScript nunca se detiene y el código debe devolver una promesa
const main = async () => {
    let anwser = ''
    const tasks = new Tasks()
    
    const readTasksDB = readFile()
    if(readTasksDB) {
        tasks.loadTasksFromArray(readTasksDB)
        tasks.listToDo
    }
    
    do {
        console.clear();
        // Print the main menu and gets a result
        anwser = await inquirerMenu()
        switch (anwser) {
            case '1':
                const descTask = await typeOnce('Description of the task:')
                tasks.createTask(descTask)
                break;
            case '2':
                tasks.listingTask()
                break
            case '3':
                tasks.listingCompleteTask()
                break
            case '4':
                tasks.listingCompleteTask(false)
                break
            case '5':
                const tasksIds = await markTasks(tasks.listArr)
                if (tasksIds) tasks.tasksMarker(tasksIds)
                break
            case '6':
                const id = await deleteTaskInquirer(tasks.listToDo)
                
                if(id !== '0') {
                    const okDelete = await confirm('Are you sure?')
                    if(okDelete) tasks.deleteTask(id)
                }
                break
        }
        
        // Independientemente de las acciones, necesito escribir el nuevo arreglo, en caso que se complete, cree o borre.
        saveFile(tasks.listToDo)


        // Mientras de sea la opción '0' de salir, habrá una pausa
        if(anwser !== '0') await pause()
        // Manual Example
        // anwser = await showMessage()
        // if(anwser !== '0')await pause()
    } while(anwser !== '0')


}

main()