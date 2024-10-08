import {  useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiCall from '../apiCalls';
import { AgentDataType } from '../utils/types';
import AgentForm from '../common/AgentForm.tsx';

const EditAgent = () => {
  const { id } = useParams(); // Get the agent ID from the route
  const [agent, setAgent] = useState<AgentDataType | null>(null); // Agent state to hold fetched data

  useEffect(() => {
    // Fetch the agent data based on the ID from the URL
    const fetchAgentData = async () => {
      try {
        const response = await apiCall.getUserById(id||''); // API call to fetch agent details by ID
        // console.log(response,'EditAgent');
        setAgent(response); // Assuming the data is in response.data
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };

    if (id) {
      fetchAgentData();
    }
  }, [id]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-boxdark">
      {agent ? <AgentForm agentData={agent}/> : <p>Loading...</p>}
    </div>
  );
};

export default EditAgent;
