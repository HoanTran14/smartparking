module.exports = function(dbConn, sequeliz) {
    return dbConn.define('historyuser', {
        id: {
            type: sequeliz.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true

        },
        type:sequeliz.STRING,
        id_user:sequeliz.STRING,
        time: sequeliz.STRING,
        id_park: sequeliz.INTEGER,
        park_name: sequeliz.INTEGER,
        money:sequeliz.STRING,
        start:sequeliz.STRING,
        end:sequeliz.STRING,
        price: sequeliz.BIGINT,
        desc: sequeliz.STRING

    });
}