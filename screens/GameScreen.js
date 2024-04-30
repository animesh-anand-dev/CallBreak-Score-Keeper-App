import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import IconButton from "../components/IconButton";
import TableHead from "../components/TableHead";
import TableRow from "../components/TableRow";
import TableFooter from "../components/TableFooter";
import {
  addRound,
  fetchAllScores,
  fetchRound,
  fetchTotalScores,
  updateRound,
} from "../services/api";
import LoadingOverlay from "../components/LoadingOverlay";
import { useFocusEffect } from "@react-navigation/native";
import RoundManageModal from "../components/RoundManageModal";
import LoadingSpinner from "../components/LoadingSpinner";
import NetInfo from "@react-native-community/netinfo";
// import {
//   RewardedInterstitialAd,
//   RewardedAdEventType,
//   TestIds,
// } from "react-native-google-mobile-ads";
import WinnerModal from "../components/WinnerModal";
import OfflineLayout from "../components/OfflineLayout";

function GameScreen({ route, navigation }) {
  const [modalVisibleRound, setModalVisibleRound] = useState(false);
  const [modalVisibleWinner, setModalVisibleWinner] = useState(false);
  const [scoresData, setScoresData] = useState([]);
  const [totalScore, setTotalScore] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentRound, setCurrentRound] = useState(0);
  const [currentRoundId, setCurrentRoundId] = useState("");
  const [isRoundCompleted, setIsRoundCompleted] = useState(true);
  const [isFocusEffectFinished, setIsFocusEffectFinished] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [winner, setWinner] = useState("");
  const [addScreenLoaded, setAddScreenLoaded] = useState(false);

  const gameId = route.params.gameId;
  const players = route.params.players;

  // const adUnitId = __DEV__
  //   ? TestIds.REWARDED_INTERSTITIAL
  //   : "ca-app-pub-3748576757294285/4875628907";

  // const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  //   adUnitId,
  //   {
  //     keywords: ["fashion", "clothing"],
  //   }
  // );

  const openRoundManageModal = () => {
    setModalVisibleRound(true);
  };

  const closeRoundManageModal = () => {
    setModalVisibleRound(false);
  };

  const openWinnerModal = () => {
    setModalVisibleWinner(true);
  };

  const closeWinnerModal = () => {
    setModalVisibleWinner(false);
  };

  // useEffect(() => {
  //   const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
  //     RewardedAdEventType.LOADED,
  //     () => {
  //       // setLoaded(true);
  //       setAddScreenLoaded(true);
  //       console.log("Loaded");
  //     }
  //   );
  //   // Start loading the interstitial straight away
  //   rewardedInterstitial.load();
  //   // Unsubscribe from events on unmount
  //   return unsubscribeLoaded;
  // }, [isRoundCompleted]);

  // useEffect(() => {
  //   const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     (reward) => {
  //       console.log("User earned reward of ", reward);
  //       // setLoaded(false);
  //       setAddScreenLoaded(false);
  //     }
  //   );
  //   // Unsubscribe from events on unmount
  //   return unsubscribeEarned;
  // }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe(); // Cleanup
    };
  }, [modalVisibleRound]);

  useEffect(() => {
    if (isFocusEffectFinished) {
      navigation.setOptions({
        headerRight: () => (
          <IconButton
            icon="cards-spade"
            color="#000000"
            title={
              isRoundCompleted && currentRound == 0
                ? "Start Round " + (parseInt(currentRound) + 1)
                : isRoundCompleted
                ? "Start Round " + (parseInt(currentRound) + 1)
                : "End Round " + currentRound
            }
            onPress={openRoundManageModal}
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <ActivityIndicator
            size="small"
            color="black"
          />
        ),
      });
    }
  }, [
    navigation,
    isFocusEffectFinished,
    currentRound,
    modalVisibleRound,
    isRoundCompleted,
  ]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          await Promise.all([getScores(), getTotalScore()]);
          setIsFocusEffectFinished(true);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
      fetchData();
    }, [modalVisibleRound])
  );

  useEffect(() => {
    if (currentRoundId) {
      getRound();
    }
  }, [currentRoundId]);

  // useEffect(() => {
  //   // Define your function here
  //   const yourFunction = () => {
  //     // Your logic here
  //     console.log("Your function executed");
  //     rewardedInterstitial.show();
  //   };

  //   // Define your condition here
  //   const condition = currentRound > 0; // Change this condition according to your requirement

  //   // Define the time delay in milliseconds
  //   const delay = 10000; // 5 seconds delay

  //   // Check if the condition is met and execute the function after the delay
  //   if (addScreenLoaded && condition && isRoundCompleted) {
  //     console.log("Screen Loaded : ", addScreenLoaded);
  //     console.log("Condition Satisfied : ", condition);
  //     console.log("Is Round Completed : ", isRoundCompleted);

  //     const timeoutId = setTimeout(yourFunction, delay);

  //     // Cleanup function to clear the timeout if the component unmounts or the condition changes
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [isRoundCompleted]);

  useEffect(() => {
    if (currentRound == 13 && isRoundCompleted) {
      openWinnerModal();
    }
  }, [currentRound, isRoundCompleted]);

  async function getScores() {
    setIsFetching(true);
    try {
      const games = await fetchAllScores(gameId);
      setScoresData(games.allScores);
      setCurrentRound(games.allScores[games.allScores.length - 1].roundNumber);
      console.log(
        "Current Round : ",
        games.allScores[games.allScores.length - 1].roundNumber
      );
      setCurrentRoundId(
        games.allScores[games.allScores.length - 1].scores[0].roundID
      );
      console.log(
        "Current Round ID : ",
        games.allScores[games.allScores.length - 1].scores[0].roundID
      );
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
    setIsFetching(false);
  }

  async function getTotalScore() {
    setIsFetching(true);
    try {
      const scores = await fetchTotalScores(gameId);
      setTotalScore(scores.totalScores);
      const winner = findWinner(scores.totalScores);
      setWinner(winner);
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false);
  }

  async function getRound() {
    setIsFetching(true);
    try {
      const roundData = await fetchRound(currentRoundId);
      // setCurrentRound(roundData.round.roundNumber);
      setIsRoundCompleted(roundData.round.isCompleted);
      console.log("Round Completed : ", roundData.round.isCompleted);
    } catch (error) {
      console.log("Error in getRound : ", error.response);
    }
    setIsFetching(false);
  }

  async function startRound(roundData) {
    setIsSubmitting(true);
    try {
      const response = await addRound(roundData);
      setCurrentRoundId(response.data[0].roundID);
      setIsRoundCompleted(false);
      closeRoundManageModal();
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  }

  async function endRound(roundData) {
    console.log("debud ", currentRoundId);
    setIsSubmitting(true);
    try {
      const response = await updateRound(roundData);
      setIsRoundCompleted(true);
      closeRoundManageModal();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  }

  function findWinner(totalScores) {
    let maxScorePlayer = null;
    let maxScore = Number.NEGATIVE_INFINITY;

    totalScores.forEach((player) => {
      if (player.totalScore > maxScore) {
        maxScore = player.totalScore;
        maxScorePlayer = player.playerName;
      }
    });
    return maxScorePlayer;
  }

  const renderItem = (scoresData) => {
    return (
      <View style={styles.rowContainer}>
        <TableRow
          rowName="Expected"
          rowData={scoresData.item.scores}
        />
        <TableRow
          rowName="Actual"
          rowData={scoresData.item.scores}
        />
        <TableRow
          rowName={scoresData.item.roundNumber + ". Total"}
          rowData={scoresData.item.scores}
          scoreContainer={styles.totalScore}
          scoreText={styles.scoreText}
        />
      </View>
    );
  };

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  if (!isConnected) {
    return <OfflineLayout />;
  }

  return (
    <View style={styles.container}>
      <RoundManageModal
        visible={modalVisibleRound}
        onClose={closeRoundManageModal}
        players={players}
        gameId={gameId}
        onStart={startRound}
        onEnd={endRound}
        isRoundCompleted={isRoundCompleted}
        currentRoundId={currentRoundId}
      />
      <WinnerModal
        visible={modalVisibleWinner}
        onClose={closeWinnerModal}
        winnerName={winner}
      />

      <TableHead playersNames={players} />
      {scoresData.length == 0 ? (
        <View style={styles.error}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : (
        <FlatList
          data={scoresData}
          renderItem={renderItem}
          keyExtractor={(score) => score.roundNumber}
          style={styles.scrollView}
        />
      )}
      <View style={styles.footerContainer}>
        <TableFooter totalScore={totalScore} />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  scrollView: {
    flex: 1,
    marginBottom: 35,
  },
  totalScore: {
    backgroundColor: "black",
  },
  scoreText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  rowContainer: {
    marginVertical: 5,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "white",
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
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
