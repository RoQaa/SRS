import SVG from "@/CommonComponent/SVG";
import { Previous } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { resetForm, setNavId, setTabId } from "@/Redux/Reducers/AddNewsSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import Cookies from "js-cookie";

const CommonButton = () => {
  const { navId, formValue, tabId } = useAppSelector((state) => state.addNews);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const submitFormData = async (formData: FormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/edit-website/news/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Item added successfully!");
        router.push(`/dashboard/news/`);
        dispatch(resetForm()); // Reset the form fields
        dispatch(setNavId(1)); // Reset the form fields
      } else {
        const errorData = await response.json();
        toast.error(errorData?.message || "Failed to submit data.");
      }
    } catch {
      toast.error("Error submitting data. Please try again.");
    }
  };

  const validateFields = () => {
    if (navId === 1 && (!formValue.title || !formValue.content)) {
      toast.error("Please fill all fields in English details.");
      return false;
    } else if (navId === 2 && (!formValue.title_ar || !formValue.content_ar)) {
      toast.error("Please fill all fields in Arabic details.");
      return false;
    } else if (navId === 3 && (!formValue.thumbnail || !formValue.images)) {
      toast.error("Please upload a thumbnail and images.");
      return false;
    } else if (navId === 4 && (!formValue.date || !formValue.published)) {
      toast.error("Please select a date and status.");
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
      formData.append("title", formValue.title);
      formData.append("title_ar", formValue.title_ar);
      formData.append("description", formValue.content);
      formData.append("description_ar", formValue.content_ar);
      formData.append("date", formValue.date);
      formData.append("published", formValue.published);

      if (formValue.thumbnail) {
        formData.append("thumbnail", formValue.thumbnail);
      }

      if (Array.isArray(formValue.images)) {
        formValue.images.forEach((image: string | Blob) => {
          if (image) {
            formData.append("images", image);
          }
        });
      }

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
          {navId === 4 ? "Submit" : "Next"}
          <SVG iconId="front-arrow" />
        </div>
      </Button>
    </div>
  );
};

export default CommonButton;
