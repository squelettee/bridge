export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-screen max-w-screen-2xl mx-auto bg-secondary-background">
      {children}
    </main>
  )
}