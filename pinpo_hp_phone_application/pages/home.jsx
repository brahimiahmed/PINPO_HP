import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";


export default function HomeScreen({ navigation }) {
    const [chartParentWidth, setChartParentWidth] = useState(0);
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={{ flex: 1, backgroundColor: "#fcfcfc" }}>

                <Header width={chartParentWidth} username='PINPO HB'/>

                <LineChartGraph width={chartParentWidth} data={data} title={'Line Chart'} />

                <ProgressChartGraph width={chartParentWidth} data={data2} title={'Progress Chart'} />

                <BarChartGraph width={chartParentWidth} data={data3} title={'Bar Chart'} />

                <View style={styles.container} onLayout={({ nativeEvent }) => setChartParentWidth(nativeEvent.layout.width)}></View>
                <StatusBar style="auto" />
            </ScrollView>
        </SafeAreaView>
    );
}


const Header = (props) => {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row-reverse',
            marginHorizontal: 30,
            marginTop: 20,
        }} >
            <Image source={require('../media/pic.jpg')} style={{ width: 50, height: 50, borderRadius: 999, backgroundColor: 'red' }} />
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{'Latest Statistics'}</Text>
                <Text style={{ fontSize: 12, fontWeight:'bold' }}>{props.username}</Text>
            </View>

        </View>
    );
}

const LineChartGraph = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleContainer}>{props.title}</Text>
            <LineChart
                data={props.data}
                width={props.width}
                height={256}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                bezier
            />
        </View>
    );
}

const ProgressChartGraph = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleContainer}>{props.title}</Text>
            <ProgressChart
                data={props.data}
                width={props.width}
                height={220}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={true}
            />
        </View>
    );
}


const BarChartGraph = (props) => {
    return (
        <View style={styles.containerStyle2}>
            <Text style={{
                flex: 1,
                marginLeft: 15,
                justifyContent: 'center',
                color: '#fff',
            }}>{props.title}</Text>
            <BarChart
                data={props.data}
                width={props.width}
                height={280}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />
        </View>
    );
}


const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(144, 202, 249, ${opacity})`, //'#90caf9',//
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 30,
        marginTop: 20,
        padding: 5,
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    containerStyle2: {
        flex: 1,
        backgroundColor: '#0f69fe',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 30,
        marginTop: 20,
        padding: 5,
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    titleContainer: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
        //marginTop: 10,
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: '#fcfcfc',
    }
});


const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 165, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days"] // optional
};

const data2 = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8],
};

const data3 = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43]
        }
    ]
};

const data4 = [
    {
        name: "Seoul",
        population: 21500000,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Toronto",
        population: 2800000,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Beijing",
        population: 527612,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "New York",
        population: 8538000,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Moscow",
        population: 11920000,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];
