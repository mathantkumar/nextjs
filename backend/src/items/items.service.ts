import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './items.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  create(item: Item): Promise<Item> {
    return this.itemRepository.save(item);
  }

  async update(id: number, item: Item): Promise<Item> {
    await this.itemRepository.update(id, item);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
