# error-handler-express-ts

This is a simple error handler for Node.js with express.js

## Installation

```bash
npm install --save error-handler-express-ts
````

## Usage

```typescript
import express from 'express';
import { errorHandlerMiddleware, catchAsync } from 'error-handler-express-ts';

const app = express();

// Define your routes here...

router.get('/ruta-async', catchAsync(async (req: Request, res: Response) => {
  throw new Error('Simulated error in asynchronous controller');
}));

// Error Trapping Middleware Logging
app.use(errorHandlerMiddleware);

app.listen(3000, () => {
console.log('Server running on http://localhost:3000');
});
````

## another way to use it modular with controllers and services

```typescript
// App.ts

import express from 'express';
import { errorHandlerMiddleware } from 'error-handler-express-ts';

const app = express();

// Define your routes here...
app.use('/api/user', userRoutes);

// Error Trapping Middleware Logging
app.use(errorHandlerMiddleware);

app.listen(3000, () => {
console.log('Server running on http://localhost:3000');
});
````

```typescript
// routes/userRoutes.ts

import express from 'express';
import { catchAsync } from 'error-handler-express-ts';
import { userController } from '../controllers/userController';

const router = express.Router();

router.post('/create', catchAsync(userController.createUser));

export default router;
````

```typescript
// controllers/userController.ts

import { userServices } from '../services/userServices';
import { Request, Response } from 'express';

class UserController {

  async createUser(req: Request, res: Response, next: NextFunction) {
      const result = await userServices.createUser(req.body);
      res.json(result);
    }
}

export default new UserController();
````

```typescript
// services/userServices.ts

import { errorHandler,responseHandler } from 'error-handler-express-ts';

class UserServices {

async createUser(data): Promise<any> {
    try {

      const response = await userRepository.getUserBycode(data.code); // Data base operation
      if(response) {
        throw new HttpError().conflict('There is already a user with this code').build();
      }

      await userRepository.createUser(data); // Data base operation

      return responseHandler('Data saved successfully');

    } catch (err: any) {
      throw new errorHandler().error(err, 'message').method('createUser').debug(data).build();
    }
  }
}

export default new UserServices();
````

## log

  ```
  // Error Trapping Middleware Logging Example
Error:  {
  statusCode: 409,
  params: {
    code: '12345678',
    name: 'user',
  },
  method: 'createUser',
  message: 'There is already a user with this code'
}
Error   
    at UserServices.<anonymous> (/[service-route]/services/User-services.ts:38:63)
    at Generator.next (<anonymous>)
    at fulfilled (/[service-route]/services/User-services.ts:5:58)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
 Error: {
  "statusCode": 409,
  "message": "There is already a user with this code"
}
```




