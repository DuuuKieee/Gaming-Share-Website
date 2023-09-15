class DatabaseManager {
    constructor() {
      // Khởi tạo kết nối đến cơ sở dữ liệu
    }
  
    static getInstance() {
      if (!DatabaseManager.instance) {
        DatabaseManager.instance = new DatabaseManager();
      }
      return DatabaseManager.instance;
    }
  
    id = 11;
  }
  module.exports = DatabaseManager;