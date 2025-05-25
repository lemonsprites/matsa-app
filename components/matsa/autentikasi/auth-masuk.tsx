import { signInAction } from '@/app/(auth)/actions'
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from '@/components/matsa/autentikasi/submit-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { NextPage } from 'next'
import getConfig from 'next/config'
import Link from 'next/link'

interface Props { }

const AuthMasuk = async (props: { searchParams: any }) => {
    const { publicRuntimeConfig } = getConfig();
    const { __APP_VERSION__ } = publicRuntimeConfig;

    const searchParams = await props.searchParams;
    return (
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
    )
}

export default AuthMasuk