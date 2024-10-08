import { useEffect, useState } from 'react';
import { AgentDataType } from '../utils/types';
import apiCall from '../apiCalls';
import AgentTable from '../common/AgentTable';

export const CrmAgent = () => {
  const [data, setData] = useState<AgentDataType[]>([]);

  useEffect(() => {
    fetchCrmAgentData();
  }, []);

  const fetchCrmAgentData = async () => {
    try {
      const response = await apiCall.getuserList('CRM Agent');
      if (response) setData(response);
    } catch (error) {
      console.log(error, 'fetch crm agent error');
    }
  };

  return <AgentTable data={data} fetchData={fetchCrmAgentData} />;
};

export default CrmAgent;
