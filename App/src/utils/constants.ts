export const enum STATUS {
	COMPLETED = 'COMPLETED',
	CREATED = 'CREATED',
	APPROVED = 'APPROVED',
	BROKEN = 'BROKEN',
}
export const STATUS_COLORS = {
	[STATUS.COMPLETED]: '#E36414',
	[STATUS.APPROVED]: '#E36414',
	[STATUS.CREATED]: '#1D5868',
	[STATUS.BROKEN]: '#1D5868',
};

export const STATUS_TEXT = {
	[STATUS.COMPLETED]: 'Request break',
	[STATUS.APPROVED]: 'Confirm',
	[STATUS.CREATED]: 'Waiting host for approval',
	[STATUS.BROKEN]: 'Waiting host for accepting break',
};
