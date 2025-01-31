/* eslint-disable */
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { TitleAndClientSection } from "./TitleAndClientSection";
import { ProjectSection } from "./ProjectSection";
import { DateSection } from "./DateSection";
import { DescriptionSection } from "./DescriptionSection";
import { ButtonSection } from "./ButtonSection";
import { IProject } from "@/interfaces/Project.interface";
import { CategoryAndLocationSection } from "./CategoryAndLocationSection";
import UploadImage from "./UploadImage";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {
  createProject,
  fetchProjectById,
  updateProject,
} from "@/Redux/Reducers/ProjectSlice";
import { useEffect } from "react";
import { Spinner } from "reactstrap";
import { useLocale } from "next-intl";

interface CreateNewProjectFormProps {
  slug: string;
}

const CreateNewProjectForm: React.FC<CreateNewProjectFormProps> = ({
  slug = "",
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const locale = useLocale()
  const { currentProject, dataLoaded } = useAppSelector(
    (state) => state.project
  );

  useEffect(() => {
    const fetchProject = async () => {
      await dispatch(fetchProjectById(slug));
    };
    if (slug) {
      fetchProject();
    }
  }, [dispatch, slug]);

  // @ts-ignore
  const ProjectInitialValue: IProject = slug
    ? {
        title: currentProject?.title ?? "",
        description: currentProject?.description ?? "",
        client: currentProject?.client ?? "",
        location: currentProject?.location ?? "",
        startDate: currentProject?.startDate ?? new Date(),
        endDate:
          currentProject?.endDate ??
          new Date(new Date()).setDate(new Date().getDate() + 1),
        images: currentProject?.images ?? [],
        // @ts-ignore
        category: currentProject?.category?._id ?? "",
        status: currentProject?.status ?? "pending",
        published: currentProject?.published ?? false,
        projectProgress: currentProject?.projectProgress ?? 0,
        title_ar: currentProject?.title_ar ?? "",
        description_ar: currentProject?.description_ar ?? "",
        client_ar: currentProject?.client_ar ?? "",
        location_ar: currentProject?.location_ar ?? "",
      }
    : {
        title: "",
        description: "",
        client: "",
        location: "",
        startDate: new Date(),
        endDate: new Date(new Date()).setDate(new Date().getDate() + 1),
        images: [],
        category: "",
        status: "pending",
        published: false,
        projectProgress: 0,
        title_ar: "",
        description_ar: "",
        client_ar: "",
        location_ar: "",
      };

  const handleSubmit = async (values: IProject) => {
    const formData = new FormData();

    // Append text fields to FormData
    (Object.keys(values) as (keyof IProject)[]).forEach((key) => {
      if (
        key !== "images" &&
        values[key] !== undefined &&
        values[key] !== null
      ) {
        formData.append(key, String(values[key]));
      }
    });

    // Append images to FormData
    if (Array.isArray(values.images)) {
      values.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    if (slug) {
      try {
        const res = await dispatch(
          updateProject({ updatedProject: formData, slug: slug })
        ).unwrap();
        if (res.status) {
          toast.success("Project Updated successfully!");
          router.push(`/${locale}/dashboard/projects/`);
        }
      } catch (error: any) {
        toast.error(error?.message || "Failed to Update Project.");
        console.error("Error Updating Project:", error);
      }
    } else {
      try {
        await dispatch(createProject(formData)).unwrap();
        toast.success("Project Created successfully!");
        router.push(`/${locale}/dashboard/projects/`);
      } catch (error: any) {
        toast.error(error?.message);
        console.error("Error Creating Project:", error);
      }
    }
  };

  return (
    <>
      {dataLoaded === false ? (
        <div className="text-center py-5">
          <Spinner color="primary" />
        </div>
      ) : (
        <Formik
          initialValues={ProjectInitialValue}
          validationSchema={
            slug ? UpdateProjectValidation : NewProjectValidation
          }
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, touched, errors }) => (
            <Form className="theme-form">
              <TitleAndClientSection lang="en" />
              <ProjectSection />
              <DateSection
                setFieldValue={setFieldValue}
                startDate={ProjectInitialValue.startDate}
                endDate={ProjectInitialValue.endDate}
              />
              <DescriptionSection lang="en" />
              <CategoryAndLocationSection lang="en" />
              <UploadImage
                setFieldValue={setFieldValue}
                oldImages={
                  currentProject && currentProject.images
                  ? currentProject.images
                  : []
                }
              />

              <h3 className="py-2 my-3">
                <span className="text-danger">*</span>Add Details In Arabic
              </h3>
              <TitleAndClientSection lang="ar" />
              {touched.title_ar && errors.title_ar && (
                <div className="text-danger">{errors.title_ar}</div>
              )}
              <DescriptionSection lang="ar" />
              <CategoryAndLocationSection lang="ar" category={false} />
              <ButtonSection slug={slug} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default CreateNewProjectForm;

export const NewProjectValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  title_ar: Yup.string().required("Title is required"),
  client: Yup.string().required("Client Name is required"),
  client_ar: Yup.string().required("Client Name is required"),
  description: Yup.string().required("Some Details is required"),
  description_ar: Yup.string().required("Some Details is required"),
  location: Yup.string().max(
    200,
    "Location can't be longer than 200 characters"
  ),
  location_ar: Yup.string().max(
    200,
    "Location can't be longer than 200 characters"
  ),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date must be after the start date")
    .required("End date is required"),
  images: Yup.array().required("At least one image is required"),
  projectProgress: Yup.number()
    .min(0, "Progress cannot be less than 0")
    .max(100, "Progress cannot exceed 100")
    .required("Project progress is required"),
  category: Yup.string().required("Category is required"),
  status: Yup.string()
    .oneOf(["pending", "in progress", "completed"], "Invalid status")
    .required("Status is required"),
  published: Yup.boolean().default(false),
});

export const UpdateProjectValidation = Yup.object().shape({
  title: Yup.string().notRequired(),
  title_ar: Yup.string().notRequired(),
  client: Yup.string().notRequired(),
  client_ar: Yup.string().notRequired(),
  description: Yup.string().notRequired(),
  description_ar: Yup.string().notRequired(),
  location: Yup.string()
    .max(200, "Location can't be longer than 200 characters")
    .notRequired(),
  location_ar: Yup.string()
    .max(200, "Location can't be longer than 200 characters")
    .notRequired(),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date must be after the start date")
    .required("End date is required"),
  images: Yup.array().notRequired(),
  projectProgress: Yup.number()
    .min(0, "Progress cannot be less than 0")
    .max(100, "Progress cannot exceed 100")
    .required("Project progress is required"),
  category: Yup.string().notRequired(),
  status: Yup.string()
    .oneOf(["pending", "in progress", "completed"], "Invalid status")
    .notRequired(),
  published: Yup.boolean().notRequired(),
});
