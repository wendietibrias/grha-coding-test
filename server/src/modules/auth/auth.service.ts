import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/LoginDTO';
import { RegisterDTO } from './dto/RegisterDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import catchErrorHandling from 'src/common/helpers/catchErrorHandling';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string) {
    return await this.userEntity.findOneBy({ email });
  }

  async verifyToken(token: string) {
    const decodeToken = await this.jwt.verifyAsync(token);
    return decodeToken;
  }

  async login(body: LoginDTO) {
    try {
      const { email, password } = body;

      //throw an error if the user not exist
      const findUser = await this.findUserByEmail(email);
      if (!findUser) {
        throw new NotFoundException('Upss, account not found');
      }

      //throw an error if the password is wrong
      const comparePassword = await bcrypt.compare(password, findUser.password);
      if (!comparePassword) {
        throw new BadRequestException(
          'Invalid email or password,please try again',
        );
      }

      const generateToken = await this.jwt.signAsync(
        {
          name: findUser.name,
          email: findUser.email,
        },
        {
          secret: this.configService.get<string>('jwt.secret'),
          expiresIn: this.configService.get<string>('jwt.expired'),
        },
      );

      return {
        message: 'Success login',
        status: 'success',
        data: {
          access_token: generateToken,
        },
      };
    } catch (err) {
      return catchErrorHandling(err);
    }
  }

  async register(body: RegisterDTO) {
    try {
      const { name, email, password, confirm } = body;

      //throw an error if the user already exist
      const findUser = await this.findUserByEmail(email);
      if (findUser) {
        throw new BadRequestException(
          'User already exists,try with another email',
        );
      }

      //throw an error if password and confirm not match
      if (confirm !== password) {
        throw new BadRequestException('Password not match');
      }

      const saltRound = await bcrypt.genSalt(
        this.configService.get<number>('bcrypt.salt'),
      );
      const hashPassword = await bcrypt.hash(password, saltRound);

      const user = new UserEntity();

      user.name = name;
      user.email = email;
      user.password = hashPassword;

      const saveUser = await this.userEntity.save(user);

      if (saveUser) {
        return {
          message: 'registration sucessfully',
          status: 'success',
        };
      }
    } catch (err) {
      return catchErrorHandling(err);
    }
  }
}
