import './globals.css'

export const metadata = {
  title: 'Art Bid',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}