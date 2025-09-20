import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function GoogleSignInButton() {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <Icons.google className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  )
}

export function EmailSignInButton() {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => signIn("email", { callbackUrl: "/" })}
    >
      <Icons.mail className="mr-2 h-4 w-4" />
      Continue with Email
    </Button>
  )
}