export default async function RacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-200 min-h-screen p-10">
      <div className="h-full bg-white">{children}</div>
    </div>
  );
}
