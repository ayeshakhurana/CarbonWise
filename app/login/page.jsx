"use client"
import { signIn, signOut, useSession } from 'next-auth/react'

const Login = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "authenticated") {
    return (
      <div>
        <p>Welcome, {session.user.name}</p>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => signIn("google")}>Login with Google</button>
    </div>
  )
}

export default Login
