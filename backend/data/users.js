import bcrypt from "bcryptjs"

const users = [
    {
        name: "louie",
        email: "95.luka@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
        address:
            {
                    address: "Alberta Fortisa 2",
                    city: "Zagreb",
                    postalCode: 10090,
                    country: "Croatia"
            
            }

    },
    {
        name: "John Doe",
        email: "johndoe@example.com",
        password: bcrypt.hashSync("qwerty", 10),
        address:
            {
                    address: "18th Street",
                    city: "Los Angeles",
                    postalCode: 90001,
                    country: "USA"
            
            }

    },
    {
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: bcrypt.hashSync("password", 10),
        address:
            {
                    address: "18th Street",
                    city: "Los Angeles",
                    postalCode: 90001,
                    country: "USA"
            
            }

    },
    {
        name: "Hunter S Thompson",
        email: "gonzo@example.com",
        password: bcrypt.hashSync("qwerty", 10),
        address:
            {
                    address: "18th Street",
                    city: "Los Angeles",
                    postalCode: 90001,
                    country: "USA"
            
            }

    }

]

export default users