const expect = require('expect')

const { Users } = require('./users')



describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: 1,
            name: 'Jemi',
            room: 'Yuma Fans'
        }, {
            id: 2,
            name: 'shawer',
            room: 'Yuma Fans'
        }, {
            id: 3,
            name: '7essa',
            room: 'Square Fans'
        }]
    });

    it('should add new user', (done) => {
        //var users = new Users();
        var user = {
            id: 123,
            name: 'newUser',
            room: 'Yuma Fans'
        }
        users.addUser(user.id, user.name, user.room).then((user) => {
            expect(user.name).toBe(user.name)
            expect(users.users).toInclude(user)
            done()
        }).catch((e) => done(new Error (e)))


    })

    it('should return names for Yuma Fans', () => {
        var userList = users.getUserList('Yuma Fans')
        expect(userList).toEqual(['Jemi', 'shawer'])
    })

    it('should return names for Square Fans', () => {
        var userList = users.getUserList('Square Fans')
        expect(userList).toEqual(['7essa'])
    })

    it('should find user', () => {
        var user = users.getUser(3)
        expect(user.name).toInclude('7essa')
    })

    it('should not find user', () => {
        var user = users.getUser(4)
        expect(user).toNotExist()
    })

    it('should remove User', () => {
        var removedUser = users.removeUser(2)
        expect(users.users).toExclude(removedUser)
        expect(users.users.length).toBe(2)
    })
    it('should remove User', () => {
        var removedUser = users.removeUser(4)
        expect(removedUser).toNotExist()
        expect(users.users.length).toBe(3)
    })


})