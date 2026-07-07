import React, { useState } from "react";
import { Button, View } from "react-native";
import {Text }  from "@/components/Text";
import  Input   from "@/components/Input"
import { router, Stack } from "expo-router";
import { appwriteConfig, databases } from "@/utils/appwrite";
import { ID } from "react-native-appwrite";

export default function NewRoom() {
   const [roomName, setRoomName] = useState("");
   const [roomDescription, setRoomDescription] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   
   const handleCreateRoom = async () => {
      try{
         setIsLoading(true);
         await databases.createDocument
         (
            appwriteConfig.db,
            appwriteConfig.col.chatrooms,
            ID.unique(),
            {
               title: roomName,
               description: roomDescription,
            }
         );
         router.back();
      } catch (e){
        console.log(e)
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
        <Stack.Screen
         options={{
            headerRight: () => <Button title={isLoading ? "Creating..." : "Create"}
             disabled={roomName === "" || isLoading}
             onPress={handleCreateRoom}
            />
         }} 
        />
         <View style={{ padding: 16, gap: 16 }}>
            <Text>New Room</Text>
            <Input
               placeholder="Room Name"
               value={roomName}
               onChangeText={setRoomName}
               maxLength={200}
            />

            <Input
               placeholder="Room Description" 
               value={roomDescription}
               onChangeText={setRoomDescription}
               maxLength={500}
               style={{ height: 100}}
               textAlignVertical="top"
               
            />
         </View>
      </>
   );
}