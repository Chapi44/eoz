const fs = require('fs');
const path = require('path');
const applyDefaultSort = require('./utils/applyDefaultSort'); // Import the sorting utility

const initModels = () => {
  const modelsDir = path.join(__dirname, 'models'); // Path to your models directory

  // Read all files in the models directory
  fs.readdirSync(modelsDir).forEach((file) => {
    if (file.endsWith('.js')) {
      const model = require(path.join(modelsDir, file)); // Require the model
      if (model.schema) {
        applyDefaultSort(model.schema); // Apply default sorting middleware
      }
    }
  });
};

module.exports = initModels;
