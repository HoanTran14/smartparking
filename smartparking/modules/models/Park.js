module.exports = function(dbConn, sequeliz) {
    return dbConn.define('park', {
        id: {
            type: sequeliz.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true

        },
        name: sequeliz.STRING,
        email:sequeliz.STRING,
        contact:sequeliz.STRING,
        profile_picture:sequeliz.STRING,
        price:sequeliz.BIGINT,
        capacity:sequeliz.BIGINT

    });
}