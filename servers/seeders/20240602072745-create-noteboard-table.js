'use strict';
const { Board, NoteBoard } = require('../models'); // Adjust the path to your models

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch all boards from the database
    const boards = await Board.findAll();

    // Generate note boards for each board
    const noteBoards = [];
    for (const board of boards) {
      const boardId = board.id;

      // Create 3 note boards per board
      for (let i = 0; i < 3; i++) {
        noteBoards.push({
          board_id: boardId,
          name: `Note ${i + 1} for Board ${boardId}`,
          content: `This is the content of note ${i + 1} for board ${boardId}`,
          status: 0,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        });
      }
    }
    await queryInterface.bulkInsert('note_boards', noteBoards, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('note_boards', null, {});
  }
};
