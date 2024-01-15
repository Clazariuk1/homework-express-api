// // packages and variables necessary for testing setup
// const request = require('supertest') // run testing code, ie postman
// const { MongoMemoryServer } = require('mongodb-memory-server') // creates pseudo mongodb
// const app = require('../app') // api application summoning
// const Todo = require('../models/todo') // allow CRUD operation on Todo model
// const mongoose = require('mongoose')
// const server = app.listen(8080, () => console.log('You are starting to test... my patience'))
// let mongoServer

// beforeAll(async () => {
//     mongoServer = await MongoMemoryServer.create()
//     mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
// })

// afterAll(async () => {
//     await mongoose.connection.close()// shut off mongoose connection with mongodb
//     mongoServer.stop()
//     server.close()
// })


// // Index /todos
// // router.get('/', userController.auth, todoCtrl.indexNotComplete)
// // // Index /todos/completed
// // router.get('/completed', userController.auth, todoCtrl.indexComplete)
// // // Delete /todos/:id
// // router.delete('/:id', userController.auth, todoCtrl.update)
// // // Update /todos/:id
// // router.put('/:id', userController.auth, todoCtrl.update)
// // // Create /todos
// // router.post('/', userController.auth, todoCtrl.create)
// // // Show /todos/:id
// // router.get('/:id', userController.auth, todoCtrl.show)

// describe('Test suite for /todos route on api', () => {

//     // todo schema:
//     // title: { type: String, required: true },
//     // completed: { type: Boolean, required: true },
//     // user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }

//     // /todos
//     // I'm under the impression that I need to create the user, then the todo, then push the todo into user array, then resave, then send the adjusted todo... user.todos[todo] into the .post route /todos. Please advise.
//     // WHY isn't it defining the user? Do we not need to pre define the user to simulate a logged in user creating the post????.
//     test('Should successfully create a todo post in the db', async () => {
//         const user = new User({ name: 'Test User', email: 'test.user@gmail.com', password: 'password123', todos: [{}]})
//         const token = await user.generateAuthToken()

//         const todo = new Todo({ title: 'Create Todo', completed: false, user: 'Create Name'})
//         user.todos.push(todo)
//         await user.save()

//         const response = await request(app)
//         .post(`/todos/${todo._id}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send(user.todos[todo])

//         expect(response.statusCode).toBe(200)
//         // response .user or .body?
//         expect(response.body.todo.title).toEqual('Test Todo')
//         expect(response.body.todo.completed).toBe(false)
//         // below can't possibly be the correct way to verify a token for todo posting but what IS.
//         expect(response.body).toHaveProperty('token')
//     })

//     // /todos/:id update
//     test('Should successfully update a given todo post', async () => {
//         const todo = new Todo({ title: 'Test Todo', completed: false, user: 'Namington Name' })
//         await todo.save()

//         const response = await request(app)
//         .put(`/todos/${todo._id}`)
//         .send({ title: 'Updated Todo', completed: true, user: 'Namington Name the Updated' })

//         expect(response.statusCode).toBe(200)
//         expect(response.body.title).toEqual('Updated Todo')
//         expect(response.body.user).toEqual('Namington Name the Updated')
//         expect(response.body.todo.completed).toBe(true)

//     })
//     // /todos/:id delete
//     test('Should successfully delete a given todo post', async () => {
//         const user = new User({ name: 'Namington Name the Deletable', email: 'deletable@gmail.com', password: '12345', todos: [{}]})
//         const todo = new Todo({ title: 'Another Todo', completed: false, user: 'Namington Name the Deletable'})
//         user.todos.push(todo)
//         await user.save()

//         const response = await request(app)
//         .delete(`/todos/${todo._id}`)
//         // not clicking in how we need to set todo authorization by pointing to user tokens yet.
//         .set('Authorization', `Bearer ${token}`)

//         expect(response.statusCode).toBe(200)
//         expect(response.body.message).toEqual('Todo Post Deleted')
//     })
//     // // /todos/:id show
//     // test('Should successfully show a given todo post', async () => {
//     //     const user = new User({ name: })
//     //     const todo = new Todo({ title: 'Test Todo', completed: false, user: 'Namington Name' })
//     //     await todo.save()

//     //     const response = await request(app)
//     //     .show(`/todos/${todo._id}`)

//     //     expect(response.statusCode).toBe(200)
//     //     expect(response.body.title).toEqual('I see the todo')
//     // })
//     // /todos/completed
//     // test('Should successfully show the list of completed todos', async () => {
//     //     const todos = await
//     // })
//     // // /todos index
//     // test('Should successfully show the current list of todos', async () => {
//     //     const user = new User({ name: "Todo List", email: 'todolist@gmail.com', todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]    })
//     //     const todos = await   request(app).Show('/todos/')
//     // })

// })


// // How do we code more complicated tests, like can we display the index of todos, completed or otherwise? How do we connect the todo itself with the user and its bearer token?

// // need a test that confirms a todo update from not complete to complete
// // need a test that correctly fails to create/update/delete a todo if the user authentication does not match
// // need a test that correctly fails to update a todo if it is not changed in some manner
// //
