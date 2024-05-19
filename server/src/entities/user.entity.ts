import {
    Entity,
    Column, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { BookEntity } from './book.entity';
import { CategoryEntity } from './category.entity';

@Entity({ name:'users' })
export class UserEntity{
    @PrimaryGeneratedColumn({ type:"bigint" })
    id: number;
   
    @Column({ type:"varchar",length:100,unique:true })
    email:string;

    @Column({ type:"varchar",length:100 })
    name: string;

    @Column({ type:"varchar",length:100 })
    password: string

    @OneToMany(()=> BookEntity, (book)=> book.user)
    books: BookEntity[]

    @OneToMany(()=> CategoryEntity, (category)=> category.user)
    categories: CategoryEntity[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 
}