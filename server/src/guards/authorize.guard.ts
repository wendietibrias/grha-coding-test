import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorizationToken = request.headers.authorization;

    //throw an error if the token is empty
    if (!authorizationToken) {
      throw new UnauthorizedException('Credentials must provide');
    }

    //verify if token valid and check the info token is match with user in database
    const { email, name } = await this.jwt.verifyAsync(
      authorizationToken.split(' ')[1],
      { secret: this.configService.get<string>('jwt.secret') },
    );
    const findUser = await this.userEntity.findOneBy({
      email,
      name,
    });
    if (!findUser) {
      return false;
    }

    request.user = {
      id: findUser.id,
      email,
      name,
    };

    return true;
  }
}
