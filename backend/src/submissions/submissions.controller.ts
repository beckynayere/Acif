import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { Submission } from './schemas/submission.schema';
import { SubmissionService } from './submissions.service';
// import { Submission } from './submission.schema';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  //  Fetch campaigns an influencer has joined
  @Get('influencer/:id/campaigns')
  async getInfluencerCampaigns(@Param('id') influencerId: string) {
    return this.submissionService.findCampaignsByInfluencer(influencerId);
  }

  //  Submit campaign content
  @Post()
  async create(@Body() submissionData: Partial<Submission>) {
    return this.submissionService.createSubmission(submissionData);
  }

  // Get influencer performance metrics
  @Get('influencer/:id/performance')
  async getInfluencerPerformance(@Param('id') influencerId: string) {
    return this.submissionService.getPerformanceMetrics(influencerId);
  }

  //  Fetch campaign submissions for brand approval
  @Get('campaign/:id')
  async getCampaignSubmissions(@Param('id') campaignId: string) {
    return this.submissionService.getSubmissionsForCampaign(campaignId);
  }

  //  Approve or reject influencer submissions
  @Patch(':id/status')
  async updateSubmissionStatus(@Param('id') submissionId: string, @Body('status') status: 'approved' | 'rejected') {
    return this.submissionService.updateSubmissionStatus(submissionId, status);
  }
}
