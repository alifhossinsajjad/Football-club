import { StoreProvider } from '@/redux/reduxProvider/StoreProvider'
import './globals.css'


export const metadata = {
  title: 'NextGen Pros - Admin Dashboard',
  description: 'Next-generation digital platform for youth football talent discovery',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreProvider>
 {children}
        </StoreProvider>
       
      </body>
    </html>
  )
}