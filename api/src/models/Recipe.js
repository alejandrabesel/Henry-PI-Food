const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID, // se autoincrementa sola? son unicos, se cambian solos
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
      // allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    dishSummary: {
      type: DataTypes.STRING, // string of any length
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER, // sirve con coma o mejor int? 
      allowNull: false // para hacer el filtrado 
    },
    stepByStep: {
      type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)) // aca copio como me viene de la api para que quede igual
    }
  });
};

//fxs que recibian la instancia de sequelize e instanciaban el modelo -> armarlas y exportarlas (las importa la fx grande de db)