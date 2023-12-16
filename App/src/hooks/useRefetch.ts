import { useAppDispatch } from './redux.hook';
import { resetParams } from '@/redux/features/params/params.slice';
import { useGetCheckListQuery } from '@/redux/services/checkList/checkList.service';
import { useGetFindingRoomsQuery } from '@/redux/services/findingRoom/findingRoom.service';
import { useGetMyPaymentQuery } from '@/redux/services/payment/payment.service';
import { useGetMyRentalQuery } from '@/redux/services/rental/rental.service';

const useRefetch = () => {
	const dispatch = useAppDispatch();

	const { refetch: refetchCheckList } = useGetCheckListQuery('');
	const { refetch: refetchMyPayment } = useGetMyPaymentQuery('');
	const { refetch } = useGetMyRentalQuery('');
	const { refetch: refetchRooms } = useGetFindingRoomsQuery({
		"page": [1],
	});
	const refetchData = () => {
		dispatch(resetParams());

		refetch();
		refetchMyPayment();
		refetchCheckList();
		refetchRooms();
	};
	return refetchData;
};
export default useRefetch;
