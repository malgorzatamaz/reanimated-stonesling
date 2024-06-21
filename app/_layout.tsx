import { Image, StyleSheet, Platform, View, Easing } from 'react-native';

import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Stone from '@/constants/Stone';
import { useState } from 'react';
import Line from '@/constants/Line';
import Svg from 'react-native-svg';

const stoneSlingWidth = 300;
const stoneSize = 40;

export default function HomeScreen() {
  const [stonesCount, setStonesCount] = useState(1);
  const [stonePosition, setStonePosition] = useState({x: 0, y: 0});
  const stones = [...Array(stonesCount).keys()];
  const tap = Gesture.Tap().onEnd(()=>setStonesCount(stonesCount + 1))

  return (
    <GestureDetector gesture={tap}>
      <View style={styles.container}>
      <Line stoneSize={stoneSize} stoneSlingWidth={stoneSlingWidth} stonePosition={stonePosition}/>
        <View style={styles.stoneslingWrapper}>
          <Image
            source={require('@/assets/images/trunk.png')}
            style={styles.trunk1}/>
          <Image
            source={require('@/assets/images/trunk.png')}
            style={styles.trunk2}/>
          
        {stones.map((_,index)=> <Stone stoneSize={stoneSize} stoneSlingWidth={stoneSlingWidth} key={index} setStonePosition={setStonePosition}/>)}
        </View>
        </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  stoneslingWrapper:{
    position: 'absolute',
    width: stoneSlingWidth,
    justifyContent:'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  trunk1:{
    height: 100,
    width: 100,
  },
  trunk2:{
    height: 100,
    width: 100,
  },
});
