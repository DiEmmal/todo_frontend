export function CustomHeader({ title }: { title: string }) {
  return (
    <header className="bg-blue-500 text-white p-4 text-2xl font-semibold text-center">
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  )
}