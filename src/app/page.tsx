import Chat from "@/components/Chat";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider>
      <Chat />
    </ThemeProvider>
  );
}
