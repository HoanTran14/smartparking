module.exports = function(dbConn, sequeliz) {
    return dbConn.define('historyuser', {
        id: {
            type: sequeliz.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true

        },
        id_user:sequeliz.STRING,
        id_ticket:sequeliz.STRING,
        money:sequeliz.STRING,
        desc: sequeliz.STRING

    });
}