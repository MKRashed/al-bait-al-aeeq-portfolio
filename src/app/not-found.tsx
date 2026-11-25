import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <p className="eyebrow">404</p>
        <h1 className="h2">This page doesn&apos;t exist</h1>
        <p className="lead">The page may have moved. Have a look at our services instead.</p>
        <Link className="btn btn-red" href="/services">See all services</Link>
      </div>
    </section>
  );
}
