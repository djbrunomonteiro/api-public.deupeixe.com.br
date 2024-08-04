import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EMessageResponse } from 'src/shared/enums/messages';
import { IResponse } from 'src/shared/models/response';
import { Repository } from 'typeorm';
import { UpdatePostDto } from '../post/dto/update-post.dto';
import { LinkEntity } from './entities/link.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private linkRepository: Repository<LinkEntity>,
  ) {}
  async create(CreateLinkDto: CreateLinkDto) {
    let response: IResponse;

    delete CreateLinkDto.id;

    try {
      const results = await this.linkRepository.save(CreateLinkDto);

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
      const results = await this.linkRepository.find({
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
      const results = await this.linkRepository.findOneBy({ id });
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
      const results = await this.linkRepository.findOneBy({ url });
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
      await this.linkRepository.update(id, updatePostDto);
      const results = await this.linkRepository.findOneBy({ id });
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
      const results = await this.linkRepository.delete(id);
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
