const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { syncCollectionToSheet } = require('../utils/googleSheets');
require('dotenv').config();

router.get('/sync-sheets', async (req, res) => {
  try {
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    
    if (!spreadsheetId) {
      return res.status(400).json({ 
        success: false, 
        error: 'GOOGLE_SPREADSHEET_ID is not defined in environment variables.' 
      });
    }

    const result = await syncCollectionToSheet(Project, spreadsheetId, 'Projects');
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
