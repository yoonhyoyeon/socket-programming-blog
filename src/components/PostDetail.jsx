import styles from './PostDetail.module.css';

const PostDetail = ({ post, onBack }) => {
  if (!post) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          포스트를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <div className={styles.articleHeader}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{post.title}</h1>
            <span className={styles.postId}>#{post.id}</span>
          </div>
          <div className={styles.meta}>
            <span className={styles.date}>{post.created_at}</span>
          </div>
        </div>

        <div className={styles.content}>
          {post.content.split('\n').map((line, index) => (
            <p key={index}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      </article>

      <div className={styles.footer}>
        <button onClick={onBack} className={styles.backButtonBottom}>
          ← 목록으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default PostDetail;

