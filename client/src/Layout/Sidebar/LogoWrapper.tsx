import SVG from "@/CommonComponent/SVG";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { handleResponsiveToggle, setToggleSidebar } from "@/Redux/Reducers/LayoutSlice";
import Link from "next/link";

export const LogoWrapper = () => {
  const dispatch = useAppDispatch();
  
  const { sidebarIconType } = useAppSelector((state) => state.themeCustomizer);
  const { toggleSidebar } = useAppSelector((state) => state.layout);

  return (
    <>
      <div className="logo-wrapper">
        <Link href={`/sample_page`}>
          {/* <img className="img-fluid" src={`/imgs/Clicks-Master.svg`} alt="" /> */}
          <img className="img-fluid" src={`/imgs/Clicks-White.svg`} alt="" style={{width: "120px"}} />
        </Link>
        <div className="back-btn" onClick={() => dispatch(handleResponsiveToggle())}>
          <i className="fa fa-angle-left"></i>
        </div>
        <div className="toggle-sidebar" onClick={()=>dispatch(setToggleSidebar(!toggleSidebar))} defaultChecked>
          <SVG className={`${sidebarIconType}-icon sidebar-toggle status_toggle middle`} iconId={`${sidebarIconType === "fill" ? "fill-" : "" }toggle-icon`} />
        </div>
      </div>
      <div className="logo-icon-wrapper">
        <Link href={`/sample_page`}>
          <img className="img-fluid" src={`/imgs/Clicks-White.svg`} alt="" />
        </Link>
      </div>
    </>
  );
};
