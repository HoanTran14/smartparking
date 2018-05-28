module.exports = function(dbConn, sequeliz) {
	return dbConn.define('user', {
        id: {
            type: sequeliz.INTEGER,
            allowNull: false,
            autoIncrement: true

        },
        phone: {
			type: sequeliz.STRING,
			allowNull: false,
            primaryKey: true

		},
		name: sequeliz.STRING,
		password: sequeliz.STRING,
        license_plates_top:sequeliz.STRING,
        license_plates_bottom:sequeliz.STRING,
        wallet: sequeliz.BIGINT,
        firebase_token:sequeliz.STRING

    });
}