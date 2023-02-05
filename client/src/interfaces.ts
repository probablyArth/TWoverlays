export interface IUser {
	name: string;
	tasks: ITask[];
}

export interface ITask {
	name: string;
	finished: boolean;
	user: IUser;
}

export interface IUsernameWithCount {
	_id: string;
	count: number;
}
