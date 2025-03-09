import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/matsa/autentikasi/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import getConfig from "next/config";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const { publicRuntimeConfig } = getConfig();
  const { __APP_VERSION__ } = publicRuntimeConfig;
  return (
    // <form className="flex-1 flex flex-col min-w-64">
    //   <h1 className="text-2xl font-medium">Sign in</h1>
    //   <p className="text-sm text-foreground">
    //     Don't have an account?{" "}
    //     <Link className="text-foreground font-medium underline" href="/sign-up">
    //       Sign up
    //     </Link>
    //   </p>
    //   <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
    //     <Label htmlFor="email">Email</Label>
    //     <Input name="email" placeholder="you@example.com" required />
    //     <div className="flex justify-between items-center">
    //       <Label htmlFor="password">Password</Label>
    //       <Link
    //         className="text-xs text-foreground underline"
    //         href="/forgot-password"
    //       >
    //         Forgot Password?
    //       </Link>
    //     </div>
    //     <Input
    //       type="password"
    //       name="password"
    //       placeholder="Your password"
    //       required
    //     />
    // <SubmitButton pendingText="Signing In..." formAction={signInAction}>
    //       Sign in
    //     </SubmitButton>
    // <FormMessage message={searchParams} />
    //   </div>
    // </form>

    <div className="flex min-h-svh w-screen items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Masuk untuk melanjutkan</CardTitle>
              <CardDescription>
                Masukkan identitas Anda pada form tertera
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form

              >
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="username@provider.com"
                      name='email'
                    // value={email}
                    // onChange={(e) => {
                    //     setToastData(null)
                    //     setEmail(e.target.value)
                    // }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        aria-label="Forgot your password?"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      name='password'
                      type="password"
                      placeholder="******"
                    // value={password}
                    // onChange={(e) => {
                    //     setToastData(null)
                    //     setPassword(e.target.value)
                    // }}
                    />
                  </div>
                  <FormMessage message={searchParams} />

                  <SubmitButton pendingText="Memproses.." formAction={signInAction}>
                    Masuk
                  </SubmitButton>
                </div>
              </form>
              <Link href="/" className='flex justify-center mt-4'>
                <Button type='button' variant="ghost">
                  Kembali ke beranda →
                </Button>
              </Link>
              <div className="mt-4 text-center text-sm text-gray-400">
                Tim PIDL MTsN 1 Ciamis &copy; Versi {__APP_VERSION__}
              </div>
            </CardContent>
          </Card>

          {/* Render Toast only after form submission */}
          {/* {toastData && (
                <Toast
                    title={toastData.title}
                    desc={toastData.desc}
                    variant={toastData.variant}
                />
            )} */}
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: `MTsN 1 Ciamis | Masuk`,
  };
}