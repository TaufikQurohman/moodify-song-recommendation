export default function VersionPage() {
  return (
    <main className="min-h-screen bg-background p-8 text-foreground">
      <h1 className="text-3xl font-semibold">Melorasa Deployment Check</h1>
      <p className="mt-4 text-muted-foreground">Expected home route: landing page</p>
      <p className="mt-2 text-muted-foreground">Expected app route: curhat input</p>
      <p className="mt-6 rounded-md border border-foreground/10 bg-[#172033] p-4 font-mono text-sm">
        build-marker: melorasa-landing-v2
      </p>
    </main>
  );
}
