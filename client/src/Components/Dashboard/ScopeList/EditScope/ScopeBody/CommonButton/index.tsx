import SVG from "@/CommonComponent/SVG";
import { Previous } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { resetForm, setNavId, setTabId } from "@/Redux/Reducers/EditScopeSlice";
import { updateScope } from "@/Redux/Reducers/ScopeSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "reactstrap";

interface EditScopeButtonProps {
  slug: string;
}

const EditScopeButton: React.FC<EditScopeButtonProps> = ({ slug }) => {
  const { navId, formValue, tabId } = useAppSelector(
    (state) => state.editScope
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const submitFormData = async (formData: FormData) => {
    try {
      const response = await dispatch(
        updateScope({ updatedScope: formData, id: slug })
      ).unwrap();

      if (response.status) {
        toast.success("Scope updated successfully!");
        router.push(`/dashboard/edit-scope/`);
        dispatch(resetForm());
        dispatch(setNavId(1));
      } else {
        toast.error(response?.message || "Failed to update scope data.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error submitting data. Please try again.");
      }
    }
  };

  const validateFields = () => {
    if (navId === 1 && (!formValue.service || !formValue.details)) {
      toast.error("Please fill all fields in English details.");
      return false;
    } else if (
      navId === 2 &&
      (!formValue.service_ar || !formValue.details_ar)
    ) {
      toast.error("Please fill all fields in Arabic details.");
      return false;
    } else if (navId === 3 && (!formValue.iconImg || !formValue.mainImg)) {
      toast.error("Please upload both icon and main images.");
      return false;
    }
    return true;
  };

  const handleFormValue = () => {
    if (!validateFields()) return;

    if (navId === 1) {
      dispatch(setNavId(2));
    } else if (navId === 2) {
      dispatch(setNavId(3));
    } else if (navId === 3) {
      dispatch(setNavId(4));
    } else if (navId === 4) {
      const formData = new FormData();
      formData.append("service", formValue.service);
      formData.append("service_ar", formValue.service_ar);
      formData.append("details", formValue.details);
      formData.append("details_ar", formValue.details_ar);

      if (formValue.iconImg && typeof formValue.iconImg !== "string") {
        formData.append("iconImg", formValue.iconImg);
      }

      if (formValue.mainImg && typeof formValue.mainImg !== "string") {
        formData.append("mainImg", formValue.mainImg);
      }

      formData.append("published", formValue.published);

      submitFormData(formData);
    }
  };

  const handlePrevious = () => {
    if (navId > 1) {
      if (tabId > 1) {
        dispatch(setTabId(tabId - 1));
      } else {
        dispatch(setNavId(navId - 1));
      }
    }
  };

  return (
    <div className="product-buttons border-0">
      {navId > 1 && (
        <Button color="transparent" onClick={handlePrevious}>
          <div className="d-flex align-items-center gap-sm-2 gap-1">
            <SVG iconId="back-arrow" />
            {Previous}
          </div>
        </Button>
      )}
      <Button color="transparent" className="ms-2" onClick={handleFormValue}>
        <div className="d-flex align-items-center gap-sm-2 gap-1">
          {navId === 4 ? "Update" : "Next"} <SVG iconId="front-arrow" />
        </div>
      </Button>
    </div>
  );
};

export default EditScopeButton;
