import {  useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  
  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href="/(chat)" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
