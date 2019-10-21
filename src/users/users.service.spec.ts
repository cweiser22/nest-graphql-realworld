import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dtos/create-user.input';
import { Repository } from 'typeorm';

/*
export const mockRepo = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
  save: data => {
    console.log(data);
  },
}));*/

describe('UsersService', () => {
  let service: UsersService;
  let mockRepo: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    let fakeUserInput = {
      username: 'bill',
      bio: 'kmsofdf',
      password: 'admin',
      email: 'fake@test.com',
    };
    console.log(await service.create(fakeUserInput));
    expect(await service.create(fakeUserInput)).toBeDefined();
  });
});
