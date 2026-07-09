import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  JsonObject,
  NodeApiError,
  NodeConnectionTypes,
  NodeOperationError,
} from 'n8n-workflow';

// Import reusable descriptions
import { campaignOperations, campaignFields } from './descriptions/campaign.descriptions';
import { followupOperations, followupFields } from './descriptions/followup.descriptions';
import { sequenceOperations, sequenceFields } from './descriptions/sequence.descriptions';
import { listOperations, listFields } from './descriptions/list.descriptions';
import { prospectOperations, prospectFields } from './descriptions/prospect.descriptions';
import { tagOperations, tagFields } from './descriptions/tag.descriptions';
import { blacklistOperations, blacklistFields } from './descriptions/blacklist.descriptions';
import { workspaceOperations, workspaceFields } from './descriptions/workspace.descriptions';
import { senderOperations , senderFields } from './descriptions/sender.descriptions';
import { userOperations, userFields } from './descriptions/user.descriptions';
import { clientspaceOperations, clientspaceFields } from './descriptions/clientspace.descriptions';
import { whitelabelOperations, whitelabelFields } from './descriptions/whitelabel.descriptions';
import { messageOperations, messageFields } from './descriptions/message.descriptions';
import { clearApiRequestItemIndex, setApiRequestItemIndex } from './helpers/apiRequest';


// List controller
import { loadCampaignsForDropdown, searchCampaignsForResourceLocator } from './resources/Campaign/Load/campaign.load';
import { loadFollowupsForDropdown, searchFollowupsForResourceLocator } from './resources/Followup/Load/followup.load';
import { loadSequencesForDropdown, searchSequencesForResourceLocator } from './resources/Sequence/Load/sequence.load';
import { loadListsForDropdown, searchListsForResourceLocator } from './resources/List/Load/list.load';
import { loadProspectsForDropdown, searchProspectsForResourceLocator } from './resources/Prospect/Load/prospect.load';
import { loadTagsForDropdown, searchTagsForResourceLocator } from './resources/Tag/Load/tag.load';
import { loadWorkspacesForDropdown, searchWorkspacesForResourceLocator } from './resources/Workspace/Load/workspace.load';
import { loadSendersForDropdown , searchSendersForResourceLocator } from './resources/Sender/Load/sender.load';
import { loadUsersForDropdown, searchUsersForResourceLocator } from './resources/User/Load/user.load';
import { loadClientspacesForDropdown, searchClientspacesForResourceLocator } from './resources/Clientspace/Load/clientspace.load';


// Error handling
import { handleExecutionError } from './helpers/errorHandler';
import { executeCampaign } from './execute/campaign.exec';
import { executeFollowup } from './execute/followup.exec';
import { executeSequence } from './execute/sequence.exec';
import { executeList } from './execute/list.exec';
import { executeProspect } from './execute/prospect.exec';
import { executeTag } from './execute/tag.exec';
import { executeWorkspace } from './execute/workspace.exec';
import { executeSender } from './execute/sender.exec';
import { executeUser } from './execute/user.exec';
import { executeClientspace } from './execute/clientspace.exec';
import { executeWhitelabel } from './execute/whitelabel.exec';
import { executeMessage } from './execute/message.exec';
import { executeBlacklist } from './execute/blacklist.exec';

export class Manyreach implements INodeType {
  
  description: INodeTypeDescription = {
    displayName: 'Manyreach',
    name: 'manyreach',
    icon: 'file:manyreach_icon_white_on_black.svg',
    group: ['transform'],
    version: 1,
				subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
    description: 'Automate cold email campaigns and manage follow-ups',

    defaults: {
      name: 'Manyreach',

    },

    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],

    credentials: [
      {
        name: 'manyreachApi',
        required: true,
      },
    ],

    properties: [

      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
								noDataExpression: true,
        default: 'campaign',
        options: [
          { name: 'Blacklist', value: 'blacklist' },
          { name: 'Campaign', value: 'campaign' },
          { name: 'Clientspace', value: 'clientspace' },
          { name: 'Followup', value: 'followup' },
          { name: 'List', value: 'list' },
          { name: 'Message', value: 'message' },
          { name: 'Prospect', value: 'prospect' },
          { name: 'Sender', value: 'sender' },
          { name: 'Sequence', value: 'sequence' },
          { name: 'Tag', value: 'tag' },
          { name: 'User', value: 'user' },
          { name: 'Whitelabel', value: 'whitelabel' },
          { name: 'Workspace', value: 'workspace' },
        ],
      },
      {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'string',
        default: '',
        displayOptions: {
          hide: {
            resource: ['workspace', 'clientspace'],
          },
        },
        description: 'Optional organization identifier to send as the OrganizationID API parameter',
      },

