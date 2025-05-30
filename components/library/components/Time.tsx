import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import tw from 'twrnc';
import historyState from '@/utils/store/zustand/useHistory';

interface Props {
    isActive: boolean;
}

const Time: FC<Props> = ({ isActive }) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const setDurationInSeconds = historyState((state) => state.setDurationInSeconds);
    // Format the time to be displayed
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined = undefined;

        if (isActive) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 59) {
                        setMinutes((prevMinutes) => {
                            const newMinutes = prevMinutes + 1;
                            setDurationInSeconds((newMinutes * 60) + 0); // Update total seconds in Zustand
                            return newMinutes;
                        });
                        return 0;
                    } else {
                        const newSeconds = prevSeconds + 1;
                        setDurationInSeconds((minutes * 60) + newSeconds); // Update total seconds in Zustand
                        return newSeconds;
                    }
                });
            }, 1000);
        } else {
            clearInterval(intervalId as any);
        }

        return () => clearInterval(intervalId);
    }, [isActive, minutes, setDurationInSeconds]);



    return (
        <Surface
            style={tw`flex-row justify-center items-center w-25 p-2 rounded-2xl   mb-6 `}
        >
            <View style={styles.container}>
                <Text style={styles.timerText}>{formattedMinutes}:{formattedSeconds}</Text>
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    timerText: {
        fontSize: 25,
    },
});

export default Time;