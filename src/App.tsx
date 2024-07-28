import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";

function App() {
  const [page, setPage] = useState(0);

  const { data } = useSuspenseQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      if (page === 0) {
        return [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Kate Hill" },
        ];
      } else {
        return [
          { id: 3, name: "Jane Brown" },
          { id: 4, name: "Alice Smith" },
        ];
      }
    },
  });

  return (
    <>
      <h1>Hello world!</h1>
      <p>
        <button onClick={() => setPage((prev) => (prev === 0 ? 1 : 0))}>
          Switch to page {page === 0 ? 1 : 2}
        </button>
      </p>

      <div
        style={{
          display: "flex",
        }}
      >
        <Table aria-label="Users">
          <TableHeader>
            <Column>User ID</Column>
            <Column isRowHeader>User Name</Column>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <Row key={user.id}>
                <Cell>{user.id}</Cell>
                <Cell>{user.name}</Cell>
              </Row>
            ))}
          </TableBody>
        </Table>

        <ul>
          {data.map((user) => (
            <li key={user.id}>
              {user.id}: {user.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
