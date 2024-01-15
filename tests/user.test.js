// I'm still getting errors on tests that are almost the same as what we'd done in class. I checked to ensure each iteration of the user to be tested was unique and the same errors are being thrown.

// commit test


// packages and variables necessary for testing setup
const request = require('supertest') // run testing code, ie postman
const { MongoMemoryServer } = require('mongodb-memory-server') // creates pseudo mongodb
const app = require('../app') // api application summoning
const User = require('../models/user') // allow CRUD operation on User model
const mongoose = require('mongoose')
const server = app.listen(8080, () => console.log('You are starting to test... my patience'))
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close()// shut off mongoose connection with mongodb
    mongoServer.stop()
    server.close()
})


describe('Test suite for /users route on api', () => {
    // /users
    test('It should create a new user in the db', async () => {
        const response = await request(app).post('/users').send({ name: 'Name Namington', email: 'NamelessOne1@gmail.com', password: '12345'})

        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Name Namington')
        expect(response.body.user.email).toEqual('NamelessOne1@gmail.com')
        expect(response.body).toHaveProperty('token')
    })

    // /users/login
    test('It should login a user', async () => {
        const user = new User({ name: 'New User', email: 'new.user@gmail.com', password: 'newPassword'})
        await user.save()

        const response = await request(app)
        .post('/users/login')
        .send({ email: 'new.user@gmail.com', password: 'newPassword'})

        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('New User')
        expect(response.body.user.email).toEqual('new.user@gmail.com')
        expect(response.body).toHaveProperty('token')
    })
    // /users/:id update
    // I keep getting issues on this test and I don't know why. I am losing sleep, please someone help me. I'm unsure why the update isn't updating, in that the response being sent is not what the test is receiving. The user remains 'john' doe instead of updating to 'jane'.

    test('It should update a user', async () => {
        const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
        await user.save()

        const token = await user.generateAuthToken()


        const response = await request(app)
          .put(`/users/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ name: 'Jane Doe', email: 'jane.doe@example.com' })

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Jane Doe')
        expect(response.body.email).toEqual('jane.doe@example.com')
      })


    // /user/:id delete
    test('It should delete a user', async () => {
        const user = new User({ name: 'DeleteMe User', email: 'deleteMe.user@gmail.com', password: 'deleteMePassword' })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
          .delete(`/users/${user._id}`)
          .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('User Deleted')
      })

 })


 // do I have to include the array of todos for each user within the tests? Surely not.