      ...campaignOperations,
      ...campaignFields,
      ...followupOperations,
      ...followupFields,
      ...sequenceOperations,
      ...sequenceFields,
      ...listOperations,
      ...listFields,
      ...prospectOperations,
      ...prospectFields,
      ...tagOperations,
      ...tagFields,
      ...blacklistOperations,
      ...blacklistFields,
      ...workspaceOperations,
      ...workspaceFields,
      ...userOperations,
      ...userFields,
      ...senderOperations,
      ...senderFields,
      ...clientspaceOperations,
      ...clientspaceFields,
      ...whitelabelOperations,
      ...whitelabelFields,
      ...messageOperations,
      ...messageFields,
    ],
		usableAsTool: true,
  };

  // Load Options Methods
  methods = {
    loadOptions: {
      getCampaigns: loadCampaignsForDropdown,
      getSequences: loadSequencesForDropdown,
      getFollowups: loadFollowupsForDropdown,
      getLists: loadListsForDropdown,
      getProspects: loadProspectsForDropdown,
      getTags: loadTagsForDropdown,
      getWorkspaces: loadWorkspacesForDropdown,
      getSenders: loadSendersForDropdown,
      getUsers: loadUsersForDropdown,
      getClientspaces: loadClientspacesForDropdown,
    },
    listSearch: {
      searchCampaigns: searchCampaignsForResourceLocator,
      searchSequences: searchSequencesForResourceLocator,
      searchFollowups: searchFollowupsForResourceLocator,
      searchLists: searchListsForResourceLocator,
      searchProspects: searchProspectsForResourceLocator,
      searchTags: searchTagsForResourceLocator,
      searchWorkspaces: searchWorkspacesForResourceLocator,
      searchSenders: searchSendersForResourceLocator,
      searchUsers: searchUsersForResourceLocator,
      searchClientspaces: searchClientspacesForResourceLocator,
    },
  };

  // Main execute handler

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      setApiRequestItemIndex(this, i);

      try {
        let data;
        if (resource === 'campaign') {
          data = await executeCampaign.call(this, operation, i);
        }
        else if (resource === 'followup') {
          data = await executeFollowup.call(this, operation, i);
        }
        else if (resource === 'sequence') {
          data = await executeSequence.call(this, operation, i);
        }
        else if (resource === 'list') {
          data = await executeList.call(this, operation, i);
        }
        else if (resource === 'prospect') {
          data = await executeProspect.call(this, operation, i);
        }
        else if (resource === 'tag') {
          data = await executeTag.call(this, operation, i);
        }
        else if (resource === 'workspace') {
          data = await executeWorkspace.call(this, operation, i);
        }
        else if (resource === 'sender') {
          data = await executeSender.call(this, operation, i);
        }
        else if (resource === 'user') {
          data = await executeUser.call(this, operation, i);
        }
        else if (resource === 'clientspace') {
          data = await executeClientspace.call(this, operation, i);
        }
        else if (resource === 'whitelabel') {
          data = await executeWhitelabel.call(this, operation, i);
        }
        else if (resource === 'message') {
          data = await executeMessage.call(this, operation, i);
        }
        else if (resource === 'blacklist') {
          data = await executeBlacklist.call(this, operation, i);
        }
        else {
          throw new NodeOperationError(
            this.getNode(),
            `Resource "${resource}" not supported`,
            { itemIndex: i },
          );
        }

        returnData.push({ json: data, pairedItem: { item: i } });

      } catch (error) {
        if (this.continueOnFail()) {
          const err = handleExecutionError(error);
          returnData.push({ json: err, pairedItem: { item: i } });
          continue;
        }
        throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
      } finally {
        clearApiRequestItemIndex(this);
      }
    }
    return this.prepareOutputData(returnData);
  }
}
