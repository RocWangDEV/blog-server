import { Controller, Get, Inject } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(
    @Inject(CommonService)
    private commonService: CommonService,
  ) {}
  @Get('/usr/progress')
  async getSessionProgress() {
    return this.commonService.getSessionProgress();
  }
  @Get('/recent')
  async getRecentList() {
    return this.commonService.getRecentList();
  }
}
