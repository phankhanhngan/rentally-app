import React, { Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import BackButton from '@/components/BackButton';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams, 'Statistic'>;
const Points = [
	{ text: 'Room payment', color: '#E36414' },
	{ text: 'Water payment', color: '#F7B787' },
	{ text: 'Eletric payment', color: '#F9E8D9' },
	{ text: 'Additional payment', color: '#527853' },
];

const renderTitle = () => {
	return (
		<View style={{ marginVertical: 30 }}>
			<Text
				style={{
					color: 'black',
					fontSize: 20,
					fontWeight: 'bold',
					textAlign: 'center',
					marginBottom: 10,
				}}
			>
				Payment report
			</Text>

			<View
				style={{
					width: '100%',
					paddingHorizontal: 24,
					flexDirection: 'row',
					flexWrap: 'wrap',
				}}
			>
				{Points.map((point, index) => (
					<View
						key={index}
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginLeft: 16,
						}}
					>
						<View
							style={{
								height: 12,
								width: 12,
								borderRadius: 6,
								backgroundColor: `${point.color}`,
								marginRight: 8,
							}}
						/>
						<Text
							style={{
								height: 16,
								color: 'gray',
								fontSize: 11,
							}}
						>
							{point.text}
						</Text>
					</View>
				))}
			</View>
		</View>
	);
};
const BarChatCustom = ({ stackData }: { stackData: any }) => {
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<BarChart
				width={300}
				roundedTop
				roundedBottom
				noOfSections={4}
				stackData={stackData}
				xAxisThickness={0}
				yAxisThickness={0}
				yAxisTextStyle={{ color: 'gray' }}
				backgroundColor={'white'}

				// noOfSections={3}
			/>
			<View style={{ marginTop: 18, paddingHorizontal: 20 }}>
				<Text
					style={{
						fontSize: 14,
						fontWeight: '700',
						textAlign: 'center',
						color: 'black',
					}}
				>
					{' '}
					January
				</Text>
				<View
					style={{
						flexDirection: 'row',

						justifyContent: 'space-between',
					}}
				>
					<Text
						style={{
							color: '#5E5D5E',
							fontSize: 12,
							fontWeight: '400',
						}}
					>
						Price
					</Text>
					<Text
						style={{
							color: 'black',
							fontWeight: 'bold',
							fontSize: 13,
						}}
					>
						100.000
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text
						style={{
							color: '#5E5D5E',
							fontSize: 12,
							fontWeight: '400',
						}}
					>
						Electric
					</Text>
					<Text
						style={{
							color: 'black',
							fontWeight: 'bold',
							fontSize: 13,
						}}
					>
						100.000
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text
						style={{
							color: '#5E5D5E',
							fontSize: 12,
							fontWeight: '400',
						}}
					>
						Water
					</Text>
					<Text
						style={{
							color: 'black',
							fontWeight: 'bold',
							fontSize: 13,
						}}
					>
						100.000
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text
						style={{
							color: '#5E5D5E',
							fontSize: 12,
							fontWeight: '400',
						}}
					>
						Additional
					</Text>
					<Text
						style={{
							color: 'black',
							fontWeight: 'bold',
							fontSize: 13,
						}}
					>
						100.000
					</Text>
				</View>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text
						style={{
							color: '#5E5D5E',
							fontSize: 12,
							fontWeight: '400',
						}}
					>
						Compared to last month.
					</Text>
					<Text
						style={{
							color: 'red',
							fontWeight: 'bold',
							fontSize: 13,
						}}
					>
						10%
					</Text>
				</View>
			</View>
		</View>
	);
};

const App = ({ navigation, route }: Props) => {
	const BackHandler = () => {
		navigation.pop();
	};
	const stackData = [
		{
			stacks: [
				{ value: 40, color: '#E36414' },
				{ value: 4, color: '#F7B787' },
				{ value: 6, color: '#F9E8D9' },
				{ value: 1, color: '#527853' },
			],
			label: 'Jan',
		},
		{
			stacks: [
				{ value: 30, color: '#E36414' },
				{ value: 11, color: '#F7B787' },
				{ value: 15, color: '#F9E8D9' },
				{ value: 10, color: '#527853' },
			],
			label: 'Mar',
		},
		{
			stacks: [
				{ value: 20, color: '#E36414' },
				{ value: 1, color: '#F7B787' },
				{ value: 5, color: '#F9E8D9' },
				{ value: 10, color: '#527853' },
			],
			label: 'Feb',
		},
		{
			stacks: [
				{ value: 25, color: '#E36414' },
				{ value: 11, color: '#F7B787' },
				{ value: 15, color: '#F9E8D9' },
				{ value: 6, color: '#527853' },
			],
			label: 'Mar',
		},
		{
			stacks: [{ value: 30, color: 'gray' }],

			label: 'May',
		},
		{
			stacks: [{ value: 30, color: 'gray' }],

			label: 'June',
		},
		{
			stacks: [{ value: 30, color: 'gray' }],

			label: 'July',
		},
		{
			stacks: [{ value: 30, color: 'gray' }],
			label: 'Aug',
		},
	];
	const Tab = createMaterialTopTabNavigator();
	function StatisticTabs() {
		return (
			<Tab.Navigator
				initialRouteName="2024"
				screenOptions={{
					tabBarScrollEnabled: true,
					tabBarLabelStyle: { fontSize: 12 },
					tabBarIndicatorStyle: { backgroundColor: '#E36414' },
					tabBarActiveTintColor: '#E36414',
					tabBarInactiveTintColor: 'black',
				}}
			>
				<Tab.Screen
					name={'2023'}
					children={(props) => (
						<BarChatCustom stackData={stackData} />
					)}
				/>
				<Tab.Screen
					name={'2024'}
					children={(props) => (
						<BarChatCustom stackData={stackData} />
					)}
				/>
			</Tab.Navigator>
		);
	}

	return (
		<View
			style={{
				backgroundColor: 'white',
				flex: 1,
				width: '100%',
				paddingHorizontal: 12,
			}}
		>
			<Text
				style={{
					fontWeight: '400',
					fontSize: 26,
					color: '#000',
					marginTop: 2,
					marginLeft: 20,
					paddingTop: 20,
					paddingLeft: 40,
				}}
			>
				Statictis
			</Text>
			<BackButton onPress={BackHandler} />
			{renderTitle()}
			<View
				style={{
					flex: 1,
					backgroundColor: 'white',
					width: '100%',
					paddingHorizontal: 12,
				}}
			>
				{StatisticTabs()}
			</View>
		</View>
	);
};
export default App;
