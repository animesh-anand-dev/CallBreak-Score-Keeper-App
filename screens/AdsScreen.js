// import React, { useEffect, useState } from "react";
// import { Button, StyleSheet, View } from "react-native";
// import {
//   RewardedInterstitialAd,
//   RewardedAdEventType,
//   TestIds,
// } from "react-native-google-mobile-ads";

// function AdsScreen() {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     setLoaded(false);
//   }, [loaded]);

//   return (
//     <View style={styles.container}>
//       {!loaded && (
//         <RewardedInterstitialAdsComponent
//           onShowCallback={() => setLoaded(true)}
//         />
//       )}
//     </View>
//   );
// }

// const RewardedInterstitialAdsComponent = ({ onShowCallback }) => {
//   const adUnitId = __DEV__
//     ? TestIds.REWARDED_INTERSTITIAL
//     : "ca-app-pub-3748576757294285/4875628907";

//   const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
//     adUnitId,
//     {
//       keywords: ["fashion", "clothing"],
//     }
//   );
//   useEffect(() => {
//     const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
//       RewardedAdEventType.LOADED,
//       () => {
//         // setLoaded(true);
//         console.log("Loaded");
//       }
//     );

//     // Start loading the interstitial straight away
//     rewardedInterstitial.load();

//     // Unsubscribe from events on unmount
//     return unsubscribeLoaded;
//   }, []);

//   useEffect(() => {
//     const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
//       RewardedAdEventType.EARNED_REWARD,
//       (reward) => {
//         console.log("User earned reward of ", reward);
//         // setLoaded(false);
//         onShowCallback();
//       }
//     );
//     // Unsubscribe from events on unmount
//     return unsubscribeEarned;
//   }, []);

//   return (
//     <Button
//       title="Show Rewarded Interstitial Ad"
//       onPress={() => {
//         try {
//           rewardedInterstitial.show();
//         } catch (error) {
//           console.log(error);
//         }
//       }}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingVertical: 200,
//   },
// });

// export default AdsScreen;
