export interface ITask {
	name: string;
	finished: boolean;
	username: string;
}

export interface IUsernameWithCount {
	_id: string;
	count: number;
}
