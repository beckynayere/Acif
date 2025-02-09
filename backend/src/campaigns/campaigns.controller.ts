import { 
  Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException 
} from '@nestjs/common';
import { CampaignService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignService) {}

  // Create a new campaign
  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto);
  }

  // Fetch all campaigns
  @Get()
  findAll() {
    return this.campaignsService.findAll();
  }

  // Fetch a single campaign by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  // Fetch campaigns joined by an influencer
  @Get('influencer/:userId')
  findByInfluencer(@Param('userId') userId: string) {
    return this.campaignsService.findByInfluencer(userId);
  }

  // Submit content for a campaign
  @Post(':id/submit')
  submitContent(
    @Param('id') id: string,
    @Body('userId') userId: string,
    @Body('submissionLink') submissionLink: string
  ) {
    if (!submissionLink) {
      throw new NotFoundException('Submission link is required.');
    }
    return this.campaignsService.submitContent(id, userId, submissionLink);
  }

  // Approve or reject submission
  @Patch(':id/approve')
  approveSubmission(
    @Param('id') id: string,
    @Body('userId') userId: string,
    @Body('status') status: 'approved' | 'rejected'
  ) {
    return this.campaignsService.approveSubmission(id, userId, status);
  }

  // Fetch campaign performance metrics
  @Get(':id/performance')
  getPerformanceMetrics(@Param('id') id: string) {
    return this.campaignsService.getPerformanceMetrics(id);
  }

  // Update campaign details
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsService.update(id, updateCampaignDto);
  }

  // Delete a campaign
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignsService.delete(id);
  }
}
