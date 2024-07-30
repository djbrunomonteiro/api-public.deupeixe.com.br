import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { IResponse } from 'src/shared/models/response';
import { EMessageResponse } from 'src/shared/enums/messages';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}
  async create(createPostDto: CreatePostDto) {
    let response: IResponse;

    console.log('createPostDto', createPostDto);

    delete createPostDto.id;

    try {
      const results = await this.postRepository.save(createPostDto);

      console.log('results', results);

      response = {
        error: false,
        status: 201,
        results,
        message: EMessageResponse.SUCCESSO,
      };
      return response;
    } catch (error) {
      console.log(error);

      const { status, message } = error;
      response = { error: true, status, message };
      throw new BadRequestException(response);
    }
  }

  async findAll(start = 0, limit = 50) {
    let response: IResponse;
    try {
      const results = await this.postRepository.find({
        skip: start,
        take: limit,
        order: {
          id: 'DESC',
        },
      });

      response = {
        error: false,
        status: 200,
        results,
        message: EMessageResponse.SUCCESSO,
      };
      return response;
    } catch (error) {
      const { status, message } = error;
      response = { error: true, status, message };
      throw new BadRequestException(response);
    }
  }

  async findOne(id: number) {
    let response: IResponse;
    try {
      const results = await this.postRepository.findOneBy({ id });
      response = {
        error: false,
        status: 200,
        results,
        message: EMessageResponse.SUCCESSO,
      };
      return response;
    } catch (error) {
      const { status, message } = error;
      response = { error: true, status, message };
      throw new BadRequestException(response);
    }
  }

  async findOneByUrl(url: string) {
    let response: IResponse;
    try {
      const results = await this.postRepository.findOneBy({ url });
      response = {
        error: false,
        status: 200,
        results,
        message: EMessageResponse.SUCCESSO,
      };
      return response;
    } catch (error) {
      const { status, message } = error;
      response = { error: true, status, message };
      throw new BadRequestException(response);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    let response: IResponse;

    try {
      await this.postRepository.update(id, updatePostDto);
      const results = await this.postRepository.findOneBy({ id });
      response = {
        error: false,
        status: 200,
        results,
        message: EMessageResponse.SUCCESSO,
      };
      return response;
    } catch (error) {
      const { status, message } = error;
      response = { error: true, status, message };
      throw new BadRequestException(response);
    }
  }

  async remove(id: number) {
    let response: IResponse;

    try {
      const results = await this.postRepository.delete(id);
      response = {
        error: false,
        status: 200,
        results,
        message: EMessageResponse.SUCCESSO,
      };
      return response;
    } catch (error) {
      const { status, message } = error;
      response = { error: true, status, message };
      throw new BadRequestException(response);
    }
  }
}
