// Re-mounts on every navigation, giving pages a short app-like enter animation.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
