import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AppRoutes } from "@/routes/AppRoutes";

/**
 * Composition root. Global providers wrap the router here; keep this file
 * a thin composition layer only — no markup, no page logic.
 */
function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AppRoutes />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
