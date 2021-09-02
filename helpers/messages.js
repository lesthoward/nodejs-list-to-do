require('colors')
// const readline = require('readline')


const showMessage = () => {
    return new Promise((resolve) => {
        console.log('========================='.green);
        console.log('     Select a task.'.bold);
        console.log('========================='.green);
    
        console.log('1.'.bold.green + ' Create Task');
        console.log('2.'.bold.green + ' List complete tasks');
        console.log('3.'.bold.green + ' List pending tasks');
        console.log('4.'.bold.green + ' Mark tasks');
        console.log('5.'.bold.green + ' Delete Task');
        console.log('0.'.bold.green + ' Exit');
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question('What do you want to do?: '.yellow, (answer) => {
            readline.close()
            resolve(answer)
        })
    })
}

const pause = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`Press ${ 'ENTER'.green } to continue \n`, () => {
            readline.close()
            resolve()
        })
    })
}

module.exports = {
    showMessage,
    pause
}