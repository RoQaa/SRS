"use client";
import { Card, Col, Row, Table } from "reactstrap";
import AddUsersAndUpdateTableBody from "./AddUsersAndUpdateTableBody";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import UsersListHead from "./UsersListHead";
import { useAppSelector } from "@/Redux/Hooks";
import { IUserData } from "@/Redux/Reducers/UserSlice";

const AddUsersAndUpdate = () => {
  const { activeTab, allUsers } = useAppSelector((state) => state.user);
  const currentUser = useAppSelector((state) => state.user.user);

  // Ensure filteredUsers is always an array, and filter out the current user
  const filteredUsers: IUserData[] = Array.isArray(allUsers)
    ? allUsers
        .filter((user) => user._id !== currentUser?._id) // Exclude the current user
        .filter((user) => {
          if (activeTab === "1") return true;
          if (activeTab === "2") return user.role === "admin";
          if (activeTab === "3") return user.role === "editor";
          if (activeTab === "4") return user.role === "viewer";
          return true;
        })
    : [];

  return (
    <Row>
      <Col md="12" className="project-list">
        <UsersListHead activeTab={activeTab} />
      </Col>
      <Col md="12">
        <Card>
          <CommonCardHeader title="Users" />
          <div className="table-responsive theme-scrollbar">
            <Table className="card-table table-vcenter text-nowrap">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {/* <th>Username</th> */}
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <AddUsersAndUpdateTableBody users={filteredUsers} />
            </Table>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default AddUsersAndUpdate;
