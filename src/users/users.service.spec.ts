import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';

const mockUser = {
  first_name: 'Firstname #1',
  last_name: 'Lastname #1',
  phone: 5432109876,
  email: 'johndoe@johndoe.com',
  additional_info: {},
  address: 'Address Line',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const usersArray = [
    {
      first_name: 'Firstname #1',
      last_name: 'Lastname #1',
      phone: 5432109876,
      email: 'johndoe@johndoe.com',
      additional_info: {},
      address: 'Address Line',
    },
    {
      first_name: 'Firstname #2',
      last_name: 'Lastname #2',
      phone: 5432109876,
      email: 'johndoe@johndoe.com',
      additional_info: {},
      address: 'Address Line',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await service.findAll();
    expect(users).toEqual(usersArray);
  });

  it('should insert a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        first_name: 'Firstname #1',
        last_name: 'Lastname #1',
        phone: 5432109876,
        email: 'johndoe@johndoe.com',
        additional_info: {},
        address: 'Address Line',
      }),
    );
    const newUser = await service.create({
      first_name: 'Firstname #1',
      last_name: 'Lastname #1',
      phone: 5432109876,
      email: 'johndoe@johndoe.com',
      additional_info: [],
      address: 'Address Line',
});
    expect(newUser).toEqual(mockUser);
  });
});
