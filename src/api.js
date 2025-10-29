// API 베이스 URL 관리
let API_URL = localStorage.getItem('apiUrl') || 'http://localhost:8080';

// API URL 설정 함수
export const setApiUrl = (url) => {
  API_URL = url.trim().replace(/\/$/, ''); // 마지막 슬래시 제거
  localStorage.setItem('apiUrl', API_URL);
  return API_URL;
};

// API URL 가져오기
export const getApiUrl = () => API_URL;

// 모든 포스트 조회
export const getPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/posts`);
    if (!response.ok) {
      throw new Error('포스트를 불러오는데 실패했습니다');
    }
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('getPosts error:', error);
    throw error;
  }
};

// 특정 포스트 조회
export const getPost = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/posts/${id}`);
    if (!response.ok) {
      throw new Error('포스트를 찾을 수 없습니다');
    }
    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error('getPost error:', error);
    throw error;
  }
};

// 새 포스트 작성
export const createPost = async (title, content) => {
  try {
    const response = await fetch(`${API_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    
    if (!response.ok) {
      throw new Error('포스트 작성에 실패했습니다');
    }
    
    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error('createPost error:', error);
    throw error;
  }
};
