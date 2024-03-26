import React, { useEffect, useState } from 'react';
import RequestCardsRenderedbyID from '../../components/requestsCardsRenderedbyID';


const RequestDetails = ({ request_id }) => {
  const [request, setRequest] = useState(null);



  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getRequest/${request_id}`);
        const data = await response.json();
        setRequest(data);


      } catch (error) {
        console.error('Failed to fetch request details', error);
      }
    };

    fetchRequest();
  }, [request_id]);

  return (
    <div>
      {request && <RequestCardsRenderedbyID request={request} />}
    </div>
  );
};

export default RequestDetails;
