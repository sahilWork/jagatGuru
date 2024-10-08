import { MdOutlineDeleteOutline } from 'react-icons/md';
import { MdOutlineEdit } from "react-icons/md";
import { AgentDataType, role } from '../../utils/types';
import { useNavigate } from 'react-router-dom';

interface AgentTableProps {
  data: AgentDataType[]; // Data to be displayed in the table
  fetchData: () => void; // Fetch function
}

const AgentTable = ({ data }: AgentTableProps) => {
  const navigate = useNavigate();

  // Function to handle edit button click
  const handleEdit = (agentId: string, role: role) => {
    console.log(role);
    
    // Determine which route to navigate to based on the role (SuperAdmin, Agent, or CRM)
    switch (role) {
      case 'Super Admin':
        navigate(`/Super-Admin/editUser/${agentId}`);
        break;
      case 'Agent':
        navigate(`/agent/editUser/${agentId}`);
        break;
      case 'CRM Agent':
        navigate(`/crm-agent/editUser/${agentId}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Phone
              </th>
              {data.length > 0 && data[0].pincode && (
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Pincode
                </th>
              )}
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((agent, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {agent.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{agent.email}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{agent.phone}</p>
                </td>
                {agent.pincode && (
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{agent.pincode}</p>
                  </td>
                )}

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <MdOutlineDeleteOutline size={26} />
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => handleEdit(agent.id.toString(), agent.role as role)} // Call handleEdit on click
                    >
                      <MdOutlineEdit size={26} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentTable;
