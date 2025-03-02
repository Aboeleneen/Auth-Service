import { Controller, Post, Body, Get, UseGuards, Request, Delete, Res, HttpCode, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService, accessTokenCookieOptions, refreshTokenCookieOptions } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import { Response, Request as ExpressRequest } from 'express';
import { CookieOptions } from 'express-serve-static-core';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const result = await this.authService.register(registerDto);
    
    this.setTokens(response, result.tokens);
    return result;
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const result = await this.authService.login(loginDto);
    
    this.setTokens(response, result.tokens);
    
    return result;
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({ status: 200, description: 'Tokens successfully refreshed' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(
    @Req() request: ExpressRequest,
    @Res({ passthrough: true }) response: Response
  ) {
    const refreshToken = request.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    const result = await this.authService.refreshToken({refreshToken});
    
    this.setTokens(response, result.tokens);
    
    return result;
  }

  @Get('me')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@Request() req) {
    return req.user;
  }

  @Delete('logout')
  @HttpCode(200)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(
    @Request() req,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.logout(req.user.id);
    
    this.setTokens(response, { access_token: '', refresh_token: '' });
    
    return { message: 'Logged out successfully' };
  }

  private async setTokens(response: Response, tokens: { access_token: string; refresh_token: string }) {
    response.cookie('access_token', tokens.access_token, accessTokenCookieOptions as CookieOptions);
    response.cookie('refresh_token', tokens.refresh_token, refreshTokenCookieOptions as CookieOptions);
  }
} 