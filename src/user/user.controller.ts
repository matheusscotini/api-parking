import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, 
    Res, UseGuards, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { UserPartialDto } from "./dto/userPartial.dto";
import { ApiTags } from "@nestjs/swagger"
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "src/auth/auth.service";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private authService: AuthService
    ){}

    @Post()
    async create(@Res() response, @Body()record: UserDto) {
        const newRecord = await this.userService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    @Get()
    async fetchAll(@Res() response) {
        const list = await this.userService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.userService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    @Patch(':id')
    async update(@Body() updatedData: UserPartialDto, @Param('id') id): Promise<UserDto> {
        const oldData = await this.userService.findOne(id);
        return await this.userService.update(oldData, updatedData);
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.userService.delete(id);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }
}