const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Store token in localStorage
const setToken = (token) => {
  localStorage.setItem('admin_token', token);
};

const getToken = () => {
  return localStorage.getItem('admin_token');
};

const removeToken = () => {
  localStorage.removeItem('admin_token');
};

// Auth API calls
export const authService = {
  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    
    if (data.success && data.token) {
      setToken(data.token);
    }
    
    return data;
  },

  async logout() {
    const token = getToken();
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout API call failed:', error);
      }
    }
    removeToken();
  },

  async getProfile() {
    const token = getToken();
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
      }
      const error = await response.json();
      throw new Error(error.message || 'Failed to get profile');
    }

    return response.json();
  },

  async changePassword(passwordData) {
    const token = getToken();
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to change password');
    }

    return response.json();
  },

  isAuthenticated() {
    return !!getToken();
  },

  getAuthHeaders() {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  },
};