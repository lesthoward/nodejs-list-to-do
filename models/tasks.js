require('colors')
const Task = require("./task")

class Tasks {

    constructor() {
        // Como un objeto para luego no tener que buscar la index y hacer más largo el proceso
        this.list = {}
    }

    get listToDo() {
        this.listArr = []
        // Get each single object task by key from this.list and pushes to new array
        Object.keys(this.list).forEach(key => {
            const task = this.list[key]
            this.listArr.push(task)
        })
        return this.listArr
    }

    createTask(desc) {
        // Instancia de la clase "Task" para generar el objeto
        const task = new Task(desc)
        this.list[task.id] = task
    }

    loadTasksFromArray(tasksArrDB = []) {
        // Actualizar mi objeto principal con los datos provenientes del arreglo del JSON
        tasksArrDB.forEach(singleTask => {
            this.list[singleTask.id] = singleTask
        })
    }

    listingTask() {
        // Desestructurando las tareas para listarlas
        Object.values(this.list).forEach((singleTask, indexTask) => {
            indexTask++
            const { desc, completed} = singleTask
            const isCompleted = completed
                ? 'Completed'.green
                : 'Pending'.red

            console.log(`${(indexTask + '.').green} ${desc} :: ${isCompleted}`);
        })
    }

    listingCompleteTask(isCompleted = true) {
        // Función dinámica para listar las completadas y pendientes
        let counter = 0
        Object.values(this.list).forEach((singleTask) => {
            const { desc, completed} = singleTask
            counter++

            const formatCompleted = completed
                ? 'Completed'.green
                : 'Pending'.red
                
            if(isCompleted === true) {
                if(completed) {
                    console.log(`${(counter + '.').green} ${desc} :: ${completed.toString().green}`);
                }
                
            } else {
                if(!completed) {
                    console.log(`${(counter + '.').green} ${desc} :: ${ formatCompleted }`);
                }
            }
        })
    }

    deleteTask(id) {
        delete this.list[id]
    }

    tasksMarker (taskIds) {
        // Por cada id que proviene de las marcaciones, lo busco dentro de mi arreglo original y cambio su estado de completado
        taskIds.forEach(id => {
            const singleTask = this.list[id]
            if(!singleTask.completed) {
                singleTask.completed = new Date().toISOString()
            }
        })

        // Si el arreglo original de ids no incluye las que vienen desde el inquirer entonces, establece su estado de completado a nulo
        this.listArr.forEach(task => {
            if(!taskIds.includes(task.id)) {
                const singleTask = this.list[task.id]
                singleTask.completed = null
            }
        })
    }
}

module.exports = Tasks