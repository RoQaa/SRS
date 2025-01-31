import SVG from "@/CommonComponent/SVG";
import { Previous } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { resetForm, setNavId, setTabId } from "@/Redux/Reducers/AddScopeSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import Cookies from "js-cookie";
import { useLocale } from "next-intl";

const CommonButtonScope = () => {
  const { navId, formValue, tabId } = useAppSelector((state) => state.addScope);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locale = useLocale();

  const submitFormData = async (formData: FormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/edit-website/scopes/`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          }
        }
      );

      if (response.ok) {
        toast.success("Scope added successfully!");
        router.push(`/${locale}/dashboard/edit-scope/`);
        dispatch(resetForm());
        dispatch(setNavId(1));
      } else {
        const errorData = await response.json();
        toast.error(errorData?.message || "Failed to submit scope data.");
      }
    } catch  {
      toast.error("Error submitting data. Please try again.");
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
      // Prepare the form data to be submitted
      const formData = new FormData();
      formData.append("service", formValue.service);
      formData.append("service_ar", formValue.service_ar);
      formData.append("details", formValue.details);
      formData.append("details_ar", formValue.details_ar);

      if (formValue.iconImg) {
        formData.append("iconImg", formValue.iconImg);
      }

      if (formValue.mainImg) {
        formData.append("mainImg", formValue.mainImg);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
          {navId === 4 ? "Submit" : "Next"}
          <SVG iconId="front-arrow" />
        </div>
      </Button>
    </div>
  );
};

export default CommonButtonScope;
