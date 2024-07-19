import pino from 'pino'


// @ts-ignore
const log = pino({
    // transport: {
    //     target: 'pino-pretty',
    //     options: {
    //         colorize: true
    //     }
    // }
})

export { log };