import { Column } from "typeorm"
import { Subject } from "./Subject"

export class Module {

    constructor(title: string, subjects: Subject[]) {
        this.title = title;
        this.subjects = subjects;
    }

    @Column()
    title: string

    @Column(() => Subject)
    subjects: Subject[]
}