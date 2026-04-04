import type { FC } from "react";

interface OrigenIconProps {
  className?: string;
  size?: number;
}

interface OrigenHeartIconProps extends OrigenIconProps {
  filled?: boolean;
}

interface OrigenStarIconProps extends OrigenIconProps {
  filled?: boolean;
}

interface OrigenEmptyStateIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

export const OrigenLeafIcon: FC<OrigenIconProps> = ({ className, size = 24 }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <path d="M20.3 3.7c-7.2.1-12.1 2.6-14.6 7.5-1.4 2.8-1.8 5.7-1.6 8.8a.9.9 0 0 0 1 .8c3.1-.2 6-.7 8.8-2.1 4.8-2.4 7.2-7.4 7.1-14.4a.8.8 0 0 0-.7-.6ZM8.7 16.2c1.5-3 3.8-5.4 6.9-7.1.3-.2.7-.1.9.2.2.3.1.7-.3.9-2.8 1.6-4.9 3.7-6.3 6.5-.2.3-.6.5-.9.3-.3-.2-.5-.5-.3-.8Z" />
  </svg>
);

export const OrigenSproutIcon: FC<OrigenIconProps> = ({ className, size = 24 }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <path d="M12 21a.75.75 0 0 1-.75-.75v-5.1c-.86.3-1.8.43-2.8.34-2.5-.2-4.7-1.7-5.9-3.8a.75.75 0 0 1 .3-1.03c2-1.07 4.7-1.1 6.92-.05.74.35 1.41.84 1.98 1.44-.1-1.3-.53-2.6-1.4-3.7a.75.75 0 0 1-.15-.57c.39-2.24 2.05-4.2 4.1-5.14a.74.74 0 0 1 .9.2c1.4 1.63 2.04 4.05 1.48 6.33-.45 1.84-1.62 3.42-3.2 4.33v6.73A.75.75 0 0 1 12 21Z" />
  </svg>
);

export const OrigenCartIcon: FC<OrigenIconProps> = ({ className, size = 24 }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h1.6c.72 0 1.35.5 1.52 1.2l1.45 6a1.5 1.5 0 0 0 1.46 1.15h6.42a1.5 1.5 0 0 0 1.43-1.04l1.37-4.13a1.5 1.5 0 0 0-1.42-1.98H8.02" />
    <circle cx="10" cy="18" r="1.25" />
    <circle cx="16.25" cy="18" r="1.25" />
  </svg>
);

export const OrigenHeartIcon: FC<OrigenHeartIconProps> = ({
  className,
  size = 24,
  filled = false,
}) => (
  <svg
    aria-hidden="true"
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 20.1s-7.5-4.65-7.5-10.05A4.35 4.35 0 0 1 12 7.2a4.35 4.35 0 0 1 7.5 2.85C19.5 15.45 12 20.1 12 20.1Z"
    />
  </svg>
);

export const OrigenStarIcon: FC<OrigenStarIconProps> = ({
  className,
  size = 24,
  filled = false,
}) => (
  <svg
    aria-hidden="true"
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12 3.75 2.58 5.23 5.77.84-4.18 4.07.99 5.74L12 16.91l-5.16 2.72.99-5.74-4.18-4.07 5.77-.84L12 3.75Z"
    />
  </svg>
);

export const OrigenVerifiedBadgeIcon: FC<OrigenIconProps> = ({
  className,
  size = 24,
}) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <path
      fill="currentColor"
      d="M12 2.75 5.5 5.2v6.22c0 4.37 2.62 8.24 6.5 9.83 3.88-1.59 6.5-5.46 6.5-9.83V5.2L12 2.75Z"
    />
    <path
      fill="#FFFFFF"
      d="m10.75 14.86-2.2-2.2a.75.75 0 1 1 1.06-1.06l1.14 1.14 3.63-3.62a.75.75 0 1 1 1.06 1.06l-4.69 4.68Z"
    />
  </svg>
);

export const OrigenEmptyStateIllustration: FC<OrigenEmptyStateIllustrationProps> = ({
  className,
  width = 120,
  height = 80,
}) => (
  <svg
    role="img"
    aria-label="Sin resultados"
    className={className}
    viewBox="0 0 120 80"
    width={width}
    height={height}
    fill="none"
  >
    <rect x="16" y="38" width="88" height="28" rx="6" fill="#E8F5EE" />
    <path d="M16 44 41 28h38l25 16" fill="#E8F5EE" />
    <path d="M16 44h88" stroke="#6DC49A" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M60 40c-6.2 0-10.8 3.1-12.4 9.3-.9 3.5-.8 7.2-.5 11.1a1 1 0 0 0 1.1.9c3.8-.3 7.4-.9 10.8-2.6 5.9-3 8.9-9 8.8-17.8a1 1 0 0 0-.9-.9H60Z"
      fill="#6DC49A"
    />
  </svg>
);
