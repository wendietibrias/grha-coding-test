import {
    Entity,
    Column, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { BookEntity } from './book.entity';
import { UserEntity } from './user.entity';

@Entity({ name:'categories' })
export class CategoryEntity {
    @PrimaryGeneratedColumn({ type:"bigint" })
    id:number;

    @Column({ type:"varchar",length:50,unique:true })
    category_title:string;

    @ManyToOne(()=> UserEntity, (user)=> user.books)
    @JoinColumn({ name:'user_id' })
    user: UserEntity


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 
}