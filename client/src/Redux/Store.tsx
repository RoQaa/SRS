import { configureStore } from "@reduxjs/toolkit";
import HeaderBookmarkSlice from "./Reducers/HeaderBookmarkSlice";
import LayoutSlice from "./Reducers/LayoutSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import ProjectSlice from "./Reducers/ProjectSlice";
import addNewsSlice from "./Reducers/AddNewsSlice";
import EditNewsSlice from "./Reducers/EditNewsSlice";
import NewsSlice from "./Reducers/NewsSlice";
import ProductsSlice from "./Reducers/ProductsSlice";
import userSlice from "./Reducers/UserSlice";
import ScopeSlice from "./Reducers/ScopeSlice";
import EditScopeSlice from "./Reducers/EditScopeSlice";
import AddScopeSlice from "./Reducers/AddScopeSlice";
import MainCarouselsSlice from "./Reducers/MainCarouselsSlice";
import ClientsCarouselsSlice from "./Reducers/ClientsCarouselsSlice";
import MediaSlice from "./Reducers/MediaSlice";
import ValuesSlice from "./Reducers/ValuesSlice";
import CounterSlice from "./Reducers/CounterSlice";
import MiddleSectionSlice from "./Reducers/MiddleSectionSlice";
import SeoSlice from "./Reducers/SeoSlice";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    headerBookMark: HeaderBookmarkSlice,
    themeCustomizer: ThemeCustomizerSlice,
    project: ProjectSlice,
    addNews: addNewsSlice,
    editNews: EditNewsSlice,
    news: NewsSlice,
    products: ProductsSlice,
    user: userSlice,
    scopes: ScopeSlice,
    editScope: EditScopeSlice,
    addScope: AddScopeSlice,
    mainCarousels: MainCarouselsSlice,
    clientsCarousel: ClientsCarouselsSlice,
    media: MediaSlice,
    values: ValuesSlice,
    counter: CounterSlice,
    middleSection: MiddleSectionSlice ,
    seo: SeoSlice ,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
