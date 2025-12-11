import type React from "react"
import type {Metadata} from "next"
import {Geist, Geist_Mono} from "next/font/google"
import "./globals.css"
import {AuthProvider} from "@/lib/hooks/use-auth"
import {InterceptorProvider} from "@/lib/contexts/interceptor-context"
import {AlertProvider} from "@/lib/contexts/alert-context"
import {Toaster} from "sonner"
import {GlobalAlertDialog} from "@/components/global-alert-dialog"
import {InterceptorsInitializer} from "@/components/interceptors-initializer";

export const metadata: Metadata = {
    title: "MenteVior Back Office",
    description: "Enterprise back office platform for mental health clinics",
    generator: "kodeWave.app",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="" suppressHydrationWarning>
        <body className={`font-sans antialiased`}>
        <InterceptorProvider>
            <AuthProvider>
                <AlertProvider>
                    <InterceptorsInitializer></InterceptorsInitializer>
                    <GlobalAlertDialog/>
                    {children}
                </AlertProvider>
            </AuthProvider>
        </InterceptorProvider>
        <Toaster position="top-right" richColors closeButton/>

        </body>
        </html>
    )
}
