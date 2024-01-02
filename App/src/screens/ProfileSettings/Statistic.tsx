import { useState } from 'react';
import React, { Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/AntDesign';

import BackButton from '@/components/BackButton';
import Loading from '@/components/Loading';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { useGetStatisticQuery } from '@/redux/services/statistic/statistic.service';
import { MONTH, MONTH_FULL } from '@/utils/constants';
import { formatNumberWithCommas } from '@/utils/helpers';
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
const BarChatCustom = ({ year }: { year: number }) => {
	const { data, isLoading, isFetching } = useGetStatisticQuery(year);
	const [mon, setMon] = useState(1);
	if (isLoading || isFetching) return <Loading />;

	const stackData = data?.data.statistics.map((statistic) => {
		return {
			stacks: [
				{ value: statistic.cost, color: '#E36414' },
				{ value: statistic.water, color: '#F7B787' },
				{ value: statistic.electric, color: '#F9E8D9' },
				{ value: statistic.additionalPrice, color: '#527853' },
			],
			label: MONTH[statistic.month - 1],
			onPress: () => {
				// console.log(statistic.month);
				setMon(statistic.month);
			},
		};
	});

	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<BarChart
				width={300}
				roundedTop
				roundedBottom
				stackData={stackData}
				xAxisThickness={0}
				yAxisThickness={0}
				yAxisTextStyle={{ color: 'gray' }}
				backgroundColor={'white'}

				// noOfSections={3}
			/>
			<View style={{ marginTop: 22, paddingHorizontal: 20 }}>
				<Text
					style={{
						fontSize: 16,
						fontWeight: '700',
						textAlign: 'center',
						color: 'black',
					}}
				>
					{MONTH_FULL[mon - 1]}
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
						Room
					</Text>
					<Text
						style={{
							color: 'black',
							fontWeight: 'bold',
							fontSize: 13,
						}}
					>
						{data?.data?.statistics[mon - 1].cost &&
							formatNumberWithCommas(
								data?.data?.statistics[mon - 1].cost,
							)}{' '}
						VND
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
						{data?.data?.statistics[mon - 1].electric &&
							formatNumberWithCommas(
								data?.data?.statistics[mon - 1].electric,
							)}{' '}
						VND
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
						{data?.data?.statistics[mon - 1].water &&
							formatNumberWithCommas(
								data?.data?.statistics[mon - 1].water,
							)}{' '}
						VND
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
						{data?.data?.statistics[mon - 1].additionalPrice &&
							formatNumberWithCommas(
								data?.data?.statistics[mon - 1].additionalPrice,
							)}{' '}
						VND
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
						Total
					</Text>
					<Text
						style={{
							color: 'black',
							fontWeight: 'bold',
							fontSize: 13,
						}}
					>
						{formatNumberWithCommas(
							(data?.data?.statistics[mon - 1].additionalPrice ||
								0) +
								(data?.data?.statistics[mon - 1].cost || 0) +
								(data?.data?.statistics[mon - 1].electric ||
									0) +
								(data?.data?.statistics[mon - 1].water || 0),
						)}{' '}
						VND
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
					{(data?.data?.statistics[mon - 1].increase || 0) > 0 ? (
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Icon name="arrowup" color={'green'} />
							<Text
								style={{
									color: 'green',
									fontWeight: 'bold',
									fontSize: 13,
								}}
							>
								{data?.data?.statistics[mon - 1].increase || 0}%
							</Text>
						</View>
					) : (
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Icon name="arrowdown" color={'red'} />
							<Text
								style={{
									color: 'red',
									fontWeight: 'bold',
									fontSize: 13,
								}}
							>
								{
									-(
										data?.data?.statistics[mon - 1]
											.increase || 0
									)
								}
								%
							</Text>
						</View>
					)}
				</View>
			</View>
		</View>
	);
};

const App = ({ navigation }: Props) => {
	const BackHandler = () => {
		navigation.pop();
	};
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const Tab = createMaterialTopTabNavigator();
	function StatisticTabs() {
		return (
			<Tab.Navigator
				initialRouteName={`${currentYear}`}
				screenOptions={{
					tabBarScrollEnabled: true,
					tabBarLabelStyle: { fontSize: 12 },
					tabBarIndicatorStyle: { backgroundColor: '#E36414' },
					tabBarActiveTintColor: '#E36414',
					tabBarInactiveTintColor: 'black',
				}}
			>
				{new Array(3).fill(0).map((_, index) => {
					return (
						<Tab.Screen
							key={index}
							name={`${currentYear - 2 + index}`}
							children={() => (
								<BarChatCustom year={currentYear - 2 + index} />
							)}
						/>
					);
				})}
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
					paddingHorizontal: 4,
				}}
			>
				{StatisticTabs()}
			</View>
		</View>
	);
};
export default App;
