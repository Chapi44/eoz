// Function to apply default descending sort to schemas
const applyDefaultSort = (schema, defaultSortField = 'createdAt') => {
    schema.pre('find', function () {
      this.sort({ [defaultSortField]: -1 }); // Default sort to descending order
    });
  };
  
  module.exports = applyDefaultSort;
  