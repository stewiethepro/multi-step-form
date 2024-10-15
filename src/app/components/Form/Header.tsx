interface HeaderProps {
  title: string
  description: string
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="flex flex-col gap-2 sm:gap-3">
      <h1 className="text-purple600 font-bold text-2xl sm:text-3xl">{title}</h1>
      <p className="text-purple800 font-normal text-base ">{description}</p>
    </header>
  )
} 