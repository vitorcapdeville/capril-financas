import LoginForm from "@/app/ui/forms/login-form";
import { Suspense } from "react";

export default function LoginPage() {
    // Preciso dessa estranheza por causa do useSearchParams no login-form.
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    );
}
