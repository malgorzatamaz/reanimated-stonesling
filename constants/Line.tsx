import {  useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
 StyleSheet,
 Dimensions,
} from 'react-native';
import {Path, Svg} from 'react-native-svg';

const {height, width} = Dimensions.get('window');

interface Props {
  stoneSlingWidth: number, 
  stoneSize: number, 
  stonePosition: {x: number, y: number}
}

export default function Line({stoneSize, stoneSlingWidth, stonePosition}: Props) {
  const offsetX = useSharedValue<number>(0);
  const offsetY = useSharedValue<number>(0);

  const left = (width - stoneSlingWidth) * 0.5 + stoneSize;
  const right = left + stoneSlingWidth * 0.5 + stoneSize
  const top = height*0.5;

  const path1 = `M ${left},${top}`;
  const path2 = `${right},${top}`;
  const stonePath = `${left + stoneSlingWidth * 0.5 - stoneSize + stonePosition.x},${top + stonePosition.y}`

  const path = `${path1} ${stonePath} ${path2}`;

  const pan = Gesture.Pan()
    .onChange((event) => {
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
    })
    .onFinalize(() => {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0)
    });
  
  return (
    <GestureDetector gesture={pan}>
      <Svg style={[StyleSheet.absoluteFill]} height={height} width={width}>
        <Path
          d={path}
          stroke={'black'}
          fill={'transparent'}
          strokeWidth={10}
          strokeLinejoin={'round'}
          strokeLinecap={'round'}
        />
      </Svg>
    </GestureDetector>
  );
}
