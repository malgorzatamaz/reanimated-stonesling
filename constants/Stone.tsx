import { Dimensions, Easing, LayoutChangeEvent } from 'react-native';
import Animated, {  useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Component, useCallback, useRef, useState } from 'react';
const {height, width} = Dimensions.get('window');
type Position = {x:number, y:number}
interface Props {
  setStonePosition: ({x, y} : Position )=>void;
  stoneSlingWidth: number;
  stoneSize: number;
}

export default function Stone({setStonePosition, stoneSlingWidth, stoneSize}: Props) {
  const [stoneFrameRelativePostion, setStoneFrameRelativePostion] = useState<Position>()
  const stoneY = height*0.5;
  const stoneX = width*0.5;

  const stoneRef = useRef<any | null>(null);
  
  const velocityY = useSharedValue<number>(0);
  const velocityX = useSharedValue<number>(0);

  const offsetX = useSharedValue<number>(0);
  const offsetY = useSharedValue<number>(0);
  const thrown = useSharedValue<boolean>(false);

  const pan = Gesture.Pan()
    .onChange((event) => {
      if(!thrown.value){
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
      setStonePosition({x: offsetX.value, y: offsetY.value});

      velocityY.value = event.velocityY;
      velocityX.value = event.velocityX;
      }
    })
    .onFinalize(() => {
      if(!thrown.value){
      let X = 0 - offsetX.value - Math.abs(velocityX.value);
      let Y = 0 - 2* offsetY.value - 2 * Math.abs(velocityY.value);
  
      if(stoneX + X < 0)
      {
        X = -stoneX
        console.log(X)
      }
      else if(stoneX - X > width){
        X = width*0.5
        
      }

      if(stoneY + Y < 0)
      {
        Y = -stoneY
      }
      else if(stoneY + Y > height){
        Y = height*0.5
        console.log(Y)
      }
      
      

      offsetX.value = withTiming(X,
        {duration: 300,
        easing: Easing.ease
        });
      offsetY.value = withTiming(Y,
        {duration: 300,
        easing: Easing.ease,
        });
      }

      setStonePosition({x: 0, y: 0});
      thrown.value = true;
    });

   const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y } = event.nativeEvent.layout;
    setStoneFrameRelativePostion({x,y});
    
    
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value }
    ],
    position: 'absolute'
  }));

  
  return (
    <GestureDetector gesture={pan}>
    <Animated.Image
      ref={stoneRef}
      onLayout={onLayout}
      source={require('@/assets/images/stone.png')}
      style={[{
      position: 'absolute', 
      left: (stoneSlingWidth - stoneSize) * 0.5, 
      height: stoneSize,
      width: stoneSize,
      bottom: stoneSize
    }, animatedStyles]}/>
    </GestureDetector>
  );
}
