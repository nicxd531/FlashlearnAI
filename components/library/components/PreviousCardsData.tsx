import { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator';
import { color } from 'react-native-elements/dist/helpers';
import { Text } from 'react-native-paper';
import tw from 'twrnc';

interface Props { }

const PreviousCardsData: FC<Props> = (props) => {
    const [value, setValue] = useState(0);
    const formatTime = (value: number): string => {
        'worklet';
        const minutes = Math.floor(value);
        const seconds = Math.round((value - minutes) * 60);
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${formattedSeconds}`;
    };
    return <View style={styles.container}>
        <View style={styles.previousProgressContainer}>
            <Text variant='titleLarge' style={[tw`mb-5`]}>Previous Progress</Text>
            <CircularProgress
                radius={90}
                value={85}
                progressValueColor='#222'
                progressValueStyle={{ fontWeight: 'bold', fontSize: 20 }}

                valueSuffix={'%'}
                inActiveStrokeColor='#e0e0e0'
                inActiveStrokeOpacity={0.2}
                inActiveStrokeWidth={6}
                duration={3000}
                onAnimationComplete={() => console.log('onAnimationComplete')}
            />

            <Text variant='titleMedium' style={[tw`text-gray-600`]}>
                Total Cards: 100
            </Text>
            <View style={[tw`flex-row justify-around w-full mt-10`]}>
                <View style={[tw`flex-1 items-center justify-center`]}>
                    <Text variant='labelLarge' style={[tw`text-gray-600 mb-2 text-lg`]}>
                        Correct Answers
                    </Text>


                    <CircularProgress
                        value={30}
                        radius={50}
                        duration={1000}
                        progressValueColor={'green'}
                        progressValueStyle={{ fontWeight: 'bold', fontSize: 20 }}
                        titleFontSize={16}
                        titleColor={'#333'}
                        titleStyle={{ fontWeight: 'bold' }}
                        circleBackgroundColor={'#eee'}
                        activeStrokeColor={'#2465FD'}
                        activeStrokeWidth={5}
                        activeStrokeSecondaryColor={'#C3305D'}
                        inActiveStrokeColor='#e0e0e0'
                        inActiveStrokeOpacity={0.2}
                        inActiveStrokeWidth={6}
                        progressFormatter={(value: number) => {
                            'worklet';
                            return `${value.toFixed(0)}/100`;
                        }}
                    />
                </View>
                <View style={[tw`flex-1 items-center justify-center`]}>
                    <Text variant='labelLarge' style={[tw`text-gray-600  mb-2 text-lg`]}>
                        Time
                    </Text>

                    <CircularProgress
                        value={2}
                        radius={60}
                        duration={1000}
                        progressValueColor={'green'}
                        activeStrokeWidth={5}
                        progressValueStyle={{ fontWeight: 'bold', fontSize: 20 }}
                        titleFontSize={16}
                        titleColor={'#333'}
                        titleStyle={{ fontWeight: 'bold', fontSize: 5 }}
                        circleBackgroundColor={'#eee'}
                        activeStrokeColor={'#000'}
                        //   activeStrokeSecondaryColor={'#C3305D'}
                        inActiveStrokeColor={'white'}
                        progressFormatter={formatTime}
                    />
                </View>

            </View>
        </View>

    </View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    previousProgressContainer: { justifyContent: 'space-around', marginTop: 20, flexDirection: 'column', alignItems: 'center' }
});

export default PreviousCardsData;