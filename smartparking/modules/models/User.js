module.exports = function(dbConn, sequeliz) {
	return dbConn.define('user', {
        phone: {
			type: sequeliz.STRING,
			allowNull: false,
			primaryKey: true

		},
		name: sequeliz.STRING,
		password: sequeliz.STRING,
        license_plates_top:sequeliz.STRING,
        license_plates_bottom:sequeliz.STRING,
        wallet: sequeliz.BIGINT

    });
}