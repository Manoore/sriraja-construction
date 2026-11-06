/** Crown formed from three building towers, with a diamond above for "Sri". */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path fill="currentColor" d="M32 2l4 5-4 5-4-5z" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 20l11 12 13-17 13 17 11-12v27H8zM15 34v9h4v-9zM30 28v15h4V28zM45 34v9h4v-9z"
      />
      <path fill="currentColor" d="M8 50h48v5H8z" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="brand">
      <LogoMark className="brand-mark" size={44} />
      <span className="brand-text">
        <span className="brand-name">SriRaja</span>
        <span className="brand-sub">Construction</span>
      </span>
    </span>
  );
}
