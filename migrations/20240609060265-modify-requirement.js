'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the column
    await queryInterface.renameColumn('requirements', 'description_url', 'url');

    // Add the new column
    await queryInterface.addColumn('requirements', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Change the allowNull constraint for the url column
    await queryInterface.changeColumn('requirements', 'url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Change the allowNull constraint for the url column back to false
    await queryInterface.changeColumn('requirements', 'url', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Remove the new column
    await queryInterface.removeColumn('requirements', 'description');

    // Rename back to original
    await queryInterface.renameColumn('requirements', 'url', 'description_url');
  }
};
