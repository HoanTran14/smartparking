module.exports = function(dbConn, sequeliz) {
    return dbConn.define('ticket', {
        id: {
            type: sequeliz.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true

        },
        id_user: sequeliz.STRING,
        id_park:sequeliz.STRING,
        start_at:sequeliz.STRING,
        end_at:sequeliz.STRING,
        price:sequeliz.BIGINT,
        desc:sequeliz.BIGINT

    });
}