import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useAuth } from "@clerk/clerk-expo";
import { View } from "react-native";

export default function Profile() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Root layout's Redirect will kick you back to the auth screen
      // once isSignedIn flips to false — no manual navigation needed.
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Profile Screen</Text>
      <Button onPress={handleSignOut} style={{ marginTop: 20 }}>
        Log out
      </Button>
    </View>
  );
}
