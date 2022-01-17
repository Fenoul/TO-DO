export class TodoItem {
    public id: number;
    public title: string;
    public desc: string;
    public status: boolean;

    constructor(id: number, title: string, desc: string, status: boolean) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.status = status;
      }
}
