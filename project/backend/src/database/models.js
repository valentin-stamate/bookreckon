const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ip', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

/* -----------================ MODELS ================----------- */
export const UserModel = sequelize.define('users', {
    username: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
});

export const BookModel = sequelize.define('books', {
    name: DataTypes.TEXT,
    genre: DataTypes.TEXT,
    // authors
    audio: DataTypes.BLOB,
    photo: DataTypes.TEXT,
    details: DataTypes.TEXT,
    imdb: DataTypes.TEXT,
    youtube: DataTypes.TEXT,
});

export const PreferenceModel = sequelize.define('preferences', {
    name: DataTypes.TEXT,
})

export const AuthorModel = sequelize.define('authors', {
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    birthDate: DataTypes.DATE
})

/* -----------================ ASSOCIATIONS ================----------- */
BookModel.belongsToMany(UserModel, { through: 'user_books' });
UserModel.belongsToMany(BookModel, { through: 'book_users' });

PreferenceModel.belongsToMany(UserModel, { through: 'user_preference' });
UserModel.belongsToMany(PreferenceModel, { through: 'preference_users' });

AuthorModel.belongsToMany(BookModel, { through: 'book_authors' });
BookModel.belongsToMany(AuthorModel, { through: 'author_books' });

export async function initModels() {
    await sequelize.authenticate();
    await sequelize.sync({force: true});

    const userA = {
        id: 1,
        username: 'valstam',
        email: 'stamatevalentin125@gmail.com',
        password: '123456789qwe',
    };

    await UserModel.create(userA);
}
