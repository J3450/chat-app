import { useAuth, useUser } from "@clerk/clerk-expo";
import { Stack, Redirect, Link} from "expo-router";
import { Image, Platform, } from "react-native";
import { Text } from "@/components/Text";
import { IconSymbol } from "../../components/icon-symbol";


export default function RootLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const  { user } = useUser();

  if (isLoaded) return null;

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
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
                 style={{width: 32, height: 32, borderRadius: 16}}
                //  style={{width: 40, height: 40, borderRadius: 20}}
               />
            </Link>
          ),
          headerRight: () => (
            <Link href={"/new-room"}>
               <IconSymbol name="plus"/>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="profile" options={{presentation: "modal", headerTitle: "Profile", 
        headerLeft: () => (
          <Link dismissTo href={"/"}>
             <IconSymbol name="chevron.left"/>
          </Link>
        ),
      }}/>
      <Stack.Screen name="new-room" options={{presentation: "modal", headerTitle: "New Chat", 
        headerLeft: () => (
          <Link dismissTo href={"/"}>
             <IconSymbol name="chevron.left"/>
          </Link>
        ),
      }}/>

      <Stack.Screen
         name="/[chat]"
         options={{
          headerTitle: "",
         }}
      />

      <Stack.Screen
         name="settings/[chat]"
         options={{
          headerTitle: "Room Settings",
          presentation: "modal",
         }}
      />
    </Stack>
  )
}
