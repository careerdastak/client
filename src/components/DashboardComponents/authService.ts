// --- Environment Variables ---
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// --- Auth Service ---
export const authService = {
  setToken: (token: string) => {
    localStorage.setItem('admin_token', token);
  },

  getToken: () => {
    return localStorage.getItem('admin_token');
  },

  removeToken: () => {
    localStorage.removeItem('admin_token');
  },

  getAuthHeaders: () => {
    const token = authService.getToken();
    return token ? {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } : { 'Content-Type': 'application/json' };
  },

  isAuthenticated: () => {
    return !!authService.getToken();
  },

  async login(credentials: { username: string; password: string }) {
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
      authService.setToken(data.token);
    }

    return data;
  },

  async logout() {
    const token = authService.getToken();
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
    authService.removeToken();
  },

  async getProfile() {
    const token = authService.getToken();
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        authService.removeToken();
      }
      const error = await response.json();
      throw new Error(error.message || 'Failed to get profile');
    }

    return response.json();
  },
};