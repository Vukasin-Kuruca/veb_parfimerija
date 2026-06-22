import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin",
        email: "admin@parfimerija.rs",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Jovana Petrović",
        email: "jovana@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: "Marko Nikolić",
        email: "marko@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    }
];

export default users;
