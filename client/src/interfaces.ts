export interface ITask {
	name: string;
	finished: boolean;
	username: string;
	color: string;
}

export interface IUsernameWithCount {
	_id: string;
	count: number;
	color: string;
}
