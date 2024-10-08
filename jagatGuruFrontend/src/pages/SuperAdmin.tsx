import { useEffect, useState } from 'react';
import { AgentDataType } from '../utils/types';
import apiCall from '../apiCalls';
import AgentTable from '../common/AgentTable';

export const SuperAdmin = () => {
  const [data, setData] = useState<AgentDataType[]>([]);

  useEffect(() => {
    fetchSuperAdminData();
  }, []);

  const fetchSuperAdminData = async () => {
    try {
      const response = await apiCall.getuserList('Super Admin');
      if (response) setData(response);
    } catch (error) {
      console.log(error, 'fetch super admin error');
    }
  };

  return <AgentTable data={data} fetchData={fetchSuperAdminData} />;
};

export default SuperAdmin;
