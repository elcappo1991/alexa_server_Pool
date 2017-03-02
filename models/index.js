var Sequelize = require('sequelize');
dbConfig = require('../config/dbconfig.json');


/**
 * to establish connection between  the server and the dataabase in this case
 * postgres we have to add the connection string to the sequelize instance
 * @type {Sequelize}
 */
var sequelize = new Sequelize(dbConfig.App.dbConfig.base,dbConfig.App.dbConfig.user,dbConfig.App.dbConfig.password);

/**
 * type all  the table name (models) to have access on it after
 * @type {string[]}
 */
var models = [
    'lock',
    
];
/**
 * import model configuration
 */
models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

/**
 * orm specification for the relation between tables
 * hasMany for one to many relatiuon
 * Belongsto fo one to one relation
 * HasOne for one to one relation
 * belongstoMany for many to many relation
 */
(function(m) {
  /*  m.room.belongsTo(m.lock);
    m.roomuseraffectation.belongsTo(m.room);
    m.roomuseraffectation.belongsTo(m.user);
    m.usertokenaffectation.belongsTo(m.user);
    m.usertokenaffectation.belongsTo(m.token);
    m.locktokenaffectation.belongsTo(m.token);
    m.locktokenaffectation.belongsTo(m.lock);


    m.programmateur.belongsTo(m.user);
    m.hall.belongsTo(m.residence);
    m.garage.hasMany(m.equipement);
    m.hall.hasMany(m.equipement);
    m.centrale.belongsTo(m.residence);
    m.centrale.hasMany(m.evenement);
    m.appartement.belongsTo(m.user);
    m.user.hasMany(m.reclamation);
    m.notification.belongsTo(m.user);
    m.garage.belongsTo(m.residence);
    m.equipement.belongsTo(m.centrale);
    m.badge.belongsTo(m.user);
    m.residence.belongsTo(m.user);
    m.droitAcces.belongsToMany(m.badge, { through: 'droitAccesBadges' });
    m.droitAcces.belongsTo(m.residence);
    m.droitAcces.belongsToMany(m.equipement, { through: 'droitAccesEquipement' } );
    m.equipement.belongsTo(m.equipementSystem);


*/
})(module.exports);

/**
 * export the sequelize module
 * @type {Sequelize}
 */
module.exports.sequelize = sequelize;