import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage keys with namespace to avoid conflicts
const STORAGE_KEYS = {
  TOKEN: 'food_explorer_token',
  USER_DATA: 'food_explorer_user_data',
  REFRESH_TOKEN: 'food_explorer_refresh_token',
  LAST_LOGIN: 'food_explorer_last_login',
  APP_SETTINGS: 'food_explorer_settings',
  CACHE_DATA: 'food_explorer_cache',
};

// Storage utility class
class StorageManager {
  // Set item with error handling
  static async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
      return false;
    }
  }

  // Get item with error handling
  static async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  }

  // Remove item with error handling
  static async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
      return false;
    }
  }

  // Clear all app data
  static async clearAll() {
    try {
      const keys = Object.values(STORAGE_KEYS);
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  }

  // Get all keys
  static async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }

  // Check if key exists
  static async hasKey(key) {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys.includes(key);
    } catch (error) {
      console.error('Error checking key existence:', error);
      return false;
    }
  }

  // Get storage size (approximate)
  static async getStorageSize() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += value.length;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.error('Error getting storage size:', error);
      return 0;
    }
  }
}

// User-specific storage functions
export const UserStorage = {
  // Token management
  async setToken(token) {
    return await StorageManager.setItem(STORAGE_KEYS.TOKEN, token);
  },

  async getToken() {
    return await StorageManager.getItem(STORAGE_KEYS.TOKEN);
  },

  async removeToken() {
    return await StorageManager.removeItem(STORAGE_KEYS.TOKEN);
  },

  // User data management
  async setUserData(userData) {
    return await StorageManager.setItem(STORAGE_KEYS.USER_DATA, userData);
  },

  async getUserData() {
    return await StorageManager.getItem(STORAGE_KEYS.USER_DATA);
  },

  async removeUserData() {
    return await StorageManager.removeItem(STORAGE_KEYS.USER_DATA);
  },

  // Last login management
  async setLastLogin(timestamp) {
    return await StorageManager.setItem(STORAGE_KEYS.LAST_LOGIN, timestamp);
  },

  async getLastLogin() {
    return await StorageManager.getItem(STORAGE_KEYS.LAST_LOGIN);
  },

  async removeLastLogin() {
    return await StorageManager.removeItem(STORAGE_KEYS.LAST_LOGIN);
  },

  // Clear all user data
  async clearUserData() {
    const keys = [
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.LAST_LOGIN,
    ];
    
    try {
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      console.error('Error clearing user data:', error);
      return false;
    }
  },

  // Check if user is logged in
  async isUserLoggedIn() {
    try {
      const [token, userData, lastLogin] = await Promise.all([
        this.getToken(),
        this.getUserData(),
        this.getLastLogin(),
      ]);
      
      return !!(token && userData && lastLogin);
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  },
};

// App settings storage
export const AppStorage = {
  async setSettings(settings) {
    return await StorageManager.setItem(STORAGE_KEYS.APP_SETTINGS, settings);
  },

  async getSettings() {
    return await StorageManager.getItem(STORAGE_KEYS.APP_SETTINGS);
  },

  async updateSettings(newSettings) {
    const currentSettings = await this.getSettings() || {};
    const updatedSettings = { ...currentSettings, ...newSettings };
    return await StorageManager.setItem(STORAGE_KEYS.APP_SETTINGS, updatedSettings);
  },
};

// Cache storage for app data
export const CacheStorage = {
  async setCacheData(key, data, ttl = 3600000) { // Default 1 hour TTL
    const cacheItem = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    return await StorageManager.setItem(`${STORAGE_KEYS.CACHE_DATA}_${key}`, cacheItem);
  },

  async getCacheData(key) {
    const cacheItem = await StorageManager.getItem(`${STORAGE_KEYS.CACHE_DATA}_${key}`);
    
    if (!cacheItem) return null;
    
    const now = Date.now();
    const isExpired = (now - cacheItem.timestamp) > cacheItem.ttl;
    
    if (isExpired) {
      await this.removeCacheData(key);
      return null;
    }
    
    return cacheItem.data;
  },

  async removeCacheData(key) {
    return await StorageManager.removeItem(`${STORAGE_KEYS.CACHE_DATA}_${key}`);
  },

  async clearAllCache() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(STORAGE_KEYS.CACHE_DATA));
      await AsyncStorage.multiRemove(cacheKeys);
      return true;
    } catch (error) {
      console.error('Error clearing cache:', error);
      return false;
    }
  },
};

export { StorageManager, STORAGE_KEYS }; 