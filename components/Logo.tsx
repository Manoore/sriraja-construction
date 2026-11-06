/**
 * Charminar, for Hyderabad, topped by a crown for "Raja".
 * The diamond in the arch stands for "Sri", at the doorway of the home.
 * The stepped base is the foundation everything stands on.
 */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
      <path d="M25.5 16.5L24 8.5l4.6 3.5L32 5.5l3.4 6.5L40 8.5l-1.5 8z"/>
      <path d="M15 17.6h34v1.5H15z"/>
      <path fillRule="evenodd" d="M16 19.1h32V27H16zM19 21v5h2v-5zM25 21v5h2v-5zM31 21v5h2v-5zM37 21v5h2v-5zM43 21v5h2v-5z"/>
      <path d="M13 27.8h38V30H13z"/>
      <path fillRule="evenodd" d="M15 30.8h34V56H15zM22 56V45c0-5 5-8 10-10.500 5 2.500 10 5.500 10 10.500v11zM32 43l3 4-3 4-3-4z"/>
      <path d="M12 2.500l.6 2.700c2.900 1.800 3.200 4.800 2 6.800H9.400c-1.200-2-.9-5 2-6.800z"/>
      <path d="M52 2.500l.6 2.700c2.900 1.800 3.200 4.800 2 6.800h-5.200c-1.200-2-.9-5 2-6.800z"/>
      <path d="M9 56l1-43h4l1 43zM49 56l1-43h4l1 43z"/>
      <path d="M8 24h8v1.800H8zM8 38h8v1.800H8zM48 24h8v1.800h-8zM48 38h8v1.800h-8z"/>
      <path d="M7 56.500h50V59H7zM4 59.600h56V62H4z"/>
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
