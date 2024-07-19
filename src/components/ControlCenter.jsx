import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
    const playbackState = usePlaybackState();

    // Function to skip to the next track
    const skipToNext = async () => {
        try {
            await TrackPlayer.skipToNext();
        } catch (error) {
            console.error('Error skipping to next track:', error);
        }
    };

    // Function to skip to the previous track
    const skipToPrevious = async () => {
        try {
            await TrackPlayer.skipToPrevious();
        } catch (error) {
            console.error('Error skipping to previous track:', error);
        }
    };

    // Function to toggle playback state (play/pause)
    const togglePlayback = async () => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null) {
            if (playbackState === State.Playing) {
                await TrackPlayer.pause();
            } else {
                await TrackPlayer.play();
            }
        }
    };

    // Log current playback state for debugging
    console.log('Playback State:', playbackState);

    return (
        <View style={styles.container}>
            <Pressable onPress={skipToPrevious}>
                <Icon style={styles.icon} name="skip-previous" size={40} />
            </Pressable>
            <Pressable onPress={togglePlayback}>
                <Icon 
                    style={styles.icon} 
                    name={playbackState === State.Playing ? "pause" : "play-arrow"} 
                    size={75} 
                />
            </Pressable>
            <Pressable onPress={skipToNext}>
                <Icon style={styles.icon} name="skip-next" size={40} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Center the controls
    },
    icon: {
        color: '#FFFFFF',
        marginHorizontal: 20, // Add margin for better spacing
    },
});

export default ControlCenter;