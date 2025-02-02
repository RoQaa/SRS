import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {
  deleteUser,
  getAllUsers,
  updateUser,
  IUserData,
} from "@/Redux/Reducers/UserSlice";
import { stringToTitleCase } from "@/utils/stringToTitleCase";
import { Key, useEffect, useState } from "react";
import { Button, Col, Spinner } from "reactstrap";
import SweetAlert from "sweetalert2";

// Define the possible roles
type UserRole = "admin" | "editor" | "viewer";

// Define the prop type for users
interface AddUsersAndUpdateTableBodyProps {
  users: IUserData[];
}

const AddUsersAndUpdateTableBody = ({
  users,
}: AddUsersAndUpdateTableBodyProps) => {
  const dispatch = useAppDispatch();
  const {loading, error } = useAppSelector((state) => state.user);
  const currentUser = JSON.parse(window.localStorage.getItem("user") as string) || {};
  
  const [userRoles, setUserRoles] = useState<{ [key: string]: UserRole }>({});

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleRoleChange = (userId: string, newRole: string) => {
    if (newRole === "admin" || newRole === "editor" || newRole === "viewer") {
      setUserRoles((prev) => ({
        ...prev,
        [userId]: newRole as UserRole,
      }));
    }
  };

  // Handle role update
  const handleRoleUpdate = (userId: string) => {
    if (currentUser?.role !== "admin") {
      SweetAlert.fire({
        icon: "error",
        title: "Permission Denied",
        text: "Only admins can update user roles.",
      });
      return;
    }

    const newRole = userRoles[userId];
    if (!newRole) return;

    dispatch(updateUser({ id: userId, userData: { role: newRole } }))
      .unwrap()
      .then(() => {
        SweetAlert.fire({
          icon: "success",
          text: "User role has been updated!",
          confirmButtonColor: "#3085d6",
        });
        dispatch(getAllUsers());
      })
      .catch((error: { message: string }) => {
        SweetAlert.fire({
          icon: "error",
          title: "Error!",
          text: error.message || "Failed to update user role.",
        });
      });
  };

  const showWarningAlert = (userId: string) => {
    SweetAlert.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Once deleted, this user cannot be recovered!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(userId))
          .unwrap()
          .then(() => {
            SweetAlert.fire({
              icon: "success",
              text: "User has been deleted!",
              confirmButtonColor: "#3085d6",
            });
          })
          .catch((error: { message: string }) => {
            SweetAlert.fire({
              icon: "error",
              title: "Error!",
              text: error.message || "Failed to delete the User.",
            });
          });
      }
    });
  };

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="text-center p-4">
            <p className="text-danger">{error}</p>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {loading ? (
        <tr>
          <td colSpan={5} className="text-center">
            <Col sm="12" className="text-center">
              <Spinner color="primary" />
              <p>Loading Users data...</p>
            </Col>
          </td>
        </tr>
      ) : users && users.length > 0 ? (
        users.map((user: IUserData, index: Key | null | undefined) => (
          <tr key={index}>
            <td className="add-project">
              {`${stringToTitleCase(user?.fName)} ${stringToTitleCase(user?.lName)}`}
            </td>
            <td>{user?.email}</td>
            {/* <td>
              <span className={`status-icon`} />
              {user?.username}
            </td> */}
            <td>
              <select
                value={userRoles[user._id as string ?? ''] || user.role}
                onChange={(e) => handleRoleChange(user._id as string ?? '', e.target.value)}
                className="form-select"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
            </td>
            <td className="text-start">
              <Button
                className="me-3"
                color="primary"
                size="sm"
                onClick={() => handleRoleUpdate(user._id as string ?? '')}
                disabled={currentUser?.role !== "admin"} // Disable if not admin
              >
                <i className="fa fa-pencil" /> Update
              </Button>
              <Button
                color="danger"
                size="sm"
                onClick={() => showWarningAlert(user?._id as string ?? '')}
              >
                <i className="fa fa-trash" /> Delete
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="text-center p-4">
            No Users Found
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default AddUsersAndUpdateTableBody;
