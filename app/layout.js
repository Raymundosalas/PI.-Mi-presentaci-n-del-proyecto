
import "./globals.css";

export const metadata = {
  title: "LigaPro | Gestión Deportiva",
  description: "Sistema de administración de ligas deportivas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
