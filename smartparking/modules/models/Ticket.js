module.exports = function(dbConn, sequeliz) {
    return dbConn.define('ticket', {
        id: {
            type: sequeliz.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true

        },
        id_user: sequeliz.STRING,
        id_park:sequeliz.INTEGER,
        start_at:sequeliz.STRING,
        end_at:sequeliz.STRING,
        price:sequeliz.BIGINT,
        plate:sequeliz.STRING,
        desc:sequeliz.STRING

    });
}