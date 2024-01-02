import { useAppDispatch } from './redux.hook';
import { resetParams } from '@/redux/features/params/params.slice';
import { useGetCheckListQuery } from '@/redux/services/checkList/checkList.service';
import { useGetFindingRoomsQuery } from '@/redux/services/findingRoom/findingRoom.service';
import { useGetMyPaymentQuery } from '@/redux/services/payment/payment.service';
import { useGetMyRentalQuery } from '@/redux/services/rental/rental.service';
import { useGetStatisticQuery } from '@/redux/services/statistic/statistic.service';
import { PAYMENTSTATUS, STATUS } from '@/utils/constants';

const useRefetch = () => {
	const dispatch = useAppDispatch();

	const { refetch: refetchCheckList } = useGetCheckListQuery('');
	const { refetch: refetchPaidMyPayment } = useGetMyPaymentQuery(
		PAYMENTSTATUS.PAID,
	);
	const { refetch: refetchUnpaidMyPayment } = useGetMyPaymentQuery(
		PAYMENTSTATUS.UNPAID,
	);
	const { refetch: refetchStatistic2022 } = useGetStatisticQuery(2022);
	const { refetch: refetchStatistic2023 } = useGetStatisticQuery(2023);
	const { refetch: refetchStatistic2024 } = useGetStatisticQuery(2024);

	const { refetch: refetchApproved } = useGetMyRentalQuery(STATUS.APPROVED);
	const { refetch: refetchBroken } = useGetMyRentalQuery(STATUS.BROKEN);
	const { refetch: refetchCancel } = useGetMyRentalQuery(STATUS.CANCELED);
	const { refetch: refetchCompleted } = useGetMyRentalQuery(STATUS.COMPLETED);
	const { refetch: refetchCreated } = useGetMyRentalQuery(STATUS.CREATED);
	const { refetch: refetchEnded } = useGetMyRentalQuery(STATUS.ENDED);
	const { refetch: refetchRequestBreak } = useGetMyRentalQuery(
		STATUS.REQUEST_BREAK,
	);

	const { refetch: refetchRooms } = useGetFindingRoomsQuery({
		page: [1],
	});
	const refetchData = () => {
		dispatch(resetParams());
		refetchBroken();
		refetchCancel();
		refetchCompleted();
		refetchCreated();
		refetchRequestBreak();
		refetchEnded();
		refetchApproved();
		refetchPaidMyPayment();
		refetchUnpaidMyPayment();
		refetchCheckList();
		refetchRooms();
		refetchStatistic2022();
		refetchStatistic2023();
		refetchStatistic2024();
	};
	return refetchData;
};
export default useRefetch;
