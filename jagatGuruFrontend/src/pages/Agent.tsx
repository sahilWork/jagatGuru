import { useEffect, useState } from 'react';
import { AgentDataType } from '../utils/types';
import apiCall from '../apiCalls';
import AgentTable from '../common/AgentTable';

export const Agent = () => {
  const [data, setData] = useState<AgentDataType[]>([]);

  useEffect(() => {
    fetchAgentData();
  }, []);

  const fetchAgentData = async () => {
    try {
      const response = await apiCall.getuserList('Agent');
      if (response) setData(response);
    } catch (error) {
      console.log(error, 'fetch agent error');
    }
  };

  return <AgentTable data={data} fetchData={fetchAgentData} />;
};

export default Agent;
