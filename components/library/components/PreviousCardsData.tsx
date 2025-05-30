import { CardsData } from '@/@types/collection';
import { calculatePerformance } from '@/components/reuseables/request';
import { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator';
import { color } from 'react-native-elements/dist/helpers';
import { Text } from 'react-native-paper';
import tw from 'twrnc';

interface Props {
    cardsData: CardsData;
}

const PreviousCardsData: FC<Props> = (props) => {
    const { cardsData } = props
    const { previous, cards } = cardsData

    const [value, setValue] = useState(0);
    const correctCardsLength = previous?.correctCards.length ?? 0; // Ensure correctCards is defined
    const cardsLength = cards.length ?? 0; // Ensure cards is defined
    const timeUsed = previous?.durationInSeconds ?? 0; // Ensure durationInSeconds is defined
    const totalAvailableTime = cardsLength * 120; // Assuming each card has a max duration of 2 minutes (120 seconds)
    const points = previous?.points ?? 0; // Ensure points is defined
    const totalPossiblePoints = cards.length * 10

    const performance = calculatePerformance(
        correctCardsLength,
        cardsLength,
        timeUsed,
        totalAvailableTime,
        points,
        totalPossiblePoints
    );

    const formatTime = (value: number): string => {
        'worklet';
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        const seconds = Math.round((value % 3600) % 60);

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        if (hours > 0) {
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        } else {
            return `${formattedMinutes}:${formattedSeconds}`;
        }
    };

    return <View style={styles.container}>

        <View style={styles.previousProgressContainer}>
            <Text variant='headlineLarge' style={[tw`mb-5 font-bold`]}>Previous Session Stats</Text>
            <Text variant='titleMedium' style={[tw`mb-7 `]}>Previous Progress</Text>
            <CircularProgress
                radius={90}
                value={performance}
                progressValueColor='#222'
                progressValueStyle={{ fontWeight: 'bold', fontSize: 20 }}
                valueSuffix={'%'}
                inActiveStrokeColor='#e0e0e0'
                inActiveStrokeOpacity={0.2}
                inActiveStrokeWidth={6}
                duration={3000}
            // onAnimationComplete={() => console.log('onAnimationComplete')}
            />

            <Text variant='titleMedium' style={[tw`text-gray-600 mt-5`]}>
                Total Cards: {cards.length ?? 0}
            </Text>
            <View style={[tw`flex-row justify-around w-full mt-10`]}>
                <View style={[tw`flex-1 items-center justify-center`]}>
                    <Text variant='labelLarge' style={[tw`text-gray-600 mb-2 text-lg`]}>
                        Correct Answers
                    </Text>
                    <CircularProgress
                        value={previous?.correctCards.length ?? 0}
                        maxValue={cards.length}
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
                            return `${value}/${cards.length}`;
                        }}
                    />
                </View>
                <View style={[tw`flex-1 items-center justify-center`]}>
                    <Text variant='labelLarge' style={[tw`text-gray-600  mb-2 text-lg`]}>
                        Time
                    </Text>

                    <CircularProgress
                        value={previous?.durationInSeconds ?? 0}
                        maxValue={cards.length * 120} // Assuming max duration is 1 hour
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
        marginBottom: 20,
    },
    previousProgressContainer: { justifyContent: 'space-around', marginTop: 20, flexDirection: 'column', alignItems: 'center' }
});

export default PreviousCardsData;