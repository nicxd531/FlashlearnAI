import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import tw from 'twrnc';

interface Props {
    isActive: boolean;
}

const Time: FC<Props> = ({ isActive }) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    let intervalId: NodeJS.Timeout;
    useEffect(() => {

        if (isActive) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 59) {
                        setMinutes((prevMinutes) => prevMinutes + 1);
                        return 0;
                    } else {
                        return prevSeconds + 1;
                    }
                });
            }, 1000);
        } else {
            clearInterval(intervalId as any);
        }

        return () => clearInterval(intervalId);
    }, [isActive]);

    // Format the time to be displayed
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

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