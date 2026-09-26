import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata={title:'SMOEDESIGN Creative Hub',description:'A strategic creative operating hub for projects, capabilities and client intake.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
