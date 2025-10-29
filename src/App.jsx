import { useState } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import styles from './App.module.css';
import { getApiUrl, setApiUrl } from './api';

function App() {
  const [view, setView] = useState('list'); // 'list', 'form', 'detail'
  const [selectedPost, setSelectedPost] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [apiUrl, setApiUrlState] = useState(getApiUrl());
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState(apiUrl);

  const handleNewPost = () => {
    setView('form');
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setView('detail');
  };

  const handleFormSuccess = () => {
    setView('list');
    setRefreshKey(prev => prev + 1); // 목록 새로고침을 위한 키 변경
  };

  const handleFormCancel = () => {
    setView('list');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedPost(null);
  };

  // URL 저장 및 적용
  const handleUrlChange = () => {
    if (tempUrl.trim()) {
      setApiUrl(tempUrl.trim());
      setApiUrlState(tempUrl.trim());
      setIsEditingUrl(false);
      // 페이지 새로고침으로 모든 API 호출 재시작
      window.location.reload();
    }
  };

  const handleUrlCancel = () => {
    setTempUrl(apiUrl);
    setIsEditingUrl(false);
  };

  const openEdit = () => {
    setTempUrl(apiUrl);
    setIsEditingUrl(true);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo} onClick={handleBackToList}>
            My Blog
          </h1>
          <div className={styles.serverInfo}>
            {isEditingUrl ? (
              <div className={styles.urlInputContainer}>
                <input
                  type="text"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="http://localhost:8080"
                  className={styles.urlInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUrlChange();
                    if (e.key === 'Escape') handleUrlCancel();
                  }}
                  autoFocus
                />
                <button onClick={handleUrlChange} className={styles.urlButton}>
                  ✓
                </button>
                <button onClick={handleUrlCancel} className={styles.urlButton}>
                  ✕
                </button>
              </div>
            ) : (
              <div className={styles.urlDisplay} onClick={openEdit} title="API 서버 주소 변경">
                <span className={styles.serverLabel}>API Server:</span>
                <span className={styles.serverUrl}>{apiUrl}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {view === 'list' && (
          <PostList
            key={refreshKey}
            onSelectPost={handleSelectPost}
            onNewPost={handleNewPost}
          />
        )}
        
        {view === 'form' && (
          <PostForm
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        )}
        
        {view === 'detail' && (
          <PostDetail
            post={selectedPost}
            onBack={handleBackToList}
          />
        )}
      </main>

      <footer className={styles.footer}>
        <p>Socket Programming - 컴퓨터 네트워크 과제</p>
      </footer>
    </div>
  );
}

export default App;
