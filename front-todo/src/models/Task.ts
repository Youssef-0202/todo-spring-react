
export class Task {
    uuid: string;
    title: string;
    description: string;
    priority: string;
    categoryName: string;
    status: string;
    dueDate: Date;
    reminderDateTime: Date;
    createdAt: string;
    completed:boolean;

    constructor(data: Partial<Task>) {
        this.uuid = data.uuid ?? '';
        this.title = data.title ?? '';
        this.description = data.description ?? '';
        this.priority = data.priority ?? '';
        this.categoryName = data.categoryName ?? '';
        this.status = data.status ?? '';
        this.dueDate = data.dueDate ?? new  Date();
        this.reminderDateTime = data.reminderDateTime ?? new Date();
        this.createdAt = data.createdAt ?? '';
    }
}
