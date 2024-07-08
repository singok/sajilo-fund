import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"

export enum genderType {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
};

@Entity()
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    full_name: string

    @Column({
        unique: true
    })
    phone_1: string

    @Column({
        nullable: true,
        unique: true
    })
    phone_2: string

    @Column({
        type: "enum",
        enum: genderType,
        default: genderType.MALE
    })
    gender: genderType

    @Column({
        nullable: true
    })
    address: string

    @Column({
        nullable: true
    })
    image: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn({
        nullable: true
    })
    updated_at: Date
}