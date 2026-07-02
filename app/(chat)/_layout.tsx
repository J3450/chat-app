import { useUser, useAuth } from "@clerk/clerk-expo";
import { Stack, Redirect, Link} from "expo-router";
import { Image, Platform, } from "react-native";
import { Text } from "@/components/Text";


export default function RootLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const  { user } = useUser();

   if (!isLoaded) return null;

   if (!isSignedIn) {
    return < Redirect href="/(auth)" />;
   }

  return (
    <Stack>
      <Stack.Screen name="index"
        options={{
          headerLargeTitle: Platform.OS === "ios",
          headerStyle:{
            //  backgroundColor: "#fff",
          },
          headerTitleStyle: {
            fontSize: Platform.OS === "android" ? 22 : 17,
             fontWeight: 'bold',
          },
          headerTitle: "Chat Room",
          headerLeft: () => (
            <Link href={"/profile"}>
              <Text>Profile</Text>
               <Image
                 source={{uri: user?.imageUrl}}
                 style={{width: 40, height: 40, borderRadius: 20}}
               />
            </Link>
          ),
          headerRight: () => (
            <Link href={"/profile"}>
               
            </Link>
          ),
        }}
      />
      <Stack.Screen name="profile" options={{presentation: "modal"}}/>
    </Stack>
  )
}
