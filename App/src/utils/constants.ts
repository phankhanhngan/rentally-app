export const enum STATUS {
	COMPLETED = 'COMPLETED',
	CREATED = 'CREATED',
	APPROVED = 'APPROVED',
	BROKEN = 'BROKEN',
	ENDED = 'ENDED',
	REQUEST_BREAK = 'REQUEST_BREAK',
	CANCELED = 'CANCELED',
}
export const STATUS_COLORS = {
	[STATUS.COMPLETED]: '#f39c12',
	[STATUS.APPROVED]: '#27ae60',
	[STATUS.CREATED]: '#3498db',
	[STATUS.REQUEST_BREAK]: '#f1c40f',
	[STATUS.ENDED]: '#e74c3c',
	[STATUS.CANCELED]: 'b2b2b2',
	[STATUS.BROKEN]: '#c0392b',
};

export const STATUS_TEXT = {
	[STATUS.COMPLETED]: 'Request break',
	[STATUS.APPROVED]: 'Confirm',
	[STATUS.CREATED]: 'Waiting host for approval',
	[STATUS.REQUEST_BREAK]: 'Waiting host for accepting break',
	[STATUS.ENDED]: '',
	[STATUS.CANCELED]: '',
	[STATUS.BROKEN]: '',
};

export const enum PAYMENTSTATUS {
	PAID = 'PAID',
	UNPAID = 'UNPAID',
}
export const PAYMENTSTATUS_COLORS = {
	[PAYMENTSTATUS.UNPAID]: '#E36414',
	[PAYMENTSTATUS.PAID]: 'gray',
};

export const PAYMENTSTATUS_TEXT = {
	[PAYMENTSTATUS.PAID]: 'PAID',
	[PAYMENTSTATUS.UNPAID]: 'PAY',
};
