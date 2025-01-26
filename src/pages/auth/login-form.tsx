import Toast from "@/components/toast";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/middleware/auth-guard";
import supabase from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toastData, setToastData] = useState<{
        title: string;
        desc: string;
        variant: "success" | "error" | "warning";
    } | null>(null);

    const { login, user } = useAuth();

    const handleSubmit = async () => {
        if (!email || !password) {
            setToastData({
                title: "⚠️ Peringatan!",
                desc: "Cek kembali form isian anda.",
                variant: "warning",
            });
            return;
        }
    
        try {
            // Sign in using Supabase auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
    
            if (error) {
                setToastData({
                    title: "⚠️ Peringatan!",
                    desc: error.message || "Login Gagal. Cek kembali akun anda. 😉",
                    variant: "error",
                });
                return;
            }
    
            if (data.user) {
                setToastData({
                    title: "✅ Auth Berhasil!",
                    desc: "Proses autentikasi berhasil, mohon tunggu kami sedang melakukan proses selanjutnya.",
                    variant: "success",
                });
    
                // Save session token locally
                login(data.session?.access_token);
    
                // Fetch user profile data from `user_profiles`
                const { data: userData, error: profileError } = await supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('user_id', data.user.id) // Use `auth_user_id` to link user_profiles
                    .single(); // Expecting a single user profile
    
                if (profileError) {
                    setToastData({
                        title: "⚠️ Peringatan!",
                        desc: "Gagal mengambil data user. Coba lagi nanti.",
                        variant: "error",
                    });
                    return;
                }
    
                // Save user profile data locally
                user(JSON.stringify(userData));
            }
        } catch (err: any) {
            setToastData({
                title: "⚠️ Autentikasi Gagal!",
                desc: err.message || "Terjadi kesalahan tak terduga.",
                variant: "error",
            });
        }
    };
    

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Masuk untuk melanjutkan</CardTitle>
                    <CardDescription>
                        Masukkan identitas Anda pada form tertera
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                            console.log(e);
                        }}
                    >
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="username@provider.com"
                                    value={email}
                                    onChange={(e) => {
                                        setToastData(null)
                                        setEmail(e.target.value)
                                    }}
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
                                    type="password"
                                    placeholder="******"
                                    value={password}
                                    onChange={(e) => {
                                        setToastData(null)
                                        setPassword(e.target.value)
                                    }}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-400">
                        Tim PIDL MTsN 1 Ciamis &copy; Versi {__APP_VERSION__}
                    </div>
                </CardContent>
            </Card>

            {/* Render Toast only after form submission */}
            {toastData && (
                <Toast
                    title={toastData.title}
                    desc={toastData.desc}
                    variant={toastData.variant}
                />
            )}
        </div>
    );
}
