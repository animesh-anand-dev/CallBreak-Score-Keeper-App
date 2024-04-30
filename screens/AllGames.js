import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, Text, ToastAndroid, View } from "react-native";
import IconButton from "../components/IconButton";
import GameListCard from "../components/GameListCard";
import GameStartModal from "../components/GameStartModal";
import { fetchAllGames } from "../services/api";
import LoadingOverlay from "../components/LoadingOverlay";
import { useFocusEffect } from "@react-navigation/native";
import OfflineLayout from "../components/OfflineLayout";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomStr } from "../utils/randomIdGenerator";

function AllGames({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [gamesData, setGamesData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [deviceID, setDeviceID] = useState("");
  const [isDeviceIdSet, setIsDeviceIdSet] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe(); // Cleanup
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="cards-playing-heart"
          color="#000000"
          onPress={openModal}
          title="Start Game"
        />
      ),
    });
  }, [modalVisible]);

  useEffect(() => {
    async function getSetDeviceId() {
      try {
        setIsDeviceIdSet(false);
        const value = await AsyncStorage.getItem("device_unique_id");
        if (value !== null) {
          setDeviceID(value);
          console.log("Stored value:", value);
        } else {
          const value = randomStr();
          await AsyncStorage.setItem("device_unique_id", value);
          setDeviceID(value);
          console.log("New Value:", value);
        }
        setIsDeviceIdSet(true);
      } catch (error) {
        setErrorMessage(error);
      }
    }
    getSetDeviceId();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (isConnected && isDeviceIdSet) {
        getGames();
      }
      async function getGames() {
        setIsFetching(true);
        try {
          const games = await fetchAllGames(deviceID);
          setGamesData(games.data.data);
          ToastAndroid.show(games.data.message, ToastAndroid.SHORT);
        } catch (error) {
          console.log(error);
          //ToastAndroid(error);
          setErrorMessage(error.response.data.message);
        }
        setIsFetching(false);
      }
    }, [isConnected, isDeviceIdSet])
  );

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (!isConnected) {
    return <OfflineLayout />;
  }

  return (
    <View style={styles.rootContainer}>
      <GameStartModal
        deviceID={deviceID}
        visible={modalVisible}
        onClose={closeModal}
      />
      {gamesData.length == 0 ? (
        <View style={styles.error}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : (
        // <ScrollView showsVerticalScrollIndicator={false}>
        //   {gamesData.map((game) => (
        //     <GameListCard
        //       key={game._id}
        //       game={game}
        //     />
        //   ))}
        // </ScrollView>
        <FlatList
          data={gamesData}
          renderItem={({ item }) => <GameListCard game={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

export default AllGames;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 8,
    // padding: 10,
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
  },
});
