import { useQuery } from 'react-query';
import axios from 'axios';
import { User } from '../models/User';
import { Courses } from '../models/Courses';

const fetchUserByEmail = async (email: string) => {
  const { data } = await axios.get<User>(
    `http://localhost:4000/users/${email}`
  );
  return data;
};

const fetchCoursesByChannelId = async (channelId: string) => {
  const { data } = await axios.get<Courses>(
    `http://localhost:4000/channels/${channelId}`
  );

  return data;
};

interface DependentQueriesPageProps {
  email: string;
}

const DependentQueriesPage = ({ email }: DependentQueriesPageProps) => {
  const { data } = useQuery(['user', email], () => fetchUserByEmail(email));

  const channelId = data?.channelId;

  const { data: coursesObj } = useQuery<Courses>(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId!),
    { enabled: !!channelId }
  );

  let content;
  if (coursesObj) {
    content = coursesObj.courses.map(course => (
      <div key={course}>{course}</div>
    ));
  }

  return (
    <div>
      <h1>Courses</h1>
      {content}
    </div>
  );
};

export default DependentQueriesPage;
