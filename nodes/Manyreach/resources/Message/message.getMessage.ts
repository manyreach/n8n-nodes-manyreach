import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { apiRequest } from '../../helpers/apiRequest';
import { ensureId, ensurePagination, extractNumericId } from '../../helpers/validation';
import { normalizeManyResponse } from '../../helpers/response.convert';

export async function getMessages(this: IExecuteFunctions, index: number) {

    const page = this.getNodeParameter('page', index, 1) as number;
    const limit = this.getNodeParameter('limit', index, 100) as number;
    const startingAfter = this.getNodeParameter('startingAfter', index, '') as string;

    const rawCampaignId = this.getNodeParameter('campaignId', index) as unknown;
    let campaignId: number | undefined = undefined;
    if (rawCampaignId && typeof rawCampaignId === 'object' && 'value' in rawCampaignId && rawCampaignId.value) {
        campaignId = extractNumericId(rawCampaignId);
        ensureId(campaignId);
    }

    const rawSenderId = this.getNodeParameter('senderId', index, '') as unknown;
    let senderId: number | undefined = undefined;
    if (rawSenderId && typeof rawSenderId === 'object' && 'value' in rawSenderId && rawSenderId.value) {
        senderId = extractNumericId(rawSenderId);
        ensureId(senderId);
    }

    const rawFollowupId = this.getNodeParameter('followupId', index, '') as unknown;
    let followupId: number | undefined = undefined;
    if (rawFollowupId && typeof rawFollowupId === 'object' && 'value' in rawFollowupId && rawFollowupId.value) {
        followupId = extractNumericId(rawFollowupId);
        ensureId(followupId);
    }

    const qs: IDataObject = {};
    
    if (campaignId) qs.campaignId = campaignId;
    if (senderId) qs.senderId = senderId;
    if (followupId) qs.followupId = followupId;

    const pageQuery: IDataObject = {};
    
    pageQuery.page = page;
    pageQuery.limit = limit;
    pageQuery.startingAfter = startingAfter;

    qs.pageQuery = pageQuery;

    const confirmedStatus = this.getNodeParameter('confirmedStatus', index, '') as string;
    const emailFrom = this.getNodeParameter('emailFrom', index, '') as string;
    const emailTo = this.getNodeParameter('emailTo', index, '') as string;
    const subject = this.getNodeParameter('subject', index, '') as string;
    const type = this.getNodeParameter('messageType', index, '') as string;

    if (confirmedStatus) qs.confirmedStatus = confirmedStatus;
    if (emailFrom) qs.emailFrom = emailFrom;
    if (emailTo) qs.emailTo = emailTo;
    if (subject) qs.subject = subject;
    if (type) qs.type = type;

    ensurePagination(page, limit);

    const response = await apiRequest.call(this, 'GET', '/messages', {}, qs);

    return normalizeManyResponse(response);
}