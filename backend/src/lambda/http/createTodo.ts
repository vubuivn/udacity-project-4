import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../helpers/todos'
import { createLogger } from '../../utils/logger';
// export const handler = middy(
//   async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     const newTodo: CreateTodoRequest = JSON.parse(event.body)
    
//     // TODO: Implement creating a new TODO item
//     const userId: string = getUserId(event);
//     const todoitem = await createTodo(userId, newTodo)
//     return {
//       statusCode: 201,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true
//       },
//       body: JSON.stringify({
//         item: todoitem
//       })
//     };
//   }
// )

// handler.use(
//   cors({
//     origin: "*",
//     credentials: true
//   })
// )

const logger = createLogger('TodosAccess')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    const userId: string = getUserId(event);
    logger.info('Starting create new todo!');
    
    const todoitem = await createTodo(userId, newTodo)
    console.log("print all value:", todoitem) 
    return {
      statusCode: 201,
      body: JSON.stringify({
        item: todoitem
      })
    }
  });

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )

  exports.handler = async (event) => {

    console.log('Event: ', event)
    return {
           result: `Hello ${event.name} !`
   }
}