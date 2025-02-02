import SVG from "@/CommonComponent/SVG";
import { Previous } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setNavId, setTabId } from "@/Redux/Reducers/EditNewsSlice";
import { updateNews } from "@/Redux/Reducers/NewsSlice";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "reactstrap";


const CommonButton = ({ slug }: { slug: string }) => {
  const { navId, formValue, tabId } = useAppSelector((state) => state.editNews);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locale = useLocale();

  const submitFormData = async (formData: FormData) => {
    try {
      const response = await dispatch(updateNews({updatedNews: formData, id:slug})).unwrap();

      if (response.status === true) {
        toast.success("News updated successfully!");
        router.push(`/${locale}/dashboard/news/`);
        dispatch(setNavId(1));
      } else {
        const errorData = response.error.message;
        toast.error(errorData?.message || "Failed to update news.");
      }
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message || "Failed to update news.");
      }else {
        toast.error("Failed to update news.");
      }
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
    } else if (navId === 4 && !formValue.date) {
      toast.error("Please select a date and status.");
      return false;
    }
    return true;
  };

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
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
      if (!isValidDate(formValue.date)) {
        toast.error("Please enter a valid date.");
        return;
      }

      const formData = new FormData();
      formData.append("title", formValue.title);
      formData.append("title_ar", formValue.title_ar);
      formData.append("description", formValue.description);
      formData.append("description_ar", formValue.description_ar);
      formData.append("date", new Date(formValue.date).toISOString());
      formData.append("published", String(formValue.published));

      if (formValue.thumbnail) {
        formData.append("thumbnail", formValue.thumbnail);
      }

      if (Array.isArray(formValue.images)) {
        formValue.images.forEach((image: Blob) => {
          formData.append("images", image);
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
