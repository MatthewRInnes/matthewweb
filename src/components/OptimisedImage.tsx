import React from 'react';

interface OptimisedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const OptimisedImage: React.FC<OptimisedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}) => {
  // Convert PNG/JPG to WebP path
  const getWebPSrc = (originalSrc: string) => {
    return originalSrc.replace(/\.(png|jpg|jpeg)$/, '.webp');
  };

  // Generate srcset for responsive images
  const generateSrcSet = (src: string) => {
    const sizes = [320, 640, 960, 1280];
    return sizes
      .map(size => `${src}?width=${size} ${size}w`)
      .join(', ');
  };

  return (
    <picture>
      {/* WebP source for modern browsers */}
      <source
        type="image/webp"
        srcSet={generateSrcSet(getWebPSrc(src))}
        sizes="(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 960px) 960px, 1280px"
      />
      {/* Fallback for older browsers */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
};

export default OptimisedImage; 