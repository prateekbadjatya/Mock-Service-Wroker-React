import {rest} from 'msw'
const handlers =  [
 rest.get('http://localhost:3000/api/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({username: 'Prateek'}))
 })
]

export {handlers, rest}