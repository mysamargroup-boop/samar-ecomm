
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
        {children}
    </div>
  );
}
