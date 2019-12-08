import { MessageResponder } from 'electron-ipc-helper'

export default function initMessages () {
  const exampleMessage = new MessageResponder('exampleMessage')
  exampleMessage.respond(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve('Hello from IPC!')
      }, 1000)
    })
  })
}