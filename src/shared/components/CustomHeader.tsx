export function CustomHeader({ title }: { title: string }) {
  return (
    <header className="bg-blue-800 text-white p-4 font-semibold text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  )
}