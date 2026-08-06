interface Props {
  className?: string;
}

export function InstagramIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function TelegramIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M21 4.5 3.5 11.2c-.8.3-.8 1.5.1 1.8l4.2 1.4 1.6 5.1c.3.9 1.4 1.1 2 .4l2.3-2.5 4.3 3.2c.7.5 1.7.1 1.9-.8L22.9 5.6c.2-.9-.7-1.6-1.5-1.3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.9 14.4 18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsappIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M20 12a8 8 0 1 1-3.4-6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 4a8 8 0 0 1 6.9 12l.9 3.5-3.6-.9A8 8 0 1 1 12 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.6c0 3 2.4 5.4 5.4 5.4.4 0 .7-.4.6-.8l-.3-1a.6.6 0 0 0-.7-.4l-1 .3a4 4 0 0 1-2.5-2.5l.3-1a.6.6 0 0 0-.4-.7l-1-.3a.6.6 0 0 0-.8.6c0 .1 0 .3 0 .4Z"
        fill="currentColor"
      />
    </svg>
  );
}
