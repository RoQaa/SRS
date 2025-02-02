"use client";
import Image from "next/image";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useMenuItems } from "./menuData";
import MenuItem from "./MenuItem";
import LocalSwitcher from "./LocalSwitcher";
import axios, { AxiosError } from "axios";
import { IScope } from "@/interfaces/Scope.interface";
import { IProduct } from "@/interfaces/Products.interface";
import { useLocale } from "next-intl";

interface DropdownState {
  [key: string]: boolean;
}

interface MenuItemType {
  title: string;
  link: string;
  dropdown?: MenuItemType[];
  subDropdown?: MenuItemType[];
}

interface productItem {
  Product: IProduct;
  subDropdown: [];
}

const Navbar: React.FC = () => {
  const locale = useLocale();
  const [products, setProducts] = useState<productItem[]>([]);
  const [scopeOfWork, setScopeOfWork] = useState<IScope[]>([]);

  useEffect(() => {
    const getDynamicItems = async () => {
      try {
        const productsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/edit-website/products/`
        );
        const productsData = productsResponse.data.data;

        const filteredProducts = productsData.filter(
          (product: IProduct) => product.published
        );

        const productsWithChildren = filteredProducts.map(
          (product: IProduct) => {
            const children = filteredProducts.filter(
              (p: IProduct) => p.parentProductId === product._id
            );
            return {
              Product: product,
              subDropdown: children.map((child: IProduct) => ({
                title: locale === "en" ? child.name : child.name_ar,
                link:
                  locale === "en"
                    ? `/${locale}/products/${child.slug}`
                    : `/${locale}/products/${child.slug_ar}`,
              })),
            };
          }
        );

        setProducts(productsWithChildren);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error?.message);
        }
      }

      try {
        const scopeOfWorkResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/edit-website/scopes`
        );
        const scopeOfWorkData = scopeOfWorkResponse.data.data;
        const filteredScopes = scopeOfWorkData.filter(
          (scope: IScope) => scope.published
        );
        setScopeOfWork(filteredScopes);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error?.message);
        }
      }
    };
    getDynamicItems();
  }, [locale]);

  const menuItems = useMenuItems(products, scopeOfWork);
  const memoizedMenuItems = useMemo<MenuItemType[]>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => menuItems,
    [menuItems]
  );
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openDropdowns, setOpenDropdowns] = useState<DropdownState>({});
  const [openSubDropdowns, setOpenSubDropdowns] = useState<DropdownState>({});

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleDropdown = useCallback((key: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenDropdowns((prev) => ({
      ...Object.keys(prev).reduce((acc, currKey) => {
        acc[currKey] = false;
        return acc;
      }, {} as DropdownState),
      [key]: !prev[key],
    }));
  }, []);

  const toggleSubDropdown = useCallback((key: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenSubDropdowns((prev) => ({
      ...Object.keys(prev).reduce((acc, currKey) => {
        acc[currKey] = false;
        return acc;
      }, {} as DropdownState),
      [key]: !prev[key],
    }));
  }, []);

  return (
    <>
      {/* Mobile Menu */}
      <div
        className={`mob-menu ${isMobileMenuOpen ? "open" : ""}`}
        style={{ display: isMobileMenuOpen ? "block" : "none" }}
      >
        <span onClick={closeMobileMenu} style={{ cursor: "pointer" }}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <ul>
          {memoizedMenuItems.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              openDropdowns={openDropdowns}
              toggleDropdown={toggleDropdown}
              openSubDropdowns={openSubDropdowns}
              toggleSubDropdown={toggleSubDropdown}
              isMobileMenuOpen={isMobileMenuOpen}
            />
          ))}
          <li className="nav-item mt-3">
            <LocalSwitcher />
          </li>
        </ul>
      </div>

      <div className="navbar">
        <div className="nav-logo">
          <Image
            width={245}
            height={60.15}
            src="/imgs/GSF-V-Logo.svg"
            alt="Logo"
            style={{ maxWidth: "245px" }}
            decoding="async"
          />
        </div>
        <div className="mob-menu-icon" onClick={toggleMobileMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="nav-items">
          <ul>
            {memoizedMenuItems.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                openDropdowns={openDropdowns}
                toggleDropdown={toggleDropdown}
                openSubDropdowns={openSubDropdowns}
                toggleSubDropdown={toggleSubDropdown}
                isMobileMenuOpen={isMobileMenuOpen}
              />
            ))}
            <li className="nav-item">
              <LocalSwitcher />
            </li>
            <li>
              <a className="nav-link" href="#">
                <i className="fa-solid fa-file-arrow-down fa-lg"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
