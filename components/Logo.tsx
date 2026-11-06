/**
 * Charminar, for Hyderabad, topped by a crown for "Raja".
 * The diamond in the arch stands for "Sri", at the doorway of the home.
 * The stepped base is the foundation everything stands on.
 */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5l.5 2.6c2.4 1.5 2.7 4.2 1.7 6.4h-4.4c-1-2.2-.7-4.9 1.7-6.4z"/>
      <path d="M52 1.5l.5 2.6c2.4 1.5 2.7 4.2 1.7 6.4h-4.4c-1-2.2-.7-4.9 1.7-6.4z"/>
      <path d="M10 57l.8-46.5h2.4L14 57zM50 57l.8-46.5h2.4L54 57z"/>
      <path d="M8.4 20h7.2v1.4H8.4zM8.4 31h7.2v1.4H8.4zM8.4 42h7.2v1.4H8.4zM48.4 20h7.2v1.4h-7.2zM48.4 31h7.2v1.4h-7.2zM48.4 42h7.2v1.4h-7.2z"/>
      <path d="M27 16.8l-.8-6.2 3.2 2.4L32 8.4l2.6 4.6 3.2-2.4-.8 6.2z"/>
      <path d="M17.2 18.6h2v2.8h-2zM20.6 18.6h2v2.8h-2zM24.0 18.6h2v2.8h-2zM27.4 18.6h2v2.8h-2zM30.8 18.6h2v2.8h-2zM34.2 18.6h2v2.8h-2zM37.6 18.6h2v2.8h-2zM41.0 18.6h2v2.8h-2zM44.4 18.6h2v2.8h-2z"/>
      <path d="M14 21.4h36v1.5H14z"/>
      <path fillRule="evenodd" d="M15.4 22.9h33.2v7.6H15.4zM18.0 24.6h1.8v4.8h-1.8zM22.3 24.6h1.8v4.8h-1.8zM26.6 24.6h1.8v4.8h-1.8zM30.9 24.6h1.8v4.8h-1.8zM35.2 24.6h1.8v4.8h-1.8zM39.5 24.6h1.8v4.8h-1.8zM43.8 24.6h1.8v4.8h-1.8z"/>
      <path d="M13.4 30.7h37.2v1.7H13.4z"/>
      <path fillRule="evenodd" d="M14 32.6h36V57H14zM21 57V47.2c0-4.8 5.4-7.5 11-10.6 5.600 3.100 11 5.800 11 10.600V57zM32 44.600l2.700 3.600-2.700 3.600-2.700-3.600z"/>
      <path d="M8 57.600h48v1.900H8zM5 60h54v2.400H5z"/>
    </svg>
  );
}

export function Logo() {
  return (
    <span className="brand">
      <LogoMark className="brand-mark" size={54} />
      <span className="brand-text">
        <span className="brand-name">SriRaja</span>
        <span className="brand-sub">Construction</span>
      </span>
    </span>
  );
}
