import type { SVGProps } from "react";

export type TechLogoProps = SVGProps<SVGSVGElement>;

export function LaravelLogo(props: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.2 5.15L6.6 3.2l3.4 1.95v7.4l4-2.3V9.05l3.4-1.95 3.4 1.95v7.05l-7.4 4.25-10.2-5.85V5.15Z" />
      <path d="M3.2 5.15L6.6 7.1l3.4-1.95" />
      <path d="M6.6 7.1v9.35" />
      <path d="M10 12.55l3.4 1.95 4-2.3v-1.2" />
      <path d="M14 9.05l3.4 1.95 3.4-1.95" />
      <path d="M13.4 14.5v5.85" />
      <path d="M10 12.55v1.95l3.4 1.95 4-2.3" />
    </svg>
  );
}

export function ReactLogo(props: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.35">
        <ellipse cx="12" cy="12" rx="9.8" ry="4.1" />
        <ellipse
          cx="12"
          cy="12"
          rx="9.8"
          ry="4.1"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9.8"
          ry="4.1"
          transform="rotate(120 12 12)"
        />
      </g>
    </svg>
  );
}

export function NextjsLogo(props: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle
        cx="12"
        cy="12"
        r="9.5"
        stroke="currentColor"
        strokeWidth="1.55"
      />
      <path
        d="M8.8 16V8.6l8.6 10.6"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2 8.6v4.9"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TypeScriptLogo(props: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="3.2"
        stroke="currentColor"
        strokeWidth="1.55"
      />
      <path
        d="M8.2 12.2h5.1M10.75 12.2v6.1"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <path
        d="M18.6 13.35c-.45-.78-1.22-1.15-2.18-1.15-1.18 0-1.95.62-1.95 1.52 0 .92.7 1.32 2.02 1.62 1.3.3 2.08.68 2.08 1.68 0 1.02-.88 1.65-2.22 1.65-1.12 0-1.95-.42-2.4-1.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PostgresLogo(props: TechLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.6 5.2c1.8.4 3.1 1.9 3.3 4 .2 2.3-.7 5.2-2.2 6.8-.6.6-1.4.4-1.5-.4-.2-1.4.2-3.2-.6-4.2-.6-.7-1.6-.6-2-.1" />
      <path d="M7.4 5.2C5.6 5.6 4.3 7.1 4.1 9.2c-.2 2.3.7 5.2 2.2 6.8.6.6 1.4.4 1.5-.4.2-1.4-.2-3.2.6-4.2" />
      <path d="M7.4 5.2C8.9 4.2 10.4 4 12 4s3.1.2 4.6 1.2" />
      <path d="M10.2 9.6v6.7c0 2.3 1.4 3.7 3.2 3.7 1.3 0 2.1-.8 2.1-1.8 0-.9-.7-1.5-1.4-1.5" />
      <circle cx="9.6" cy="8.2" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="14.4" cy="8.2" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DockerLogo(props: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="9.6" y="5.4" width="2.4" height="2.4" rx="0.35" />
      <rect x="6.6" y="8.4" width="2.4" height="2.4" rx="0.35" />
      <rect x="9.6" y="8.4" width="2.4" height="2.4" rx="0.35" />
      <rect x="12.6" y="8.4" width="2.4" height="2.4" rx="0.35" />
      <rect x="3.6" y="11.4" width="2.4" height="2.4" rx="0.35" />
      <rect x="6.6" y="11.4" width="2.4" height="2.4" rx="0.35" />
      <rect x="9.6" y="11.4" width="2.4" height="2.4" rx="0.35" />
      <rect x="12.6" y="11.4" width="2.4" height="2.4" rx="0.35" />
      <rect x="15.6" y="11.4" width="2.4" height="2.4" rx="0.35" />
      <path d="M21.6 13.4c-.5-.4-1.55-.6-2.45-.4-.18-.95-.78-1.85-1.65-2.45l-.32-.22-.2.32c-.4.68-.5 1.68-.2 2.48.12.3.3.58.52.8-.52.28-1.18.38-1.88.38H2.3l-.1.6c-.2 1.78.32 3.55 1.48 4.85 1.3 1.45 3.3 2.15 5.85 2.15 5.55 0 9.65-2.55 11.55-7.18.78 0 1.58-.12 2.08-.88l.1-.18-.18-.22c-.28-.38-.78-.78-1.48-.95Z" />
    </svg>
  );
}

export function RedisLogo(props: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3.6L20.4 7.4L12 11.2L3.6 7.4L12 3.6Z" />
      <path
        d="M3.6 11.5L12 15.3L20.4 11.5L18.1 10.45L12 13.2L5.9 10.45L3.6 11.5Z"
        fillOpacity="0.78"
      />
      <path
        d="M3.6 15.6L12 19.4L20.4 15.6L18.1 14.55L12 17.3L5.9 14.55L3.6 15.6Z"
        fillOpacity="0.55"
      />
    </svg>
  );
}

export function PythonLogo(props: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M11.9 2.5c-4.8 0-4.5 2.1-4.5 2.1v2.2H12v.65H5.6S2.5 7.1 2.5 11.9s2.7 4.65 2.7 4.65h1.6V14.3s-.09-2.7 2.65-2.7H14s2.55.04 2.55-2.46V5.05s.39-2.55-4.65-2.55ZM9.4 4.1a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7Z" />
      <path
        fillOpacity="0.65"
        d="M12.1 21.5c4.8 0 4.5-2.1 4.5-2.1v-2.2H12v-.65h6.4s3.1.35 3.1-4.45-2.7-4.65-2.7-4.65h-1.6v2.25s.09 2.7-2.65 2.7H10s-2.55-.04-2.55 2.46v4.09s-.39 2.55 4.65 2.55Zm2.5-1.6a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7Z"
      />
    </svg>
  );
}

export function TailwindLogo(props: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.47 6 12 6Zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.53 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.47 12 7 12Z" />
    </svg>
  );
}

export function GitLogo(props: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.4 11.1L12.9 2.6a1.3 1.3 0 0 0-1.8 0L9.3 4.4l2.3 2.3a1.55 1.55 0 0 1 1.95 1.95l2.2 2.2a1.55 1.55 0 1 1-.93.88l-2.05-2.05v5.4a1.55 1.55 0 1 1-1.28-.04V9.55a1.55 1.55 0 0 1-.84-2.03L8.4 5.27 2.6 11.1a1.3 1.3 0 0 0 0 1.8l8.5 8.5a1.3 1.3 0 0 0 1.8 0l8.5-8.5a1.3 1.3 0 0 0 0-1.8Z" />
    </svg>
  );
}

export function NginxLogo(props: TechLogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="M8.6 15.8V8.2l6.8 7.6V8.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
