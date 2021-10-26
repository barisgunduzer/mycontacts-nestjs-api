import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { DataType } from './dto/properties/properties';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'This method creates a new user' })
  @ApiCreatedResponse({ description: 'user created'})
  @ApiResponse({ status: 400, description: 'invalid input'})
  @ApiResponse({ status: 409, description: 'user already exists'})
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        newUser,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'error creating user',
        err,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'This method show all users' })
  @ApiResponse({ status: 200, description: 'showing all users'})
  @ApiResponse({ status: 400, description: 'bad request'})
  @ApiResponse({ status: 404, description: 'users not found'})
  async findAll(@Res() res) {
    try {
      const users = await this.usersService.findAll();
      return res.status(HttpStatus.OK).json({
        users,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'error creating user',
        err,
      });
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'This method show one user by id param' })
  @ApiResponse({ status: 200, description: 'showing one user by id param'})
  @ApiResponse({ status: 400, description: 'invalid id supplied'})
  @ApiResponse({ status: 400, description: 'user not found'})
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);
      return res.status(HttpStatus.OK).json({
        user,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'invalid id supplied',
        err,
      });
    }
  }

  @Put('/addField')
  @ApiQuery({ name: 'type', enum: DataType })
  @ApiOperation({ summary: 'This method adds a new user field' })
  @ApiCreatedResponse({ description: 'field created'})
  @ApiResponse({ status: 400, description: 'invalid input'})
  @ApiResponse({ status: 409, description: 'field already exists'})  
  async addField(@Res() res, @Query('type') type: DataType = DataType.String) {
    try {
      await this.usersService.addField(type);
      return res.status(HttpStatus.OK).json({
        success: 'new user field added succesfully',
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'invalid field supplied',
        err,
      });
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'This method updates a user by id param' })
  //@ApiParam({name: 'type', description: 'Define additional info type', schema: { oneOf: [{type: 'string'}, {type: 'integer'}]}})
  @ApiResponse({ status: 200, description: 'user updated'})
  @ApiResponse({ status: 400, description: 'invalid id supplied'})
  // eslint-disable-next-line prettier/prettier
  async update(@Res() res, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);
      return res.status(HttpStatus.OK).json({
        updatedUser,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'invalid id supplied',
        err,
      });
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'This method deletes a user by id param' })
  @ApiResponse({ status: 200, description: 'user deleted'})
  @ApiResponse({ status: 404, description: 'user not found'})
  async remove(@Res() res, @Param('id') id: string) {
    try {
      const deletedUser = await this.usersService.remove(id);
      return res.status(HttpStatus.OK).json({
        deletedUser,
      });
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({
        error: 'user not found',
        err,
      });
    }
  }
}
