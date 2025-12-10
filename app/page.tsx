import Image from "next/image";
import { Button} from "@/components/ui/button";
import { UserButton } from "@/components/user-button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="absolute top-0 right-0 p-4">
        <UserButton />
      </header>
      <div className="flex flex-1 items-center justify-center min-h-screen">
         <Button>Hello!!  Amar...</Button>
      </div>
    </div>
  );
}
