import React from 'react';
import styles from './LoadingIcon.module.css';

interface LoadingIconProps {
  size?: number;
  className?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ size = 32, className }) => {
  const combinedClassName = [styles.loadingIcon, className]
    .filter(Boolean)
    .join(' ');

  // Calculate font size and outline size based on size prop
  const fontSize = size * 0.5625; // 18px when size is 32px
  const outlineSize = size * 1.2; // Slightly larger than the text

  return (
    <div
      className={combinedClassName}
      style={{
        fontSize: `${fontSize}px`,
        minWidth: `${outlineSize}px`,
        minHeight: `${fontSize * 1.2}px`,
      }}
    >
      <span className={styles.loadingText}>AM/A</span>
      <div
        className={styles.loadingOutline}
        style={{
          width: `${outlineSize}px`,
          height: `${fontSize * 1.5}px`,
        }}
      />
    </div>
  );
};

export default LoadingIcon;
