import { useState, useEffect } from 'react';
import { getPosts } from '../api';
import styles from './PostList.module.css';

const PostList = ({ onSelectPost, onNewPost }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshPosts = () => {
    loadPosts();
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>포스트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>❌ {error}</p>
          <button onClick={loadPosts} className={styles.retryButton}>
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>포스트 목록</h2>
        <div className={styles.actions}>
          <button onClick={refreshPosts} className={styles.refreshButton}>
            새로고침
          </button>
          <button onClick={onNewPost} className={styles.newButton}>
            글 작성
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className={styles.empty}>
          <p>아직 작성된 포스트가 없습니다.</p>
          <p>첫 번째 포스트를 작성해보세요!</p>
        </div>
      ) : (
        <div className={styles.list}>
          {posts.map((post) => (
            <div
              key={post.id}
              className={styles.postCard}
              onClick={() => onSelectPost(post)}
            >
              <div className={styles.postHeader}>
                <h3>{post.title}</h3>
                <span className={styles.postId}>#{post.id}</span>
              </div>
              <p className={styles.postPreview}>
                {post.content.substring(0, 100)}
                {post.content.length > 100 && '...'}
              </p>
              <div className={styles.postFooter}>
                <span className={styles.postDate}>{post.created_at}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <p>총 {posts.length}개의 포스트</p>
      </div>
    </div>
  );
};

export default PostList;

