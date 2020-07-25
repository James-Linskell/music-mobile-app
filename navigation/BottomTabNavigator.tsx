import { Foundation, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SongAnalyser from '../screens/SongAnalyser';
import About from '../screens/About';
import PlaylistAnalyser from '../screens/PlaylistAnalyser';
import PlaylistSearch1 from "../screens/PlaylistSearch1";
import PlaylistSearch2 from "../screens/PlaylistSearch2";
import PlaylistSearch3 from "../screens/PlaylistSearch3";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="PlaylistAnalyser"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, tabStyle: {marginBottom: 7, marginTop: 2} }}>
            <BottomTab.Screen
                name="PlaylistAnalyser"
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="queue-music" color={color} />,
                    title: "Playlist Analyser",
                }}
            />
            <BottomTab.Screen
                name="SongAnalyser"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon2 name="music" color={color} />,
                    title: "Song Analyser",
                }}
            />
            <BottomTab.Screen
                name="About"
                component={TabThreeNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon3 name="info-outline" color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
    return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}
function TabBarIcon2(props: { name: string; color: string }) {
    return <Foundation size={30} style={{marginBottom: -3}} {...props} />;
}
function TabBarIcon3(props: { name: string; color: string }) {
    return <MaterialIcons size={30} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator() {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="PlaylistAnalyserHome"
                component={PlaylistAnalyser}
                options={{ headerTitle: 'Playlist Analyser' }}
            />
            <TabOneStack.Screen
                name="PlaylistSearch1"
                component={PlaylistSearch1}
                options={{ headerTitle: 'Playlist Analyser' }}
            />
            <TabOneStack.Screen
                name="PlaylistSearch2"
                component={PlaylistSearch2}
                options={{ headerTitle: 'Playlist Analyser' }}
            />
            <TabOneStack.Screen
                name="PlaylistSearch3"
                component={PlaylistSearch3}
                options={{ headerTitle: 'Playlist Analyser' }}
            />
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="SongAnalyserHome"
                component={SongAnalyser}
                options={{ headerTitle: 'Song Analyser' }}
            />
        </TabTwoStack.Navigator>
    );
}

const TabThreeStack = createStackNavigator();

function TabThreeNavigator() {
    return (
        <TabThreeStack.Navigator>
            <TabThreeStack.Screen
                name="AboutHome"
                component={About}
                options={{ headerTitle: 'About' }}
            />
        </TabThreeStack.Navigator>
    );
}
