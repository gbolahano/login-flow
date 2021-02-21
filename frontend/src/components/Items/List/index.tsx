import React from "react";
import Moment from "react-moment";
import { useQuery, gql } from "@apollo/client";
import { Layout } from "./styles";

const GET_ITEMS = gql`
  query GET_ITEMS {
    getItems {
      title
      createdAt
    }
  }
`;

const Index = () => {
  const { loading, data, error } = useQuery(GET_ITEMS);

  if (loading) return "loading...";
  if (error) return "error";

  return (
    <Layout>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data?.getItems?.map((item) => {
            return (
              <tr>
                <td>{item.title}</td>
                <td>
                  <Moment fromNow>{item.createdAt}</Moment>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default Index;
export { GET_ITEMS };
