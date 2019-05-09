// [{
//     id: '2',
//     name: 'Jemi',
//     room: 'Yuma Fans'
// }]

// var users = []

// var addUser = (id, name, room)=>{
//     users.push({})
// }

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        return new Promise((resolve, reject) => {
            var user = { id, name, room }
            var foundUser = this.users.find((item) => item.name === user.name && item.room === user.room)
            if (!foundUser) {
                this.users.push(user)
                resolve(user)
            } else {
                reject('this username is already exist')
            }
        })
    }
    removeUser(id) {
        var user = this.getUser(id)
        if (user) {
            this.users = this.users.filter((user) => user.id !== id)
        }
        return user
    }
    getUser(id) {
        // var user = this.users.find((user) => user.id === id)
        // if (!user) {
        //     return undefined
        // } else {
        //     return user
        // }

        return this.users.filter((user) => user.id === id)[0]
        //if id is not exist -> it's like [][0]  empty array of index zero which result in undefind with no program crash

    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room)
        var namesArray = users.map((user) => user.name)
        return namesArray
    }
}

module.exports = { Users }