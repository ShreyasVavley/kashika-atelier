import React, { useState } from 'react';

/**
 * Production-Grade Progressive Image Component
 * Features:
 * - Automatic modern WebP format preference with JPG fallback
 * - Explicit aspect ratio & dimensions to guarantee zero Cumulative Layout Shift (CLS)
 * - Shimmer blur-up placeholder skeleton while loading
 * - Smooth opacity crossfade on asset arrival
 */
export default function ProgressiveImage({
  src,
  alt = 'Kashika Saree Atelier Weave',
  className = '',
  aspectRatio = 'aspect-[3/4]',
  priority = false,
  onClick,
}) {
  const [loaded, setLoaded] = useState(false);

  // If local jpg, derive webp path
  const webpSrc = src && src.endsWith('.jpg') ? src.replace(/\.jpg$/, '.webp') : src;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-stone-900 ${aspectRatio} ${className}`}
    >
      {/* Shimmer Placeholder Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 animate-pulse">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
        </div>
      )}

      {/* Picture tag with WebP priority & JPG fallback */}
      <picture>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102 blur-sm'
          }`}
        />
      </picture>
    </div>
  );
}
