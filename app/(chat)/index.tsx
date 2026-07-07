import { useEffect, useState } from "react";
import {  View, FlatList, RefreshControl } from "react-native";
import { Text } from "@/components/Text";
import { chatRooms } from "@/utils/test-data";
import { ChatRoom } from "@/utils/types";
import { Link } from "expo-router";
import { IconSymbol } from "../../components/icon-symbol";
import { Gray, Secondary } from "@/utils/colors";
import { appwriteConfig, databases } from "@/utils/appwrite";
import { Query } from "react-native-appwrite";

export default function Index() {
  const [chatRooms, setChatRooms] = useState <ChatRoom[]>([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
      fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
     try {
         const { documents, total} = await databases.listDocuments(
          appwriteConfig.db,
          appwriteConfig.col.chatrooms,
          [Query.limit(100)]
        )
        setChatRooms(documents as ChatRoom[]);
       console.log(JSON.stringify(documents, null, 2), total)
     } catch(e) {
       console.log(e)
     }
  }
   
  const handleRefresh = async () => {
    try{
      setRefreshing(true);
      await fetchChatRooms();
    } catch(e){
      console.log(e);
    } finally{
      setRefreshing(false);
    }
  }
   
  return (
    <FlatList 
      data={chatRooms}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
      }
      renderItem={({ item }) => (
        <Link href={{
          pathname: "/",
          //remeber that the pathname: is /[chat] not /(chat) just to clear the error for now
          params:  {chat: item.id},
        }}
        >

          <View
            style={{
              gap:6,
              padding: 16,
              width: "100%",
              borderRadius: 16,
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: Secondary,
              justifyContent: "space-between"
            }}
          >
            <ItemTitleAndDescription
             title={item.title}
             description={item.description}
            />
            <IconSymbol name="chevron.right" color={Gray}/>
          </View>
        </Link>
      )}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 16,
        gap: 16
      }}
    />
  );
}

function  ItemTitle ({title} :{title: string;}) {
  return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4}}>
         <Text style={{fontSize: 17}}> {title} </Text>
      </View>
  );
}
function  ItemTitleAndDescription ({
  title,
  description,
} :{
  title: string;
  description: string;
}) {
  return (
      <View style={{ gap: 4}}>
        <ItemTitle title={title} />
         <Text style={{fontSize: 13, color:Gray}}> {description} </Text>
      </View>
  );
}