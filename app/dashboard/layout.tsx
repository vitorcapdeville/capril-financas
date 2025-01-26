import { signOutAction } from "@/app/actions/login";
import { getCurrentUser } from "@/app/client/sdk.gen";
import "@/app/ui/globals.css";
import NavLinks from "@/app/ui/nav-links";
import LogoutIcon from "@mui/icons-material/Logout";
import { Grid2, IconButton } from "@mui/material";
import Image from "next/image";
export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = await getCurrentUser();

  if (!user) return <div>Not authenticated</div>;

  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-800 text-white p-4">
        <div className="flex flex-col items-center justify-center grid-cols-1 mb-4 space-y-2">
          <Image
            src="/capril_logo.jpeg"
            alt="Logo da Empresa"
            width={150}
            height={100}
          />
          <Grid2 container spacing={0.5}>
            <Grid2
              display="flex"
              justifyContent="center"
              alignItems="center"
              size={10}
            >
              <p>{user.email}</p>
            </Grid2>
            <Grid2
              display="flex"
              justifyContent="center"
              alignItems="center"
              size={2}
            >
              <form
                action={signOutAction}
              >
                <IconButton type="submit" size="small">
                  <LogoutIcon sx={{ color: "white" }} />
                </IconButton>
              </form>
            </Grid2>
          </Grid2>
        </div>
        <NavLinks />
      </aside>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
