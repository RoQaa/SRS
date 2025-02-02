import { IValue } from "@/interfaces/Value.interface";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { deleteValue } from "@/Redux/Reducers/ValuesSlice";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, CardFooter, Col, Row } from "reactstrap";
import SweetAlert from "sweetalert2";

interface ValueCardProps {
  values: IValue[];
}

const ValueCard = ({ values }: ValueCardProps) => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const router = useRouter();
  const { activeTab } = useAppSelector((state) => state.values);

  const filteredValues = values.filter((value) => {
    switch (activeTab) {
      case "2":
        return value.published === true;
      case "3":
        return value.published === false;
      default:
        return true;
    }
  });

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteValue(id)).unwrap();
      SweetAlert.fire({
        icon: "success",
        text: "Item has been deleted!",
        confirmButtonColor: "#3085d6",
      });
    } catch {
      SweetAlert.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the item.",
      });
    }
  };

  const showWarningAlert = (valueId: string) => {
    SweetAlert.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Once deleted, this item cannot be recovered!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(valueId);
      }
    });
  };

  const handleEditBtn = (id: string) => {
    router.push(`/${locale}/dashboard/edit-home/values/edit?id=${id}`);
  };

  return (
    <Row>
      {filteredValues.length > 0 ? (
        filteredValues.map((value) => (
          <Col xl="3" sm="12" md="6" key={value._id} className="my-3">
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <CardBody
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className="mb-3" style={{ flexShrink: 0 }}>
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    src={
                      process.env.NEXT_PUBLIC_API_URL + "/" + value.images?.main
                    }
                    alt=""
                  />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <p className="mb-1">
                    <strong>{value.title}</strong>
                  </p>
                  <p>{(value.description || "").slice(0, 48) + "..."}</p>
                </div>
              </CardBody>
              <CardFooter
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Button
                  className="me-2"
                  color="primary"
                  size="sm"
                  onClick={() => handleEditBtn(value._id || "")}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => showWarningAlert(value._id || "")}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </Col>
        ))
      ) : (
        <CardBody className="text-center mt-2 mb-5 p-2">
          <p>No Data available to display.</p>
        </CardBody>
      )}
    </Row>
  );
};

export default ValueCard;
