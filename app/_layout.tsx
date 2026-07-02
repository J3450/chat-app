import { Slot } from "expo-router";
import {ClerkLoaded, ClerkProvider} from "@clerk/clerk-expo"
import { tokenCache } from "@/utils/cache";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";

export default function RootLayout() {
  const publishablekey =process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishablekey) {
    throw new Error(" Missing publishable key ");
  }
  return ( 
      <ClerkProvider
       publishableKey={publishablekey}
       tokenCache={tokenCache}
      >
        <ClerkLoaded>
          <ThemeProvider value={DarkTheme}>
               <Slot />
          </ThemeProvider>
        </ClerkLoaded>
      </ClerkProvider>
  )
}
