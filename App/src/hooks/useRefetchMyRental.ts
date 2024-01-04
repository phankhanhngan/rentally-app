import { useGetMyRentalQuery } from '@/redux/services/rental/rental.service';
import { STATUS } from '@/utils/constants';

const useRefetchMyRental = () => {
	const { refetch: refetchApproved } = useGetMyRentalQuery(STATUS.APPROVED);
	const { refetch: refetchBroken } = useGetMyRentalQuery(STATUS.BROKEN);
	const { refetch: refetchCancel } = useGetMyRentalQuery(STATUS.CANCELED);
	const { refetch: refetchCompleted } = useGetMyRentalQuery(STATUS.COMPLETED);
	const { refetch: refetchCreated } = useGetMyRentalQuery(STATUS.CREATED);
	const { refetch: refetchEnded } = useGetMyRentalQuery(STATUS.ENDED);
	const { refetch: refetchRequestBreak } = useGetMyRentalQuery(
		STATUS.REQUEST_BREAK,
	);

	const refethDataMyRental = () => {
		refetchBroken();
		refetchCancel();
		refetchCompleted();
		refetchCreated();
		refetchRequestBreak();
		refetchEnded();
		refetchApproved();
	};
	return refethDataMyRental;
};
export default useRefetchMyRental;
