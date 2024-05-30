"use client"

import { SessionProvider } from "next-auth/react"

const SessionsProvider = ({children} : {children: React.ReactNode}) => {
  return (
      <SessionProvider>
      {children}
      </SessionProvider>
  )
}

export default SessionsProvider