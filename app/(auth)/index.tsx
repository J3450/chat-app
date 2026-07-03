import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { isClerkAPIResponseError, useSSO } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const { startSSOFlow } = useSSO();
  // const [setActive, signIn] = useSignIn();
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const handleSignInWithGoogle = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: Linking.createURL("/"),
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace("/(chat)");
      } else {
        // there is nos session
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          // alignItems: "center",
          padding: 16,
        }}
      >
        <View style={{ flex: 0.1 }} />
        <View style={{ gap: 10, alignItems: "center" }}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>
            Morden Chat App
          </Text>
          <Text> The best chat app in the world for developers.</Text>
          {errors.map((error) => (
            <Text key={error.code} style={{ color: "red" }}>
              {error.message}
            </Text>
          ))}
        </View>
        <View style={{ flex: 1 }} />
        <Button style={{ marginBottom: 20 }}>Sign in with gmail</Button>
        <Button
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 20,
          }}
          onPress={handleSignInWithGoogle}
        >
          <Image
            source={require("@/assets/images/google-icon.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ color: "black", fontWeight: "500" }}>
            Continue with google
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
