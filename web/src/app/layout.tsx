import './globals.css'

export const metadata = {
  title: 'ReNu-Biome',
  description: 'Crop nutrient login portal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">{children}</body>
    </html>
  )
}
