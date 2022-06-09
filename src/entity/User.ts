import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm"

@Entity()
export class User {

    constructor(email: string, password: string)
    {
        this.email = email;
        this.password = password;
    }
    
    @ObjectIdColumn()
    _id!: ObjectID;

    @Column()
    email: string

    @Column()
    password: string

}
