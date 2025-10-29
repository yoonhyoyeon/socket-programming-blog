import { useState } from 'react';
import { createPost } from '../api';
import styles from './PostForm.module.css';

const PostForm = ({ onSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('제목을 입력해주세요');
      return;
    }
    
    if (!content.trim()) {
      setError('내용을 입력해주세요');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const newPost = await createPost(title.trim(), content.trim());
      setTitle('');
      setContent('');
      onSuccess(newPost);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>새 글 작성</h2>
        <button onClick={onCancel} className={styles.closeButton}>
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="포스트 제목을 입력하세요"
            disabled={loading}
            className={styles.input}
            maxLength={255}
          />
          <span className={styles.charCount}>
            {title.length} / 255
          </span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="포스트 내용을 입력하세요"
            disabled={loading}
            className={styles.textarea}
            rows={12}
            maxLength={2047}
          />
          <span className={styles.charCount}>
            {content.length} / 2047
          </span>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={styles.cancelButton}
          >
            취소
          </button>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                작성 중...
              </>
            ) : (
              '작성 완료'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

