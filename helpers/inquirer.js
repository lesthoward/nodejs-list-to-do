require('colors')

const inquirer = require('inquirer')
// Este es una paquete para manipular la cosa de una forma mucho más sencillay con una interfaz personalizada
const questions = {
    type: 'list',
    name: 'option', /* Este es el valor que retorna la opción seleccionada */
    message: 'What do you want to do: '.yellow,
    choices: [
        {
            value: '1',
            name: ` ${ '1.'.green } Create Task`
        },
        {
            value: '2',
            name: ` ${ '2.'.green } List tasks`
        },
        {
            value: '3',
            name: ` ${ '3.'.green } List complete tasks`
        },
        {
            value: '4',
            name: ` ${ '4.'.green } List pending tasks`
        },
        {
            value: '5',
            name: ` ${ '5.'.green } Mark tasks`
        },
        {
            value: '6',
            name: ` ${ '6.'.green } Delete Task`
        },
        {
            value: '0',
            name: ` ${ '0.'.green } Exit`
        }
    ]
}

const  inquirerMenu = async () => {
    // Generar el evento de inquirer, luego tomar el valor del objeto que retorna.
    const { option } = await inquirer.prompt([questions])
    return option
}


const pause = async () => {
    return await inquirer.prompt({
        type: 'input',
        name: 'pause',
        message: `Press ${ 'ENTER'.green } to continue`
    })
}

// Como función genérica con mensaje para hacerla escalable
const typeOnce = async (message) => {
    const { description } = await inquirer.prompt({
        type: 'input',
        name: 'description',
        message: message
    })
    return description
}

const deleteTaskInquirer = async (tasksArr = []) => {
    // Se el pasa la lista de tareas cargadas, luego se devuelve un arreglo con las choices para el inquirer.
    // El map es útil porque se puede almacenar en una variable
    const choices = tasksArr.map((singleTask, i) => {
        counter = `${i + 1}.`.green
        const {id, desc} = singleTask
        return {
            value: id,
            name: counter + desc
        }
    })
    
    // Opción para regresar
    choices.unshift({
        value: '0',
        name: `${ '0.'.green }Back`
    })

    // Toma las choices del arreglo de map
    const { id } = await inquirer.prompt({
        type: 'list',
        name: 'id',
        message: 'Delete a task from the list'.yellow,
        choices
    })
    return id
}


const confirm = async (message) => {
    const { confirm } = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message
    })
    return confirm
}

const markTasks = async (taskArr) => {
    const choices = taskArr.map((singleTask, indexTask) => {
         const { id, desc, completed } = singleTask
        return {
            value: id,
            name: `${indexTask} ${desc}`,
            checked: completed ? true : false
        }
    }) 

    const {taskId} = await inquirer.prompt({
        type: 'checkbox',
        name: 'taskId',
        message: 'Mark and unmark the tasks',
        choices
    })

    // Por método de inquirer devuelve un array con los valores establecidos en el choice
    return taskId
}

module.exports = {
    inquirerMenu,
    pause,
    typeOnce,
    deleteTaskInquirer,
    confirm,
    markTasks
}