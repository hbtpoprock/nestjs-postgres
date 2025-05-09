import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'test',
  password: 'test',
  isActive: true,
  creator_id: 102,
};

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user when found', async () => {
    repo.findOneBy.mockResolvedValue(mockUser);

    const result = await service.findOne(1);
    expect(result).toEqual(mockUser);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should throw NotFoundException when not found', async () => {
    repo.findOneBy.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
