const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ip', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

/* -----------================ MODELS ================----------- */
export const UserModel = sequelize.define('user', {
    username: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
});

export const BookModel = sequelize.define('book', {
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

/* -----------================ ASSOCIATIONS ================----------- */
BookModel.belongsToMany(UserModel, {through: 'user_books'});
UserModel.belongsToMany(BookModel, {through: 'book_users'});

PreferenceModel.belongsToMany(UserModel, {through: 'user_preference'});
UserModel.belongsToMany(PreferenceModel, {through: 'preference_users'});

export async function initModels() {
    await sequelize.authenticate();
    await sequelize.sync({force: true});
}
